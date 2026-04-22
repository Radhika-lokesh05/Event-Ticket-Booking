require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Track DB State
let isDbConnected = false;

// Mock Data (Fallback)
const mockEvents = [
  {
    _id: '1001',
    title: 'Neon Nights Festival',
    summary: 'A futuristic EDM experience under the stars.',
    description: 'A vibrant EDM festival with top DJs.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    location: 'Downtown Arena',
    image: 'https://images.unsplash.com/photo-1540039155732-680874b8cb67',
    price: 99
  }
];

// MongoDB Connection
const uri = process.env.MONGO_URI || '';
// Log the URI with the password masked so we can verify which string is used at runtime
console.log('Using MONGO_URI:', uri.replace(/:\/\/(?:.*@)?/, '://*****@'));
console.log('Mongoose version:', mongoose.version);

// Mongoose 7+ uses these settings by default; avoid passing unsupported options.
async function connectWithFallback() {
  const primary = uri;
  const fallback = process.env.MONGO_FALLBACK || process.env.MONGO_URI_FALLBACK || process.env.MONGO_NON_SRV;

  try {
    await mongoose.connect(primary);
    console.log('✅ MongoDB connected successfully');
    isDbConnected = true;
    seedDatabase();
    return;
  } catch (err) {
    console.log('❌ MongoDB connection error:');
    console.error(err);

    // If SRV/DNS resolution was refused, optionally attempt fallback
    const isSrvError = (err.message && err.message.includes('querySrv')) || err.code === 'ECONNREFUSED';
    if (isSrvError) {
      if (fallback) {
        console.log('Attempting fallback MongoDB URI (non-SRV)...');
        try {
          await mongoose.connect(fallback);
          console.log('✅ MongoDB connected using fallback URI');
          isDbConnected = true;
          seedDatabase();
          return;
        } catch (err2) {
          console.log('❌ Fallback connection error:', err2.message);
        }
      } else {
        console.log('No fallback URI found. To enable automatic fallback, set `MONGO_FALLBACK` in your .env to a non-SRV connection string.');
      }
    }
  }
}

connectWithFallback();

// Schemas
const eventSchema = new mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  date: Date,
  location: String,
  image: String,
  price: Number
});

const registrationSchema = new mongoose.Schema({
  eventId: String,
  name: String,
  email: String,
  phone: String,
  quantity: Number,
  registrationDate: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
const Registration = mongoose.model('Registration', registrationSchema);

// Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes

// Get Events
app.get('/api/events', async (req, res) => {
  try {
    if (!isDbConnected) return res.json(mockEvents);

    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get Event by ID (SAFE)
app.get('/api/events/:id', async (req, res) => {
  try {
    if (!isDbConnected) {
      const event = mockEvents.find(e => e._id === req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      return res.json(event);
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { eventId, name, email, phone, quantity } = req.body;

    let event;

    if (!isDbConnected) {
      event = mockEvents.find(e => e._id === eventId);
    } else {
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }

      event = await Event.findById(eventId);

      const registration = new Registration({
        eventId,
        name,
        email,
        phone,
        quantity
      });

      await registration.save();
    }

    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Send Mail
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Ticket for ${event.title}`,
      text: `Hi ${name}, you registered for ${event.title}`
    }, () => {});

    res.json({ message: 'Registration successful' });

  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Seed DB (FIXED)
async function seedDatabase() {
  try {
    const count = await Event.countDocuments();
    if (count === 0) {
      console.log('Seeding DB...');
      await Event.insertMany(
        mockEvents.map(({ _id, ...rest }) => rest)
      );
      console.log('DB Seeded');
    }
  } catch (err) {
    console.log('Seed error:', err.message);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
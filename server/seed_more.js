require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

const eventSchema = new mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  date: Date,
  location: String,
  image: String,
  price: Number
});

// Use the same collection name as the app's `Event` model ('events')
const Event = mongoose.model('Event', eventSchema);

const now = Date.now();
const samples = [
  {
    title: 'Neon Nights Festival',
    summary: 'A futuristic EDM experience under the stars.',
    description: 'A vibrant EDM festival with top DJs.',
    date: new Date(now + 7 * 24 * 60 * 60 * 1000),
    location: 'Downtown Arena',
    image: 'https://images.unsplash.com/photo-1540039155732-680874b8cb67',
    price: 99
  },
  {
    title: 'Solar Beats',
    summary: 'An outdoor chill electronic day-party.',
    description: 'Relaxed daytime event with live sets and food trucks.',
    date: new Date(now + 14 * 24 * 60 * 60 * 1000),
    location: 'Riverside Park',
    image: 'https://images.unsplash.com/photo-1508973379-6b6a6f0b0c1b',
    price: 45
  },
  {
    title: 'Midnight Groove',
    summary: 'Late night underground house party.',
    description: 'Intimate venue with local and international DJs.',
    date: new Date(now + 21 * 24 * 60 * 60 * 1000),
    location: 'Warehouse 9',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    price: 30
  }
];

async function run() {
  try {
    await mongoose.connect(uri);
    const res = await Event.insertMany(samples);
    console.log(`Inserted ${res.length} sample events`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

run();

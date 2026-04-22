# Event Ticket Booking (FST Demo)

A small demo application for listing events and registering ticket purchases. The project uses a Vite + React client and an Express + MongoDB server. Registrations send a confirmation email (via Gmail SMTP) and events are stored in MongoDB (with a fallback to mock data when the DB is not available).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Install](#install)
- [Run Locally](#run-locally)
- [Seeding the Database](#seeding-the-database)
- [API Reference](#api-reference)
- [Development Notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- List events with details (title, summary, description, date, location, image, price).
- Event detail pages and registration form.
- Server-side registration storage in MongoDB.
- Email confirmation sent to registrants via Gmail SMTP.
- Lightweight fallback to mock events if MongoDB is not connected.

## Tech Stack

- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Email: Nodemailer (Gmail)

## Repository Structure

- [client](client): React front-end (Vite). Key files: [client/src/main.jsx](client/src/main.jsx)
- [server/app.js](server/app.js): Express server, API routes, DB connection, and mailer configuration.
- [server/seed_more.js](server/seed_more.js): Optional script to insert sample events into MongoDB.
- LICENSE: Project license.

## Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- A MongoDB instance (local or Atlas)
- A Gmail account with an App Password if using Gmail SMTP (recommended). See Google account security settings for App Passwords.

## Environment Variables

Create a `.env` file in the `server/` folder (or set environment variables in your environment). The server reads the following variables:

- `MONGO_URI` (required) — Primary MongoDB connection string (mongodb+srv://... or mongodb://...).
- `MONGO_FALLBACK` / `MONGO_URI_FALLBACK` / `MONGO_NON_SRV` (optional) — Fallback connection string used if the primary errors (helpful to switch between SRV and non-SRV forms).
- `PORT` (optional) — Server port (default 5000).
- `EMAIL_USER` — Gmail address used to send mail (e.g., your.email@gmail.com).
- `EMAIL_PASS` — Password or App Password for `EMAIL_USER`.

Example `server/.env` (DO NOT commit real secrets):

```
MONGO_URI=mongodb+srv://user:password@cluster0.xxxxxx.mongodb.net/mydb?retryWrites=true&w=majority
MONGO_FALLBACK=mongodb://user:password@host:27017/mydb
PORT=5000
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your-app-password
```

## Install

From the project root run:

```bash
# Install root (optional)
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Run Locally

Open two terminals (or use a multiplexer):

Terminal 1 — Start the server

```bash
cd server
node app.js
# or optionally: nodemon app.js (if you have nodemon installed globally or in devDeps)
```

Terminal 2 — Start the client

```bash
cd client
npm run dev
# then open the URL printed by Vite (usually http://localhost:5173)
```

Notes:
- The server will attempt to connect to MongoDB on startup. If the connection succeeds and the `events` collection is empty, the app will automatically seed a minimal set of events. You can also run the explicit seeder below.

## Seeding the Database

- The server auto-runs `seedDatabase()` on first successful DB connection if the events collection is empty.
- To insert additional sample events manually, run:

```bash
cd server
node seed_more.js
```

This script requires a valid `MONGO_URI` in `server/.env` and will insert several sample events.

## API Reference

- GET `/api/events` — Returns a list of events. If MongoDB is not connected, the server returns built-in mock data.
- GET `/api/events/:id` — Returns a single event by ID. When using MongoDB, the route expects a MongoDB ObjectId.
- POST `/api/register` — Register for an event. Request JSON body should include:
	- `eventId` (string)
	- `name` (string)
	- `email` (string)
	- `phone` (string)
	- `quantity` (number)

On successful registration the server attempts to send a confirmation email to the `email` provided (emails are sent from `EMAIL_USER`).

## Development Notes

- The server prints the `MONGO_URI` to the console with the password portion masked so you can confirm which URI was used at runtime.
- If you are using Gmail for `EMAIL_USER`, create an App Password and use that in `EMAIL_PASS` (recommended) or enable the proper account settings for SMTP.
- The front-end is a Vite app using `react-router-dom` for navigation. Edit components in `client/src/pages` to modify the views.

## Contributing

- Fork the repo, create a feature branch, and open a Pull Request with a clear description of changes.
- Keep sensitive credentials out of commits. Use `.env` and environment-specific secrets.

## License

This repository uses the license in the `LICENSE` file included at the project root.

---

If you'd like, I can:

- Add `npm start` scripts to `server/package.json` and `client/package.json`.
- Add a development script to run both client and server concurrently.
- Create a `.env.example` file with placeholders for the required environment variables.

Tell me which of those you'd like me to add next.
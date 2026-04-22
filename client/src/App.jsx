import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Music, Disc } from 'lucide-react';
import Home from './pages/Home';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import Registration from './pages/Registration';
import Confirmation from './pages/Confirmation';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <Link to="/" className="nav-brand">
        <Music color="var(--neon-purple)" />
        <span>MUSIC</span> SYNC
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/events" className="nav-link">Events</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer>
    <div className="container">
      <Disc size={32} color="var(--neon-blue)" style={{ marginBottom: "10px" }} />
      <p>&copy; {new Date().getFullYear()} Music Sync. Feel the rhythm.</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/register/:id" element={<Registration />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

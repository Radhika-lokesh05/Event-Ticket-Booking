import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Assuming backend runs on 5000 based on app.js
    fetch('http://localhost:5000/api/events')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load events. Make sure backend is running.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>Loading events...</div>;
  if (error) return <div className="container" style={{ textAlign: 'center', marginTop: '100px', color: '#ff4444' }}>{error}</div>;

  return (
    <div className="container">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Upcoming <span style={{ color: 'var(--neon-blue)' }}>Events</span></h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Find your next unforgettable experience.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {events.map((event, index) => (
            <motion.div 
              key={event._id || index}
              className="glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: 0, overflow: 'hidden' }}
            >
              <div style={{ height: '200px', background: `url(${event.image}) center/cover no-repeat`, position: 'relative' }}>
                 <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--neon-blue)' }}>
                   ${event.price}
                 </div>
              </div>
              
              <div style={{ padding: '0 20px 20px 20px' }}>
                <h3 style={{ margin: '15px 0 10px 0', fontSize: '1.4rem' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>{event.summary}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', fontSize: '0.85rem', color: '#ccc' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Calendar size={16} color="var(--neon-purple)" /> {new Date(event.date).toLocaleDateString()}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <MapPin size={16} color="var(--neon-blue)" /> {event.location}
                   </div>
                </div>

                <Link to={`/events/${event._id}`} className="btn-secondary" style={{ width: '100%' }}>
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EventList;

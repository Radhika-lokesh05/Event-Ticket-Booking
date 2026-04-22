import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, ArrowLeft } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>;
  if (!event) return <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>Event not found.</div>;

  return (
    <div className="container">
      <Link to="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <ArrowLeft size={16} /> Back to Events
      </Link>
      
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        <div style={{ height: '400px', background: `url(${event.image}) center/cover no-repeat`, position: 'relative' }}>
           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 30px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
              <h1 style={{ margin: 0, fontSize: '3rem', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{event.title}</h1>
           </div>
        </div>

        <div style={{ padding: '40px 30px', display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
           <div style={{ flex: '1 1 60%' }}>
              <h3 style={{ color: 'var(--neon-blue)', marginBottom: '15px' }}>About The Event</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-main)', fontSize: '1.1rem' }}>{event.description}</p>
           </div>
           
           <div style={{ flex: '1 1 30%', background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <h4 style={{ marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>Event Details</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ background: 'rgba(138,43,226,0.2)', padding: '10px', borderRadius: '50%' }}>
                     <Calendar size={20} color="var(--neon-purple)" />
                   </div>
                   <div>
                     <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date & Time</div>
                     <div style={{ fontWeight: '500' }}>{new Date(event.date).toLocaleString()}</div>
                   </div>
                 </div>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ background: 'rgba(0,255,255,0.2)', padding: '10px', borderRadius: '50%' }}>
                     <MapPin size={20} color="var(--neon-blue)" />
                   </div>
                   <div>
                     <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Location</div>
                     <div style={{ fontWeight: '500' }}>{event.location}</div>
                   </div>
                 </div>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%' }}>
                     <Ticket size={20} color="white" />
                   </div>
                   <div>
                     <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Price</div>
                     <div style={{ fontWeight: '500', fontSize: '1.2rem', color: 'var(--neon-blue)' }}>${event.price}</div>
                   </div>
                 </div>
              </div>

              <div style={{ marginTop: '30px' }}>
                 <Link to={`/register/${event._id}`} className="btn-primary" style={{ width: '100%' }}>
                    Book Ticket Now
                 </Link>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetail;

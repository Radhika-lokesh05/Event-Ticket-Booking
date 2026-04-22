import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const { event, registration } = location.state || {};

  if (!event || !registration) {
    return <Navigate to="/events" />;
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        style={{ width: '100%', maxWidth: '600px', textAlign: 'center', padding: '40px' }}
      >
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.3, type: 'spring' }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
        >
           <CheckCircle size={80} color="var(--neon-blue)" />
        </motion.div>

        <h1 style={{ color: 'var(--text-main)', marginBottom: '10px' }}>You're All Set!</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Your registration for <strong>{event.title}</strong> was successful.
        </p>

        <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '12px', padding: '20px', border: '1px dashed var(--neon-purple)', marginBottom: '30px', textAlign: 'left' }}>
           <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>Registration Details</h3>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', fontSize: '0.95rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>Name:</div>
              <div>{registration.name}</div>
              
              <div style={{ color: 'var(--text-muted)' }}>Email:</div>
              <div>{registration.email}</div>
              
              <div style={{ color: 'var(--text-muted)' }}>Tickets:</div>
              <div>{registration.quantity}</div>
              
              <div style={{ color: 'var(--text-muted)' }}>Price Paid:</div>
              <div style={{ color: 'var(--neon-blue)', fontWeight: 'bold' }}>${(event.price * registration.quantity).toFixed(2)}</div>
           </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px' }}>
           <Mail size={16} />
           <p style={{ margin: 0 }}>We've sent a digital ticket to <strong>{registration.email}</strong>.</p>
        </div>

        <Link to="/events" className="btn-secondary">
          Discover More Events
        </Link>
      </motion.div>
    </div>
  );
};

export default Confirmation;

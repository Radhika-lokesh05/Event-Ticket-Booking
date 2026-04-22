import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Registration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventId: id })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');
      
      // On success, redirect to confirmation with state
      navigate('/confirmation', { state: { event, registration: data.registration } });
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Secure Your Spot</h2>
        <p style={{ textAlign: 'center', color: 'var(--neon-blue)', marginBottom: '30px' }}>{event.title}</p>
        
        {error && <div style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid red', padding: '10px', borderRadius: '8px', marginBottom: '20px', color: '#ffcccc' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-input" required value={formData.email} onChange={handleChange} placeholder="user@domain.com" />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>Your e-ticket will be sent here.</small>
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Phone (Optional)</label>
              <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} placeholder="+1 234 567" />
            </div>
            
            <div className="form-group" style={{ width: '120px' }}>
              <label className="form-label">Quantity</label>
              <input type="number" name="quantity" min="1" max="10" className="form-input" required value={formData.quantity} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
             <span>Total Price:</span>
             <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--neon-purple)' }}>${(event.price * formData.quantity).toFixed(2)}</span>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Registration'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Registration;

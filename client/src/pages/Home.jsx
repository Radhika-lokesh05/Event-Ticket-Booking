import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Home = () => {
  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '20px', letterSpacing: '-2px' }}>
            Experience <span style={{ color: 'var(--neon-purple)', textShadow: '0 0 20px var(--neon-purple)' }}>Live Music</span> Like Never Before.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Discover upcoming concerts, underground sessions, and massive festivals. Sync with the rhythm and secure your digital ticket now.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/events" className="btn-primary">
              <Play size={20} fill="white" />
              Browse Events
            </Link>
          </div>
        </motion.div>

        {/* Decorative Grid Graphic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: 0,
            right: 0,
            height: '400px',
            background: 'linear-gradient(transparent, var(--bg-dark))',
            borderTop: '1px solid var(--neon-purple)',
            transform: 'perspective(500px) rotateX(60deg)',
            zIndex: -1,
            pointerEvents: 'none',
            opacity: 0.3
          }}
        >
          <div style={{ width: '100%', height: '100%', backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(138, 43, 226, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(138, 43, 226, 0.2) 1px, transparent 1px)' }}></div>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;

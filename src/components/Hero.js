import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onScrollToEvents, onOpenRegistration }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Microsoft Student Community
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          SRM University - AP
        </motion.p>
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          Join our exciting events and be part of the tech community
        </motion.p>
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <button className="btn-primary" onClick={onScrollToEvents}>
            View Events
          </button>
          <button className="btn-secondary" onClick={onOpenRegistration}>
            Register Now
          </button>
        </motion.div>
      </div>
      <div className="hero-animation">
        <div className="floating-elements">
          <motion.div 
            className="floating-icon"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💻
          </motion.div>
          <motion.div 
            className="floating-icon"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            🚀
          </motion.div>
          <motion.div 
            className="floating-icon"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            ⚡
          </motion.div>
          <motion.div 
            className="floating-icon"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4.5
            }}
          >
            🎯
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

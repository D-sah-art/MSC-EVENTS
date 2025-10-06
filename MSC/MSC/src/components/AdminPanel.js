import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaPlus } from 'react-icons/fa';

const AdminPanel = ({ onViewParticipants, onAddEvent }) => {
  return (
    <motion.div 
      className="admin-panel"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button 
        className="admin-btn"
        onClick={onViewParticipants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaUsers />
        View Participants
      </motion.button>
      
      <motion.button 
        className="admin-btn"
        onClick={onAddEvent}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus />
        Add Event
      </motion.button>
    </motion.div>
  );
};

export default AdminPanel;

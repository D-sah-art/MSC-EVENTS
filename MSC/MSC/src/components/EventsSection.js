import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';

const EventsSection = ({ events, onRegister }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCapacityColor = (registered, capacity) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 70) return '#f59e0b';
    return '#10b981';
  };

  return (
    <section id="events" className="events-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Upcoming Events
        </motion.h2>
        <div className="events-grid">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="event-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="event-image">{event.image}</div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              
              <div className="event-details">
                <div className="event-detail">
                  <FaCalendarAlt />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="event-detail">
                  <FaMapMarkerAlt />
                  <span>{event.location}</span>
                </div>
                <div className="event-detail">
                  <FaUsers />
                  <span>{event.registered}/{event.capacity} participants</span>
                </div>
                <div className="event-detail">
                  <FaClock />
                  <span>{event.category}</span>
                </div>
              </div>

              <div className="event-actions">
                <button 
                  className="btn-register"
                  onClick={() => onRegister(event.id)}
                  disabled={event.registered >= event.capacity}
                >
                  {event.registered >= event.capacity ? 'Fully Booked' : 'Register Now'}
                </button>
                <button className="btn-details">
                  View Details
                </button>
              </div>

              <div 
                className="event-capacity"
                style={{ 
                  background: `linear-gradient(90deg, ${getCapacityColor(event.registered, event.capacity)}20, ${getCapacityColor(event.registered, event.capacity)}10)`,
                  color: getCapacityColor(event.registered, event.capacity)
                }}
              >
                {Math.round((event.registered / event.capacity) * 100)}% Full
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

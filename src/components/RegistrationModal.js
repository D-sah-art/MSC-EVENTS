import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RegistrationModal = ({ isOpen, onClose, onRegister, events }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    eventId: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        year: '',
        eventId: ''
      });
      setMessage({ type: '', text: '' });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.year || !formData.eventId) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setMessage({ type: 'error', text: 'Please enter a valid phone number' });
      return;
    }

    const result = await onRegister(formData);
    setMessage(result);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Event Registration</h2>
              <button className="close" onClick={onClose}>&times;</button>
            </div>

            {message.text && (
              <div className={`message message-${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="participantName">Full Name</label>
                <input
                  type="text"
                  id="participantName"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="participantEmail">Email</label>
                <input
                  type="email"
                  id="participantEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="participantPhone">Phone Number</label>
                <input
                  type="tel"
                  id="participantPhone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="participantYear">Academic Year</label>
                <select
                  id="participantYear"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="selectedEvent">Select Event</label>
                <select
                  id="selectedEvent"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose an event</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id}>
                      {event.title} - {new Date(event.date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-submit">
                Register for Event
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;

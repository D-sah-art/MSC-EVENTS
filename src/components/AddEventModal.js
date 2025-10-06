import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    category: 'Workshop'
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        capacity: '',
        category: 'Workshop'
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
    if (!formData.title || !formData.description || !formData.date || !formData.location || !formData.capacity) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    // Date validation
    const eventDate = new Date(formData.date);
    const now = new Date();
    if (eventDate <= now) {
      setMessage({ type: 'error', text: 'Event date must be in the future' });
      return;
    }

    // Capacity validation
    if (parseInt(formData.capacity) < 1) {
      setMessage({ type: 'error', text: 'Capacity must be at least 1' });
      return;
    }

    const eventData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      registered: 0,
      image: getEventImage(formData.category)
    };

    const result = await onAddEvent(eventData);
    setMessage(result);
  };

  const getEventImage = (category) => {
    const images = {
      'Workshop': '🔧',
      'Bootcamp': '🚀',
      'Competition': '🏆',
      'Masterclass': '🎓',
      'Seminar': '📚',
      'Conference': '🎤',
      'Hackathon': '💻',
      'Networking': '🤝'
    };
    return images[category] || '📅';
  };

  const categories = [
    'Workshop', 'Bootcamp', 'Competition', 'Masterclass', 
    'Seminar', 'Conference', 'Hackathon', 'Networking'
  ];

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
              <h2 className="modal-title">Add New Event</h2>
              <button className="close" onClick={onClose}>&times;</button>
            </div>

            {message.text && (
              <div className={`message message-${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="eventTitle">Event Title</label>
                <input
                  type="text"
                  id="eventTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter event title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventDescription">Description</label>
                <textarea
                  id="eventDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  placeholder="Describe the event"
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventDate">Event Date & Time</label>
                <input
                  type="datetime-local"
                  id="eventDate"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventLocation">Location</label>
                <input
                  type="text"
                  id="eventLocation"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter event location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventCapacity">Maximum Participants</label>
                <input
                  type="number"
                  id="eventCapacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  required
                  placeholder="Enter maximum participants"
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventCategory">Category</label>
                <select
                  id="eventCategory"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {getEventImage(category)} {category}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-submit">
                Add Event
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddEventModal;

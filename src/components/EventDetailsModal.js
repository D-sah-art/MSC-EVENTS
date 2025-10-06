import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EventDetailsModal = ({ isOpen, onClose, event, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isOpen && event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? new Date(event.date).toISOString().slice(0,16) : '',
        location: event.location || '',
        capacity: event.capacity || 0,
        category: event.category || 'Workshop'
      });
      setMessage({ type: '', text: '' });
    }
  }, [isOpen, event]);

  if (!event) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'capacity' ? parseInt(value || '0', 10) : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await onUpdate(event.id, formData);
    setMessage(result);
  };

  const handleDelete = async () => {
    const result = await onDelete(event.id);
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
              <h2 className="modal-title">Event Details</h2>
              <button className="close" onClick={onClose}>&times;</button>
            </div>

            {message.text && (
              <div className={`message message-${message.success ? 'success' : 'error'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" value={formData?.title || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" rows="4" value={formData?.description || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Date & Time</label>
                <input type="datetime-local" name="date" value={formData?.date || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input name="location" value={formData?.location || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input type="number" name="capacity" min="1" value={formData?.capacity || 1} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input name="category" value={formData?.category || ''} onChange={handleChange} />
              </div>
              <button type="submit" className="btn-submit">Save Changes</button>
            </form>

            <div style={{ marginTop: '1rem' }}>
              <button className="btn-details" onClick={handleDelete}>Delete Event</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventDetailsModal;


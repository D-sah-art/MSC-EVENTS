import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaFilter } from 'react-icons/fa';

const ParticipantsModal = ({ isOpen, onClose, participants, events }) => {
  const [filteredParticipants, setFilteredParticipants] = useState(participants);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    if (selectedEvent === '') {
      setFilteredParticipants(participants);
    } else {
      setFilteredParticipants(participants.filter(p => p.eventId === selectedEvent));
    }
  }, [selectedEvent, participants]);

  const getEventTitle = (eventId) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : 'Unknown Event';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportParticipants = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Year', 'Event', 'Registration Date'],
      ...filteredParticipants.map(p => [
        p.name,
        p.email,
        p.phone,
        p.year,
        getEventTitle(p.eventId),
        formatDate(p.registrationDate)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `participants_${selectedEvent || 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
            className="modal-content participants-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Event Participants</h2>
              <button className="close" onClick={onClose}>&times;</button>
            </div>

            <div className="participants-controls">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                <FaFilter />
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">All Events</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn-export" onClick={exportParticipants}>
                <FaDownload />
                Export Data
              </button>
            </div>

            <div className="participants-table-container">
              <table className="participants-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Year</th>
                    <th>Event</th>
                    <th>Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                        No participants found
                      </td>
                    </tr>
                  ) : (
                    filteredParticipants.map((participant, index) => (
                      <motion.tr
                        key={participant.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td>{participant.name}</td>
                        <td>{participant.email}</td>
                        <td>{participant.phone}</td>
                        <td>{participant.year}</td>
                        <td>{getEventTitle(participant.eventId)}</td>
                        <td>{formatDate(participant.registrationDate)}</td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center', color: '#94a3b8' }}>
              Showing {filteredParticipants.length} participant{filteredParticipants.length !== 1 ? 's' : ''}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ParticipantsModal;

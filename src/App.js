import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EventsSection from './components/EventsSection';
import RegistrationModal from './components/RegistrationModal';
import ParticipantsModal from './components/ParticipantsModal';
import AddEventModal from './components/AddEventModal';
import AdminPanel from './components/AdminPanel';
import { motion } from 'framer-motion';
import EventDetailsModal from './components/EventDetailsModal';

function App() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Load data from API
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsResponse, participantsResponse] = await Promise.all([
        fetch('/data/events.json'),
        fetch('/api/participants')
      ]);

      const eventsData = await eventsResponse.json();
      const participantsData = await participantsResponse.json();

      setEvents(eventsData);
      setParticipants(participantsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleRegistration = async (participantData) => {
    try {
      const response = await fetch('/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(participantData),
      });

      if (response.ok) {
        const newParticipant = await response.json();
        setParticipants(prev => [...prev, newParticipant]);
        
        // Update event registration count
        setEvents(prev => prev.map(event => 
          event.id === participantData.eventId 
            ? { ...event, registered: event.registered + 1 }
            : event
        ));
        
        setIsRegistrationModalOpen(false);
        return { success: true, message: 'Registration successful!' };
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setEvents(prev => [...prev, newEvent]);
        setIsAddEventModalOpen(false);
        return { success: true, message: 'Event added successfully!' };
      } else {
        throw new Error('Failed to add event');
      }
    } catch (error) {
      console.error('Add event error:', error);
      return { success: false, message: 'Failed to add event. Please try again.' };
    }
  };

  const scrollToEvents = () => {
    document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="App"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero 
        onScrollToEvents={scrollToEvents}
        onOpenRegistration={() => setIsRegistrationModalOpen(true)}
      />
      <About />
      <EventsSection 
        events={events}
        onViewDetails={(event) => {
          setSelectedEvent(event);
          setIsDetailsModalOpen(true);
        }}
        onEdit={(event) => {
          setSelectedEvent(event);
          setIsDetailsModalOpen(true);
        }}
        onRegister={(eventId) => {
          setIsRegistrationModalOpen(true);
          // Pre-select the event in the modal
          setTimeout(() => {
            const eventSelect = document.getElementById('selectedEvent');
            if (eventSelect) {
              eventSelect.value = eventId;
            }
          }, 100);
        }}
      />
      
      <AdminPanel 
        onViewParticipants={() => setIsParticipantsModalOpen(true)}
        onAddEvent={() => setIsAddEventModalOpen(true)}
      />

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegister={handleRegistration}
        events={events}
      />

      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        onClose={() => setIsParticipantsModalOpen(false)}
        participants={participants}
        events={events}
        onDeleteParticipant={async (id) => {
          try {
            const res = await fetch(`/api/participants/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed');
            // remove participant and update local event registered count
            let removedParticipant = null;
            setParticipants(prev => {
              const p = prev.find(pp => pp.id === id);
              removedParticipant = p || null;
              return prev.filter(pp => pp.id !== id);
            });
            if (removedParticipant) {
              setEvents(prev => prev.map(e => e.id === removedParticipant.eventId ? { ...e, registered: Math.max(0, (e.registered || 0) - 1) } : e));
            }
          } catch (e) {
            console.error(e);
          }
        }}
      />

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={selectedEvent}
        onUpdate={async (id, updates) => {
          try {
            const res = await fetch(`/api/events/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed');
            const updated = await res.json();
            setEvents(prev => prev.map(e => e.id === id ? updated : e));
            return { success: true, message: 'Event updated successfully!' };
          } catch (e) {
            return { success: false, message: 'Failed to update event' };
          }
        }}
        onDelete={async (id) => {
          try {
            const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed');
            setEvents(prev => prev.filter(e => e.id !== id));
            // Remove participants of this event locally
            setParticipants(prev => prev.filter(p => p.eventId !== id));
            setIsDetailsModalOpen(false);
            return { success: true, message: 'Event deleted' };
          } catch (e) {
            return { success: false, message: 'Failed to delete event' };
          }
        }}
      />

      {/* Made with Heart */}
      <motion.div 
        className="made-with-heart"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Made with ❤️ by Web Development team
      </motion.div>
    </motion.div>
  );
}

export default App;

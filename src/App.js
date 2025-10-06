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

  // Load data from frontend JSON/localStorage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedEvents = localStorage.getItem('events');
      const storedParticipants = localStorage.getItem('participants');

      const eventsData = storedEvents ? JSON.parse(storedEvents) : await (await fetch('/data/events.json')).json();
      const participantsData = storedParticipants ? JSON.parse(storedParticipants) : await (await fetch('/data/participants.json')).json();

      setEvents(eventsData || []);
      setParticipants(participantsData || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleRegistration = async (participantData) => {
    try {
      const newParticipant = {
        id: Date.now().toString(),
        ...participantData,
        registrationDate: new Date().toISOString()
      };
      setParticipants(prev => {
        const updated = [...prev, newParticipant];
        localStorage.setItem('participants', JSON.stringify(updated));
        return updated;
      });
      setEvents(prev => prev.map(event => 
        event.id === participantData.eventId 
          ? { ...event, registered: (event.registered || 0) + 1 }
          : event
      ));
      setIsRegistrationModalOpen(false);
      return { success: true, message: 'Registration successful!' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const handleAddEvent = async (eventData) => {
    try {
      const newEvent = { id: Date.now().toString(), ...eventData };
      setEvents(prev => {
        const updated = [...prev, newEvent];
        localStorage.setItem('events', JSON.stringify(updated));
        return updated;
      });
      setIsAddEventModalOpen(false);
      return { success: true, message: 'Event added successfully!' };
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
            // remove participant and update local event registered count
            let removedParticipant = null;
            setParticipants(prev => {
              const p = prev.find(pp => pp.id === id);
              removedParticipant = p || null;
              const updated = prev.filter(pp => pp.id !== id);
              localStorage.setItem('participants', JSON.stringify(updated));
              return updated;
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
            const updated = { ...selectedEvent, ...updates };
            setEvents(prev => {
              const next = prev.map(e => e.id === id ? updated : e);
              localStorage.setItem('events', JSON.stringify(next));
              return next;
            });
            return { success: true, message: 'Event updated successfully!' };
          } catch (e) {
            return { success: false, message: 'Failed to update event' };
          }
        }}
        onDelete={async (id) => {
          try {
            setEvents(prev => {
              const next = prev.filter(e => e.id !== id);
              localStorage.setItem('events', JSON.stringify(next));
              return next;
            });
            setParticipants(prev => {
              const next = prev.filter(p => p.eventId !== id);
              localStorage.setItem('participants', JSON.stringify(next));
              return next;
            });
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

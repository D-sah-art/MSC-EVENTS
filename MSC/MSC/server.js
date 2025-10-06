const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data file paths
const EVENTS_FILE = path.join(__dirname, 'public', 'data', 'events.json');
const PARTICIPANTS_FILE = path.join(__dirname, 'public', 'data', 'participants.json');

// Helper function to read JSON file
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Helper function to write JSON file
async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Routes

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await readJsonFile(EVENTS_FILE);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Add new event
app.post('/api/events', async (req, res) => {
  try {
    const events = await readJsonFile(EVENTS_FILE);
    const newEvent = {
      id: Date.now().toString(),
      ...req.body,
      registered: 0
    };
    
    events.push(newEvent);
    const success = await writeJsonFile(EVENTS_FILE, events);
    
    if (success) {
      res.json(newEvent);
    } else {
      res.status(500).json({ error: 'Failed to save event' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// Get all participants
app.get('/api/participants', async (req, res) => {
  try {
    const participants = await readJsonFile(PARTICIPANTS_FILE);
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
});

// Add new participant
app.post('/api/participants', async (req, res) => {
  try {
    const participants = await readJsonFile(PARTICIPANTS_FILE);
    const events = await readJsonFile(EVENTS_FILE);
    
    // Check if event exists and has capacity
    const event = events.find(e => e.id === req.body.eventId);
    if (!event) {
      return res.status(400).json({ error: 'Event not found' });
    }
    
    if (event.registered >= event.capacity) {
      return res.status(400).json({ error: 'Event is fully booked' });
    }
    
    // Check if participant already registered for this event
    const existingParticipant = participants.find(
      p => p.email === req.body.email && p.eventId === req.body.eventId
    );
    
    if (existingParticipant) {
      return res.status(400).json({ error: 'You are already registered for this event' });
    }
    
    const newParticipant = {
      id: Date.now().toString(),
      ...req.body,
      registrationDate: new Date().toISOString()
    };
    
    participants.push(newParticipant);
    
    // Update event registration count
    const updatedEvents = events.map(e => 
      e.id === req.body.eventId 
        ? { ...e, registered: e.registered + 1 }
        : e
    );
    
    const [participantsSuccess, eventsSuccess] = await Promise.all([
      writeJsonFile(PARTICIPANTS_FILE, participants),
      writeJsonFile(EVENTS_FILE, updatedEvents)
    ]);
    
    if (participantsSuccess && eventsSuccess) {
      res.json(newParticipant);
    } else {
      res.status(500).json({ error: 'Failed to save registration' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to register participant' });
  }
});

// Get participants by event
app.get('/api/participants/event/:eventId', async (req, res) => {
  try {
    const participants = await readJsonFile(PARTICIPANTS_FILE);
    const eventParticipants = participants.filter(p => p.eventId === req.params.eventId);
    res.json(eventParticipants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event participants' });
  }
});

// Delete participant
app.delete('/api/participants/:id', async (req, res) => {
  try {
    const participants = await readJsonFile(PARTICIPANTS_FILE);
    const events = await readJsonFile(EVENTS_FILE);
    
    const participantIndex = participants.findIndex(p => p.id === req.params.id);
    if (participantIndex === -1) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    
    const participant = participants[participantIndex];
    participants.splice(participantIndex, 1);
    
    // Update event registration count
    const updatedEvents = events.map(e => 
      e.id === participant.eventId 
        ? { ...e, registered: Math.max(0, e.registered - 1) }
        : e
    );
    
    const [participantsSuccess, eventsSuccess] = await Promise.all([
      writeJsonFile(PARTICIPANTS_FILE, participants),
      writeJsonFile(EVENTS_FILE, updatedEvents)
    ]);
    
    if (participantsSuccess && eventsSuccess) {
      res.json({ message: 'Participant removed successfully' });
    } else {
      res.status(500).json({ error: 'Failed to remove participant' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove participant' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

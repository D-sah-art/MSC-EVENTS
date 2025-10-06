# Microsoft Student Community Events Page

A beautiful, responsive events management system for Microsoft Student Community at SRM University AP, built with React and featuring a dark theme with blue accents.

## Features

- 🎨 **Beautiful Dark Theme** - Modern dark UI with blue gradient backgrounds
- ⚡ **Smooth Animations** - Framer Motion powered animations throughout
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎯 **Event Management** - Add, view, and manage events
- 👥 **Participant Registration** - Easy registration with form validation
- 📊 **Admin Dashboard** - View participants and export data
- 💾 **JSON Storage** - Data persisted in JSON files
- 🔒 **Form Validation** - Client and server-side validation

## Tech Stack

- **Frontend**: React 18, Framer Motion, React Icons
- **Backend**: Node.js, Express.js
- **Storage**: JSON files
- **Styling**: CSS3 with modern features

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd msc-events-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Start the backend server** (in a new terminal)
   ```bash
   npm run server
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
msc-events-page/
├── public/
│   ├── data/
│   │   ├── events.json          # Events data
│   │   └── participants.json    # Participants data
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Navigation component
│   │   ├── Hero.js             # Hero section
│   │   ├── EventsSection.js    # Events display
│   │   ├── RegistrationModal.js # Registration form
│   │   ├── ParticipantsModal.js # Participants management
│   │   ├── AddEventModal.js    # Add event form
│   │   └── AdminPanel.js       # Admin controls
│   ├── App.js                  # Main app component
│   ├── App.css                 # Main styles
│   └── index.js                # React entry point
├── server.js                   # Backend server
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/events` - Get all events
- `POST /api/events` - Add new event
- `GET /api/participants` - Get all participants
- `POST /api/participants` - Register participant
- `GET /api/participants/event/:eventId` - Get participants by event
- `DELETE /api/participants/:id` - Remove participant

## Features in Detail

### Event Management
- View all upcoming events in a beautiful grid layout
- Real-time capacity tracking with visual indicators
- Event categories and detailed information
- Smooth hover animations and transitions

### Participant Registration
- Comprehensive registration form with validation
- Email and phone number validation
- Academic year selection
- Event selection dropdown
- Success/error messaging

### Admin Features
- View all registered participants
- Filter participants by event
- Export participant data to CSV
- Add new events with full details
- Real-time participant count updates

### Animations
- Page load animations
- Hover effects on cards and buttons
- Modal entrance/exit animations
- Floating background elements
- Smooth scrolling and transitions

## Customization

### Adding New Event Categories
Edit the `categories` array in `AddEventModal.js` and add corresponding emojis in the `getEventImage` function.

### Styling
All styles are in `src/App.css`. The color scheme uses CSS custom properties for easy theming.

### Data Structure
Events and participants are stored in JSON files in `public/data/`. The structure is self-explanatory and easy to modify.

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Backend
The server can be deployed to any Node.js hosting service like Heroku, Vercel, or DigitalOcean.

### Environment Variables
- `PORT` - Server port (default: 3001)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please contact the Microsoft Student Community team at SRM University AP.

---

**Microsoft Student Community SRM University - AP**  
*Empowering students through technology and innovation*

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Filter, CheckCircle, Sparkles, X, ChevronRight } from 'lucide-react';
import eventsData from '../data/events.json';

export default function Events() {
  const [filter, setFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regError, setRegError] = useState('');

  // Categories list
  const categories = ['All', 'Adoption Camp', 'Educational Workshop', 'Fundraiser', 'Community Outreach'];

  // Filtered Events
  const filteredEvents = useMemo(() => {
    if (filter === 'All') return eventsData;
    return eventsData.filter((evt) => evt.category === filter);
  }, [filter]);

  // Form handle
  const handleRegSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail) {
      setRegError('Please fill in all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setRegError('Please enter a valid email.');
      return;
    }

    setRegError('');
    setRegSubmitted(true);
    setRegName('');
    setRegEmail('');
    setTimeout(() => {
      setRegSubmitted(false);
      setSelectedEvent(null);
    }, 3000);
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Shelter Outreach</span>
          <h1 className="text-4xl font-extrabold text-charcoal">Upcoming Campaigns & Drives</h1>
          <p className="text-charcoal/60">
            Join our adoption camps, veterinary clinics, awareness workshops, and fundraising gala dinners.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-heading font-extrabold transition-all border ${
                filter === cat
                  ? 'bg-forest border-forest text-white shadow-md shadow-forest/10 scale-105'
                  : 'bg-white border-forest/10 text-charcoal hover:bg-forest/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border border-forest/10 rounded-4xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-56 relative bg-cream">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-4 right-4 text-xs font-heading font-extrabold px-4 py-1.5 rounded-full shadow-md ${
                    evt.status === 'Upcoming' 
                      ? 'bg-orange text-charcoal shadow-orange/10' 
                      : 'bg-charcoal/50 text-white backdrop-blur-sm'
                  }`}>
                    {evt.status}
                  </span>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-forest bg-forest/5 px-2.5 py-1 rounded-md border border-forest/10">
                      {evt.category}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-charcoal pt-1.5">{evt.title}</h3>
                  </div>

                  <p className="text-charcoal/65 text-sm leading-relaxed line-clamp-3">{evt.description}</p>

                  <div className="space-y-3 pt-4 border-t border-forest/5 text-xs font-bold text-charcoal/60">
                    <div className="flex items-center space-x-2.5">
                      <Calendar className="h-4.5 w-4.5 text-forest shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Clock className="h-4.5 w-4.5 text-forest shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <MapPin className="h-4.5 w-4.5 text-forest shrink-0" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-forest/5">
                <button
                  disabled={evt.status !== 'Upcoming'}
                  onClick={() => setSelectedEvent(evt)}
                  className={`w-full font-heading font-bold py-3 rounded-full transition-all text-sm flex items-center justify-center space-x-1 focus:outline-none focus:ring-2 ${
                    evt.status === 'Upcoming'
                      ? 'bg-forest text-white hover:bg-forest/90 focus:ring-forest shadow-md shadow-forest/10'
                      : 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
                  }`}
                >
                  <span>{evt.status === 'Upcoming' ? 'Register Seat' : 'Campaign Closed'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal Popup */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-charcoal"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-4xl shadow-2xl p-8 border border-forest/10 z-10 space-y-6"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-charcoal/40 hover:text-forest focus:outline-none"
                aria-label="Close form"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="space-y-2">
                <span className="text-orange font-heading font-bold text-xs uppercase tracking-widest block">Event Registration</span>
                <h3 className="font-heading font-extrabold text-2xl text-charcoal leading-snug">{selectedEvent.title}</h3>
              </div>

              {regSubmitted ? (
                <div className="bg-forest/5 text-forest border border-forest/10 p-5 rounded-3xl text-sm font-bold flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-forest mt-0.5" />
                  <div>
                    <p className="font-heading font-bold">Registration Successful!</p>
                    <p className="text-xs text-charcoal/65 font-medium leading-relaxed mt-1">We have emailed your entrance pass and parking instructions.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="reg-name">
                      Full Name
                    </label>
                    <input
                      id="reg-name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="reg-email">
                      Email Address
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="john@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                    />
                  </div>

                  {regError && <p className="text-orange text-xs font-semibold">{regError}</p>}

                  <button
                    type="submit"
                    className="w-full bg-forest text-white font-heading font-extrabold py-3.5 rounded-full hover:bg-forest/90 transition-all text-sm flex items-center justify-center space-x-2 shadow-lg shadow-forest/15"
                  >
                    <CheckCircle className="h-4.5 w-4.5" />
                    <span>Confirm Attendance</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

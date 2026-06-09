import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckCircle, HelpCircle, Calendar, ShieldCheck, Mail, Phone, Users } from 'lucide-react';

export default function Volunteer() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Foster Parent',
    availability: [],
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    {
      title: 'Foster Parent',
      desc: 'Provide a temporary home for dogs undergoing rehabilitation or awaiting adoption. We provide all food, cages, and vet bills; you supply a warm, caring space.',
      icon: Heart,
      color: 'bg-orange/15 text-orange'
    },
    {
      title: 'Shelter Assistant',
      desc: 'Assist in daily shelter operations, including walking dogs, cleaning kennels, feeding, and socializing puppies to prepare them for adoption.',
      icon: Users,
      color: 'bg-forest/15 text-forest'
    },
    {
      title: 'Event Helper',
      desc: 'Support adoption camps, vaccine drives, and fundraiser gala nights. Assist in transporting dogs, greeting attendees, and processing sign-ups.',
      icon: Calendar,
      color: 'bg-sky/15 text-sky'
    }
  ];

  // Handle Availability checklist toggles
  const handleAvailabilityToggle = (day) => {
    const nextAvail = [...form.availability];
    const idx = nextAvail.indexOf(day);
    if (idx > -1) {
      nextAvail.splice(idx, 1);
    } else {
      nextAvail.push(day);
    }
    setForm({ ...form, availability: nextAvail });
  };

  // Submit Application
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (form.availability.length === 0) {
      setError('Please select at least one day of availability.');
      return;
    }

    setError('');
    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      phone: '',
      role: 'Foster Parent',
      availability: [],
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Roles & FAQ details */}
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Join PawHope</span>
            <h1 className="text-4xl font-extrabold text-charcoal">Become a Volunteer</h1>
            <p className="text-charcoal/65 leading-relaxed text-sm md:text-base">
              Volunteers are the backbone of PawHope. Whether fostering shelter dogs or assisting at adoption drives, your dedication directly helps animals in need get a second chance at life.
            </p>
          </div>

          {/* Volunteer Roles List */}
          <div className="space-y-6">
            <h2 className="font-heading font-extrabold text-2xl text-charcoal">Ways to Help</h2>
            <div className="space-y-6">
              {roles.map((role, idx) => (
                <div key={idx} className="bg-white border border-forest/10 p-6 rounded-4xl flex items-start gap-4 shadow-sm">
                  <div className={`p-3 rounded-2xl shrink-0 ${role.color}`}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-lg text-charcoal">{role.title}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form application */}
        <div className="bg-white border border-forest/10 p-8 rounded-4xl shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="font-heading font-extrabold text-2xl text-charcoal border-b border-forest/5 pb-6">
              Volunteer Application
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="vol-name">
                  Full Name *
                </label>
                <input
                  id="vol-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="vol-email">
                    Email Address *
                  </label>
                  <input
                    id="vol-email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="vol-phone">
                    Phone Number *
                  </label>
                  <input
                    id="vol-phone"
                    type="tel"
                    placeholder="123-456-7890"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                  />
                </div>
              </div>

              {/* Preferred Role Select */}
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="vol-role">
                  Preferred Role *
                </label>
                <select
                  id="vol-role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm font-semibold"
                >
                  <option value="Foster Parent">Foster Parent (Temporary Home)</option>
                  <option value="Shelter Assistant">Shelter Assistant (Sanctuary)</option>
                  <option value="Event Helper">Event Helper (Awareness Camps)</option>
                </select>
              </div>

              {/* Availability Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2">
                  Availability * <span className="text-charcoal/40 font-medium normal-case">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Weekdays', 'Weekends', 'Evenings'].map((day) => {
                    const isChecked = form.availability.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleAvailabilityToggle(day)}
                        className={`py-3 rounded-xl border text-xs font-semibold transition-all ${
                          isChecked
                            ? 'bg-forest text-white border-forest shadow-md shadow-forest/5'
                            : 'bg-cream/40 border-forest/10 text-charcoal hover:bg-forest/5'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Why join cover message */}
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="vol-msg">
                  Why do you want to volunteer? *
                </label>
                <textarea
                  id="vol-msg"
                  rows="4"
                  placeholder="Share a bit about your experience or passion for animals..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                ></textarea>
              </div>

              {error && <p className="text-orange text-xs font-semibold">{error}</p>}
              
              {submitted && (
                <div className="bg-forest/5 text-forest border border-forest/10 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Application received! Our coordinators will contact you via email shortly.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-forest text-white font-heading font-extrabold py-3.5 rounded-full hover:bg-forest/90 transition-all text-sm flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-forest shadow-lg shadow-forest/15"
              >
                <ShieldCheck className="h-5 w-5" />
                <span>Submit Application</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

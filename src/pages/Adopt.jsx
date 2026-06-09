import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, Heart, ShieldAlert, Award, X, Sparkles } from 'lucide-react';
import petsData from '../data/pets.json';

export default function Adopt() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPet, setSelectedPet] = useState(null);

  // Read filters from URL params
  const searchQuery = searchParams.get('search') || '';
  const speciesFilter = searchParams.get('species') || 'All';
  const ageFilter = searchParams.get('age') || 'All';
  const genderFilter = searchParams.get('gender') || 'All';

  // State for inquiry form in Modal
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  // Update query params helper
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Filtered and searched pet list
  const filteredPets = useMemo(() => {
    return petsData.filter((pet) => {
      const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecies = speciesFilter === 'All' || pet.species === speciesFilter;
      
      // Match age mapping
      let matchesAge = true;
      if (ageFilter !== 'All') {
        matchesAge = pet.ageGroup === ageFilter;
      }
      
      const matchesGender = genderFilter === 'All' || pet.gender === genderFilter;

      return matchesSearch && matchesSpecies && matchesAge && matchesGender;
    });
  }, [searchQuery, speciesFilter, ageFilter, genderFilter]);

  // Handle foster inquiry submit
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) {
      setInquiryError('Please fill out all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inquiryEmail)) {
      setInquiryError('Please enter a valid email.');
      return;
    }
    setInquiryError('');
    setInquirySubmitted(true);
    setInquiryName('');
    setInquiryEmail('');
    setTimeout(() => {
      setInquirySubmitted(false);
      setSelectedPet(null);
    }, 3000);
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Available Companions</span>
          <h1 className="text-4xl font-extrabold text-charcoal">Find Your Perfect Match</h1>
          <p className="text-charcoal/60">
            Every animal in our shelter undergoes comprehensive health checks and behavioral assessments before matching.
          </p>
        </div>

        {/* Search & Filter Panel */}
        <div className="bg-white border border-forest/10 p-6 rounded-4xl shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal/40" />
              <input
                type="text"
                placeholder="Search pets by name or breed (e.g. Oliver, Retriever)..."
                value={searchQuery}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 rounded-full bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
              />
            </div>
            
            {/* Clear Filters Indicator */}
            {(searchQuery || speciesFilter !== 'All' || ageFilter !== 'All' || genderFilter !== 'All') && (
              <button
                onClick={() => setSearchParams({})}
                className="text-xs text-orange font-bold hover:underline self-center shrink-0 px-4 py-2 border border-orange/20 rounded-full hover:bg-orange/5"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Species Select */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest pl-1">Species</label>
              <select
                value={speciesFilter}
                onChange={(e) => updateFilter('species', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm font-medium"
              >
                <option value="All">All Species</option>
                <option value="Dog">Dogs</option>
                <option value="Cat">Cats</option>
              </select>
            </div>

            {/* Age Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest pl-1">Age Group</label>
              <select
                value={ageFilter}
                onChange={(e) => updateFilter('age', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm font-medium"
              >
                <option value="All">All Ages</option>
                <option value="Puppy">Puppy / Kitten</option>
                <option value="Young">Young (1-2 years)</option>
                <option value="Adult">Adult (3-6 years)</option>
                <option value="Senior">Senior (7+ years)</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest pl-1">Gender</label>
              <select
                value={genderFilter}
                onChange={(e) => updateFilter('gender', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm font-medium"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pet Results Grid */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <motion.div
                key={pet.id}
                layoutId={`pet-card-${pet.id}`}
                whileHover={{ y: -6 }}
                className="bg-white border border-forest/10 rounded-4xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 relative bg-cream overflow-hidden">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className={`absolute top-4 right-4 text-xs font-heading font-extrabold px-4 py-1.5 rounded-full shadow-md ${
                      pet.status === 'Available' 
                        ? 'bg-forest text-white shadow-forest/10' 
                        : 'bg-charcoal/50 text-white backdrop-blur-sm'
                    }`}>
                      {pet.status}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-heading font-extrabold text-2xl text-charcoal">{pet.name}</h3>
                      <span className="text-xs font-semibold text-forest bg-forest/5 px-2.5 py-1 rounded-md border border-forest/10">{pet.breed}</span>
                    </div>
                    <p className="text-charcoal/65 text-sm line-clamp-2 leading-relaxed">{pet.description}</p>
                    <div className="flex gap-4 text-xs text-charcoal/50 font-bold pt-2">
                      <span className="bg-cream px-3 py-1.5 rounded-xl border border-forest/5">Age: {pet.age}</span>
                      <span className="bg-cream px-3 py-1.5 rounded-xl border border-forest/5">Gender: {pet.gender}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-forest/5">
                  <button
                    onClick={() => setSelectedPet(pet)}
                    className="w-full bg-forest text-white font-heading font-bold py-3 rounded-full hover:bg-forest/90 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-forest/10 rounded-4xl shadow-sm space-y-4">
            <Sparkles className="h-12 w-12 text-forest/40 mx-auto" />
            <h3 className="font-heading font-extrabold text-2xl text-charcoal">No matches found</h3>
            <p className="text-charcoal/50 max-w-sm mx-auto text-sm">
              We couldn't find any adoptable pets matching those search queries. Try clearing some filters.
            </p>
          </div>
        )}
      </div>

      {/* 3. PET DETAILS MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPet(null)}
              className="absolute inset-0 bg-charcoal"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-4xl shadow-2xl overflow-hidden border border-forest/10 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPet(null)}
                className="absolute top-4 right-4 bg-charcoal/60 hover:bg-forest hover:scale-105 transition-all text-white p-2 rounded-full z-20 focus:outline-none focus:ring-2 focus:ring-forest"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-cream shrink-0">
                <img
                  src={selectedPet.image}
                  alt={selectedPet.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-forest text-white font-heading font-bold text-xs px-4 py-1.5 rounded-full tracking-widest shadow-md">
                  {selectedPet.status}
                </span>
              </div>

              {/* Right Side: Information Content */}
              <div className="w-full md:w-1/2 p-8 overflow-y-auto space-y-6">
                <div>
                  <h2 className="font-heading font-extrabold text-3xl text-charcoal">{selectedPet.name}</h2>
                  <p className="text-forest font-semibold text-sm">{selectedPet.breed}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-charcoal/60">
                  <div className="bg-cream border border-forest/5 p-3 rounded-2xl">
                    <p className="text-charcoal/40 uppercase font-semibold mb-1">Age</p>
                    <p className="text-sm font-extrabold text-charcoal">{selectedPet.age}</p>
                  </div>
                  <div className="bg-cream border border-forest/5 p-3 rounded-2xl">
                    <p className="text-charcoal/40 uppercase font-semibold mb-1">Gender</p>
                    <p className="text-sm font-extrabold text-charcoal">{selectedPet.gender}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-charcoal text-base">Health & Vaccination</h4>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{selectedPet.healthInfo}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-charcoal text-base">Bio & Story</h4>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{selectedPet.story}</p>
                </div>

                {/* Inquiry Form */}
                <div className="border-t border-forest/10 pt-6 space-y-4">
                  <h4 className="font-heading font-bold text-charcoal text-base">Adopt or Foster {selectedPet.name}</h4>
                  
                  {inquirySubmitted ? (
                    <div className="bg-forest/5 text-forest border border-forest/10 p-4 rounded-2xl text-xs font-bold">
                      Thank you! Our coordinators will contact you soon to finalize meeting details.
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-xs"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-xs"
                        />
                      </div>
                      {inquiryError && <p className="text-orange text-xs font-semibold">{inquiryError}</p>}
                      <button
                        type="submit"
                        disabled={selectedPet.status !== 'Available'}
                        className={`w-full font-heading font-bold py-3 rounded-full transition-all text-xs flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 ${
                          selectedPet.status === 'Available'
                            ? 'bg-orange text-charcoal hover:bg-orange/90 focus:ring-orange shadow-md shadow-orange/10'
                            : 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
                        }`}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                        <span>Submit Inquiry Request</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

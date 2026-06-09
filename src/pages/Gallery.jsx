import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Filter, Eye } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Shelter Life', 'Volunteer Activity', 'Success Adoptions'];

  const galleryItems = [
    {
      image: '/images/6_3_382_Hope_Face_Dog_Royalty_Free.png',
      title: 'A Gaze of Hope',
      desc: 'One of our shelter residents awaiting matching, exhibiting patience and calm.',
      category: 'Shelter Life'
    },
    {
      image: '/images/1_A_Sad_Puppy_Looks_at_the_Camera_with.png',
      title: 'First Day at Shelter',
      desc: 'A newly arrived stray pup receives shelter vetting, food, and warmth.',
      category: 'Shelter Life'
    },
    {
      image: '/images/3_8_Dogs_Who_Came_a_Long_Way_to_Find.png',
      title: 'Reunion at the Park',
      desc: 'Adopted companions reunite at our annual picnic day event.',
      category: 'Success Adoptions'
    },
    {
      image: '/images/5_29_229_Rescue_Dog_Happy_Royalty_Free.png',
      title: 'New Lease on Life',
      desc: 'Luna runs on the beach with her new adopter family.',
      category: 'Success Adoptions'
    },
    {
      image: '/images/7_Senior_Shelter_Dog_With_Everything.png',
      title: 'Our Elder Statesman',
      desc: 'Rocky, a senior Shepherd, enjoying his soft shelter orthopedic bed.',
      category: 'Shelter Life'
    },
    {
      image: '/images/7_32_700_Dog_Rescue_Stock_Photos_Pictures.png',
      title: 'Highway Rescue Mission',
      desc: 'Our rescue team safely retrieves a trapped dog from an embankment.',
      category: 'Volunteer Activity'
    },
    {
      image: '/images/5_6_200_Sunset_Dusk_Dog_Walking_Stock.png',
      title: 'Evening Walking Duties',
      desc: 'Volunteers walk shelter residents in the meadow during sunset.',
      category: 'Volunteer Activity'
    },
    {
      image: '/images/2_5_786_Dog_Sunset_Silhouette_Stock.png',
      title: 'Joyful Sunset Leaps',
      desc: 'Coco enjoys free play time in his new family yard.',
      category: 'Success Adoptions'
    }
  ];

  // Filtered Items
  const filteredItems = useMemo(() => {
    if (filter === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === filter);
  }, [filter]);

  // Navigate lightbox
  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Visual Impact</span>
          <h1 className="text-4xl font-extrabold text-charcoal">PawHope Gallery</h1>
          <p className="text-charcoal/60">
            A window into the lives of our rescued residents, volunteer duties, and emotional adoption success stories.
          </p>
        </div>

        {/* Filters */}
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

        {/* Masonry CSS Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid bg-white border border-forest/10 rounded-4xl overflow-hidden shadow-sm group cursor-pointer relative"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlays on hover */}
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-bold text-orange uppercase tracking-widest">{item.category}</span>
                  <h3 className="font-heading font-extrabold text-lg flex items-center justify-between">
                    <span>{item.title}</span>
                    <Eye className="h-4.5 w-4.5 text-white" />
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Popups */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/95">
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full z-20 focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full z-20 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full z-20 focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image & details card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full flex flex-col items-center justify-center space-y-4"
              onClick={() => setLightboxIndex(null)}
            >
              <div 
                className="max-h-[70vh] bg-cream/10 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              <div 
                className="w-full text-center space-y-1 text-white p-4 max-w-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-xs font-bold text-orange uppercase tracking-widest">{filteredItems[lightboxIndex].category}</span>
                <h3 className="font-heading font-extrabold text-2xl">{filteredItems[lightboxIndex].title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{filteredItems[lightboxIndex].desc}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PawPrint, Heart } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/adopt', label: 'Adopt' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/events', label: 'Events' },
  { path: '/education', label: 'Education' },
  { path: '/gallery', label: 'Gallery' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle transparent to blurred transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/70 backdrop-blur-md border-b border-forest/10 py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-forest rounded-lg px-2 py-1"
          aria-label="PawHope Home"
        >
          <div className="bg-forest text-white p-1.5 rounded-lg transition-transform group-hover:scale-110">
            <PawPrint className="h-5 w-5" />
          </div>
          <span className="font-heading font-bold text-lg tracking-widest text-charcoal group-hover:text-forest transition-colors">
            PAWHOPE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-heading text-sm font-semibold tracking-wide transition-all relative py-1 focus:outline-none focus:ring-2 focus:ring-forest rounded px-2 ${
                  isActive
                    ? 'text-forest'
                    : 'text-charcoal/80 hover:text-forest'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-forest"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Donate Button CTA (Desktop) */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/donate"
            className="flex items-center space-x-2 bg-orange text-charcoal font-heading font-bold px-6 py-2.5 rounded-full hover:bg-orange/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md shadow-orange/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
          >
            <Heart className="h-4 w-4 fill-charcoal" />
            <span>Donate Now</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-charcoal/80 hover:text-forest hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-forest"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar / Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-charcoal z-40 lg:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-cream shadow-2xl border-l border-forest/10 p-6 z-50 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="bg-forest text-white p-1.5 rounded-lg">
                      <PawPrint className="h-5 w-5" />
                    </div>
                    <span className="font-heading font-bold text-lg tracking-widest text-charcoal">
                      PAWHOPE
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-charcoal/80 hover:text-forest hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-forest"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `font-heading text-lg font-bold px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-forest/10 text-forest'
                            : 'text-charcoal/80 hover:bg-forest/5 hover:text-forest'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col space-y-4">
                <Link
                  to="/donate"
                  className="flex items-center justify-center space-x-2 bg-orange text-charcoal font-heading font-bold py-3.5 rounded-xl hover:bg-orange/90 transition-all text-center shadow-lg shadow-orange/10"
                >
                  <Heart className="h-5 w-5 fill-charcoal" />
                  <span>Donate Now</span>
                </Link>
                <div className="text-center text-xs text-charcoal/40 font-medium">
                  © 2026 PawHope. Every Life Matters.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

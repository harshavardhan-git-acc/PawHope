import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';

const socialLinks = [
  {
    label: 'Facebook',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
      </svg>
    )
  },
  {
    label: 'Twitter',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    label: 'Instagram',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="bg-darkBg text-white border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Brand & Tagline */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-forest text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <PawPrint className="h-5 w-5" />
            </div>
            <span className="font-heading font-bold text-lg tracking-widest">
              PAWHOPE
            </span>
          </Link>
          <blockquote className="text-cream/80 italic border-l-2 border-orange pl-4 text-base font-medium leading-relaxed">
            "They may not have a voice, but they have a story. Be their voice."
          </blockquote>
          <p className="text-white/60 text-sm leading-relaxed">
            Dedicated to rescuing, rehabilitating, and rehoming animals in need since 2018. Together, we can make a difference.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-heading font-bold text-white tracking-wider text-base uppercase mb-6 border-b border-white/10 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { path: '/adopt', label: 'Adopt a Companion' },
              { path: '/volunteer', label: 'Become a Volunteer' },
              { path: '/events', label: 'Upcoming Events' },
              { path: '/education', label: 'Learning Center' },
              { path: '/gallery', label: 'Photo Gallery' },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-white/65 hover:text-orange text-sm transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="h-3 w-3" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="font-heading font-bold text-white tracking-wider text-base uppercase mb-6 border-b border-white/10 pb-2">
            Emergency & Contact
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-sm">
              <Phone className="h-5 w-5 text-orange shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white/90">24/7 Rescue Helpline</p>
                <a href="tel:+18005557297" className="text-white/60 hover:text-orange transition-colors">
                  1-800-555-PAWS (7297)
                </a>
              </div>
            </li>
            <li className="flex items-start space-x-3 text-sm">
              <Mail className="h-5 w-5 text-sky shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white/90">Email Support</p>
                <a href="mailto:rescue@pawhope.org" className="text-white/60 hover:text-orange transition-colors">
                  rescue@pawhope.org
                </a>
              </div>
            </li>
            <li className="flex items-start space-x-3 text-sm">
              <MapPin className="h-5 w-5 text-forest shrink-0 mt-0.5" />
              <div className="text-white/65">
                <p className="font-semibold text-white/90">PawHope Sanctuary</p>
                <span>42 Rescue Avenue, Gandhi Nagar, Vellore, Tamil Nadu – 632004</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter Callout */}
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-white tracking-wider text-base uppercase mb-2 border-b border-white/10 pb-2">
            Join Our Mission
          </h3>
          <p className="text-white/65 text-sm leading-relaxed">
            Subscribe to our newsletter for touching rescue updates, event announcements, and pet care advice.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((soc, idx) => (
              <a
                key={idx}
                href="#"
                className="bg-white/5 hover:bg-forest/20 text-white hover:text-orange p-2.5 rounded-full transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-forest"
                aria-label={soc.label}
              >
                {soc.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 font-medium">
        <p>© 2026 PawHope Foundation. All rights reserved. Registered 501(c)(3) NGO.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/legal" className="hover:text-orange transition-colors">
            Privacy Policy
          </Link>
          <Link to="/legal" className="hover:text-orange transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

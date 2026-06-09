import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Heart, PawPrint, ShieldAlert, Award, Calendar, Users, 
  HelpCircle, ChevronDown, Send, Phone, Mail, MapPin 
} from 'lucide-react';

// Counter Hook for Stats Section
function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = parseInt(value.replace(/[^0-9]/g, ''));
          if (start === end) return;

          const totalMiliseconds = duration * 1000;
          const incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
          
          const timer = setInterval(() => {
            start += Math.ceil(end / 100);
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(start);
            }
          }, Math.max(incrementTime, 16));
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <span ref={elementRef} className="font-heading font-extrabold text-5xl md:text-6xl text-forest block mb-2">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {
  // Parallax Hero Effect
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  // Draggable Before/After Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterError('Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubmitted(false), 5000);
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactError('All fields are required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setContactError('Please enter a valid email address.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  // Success Stories Slider
  const [currentStory, setCurrentStory] = useState(0);
  const successStories = [
    {
      name: 'Max & The Thorne Family',
      text: 'Adopting Max was the best decision we ever made. He was shy at first, but with patience and the guides provided by PawHope, he is now the heart of our home.',
      image: '/images/3_8_Dogs_Who_Came_a_Long_Way_to_Find.png',
      location: 'Vellore, Tamil Nadu'
    },
    {
      name: 'Bella’s Miracle Journey',
      text: 'Found shivering and underweight on the highway, Bella is now thriving. Her transformation is a testament to the incredible rehab team at PawHope.',
      image: '/images/5_29_229_Rescue_Dog_Happy_Royalty_Free.png',
      location: 'Vellore, Tamil Nadu'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION WITH PARALLAX */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center bg-darkBg text-white overflow-hidden">
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 bg-[url('/images/6_3_382_Hope_Face_Dog_Royalty_Free.png')] bg-cover bg-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/50 to-transparent" />
        
        {/* Responsive Hero Stats Overlay Card */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="relative max-w-4xl mx-auto px-6 text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="bg-forest/20 text-forest px-4 py-1.5 rounded-full text-xs font-heading font-extrabold uppercase tracking-widest border border-forest/30 inline-block">
              Every Life Matters
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-cream leading-tight">
              Giving Hope to the <br />
              <span className="text-orange">Voiceless and Vulnerable</span>
            </h1>
            <p className="text-white/80 max-w-xl mx-auto text-base sm:text-lg md:text-xl font-medium leading-relaxed">
              We rescue, rehabilitate, and rehome shelter animals, advocating for their welfare and building compassionate communities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/adopt"
                className="w-full sm:w-auto bg-forest text-white font-heading font-bold px-8 py-3.5 rounded-full hover:bg-forest/90 transition-all text-center shadow-lg shadow-forest/25 focus:outline-none focus:ring-2 focus:ring-forest"
              >
                Adopt a Companion
              </Link>
              <Link
                to="/donate"
                className="w-full sm:w-auto bg-orange text-charcoal font-heading font-bold px-8 py-3.5 rounded-full hover:bg-orange/90 transition-all text-center shadow-lg shadow-orange/25 focus:outline-none focus:ring-2 focus:ring-orange"
              >
                Support Our Mission
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. IMPACT STATS SECTION */}
      <section className="py-16 bg-cream border-y border-forest/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          <div className="p-4">
            <Counter value="12450+" />
            <h3 className="font-heading font-bold text-sm text-charcoal/60 uppercase tracking-widest">Rescues Completed</h3>
          </div>
          <div className="p-4">
            <Counter value="9820+" />
            <h3 className="font-heading font-bold text-sm text-charcoal/60 uppercase tracking-widest">Happy Adoptions</h3>
          </div>
          <div className="p-4">
            <Counter value="1200+" />
            <h3 className="font-heading font-bold text-sm text-charcoal/60 uppercase tracking-widest">Active Volunteers</h3>
          </div>
          <div className="p-4">
            <Counter value="450000+" />
            <h3 className="font-heading font-bold text-sm text-charcoal/60 uppercase tracking-widest">Funds Raised (₹)</h3>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">The Road We Have Traveled</h2>
            <p className="text-charcoal/60">From a small backyard shelter to a leading state advocate, here is our story.</p>
          </div>

          <div className="relative border-l-2 border-forest/20 pl-8 ml-4 space-y-12">
            {[
              { year: '2018', title: 'PawHope Founded', desc: 'Started in a small home with just 5 volunteers, rescuing stray dogs in local suburban districts.', icon: PawPrint },
              { year: '2020', title: 'Clinic Expansion', desc: 'Opened our dedicated rehabilitation facility to provide high-quality surgery and behavioral therapy.', icon: ShieldAlert },
              { year: '2022', title: 'National Outreach', desc: 'Recognized for animal welfare standards, launching statewide foster programs and awareness drives.', icon: Award },
              { year: '2026', title: 'Vision Forward', desc: 'Striving for a world with zero stray euthanasia, advocating for stricter laws and community spay-neuter campaigns.', icon: Heart }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-12 top-1.5 bg-forest text-white p-1.5 rounded-full border-4 border-white shadow-md">
                  <item.icon className="h-4 w-4" />
                </span>
                <div className="space-y-2">
                  <span className="font-heading font-extrabold text-orange text-lg">{item.year}</span>
                  <h3 className="font-heading font-bold text-lg text-charcoal">{item.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESCUE PROGRAMS */}
      <section className="py-24 bg-cream border-t border-forest/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Our Programs</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">What We Do</h2>
            <p className="text-charcoal/60">Every animal rescue requires a unique path. We cover them all with professional support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Emergency Rescue', desc: 'Operating a 24/7 hotline to rescue abandoned, injured, or abused dogs from hazardous conditions.', icon: ShieldAlert, color: 'bg-red-500/10 text-red-500' },
              { title: 'Medical Rehabilitation', desc: 'Treating surgery needs, infectious diseases, and conducting trauma therapy with certified veterinarians.', icon: Heart, color: 'bg-forest/10 text-forest' },
              { title: 'Shelter & Care', desc: 'Providing safe, comfortable, temperature-regulated facilities with nutritional diets and toys.', icon: PawPrint, color: 'bg-orange/10 text-orange' },
              { title: 'Spay & Neuter', desc: 'Mitigating stray overpopulation through free community spay-neuter vaccination programs.', icon: Users, color: 'bg-sky/10 text-sky' },
              { title: 'Community Adoption', desc: 'Vetting adopters to find the perfect matchmaking, ensuring a healthy lifelong transition.', icon: Award, color: 'bg-purple-500/10 text-purple-500' },
            ].map((prog, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-forest/10 p-8 rounded-4xl flex flex-col justify-between shadow-sm transition-all"
              >
                <div className="space-y-6">
                  <div className={`p-4 rounded-3xl w-14 h-14 flex items-center justify-center ${prog.color}`}>
                    <prog.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-charcoal">{prog.title}</h3>
                  <p className="text-charcoal/65 leading-relaxed text-sm md:text-base">{prog.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DRAGGABLE BEFORE/AFTER SLIDER (FEATURED STORY) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Transformation</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">The Impact of Your Support</h2>
            <p className="text-charcoal/60">Drag the slider to see Bella’s incredible transformation from highway rescue to a happy lapdog.</p>
          </div>

          {/* Slider Container */}
          <div 
            ref={sliderRef}
            onMouseMove={(e) => isDragging.current && handleSliderMove(e.clientX)}
            onTouchMove={handleTouchMove}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onTouchStart={() => { isDragging.current = true; }}
            onTouchEnd={() => { isDragging.current = false; }}
            className="relative h-[300px] sm:h-[450px] md:h-[500px] w-full rounded-4xl overflow-hidden shadow-2xl border border-forest/10 select-none cursor-ew-resize"
          >
            {/* Before (Right Side) */}
            <div className="absolute inset-0 bg-cream">
              <img 
                src="/images/1_A_Sad_Puppy_Looks_at_the_Camera_with.png" 
                alt="Bella Before Rescue" 
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
              <div className="absolute right-4 bottom-4 bg-charcoal/80 text-white font-heading font-bold text-xs uppercase px-4 py-1.5 rounded-full backdrop-blur-sm tracking-widest">
                Found Stray
              </div>
            </div>

            {/* After (Left Side) */}
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Force image to fit container regardless of dynamic width */}
              <div className="absolute inset-0 w-[calc(100vw-3rem)] max-w-5xl h-full">
                <img 
                  src="/images/5_29_229_Rescue_Dog_Happy_Royalty_Free.png" 
                  alt="Bella Happy After Rescue" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-4 bottom-4 bg-forest text-white font-heading font-bold text-xs uppercase px-4 py-1.5 rounded-full tracking-widest shadow-md shadow-forest/20">
                Rescued & Happy
              </div>
            </div>

            {/* Drag Handle Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-30"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-none">
                <PawPrint className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUCCESS STORIES & TESTIMONIALS */}
      <section className="py-24 bg-cream border-t border-forest/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">Happy Endings</h2>
            <p className="text-charcoal/60">Hear from our community of adopters, volunteers, and supporters.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-4xl border border-forest/10 p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 h-64 rounded-3xl overflow-hidden shrink-0 shadow-inner bg-cream">
              <img 
                src={successStories[currentStory].image} 
                alt="Adopter Family" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between h-full space-y-6">
              <blockquote className="text-charcoal/80 text-base md:text-lg leading-relaxed italic">
                "{successStories[currentStory].text}"
              </blockquote>
              <div>
                <p className="font-heading font-extrabold text-charcoal">{successStories[currentStory].name}</p>
                <p className="text-charcoal/40 text-xs font-semibold uppercase tracking-wider">{successStories[currentStory].location}</p>
              </div>
              <div className="flex space-x-2">
                {successStories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStory(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentStory === idx ? 'w-8 bg-forest' : 'w-2.5 bg-forest/20'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Questions & Answers</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">Frequently Asked Questions</h2>
            <p className="text-charcoal/60">Everything you need to know about adoption requirements, donations, and visiting our shelter.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'What is the adoption process at PawHope?', a: 'Adopting begins with an online application. Our team reviews submissions within 2-3 business days. Once reviewed, we arrange a phone match call and an in-person meeting. Final adoption requires a brief yard vetting check and completing the adoption contribution.' },
              { q: 'What are the adoption requirements?', a: 'You must be 18+ years old, provide government ID, have landlord permission (if renting), and show that all current household pets are sterilized and vaccinated.' },
              { q: 'How does my donation help?', a: 'PawHope is a registered charity. Over 85% of funds raised go directly to food, surgery, and vaccination bills. We also maintain a specialized emergency hotline for injured strays.' },
              { q: 'Can I volunteer or foster?', a: 'Yes! Fostering is a vital way to support shelter dogs. We cover all food and medical costs; you provide the home and love. Volunteer sign-ups can be completed via our Volunteer page.' }
            ].map((faq, idx) => (
              <div key={idx} className="border border-forest/10 rounded-3xl bg-cream/30 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:bg-forest/5"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-heading font-bold text-charcoal text-base md:text-lg flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-forest shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-charcoal/40 transition-transform shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-6 py-5 text-charcoal/70 text-sm md:text-base leading-relaxed border-t border-forest/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SIGNUP */}
      <section className="py-20 bg-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/2_5_786_Dog_Sunset_Silhouette_Stock.png')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8 z-10">
          <div className="space-y-4">
            <span className="bg-white/10 text-orange px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-widest border border-white/10 inline-block">
              Get Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Join the Pack Newsletter</h2>
            <p className="text-white/80 max-w-lg mx-auto text-sm md:text-base">
              Subscribe to receive weekly updates on adoption successes, emergency rescues, and animal care tips.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow px-6 py-3.5 rounded-full bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-orange placeholder-charcoal/40 font-medium text-sm border-0"
              />
              <button
                type="submit"
                className="bg-orange text-charcoal font-heading font-extrabold px-8 py-3.5 rounded-full hover:bg-orange/95 transition-all text-sm flex items-center justify-center space-x-2 shrink-0 shadow-lg shadow-orange/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
              >
                <span>Subscribe</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
            {newsletterError && <p className="text-orange text-xs font-semibold text-left pl-4">{newsletterError}</p>}
            {newsletterSubmitted && (
              <p className="text-cream text-xs font-semibold text-left pl-4">
                Thank you for subscribing! Keep an eye on your inbox.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section className="py-24 bg-cream border-t border-forest/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">We’d Love to Hear From You</h2>
              <p className="text-charcoal/65 leading-relaxed text-sm md:text-base">
                Have questions about adoptable dogs? Interested in corporate sponsorships or donation transparency reports? Reach out to our community coordinators.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-forest text-white p-3 rounded-2xl">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-charcoal">Helpline & General Inquiry</h4>
                  <a href="tel:+18005557297" className="text-charcoal/60 hover:text-forest transition-colors text-sm">
                    1-800-555-PAWS (7297)
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-forest text-white p-3 rounded-2xl">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-charcoal">Support & Adoption Services</h4>
                  <a href="mailto:rescue@pawhope.org" className="text-charcoal/60 hover:text-forest transition-colors text-sm">
                    rescue@pawhope.org
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-forest text-white p-3 rounded-2xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-charcoal">Shelter Sanctuary Location</h4>
                  <p className="text-charcoal/60 text-sm">
                    42 Rescue Avenue, Gandhi Nagar, Vellore, Tamil Nadu – 632004
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-forest/10 p-8 rounded-4xl shadow-sm">
            <h3 className="font-heading font-extrabold text-2xl text-charcoal mb-6">Send Us a Message</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="contact-name">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="contact-email">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="contact-message">
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder="Write your message here..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                ></textarea>
              </div>
              {contactError && <p className="text-orange text-xs font-semibold">{contactError}</p>}
              {contactSubmitted && <p className="text-forest text-xs font-semibold">Your message was sent successfully!</p>}
              <button
                type="submit"
                className="w-full bg-forest text-white font-heading font-extrabold py-3.5 rounded-full hover:bg-forest/90 transition-all text-sm flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-forest shadow-lg shadow-forest/15"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

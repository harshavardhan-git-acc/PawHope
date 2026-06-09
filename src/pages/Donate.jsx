import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Donate() {
  const [frequency, setFrequency] = useState('monthly'); // 'monthly' or 'one-time'
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [donateSubmitted, setDonateSubmitted] = useState(false);
  const [donateError, setDonateError] = useState('');

  // Form details
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Preset amounts based on frequency
  const presets = frequency === 'monthly' ? [10, 25, 50, 100] : [25, 75, 150, 300];

  // Dynamically calculate matching impact descriptions
  const impactMessage = useMemo(() => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (isNaN(amount) || amount <= 0) return 'Please select or type a donation amount.';
    
    if (amount < 20) {
      return `Vaccinates 1 shelter animal, providing immunization against rabies and other common viruses.`;
    } else if (amount < 60) {
      return `Feeds a rescued dog for a full month, supplying high-nutrition formulas, vitamins, and treat chews.`;
    } else if (amount < 120) {
      return `Funds emergency rescue operations, helping our team deploy vehicles to retrieve injured animals.`;
    } else if (amount < 250) {
      return `Covers full spaying or neutering surgery, vaccination, and microchipping for a stray.`;
    } else {
      return `Finances critical orthopedic surgical operations, healing bones and joints for abused animals.`;
    }
  }, [selectedAmount, customAmount]);

  const activeAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  // Handle Preset Click
  const handlePresetSelect = (amt) => {
    setCustomAmount('');
    setSelectedAmount(amt);
  };

  // Handle Custom Input
  const handleCustomChange = (val) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  // Handle Donate Submit
  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!activeAmount || activeAmount <= 0) {
      setDonateError('Please select a valid donation amount.');
      return;
    }
    if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
      setDonateError('Please fill in all credit card fields.');
      return;
    }
    if (cardNumber.length < 16) {
      setDonateError('Please enter a valid credit card number.');
      return;
    }
    setDonateError('');
    setDonateSubmitted(true);
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
    setCustomAmount('');
    setSelectedAmount(25);
    setTimeout(() => setDonateSubmitted(false), 5000);
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Campaign Context & Impact Calculator */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Support PawHope</span>
            <h1 className="text-4xl font-extrabold text-charcoal">Every Contribution Saves a Life</h1>
            <p className="text-charcoal/65 leading-relaxed text-sm md:text-base">
              As a non-governmental organization, we depend entirely on contributions to rescue strays. Over 85% of funds go directly into veterinarian bills, surgeries, vaccinations, and shelter nutrition.
            </p>
          </div>

          {/* Goal Tracker */}
          <div className="bg-white border border-forest/10 p-6 rounded-4xl shadow-sm space-y-4">
            <div className="flex justify-between items-baseline text-sm">
              <span className="font-heading font-extrabold text-charcoal">June Fundraising Goal</span>
              <span className="font-heading font-extrabold text-forest">₹12,450 raised <span className="text-charcoal/40 font-medium">of ₹15,000</span></span>
            </div>
            <div className="w-full bg-cream h-3 rounded-full overflow-hidden border border-forest/5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '83%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-forest rounded-full"
              />
            </div>
            <p className="text-xs text-charcoal/45 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-orange" />
              <span>We need ₹2,550 more to achieve this month's vaccination medical fund target.</span>
            </p>
          </div>

          {/* Interactive Impact Calculator Slider */}
          <div className="bg-white border border-forest/10 p-6 rounded-4xl shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-lg text-charcoal">Impact Calculator</h3>
              <p className="text-xs text-charcoal/50 leading-relaxed">
                Drag the slider to see how your contribution size translates into tangible shelter welfare actions.
              </p>
            </div>

            {/* Slider */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-charcoal/40">
                <span>₹10</span>
                <span>₹50</span>
                <span>₹100</span>
                <span>₹200</span>
                <span>₹300+</span>
              </div>
              <input
                type="range"
                min="10"
                max="350"
                step="5"
                value={activeAmount || 10}
                onChange={(e) => {
                  setCustomAmount('');
                  setSelectedAmount(parseInt(e.target.value));
                }}
              />
            </div>

            {/* Impact Text Panel */}
            <div className="bg-cream border border-forest/5 p-5 rounded-3xl flex items-start gap-4">
              <div className="bg-forest text-white p-2.5 rounded-2xl shrink-0">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <div className="space-y-1">
                <p className="font-heading font-extrabold text-forest text-base">
                  Your ₹{activeAmount || 0} Donation:
                </p>
                <p className="text-charcoal/70 text-sm leading-relaxed font-medium">
                  {impactMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Secure Donation Form */}
        <div className="bg-white border border-forest/10 p-8 rounded-4xl shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-forest/5 pb-6">
              <h2 className="font-heading font-extrabold text-2xl text-charcoal">Support Details</h2>
              
              {/* Frequency Toggle */}
              <div className="bg-cream p-1.5 rounded-2xl flex border border-forest/5">
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`px-4 py-2 text-xs font-heading font-bold rounded-xl transition-all ${
                    frequency === 'monthly'
                      ? 'bg-forest text-white shadow-md shadow-forest/10'
                      : 'text-charcoal/60 hover:text-forest'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('one-time')}
                  className={`px-4 py-2 text-xs font-heading font-bold rounded-xl transition-all ${
                    frequency === 'one-time'
                      ? 'bg-forest text-white shadow-md shadow-forest/10'
                      : 'text-charcoal/60 hover:text-forest'
                  }`}
                >
                  One-time
                </button>
              </div>
            </div>

            {/* Preset Amount Tiers */}
            <div className="grid grid-cols-4 gap-3">
              {presets.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetSelect(amt)}
                  className={`py-3.5 rounded-2xl font-heading font-extrabold text-sm border transition-all ${
                    selectedAmount === amt
                      ? 'bg-forest border-forest text-white shadow-md shadow-forest/10 scale-105'
                      : 'bg-cream/40 border-forest/10 text-charcoal hover:border-forest hover:bg-forest/5'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div>
              <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="custom-amt">
                Custom Donation Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-charcoal/50 text-sm">₹</span>
                <input
                  id="custom-amt"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className="w-full pl-8 pr-6 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm font-semibold"
                />
              </div>
            </div>

            {/* Payment Fields */}
            <form onSubmit={handleDonateSubmit} className="space-y-4 pt-4 border-t border-forest/5">
              <h3 className="font-heading font-extrabold text-base text-charcoal">Secure Card Details</h3>

              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="card-name">
                  Cardholder Name
                </label>
                <input
                  id="card-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="card-num">
                  Credit Card Number
                </label>
                <input
                  id="card-num"
                  type="text"
                  maxLength="16"
                  placeholder="1234 5678 1234 5678"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm tracking-widest"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="card-expiry">
                    Expiry Date
                  </label>
                  <input
                    id="card-expiry"
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-widest mb-2" htmlFor="card-cvc">
                    CVC Code
                  </label>
                  <input
                    id="card-cvc"
                    type="text"
                    maxLength="4"
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full px-5 py-3 rounded-2xl bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm text-center"
                  />
                </div>
              </div>

              {donateError && (
                <div className="bg-red-500/5 text-red-500 border border-red-500/10 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{donateError}</span>
                </div>
              )}

              {donateSubmitted && (
                <div className="bg-forest/5 text-forest border border-forest/10 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <Heart className="h-4 w-4 shrink-0 fill-current" />
                  <span>Donation successful! Thank you so much for supporting PawHope.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-orange text-charcoal font-heading font-extrabold py-4 rounded-full hover:bg-orange/90 transition-all text-sm flex items-center justify-center space-x-2 shadow-lg shadow-orange/15 focus:outline-none focus:ring-2 focus:ring-orange"
              >
                <ShieldCheck className="h-5 w-5" />
                <span>Pay Securely ₹{activeAmount || 0}</span>
              </button>
            </form>
          </div>

          <div className="text-center text-xs text-charcoal/40 font-semibold pt-4 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-forest" />
            <span>SSL Secured & 256-Bit Encrypted Payment Processing.</span>
          </div>
        </div>

      </div>
    </div>
  );
}

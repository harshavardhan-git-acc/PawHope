import React, { useState } from 'react';
import { ShieldCheck, Scale, FileText } from 'lucide-react';

export default function Legal() {
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' or 'terms'

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Compliance</span>
          <h1 className="text-4xl font-extrabold text-charcoal">Legal Documentation</h1>
          <p className="text-charcoal/60">
            Terms of Service and Privacy Policy for PawHope Foundation visitors, adopters, and sponsors.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 justify-center border-b border-forest/10 pb-6">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-3 rounded-2xl font-heading font-extrabold text-sm flex items-center space-x-2 border transition-all ${
              activeTab === 'privacy'
                ? 'bg-forest border-forest text-white shadow-md shadow-forest/5 scale-105'
                : 'bg-white border-forest/10 text-charcoal hover:bg-forest/5'
            }`}
          >
            <ShieldCheck className="h-4.5 w-4.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-6 py-3 rounded-2xl font-heading font-extrabold text-sm flex items-center space-x-2 border transition-all ${
              activeTab === 'terms'
                ? 'bg-forest border-forest text-white shadow-md shadow-forest/5 scale-105'
                : 'bg-white border-forest/10 text-charcoal hover:bg-forest/5'
            }`}
          >
            <Scale className="h-4.5 w-4.5" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Content Panel */}
        <div className="bg-white border border-forest/10 p-8 md:p-12 rounded-4xl shadow-sm space-y-8 text-charcoal/70 text-sm md:text-base leading-relaxed font-medium">
          {activeTab === 'privacy' ? (
            <div className="space-y-6">
              <h2 className="font-heading font-extrabold text-2xl text-charcoal flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-forest" />
                <span>Privacy Policy</span>
              </h2>
              <p className="text-xs text-charcoal/40 font-semibold uppercase tracking-wider">Last Updated: June 9, 2026</p>
              
              <section className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-charcoal">1. Information We Collect</h3>
                <p>
                  We collect personal information that you provide directly to us when applying to adopt or volunteer, making a donation, subscribing to our newsletter, or contacting us. This information may include your name, email address, phone number, physical address, and payment card details.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-charcoal">2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to process adoption and volunteer applications, manage donations, send newsletters and campaign updates, respond to inquiries, and ensure security. We do not sell or lease your personal information to third parties.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-charcoal">3. Data Security</h3>
                <p>
                  We implement a variety of security measures, including SSL encryption and secure payment gateways, to maintain the safety of your personal information when you enter, submit, or access your details.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="font-heading font-extrabold text-2xl text-charcoal flex items-center gap-2">
                <Scale className="h-6 w-6 text-forest" />
                <span>Terms of Service</span>
              </h2>
              <p className="text-xs text-charcoal/40 font-semibold uppercase tracking-wider">Last Updated: June 9, 2026</p>

              <section className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-charcoal">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using the PawHope website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-charcoal">2. Adoption & Volunteering</h3>
                <p>
                  Submission of an application does not guarantee approval. PawHope reserves the right to deny any adoption or volunteer applicant based on our vetting criteria and animal welfare assessments.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-charcoal">3. Donations & Refunds</h3>
                <p>
                  All donations made through our secure gateway are final and non-refundable. Monthly recurring subscriptions can be canceled at any time by contacting our support team.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

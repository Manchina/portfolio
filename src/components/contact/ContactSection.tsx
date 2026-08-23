import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Send, 
  Check, 
  Copy, 
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../icons/SocialIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/SoundEffects';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    sound.playSuccess();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playLaunch();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      sound.playSuccess();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#8B5CF6', '#10B981'],
      });

      // Construct mailto link as fallback
      const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
        formData.subject || `Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Quantum Uplink &middot; Direct Channels Open
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
          Let's Build Something Exceptional
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3">
          Whether you have an ambitious systems project, high-throughput microservice architecture, or engineering role, let's connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Contact Channels & Credentials (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold font-display text-white">Direct Communication Channels</h3>

            {/* Email Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Electronic Mail</div>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="text-xs sm:text-sm font-bold text-white hover:text-cyan-300 transition-colors font-mono"
                  >
                    {PORTFOLIO_DATA.personal.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PORTFOLIO_DATA.personal.email, 'email')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-all border border-slate-700"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Phone / WhatsApp</div>
                  <a
                    href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                    className="text-xs sm:text-sm font-bold text-white hover:text-emerald-300 transition-colors font-mono"
                  >
                    {PORTFOLIO_DATA.personal.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PORTFOLIO_DATA.personal.phone, 'phone')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 transition-all border border-slate-700"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Channels Bar */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Engineering Profiles & Code Repositories
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-center transition-all group flex flex-col items-center gap-1.5"
                >
                  <GithubIcon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-[11px] font-mono text-slate-300">GitHub</span>
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-center transition-all group flex flex-col items-center gap-1.5"
                >
                  <LinkedinIcon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-[11px] font-mono text-slate-300">LinkedIn</span>
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-center transition-all group flex flex-col items-center gap-1.5"
                >
                  <LeetCodeIcon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-[11px] font-mono text-slate-300">LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* Availability Status Card */}
          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 flex items-center gap-3.5 bg-emerald-950/20">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-emerald-300">Current Status: </span>
              {PORTFOLIO_DATA.personal.availability}
            </div>
          </div>
        </div>

        {/* Right: Interactive Cyber Message Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold font-display text-white">Direct Message Terminal</h3>
              <p className="text-xs text-slate-400 mt-0.5">Send a high-priority message directly to Prem's inbox</p>
            </div>
            <MessageSquare className="w-5 h-5 text-cyan-400" />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Your Name / Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex (Tech Lead / Recruiter)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">Subject / Objective</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Product Engineer Role / Distributed Systems Project"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">Message Transmission *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Prem, we'd love to chat regarding..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold font-mono text-xs tracking-wider transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-98"
            >
              {isSending ? (
                <>Transmitting Packet...</>
              ) : submitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" /> Transmission Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Transmit Message & Open Mailer
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

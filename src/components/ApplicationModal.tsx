import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Volume2, VolumeX, Shield, Crown, Play, Award } from 'lucide-react';
import { ApplicationInput } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const playTone = (type: 'page-turn' | 'stamp') => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'page-turn') {
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2) * 0.04;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);
      noise.connect(filter);
      filter.connect(ctx.destination);
      noise.start();
    } else if (type === 'stamp') {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);

      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3) * 0.08;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const bpFilter = ctx.createBiquadFilter();
      bpFilter.type = 'bandpass';
      bpFilter.frequency.setValueAtTime(350, ctx.currentTime);
      bpFilter.Q.setValueAtTime(1.5, ctx.currentTime);
      noise.connect(bpFilter);
      bpFilter.connect(ctx.destination);
      noise.start();
    }
  } catch (error) {
    // Audio Context is blocked or not supported, ignore silently
  }
};

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [form, setForm] = useState<ApplicationInput>({
    name: '',
    email: '',
    phone: '',
    country: '',
    instagram: '',
    reason: '',
    waxColor: 'gold',
    selectedAesthetics: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stampAnimation, setStampAnimation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ── FIX 1: Lock body scroll when modal is open ──────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (soundEnabled) playTone('page-turn');
      const randomNo = Math.floor(Math.random() * 200) + 120;
      setSerialNumber(`LUMINA-${randomNo}/400`);
    } else {
      setIsSubmitting(false);
      setStampAnimation(false);
      setIsCompleted(false);
    }
  }, [isOpen]);

  const toggleAesthetic = (aestheticName: string) => {
    setForm((prev) => {
      const current = prev.selectedAesthetics || [];
      const updated = current.includes(aestheticName)
        ? current.filter((item) => item !== aestheticName)
        : [...current, aestheticName];
      return { ...prev, selectedAesthetics: updated };
    });
    if (soundEnabled) playTone('page-turn');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const selectWaxColor = (color: 'gold' | 'sage' | 'burgundy') => {
    setForm((prev) => ({ ...prev, waxColor: color }));
    if (soundEnabled) playTone('page-turn');
  };

  const getWaxHex = (color: string) => {
    switch (color) {
      case 'sage': return '#7b947a';
      case 'burgundy': return '#800020';
      case 'gold':
      default: return '#d4bd94';
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Your name is requested.';
    if (!form.email.trim()) {
      newErrors.email = 'An email is required to correspond.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!form.phone.trim()) newErrors.phone = 'Your contact phone number is requested.';
    if (!form.country.trim()) newErrors.country = 'Your country of residence is requested.';
    if (!form.reason.trim()) {
      newErrors.reason = 'Please share your perspective with us.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setStampAnimation(true);
      if (soundEnabled) playTone('stamp');
      setTimeout(() => {
        setIsCompleted(true);
        setIsSubmitting(false);
      }, 1600);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    // ── FIX 2: Outer div is the scrollable container ────────────────────────────
    // overflow-y-auto is on the fixed overlay itself so IT scrolls, not the page.
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* ── FIX 3: Inner wrapper centres content and provides min-height ─────── */}
      <div className="flex min-h-full items-start justify-center p-4 sm:items-center sm:p-6">

        {/* Backdrop — must be fixed so it covers the whole viewport while scrolling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-sage-950/65 backdrop-blur-md"
        />

        {/* Main Card */}
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="application-form"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              // ── FIX 4: pt-14 gives room so header text clears the absolute
              //    close/sound buttons. overflow-hidden removed — it was clipping
              //    the top content on small screens.
              className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-2xl border border-cream-200 pt-14 px-6 pb-6 md:pt-16 md:px-12 md:pb-12 z-10 my-4"
            >
              {/* Top Control Rail */}
              <div className="absolute top-5 right-5 flex items-center space-x-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-full hover:bg-cream-200/50 text-sage-600 transition-colors"
                  title={soundEnabled ? 'Mute Atmosphere sounds' : 'Unmute Atmosphere sounds'}
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  id="close-application-modal"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-cream-200/50 text-sage-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-10">
                <span className="text-[9px] font-sans tracking-[0.35em] text-gold-500 font-semibold uppercase block mb-1">
                  MEMBERSHIP INVITATION REQUEST
                </span>
                <h3 className="font-serif text-3xl tracking-wide text-sage-900">
                  Request an Invitation
                </h3>
                <p className="font-sans text-[11px] text-sage-500 tracking-wider mt-1 font-light">
                  Limited to 400 Members annually • Reviews pending
                </p>
              </div>

              {/* Submitting overlay */}
              {isSubmitting && (
                <div className="absolute inset-0 bg-cream-50/95 z-20 flex flex-col items-center justify-center p-8 text-center rounded-3xl">
                  <AnimatePresence>
                    {stampAnimation ? (
                      <motion.div
                        initial={{ y: -120, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                        className="flex flex-col items-center relative"
                      >
                        <div className="w-16 h-28 bg-gradient-to-b from-amber-800 via-amber-700 to-amber-900 rounded-t-full shadow-lg border border-amber-950/20 relative flex items-end justify-center pb-2">
                          <div className="w-4 h-16 bg-amber-950/20 absolute bottom-6" />
                          <div className="w-10 h-3 bg-gradient-to-r from-yellow-600 to-yellow-500 border border-yellow-700/50 shadow-md flex items-center justify-center text-[5px] text-yellow-100 font-mono">
                            CAST BRASS
                          </div>
                        </div>
                        <span className="text-xs font-sans tracking-widest text-gold-600 font-medium uppercase mt-4 animate-pulse">
                          Sealing Curation Bond...
                        </span>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative w-16 h-16 mx-auto">
                          <div className="absolute inset-0 rounded-full border border-gold-300 border-t-gold-600 animate-spin" />
                          <div className="absolute inset-2 rounded-full border border-dashed border-sage-300" />
                        </div>
                        <p className="font-serif italic text-sage-800 text-sm">
                          Preparing your parchment letter...
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Application letterform */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="font-serif italic text-sage-800 text-[14px] leading-relaxed relative bg-white border border-cream-200/50 p-6 md:p-8 rounded-2xl shadow-sm">
                  <p className="not-italic font-sans text-[11px] font-semibold tracking-widest text-gold-500 uppercase mb-8 border-b border-cream-200 pb-2">
                    TO THE LUMINA COUNCIL
                  </p>

                  <p className="mb-4">Dear Curator Team,</p>

                  <p className="mb-4 leading-loose">
                    Let it be known that my name is{' '}
                    <span className="inline-block relative min-w-[150px] align-baseline">
                      <input
                        id="app-input-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Your Full Name"
                        className="w-full bg-transparent border-b border-cream-300 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-1 not-italic font-sans text-sage-900 placeholder:text-sage-300 text-sm transition-colors"
                      />
                      {errors.name && (
                        <span className="absolute left-0 -top-6 text-[9.5px] font-sans not-italic text-red-500 font-light">
                          {errors.name}
                        </span>
                      )}
                    </span>
                    , and I wish to request an invitation for a LUMINA membership.
                  </p>

                  <p className="mb-4 leading-loose">
                    Please correspond with me at my email of{' '}
                    <span className="inline-block relative min-w-[180px] align-baseline">
                      <input
                        id="app-input-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="w-full bg-transparent border-b border-cream-300 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-1 not-italic font-sans text-sage-900 placeholder:text-sage-300 text-sm transition-colors"
                      />
                      {errors.email && (
                        <span className="absolute left-0 -top-6 text-[9.5px] font-sans not-italic text-red-500 font-light">
                          {errors.email}
                        </span>
                      )}
                    </span>
                    , and my primary contact phone is{' '}
                    <span className="inline-block relative min-w-[140px] align-baseline">
                      <input
                        id="app-input-phone"
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="Contact Phone"
                        className="w-full bg-transparent border-b border-cream-300 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-1 not-italic font-sans text-sage-900 placeholder:text-sage-300 text-sm transition-colors"
                      />
                      {errors.phone && (
                        <span className="absolute left-0 -top-6 text-[9.5px] font-sans not-italic text-red-500 font-light">
                          {errors.phone}
                        </span>
                      )}
                    </span>
                    . I reside in the country of{' '}
                    <span className="inline-block relative min-w-[120px] align-baseline">
                      <input
                        id="app-input-country"
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleInputChange}
                        placeholder="My Country"
                        className="w-full bg-transparent border-b border-cream-300 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-1 not-italic font-sans text-sage-900 placeholder:text-sage-300 text-sm transition-colors"
                      />
                      {errors.country && (
                        <span className="absolute left-0 -top-6 text-[9.5px] font-sans not-italic text-red-500 font-light">
                          {errors.country}
                        </span>
                      )}
                    </span>
                    .
                  </p>

                  <p className="mb-4 leading-loose">
                    If you wish to examine my aesthetic perspective, my social signature on Instagram is @{' '}
                    <span className="inline-block relative min-w-[120px] align-baseline">
                      <input
                        id="app-input-instagram"
                        type="text"
                        name="instagram"
                        value={form.instagram}
                        onChange={handleInputChange}
                        placeholder="handle"
                        className="w-full bg-transparent border-b border-cream-300 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-1 not-italic font-sans text-sage-900 placeholder:text-sage-300 text-sm transition-colors"
                      />
                    </span>
                    .
                  </p>

                  <div className="my-6 border-y border-cream-200/60 py-4 not-italic">
                    <span className="block text-[10px] font-sans font-bold tracking-[0.2em] text-[#ab8d56] uppercase mb-2">
                      AESTHETIC INSPIRATION SITES
                    </span>
                    <p className="text-xs text-sage-500 font-sans leading-relaxed mb-4 font-light">
                      We look towards these select ateliers and independent publications for design alignment. Choose any that resonate with your personal style:
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { label: '@fern_creative_collective', value: '@fern_creative_collective' },
                        { label: 'astylistguide.com', value: 'astylistguide.com' },
                        { label: 'thequietbotanist.com', value: 'thequietbotanist.com' },
                        { label: 'bamford.com', value: 'bamford.com' },
                        { label: 'thenewcraftmaker.com', value: 'thenewcraftmaker.com' },
                        { label: 'Nickeykehoe.com', value: 'Nickeykehoe.com' }
                      ].map((site) => {
                        const isSelected = form.selectedAesthetics?.includes(site.value) || false;
                        return (
                          <button
                            key={site.value}
                            type="button"
                            onClick={() => toggleAesthetic(site.value)}
                            className={`px-3 py-1.5 rounded-full border text-xs font-sans tracking-wide transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-gold-500/10 border-gold-400 text-gold-700 font-semibold'
                                : 'bg-white border-cream-300 text-sage-600 hover:border-gold-300'
                            }`}
                          >
                            {site.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <p className="leading-loose mb-2">
                    When reflecting on why I (or a woman close to me) want to initiate this ritual of self-honour and curation, I share the following context:
                  </p>
                  <div className="relative">
                    <textarea
                      id="app-input-reason"
                      name="reason"
                      value={form.reason}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Describe what draws you to Lumina..."
                      className="w-full bg-transparent border-b border-cream-300 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-2 not-italic font-sans text-sm text-sage-900 placeholder:text-sage-300 placeholder:italic resize-none leading-relaxed transition-colors mt-2"
                    />
                    {errors.reason && (
                      <span className="absolute left-0 -bottom-5 text-[9.5px] font-sans not-italic text-red-500 font-light">
                        {errors.reason}
                      </span>
                    )}
                  </div>
                </div>

                {/* Wax Seal Ceremony Customizer */}
                <div className="p-5 bg-cream-100 rounded-2xl border border-cream-300/80">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h5 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-sage-800">
                        INVITATION CAPPING CEREMONY
                      </h5>
                      <p className="text-[11px] text-sage-500 font-light mt-0.5">
                        Select the custom beeswax seal shade details for your printed letter.
                      </p>
                    </div>
                    <div className="flex items-center space-x-3.5">
                      <button
                        type="button"
                        onClick={() => selectWaxColor('gold')}
                        className={`group relative flex items-center justify-center h-8 px-3 rounded-full border text-[10px] font-sans tracking-widest transition-all duration-300 ${
                          form.waxColor === 'gold'
                            ? 'border-gold-400 bg-gold-50 text-gold-700 shadow-sm'
                            : 'border-cream-300 hover:border-gold-300 text-sage-600'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: '#d4bd94' }} />
                        GOLD
                      </button>
                      <button
                        type="button"
                        onClick={() => selectWaxColor('sage')}
                        className={`group relative flex items-center justify-center h-8 px-3 rounded-full border text-[10px] font-sans tracking-widest transition-all duration-300 ${
                          form.waxColor === 'sage'
                            ? 'border-sage-400 bg-sage-50 text-sage-700 shadow-sm'
                            : 'border-cream-300 hover:border-sage-300 text-sage-600'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: '#7b947a' }} />
                        SAGE LUX
                      </button>
                      <button
                        type="button"
                        onClick={() => selectWaxColor('burgundy')}
                        className={`group relative flex items-center justify-center h-8 px-3 rounded-full border text-[10px] font-sans tracking-widest transition-all duration-300 ${
                          form.waxColor === 'burgundy'
                            ? 'bg-red-50 border-red-200 text-red-800 shadow-sm'
                            : 'border-cream-300 hover:border-red-300/40 text-sage-600'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: '#800020' }} />
                        BURGUNDY
                      </button>
                    </div>
                  </div>
                </div>

                {/* Warning label */}
                <div className="flex items-start gap-2 text-[10px] text-sage-500 leading-normal">
                  <Shield size={12} className="text-gold-500 mt-0.5 shrink-0" />
                  <p>
                    Submission logs are secured using military class encryption. Review times fluctuate; an email will be sent you within 24 hours with a payment link and detailed form on your preferences. Payment, terms and conditions, and personal profile will all be done via email.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  id="submit-application-btn"
                  type="submit"
                  className="w-full py-4 bg-sage-800 hover:bg-gold-500 hover:shadow-lg text-cream-100 uppercase tracking-[0.25em] text-xs font-sans font-medium transition-all duration-500 rounded-md shadow-md"
                >
                  SUBMIT MEMORANDUM & PRESS SEAL
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="application-completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-lg bg-gradient-to-br from-cream-50 to-cream-100 rounded-3xl p-8 md:p-12 text-center shadow-2xl border border-cream-200/80 z-10 overflow-hidden my-4"
            >
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d4bd94_1px,transparent_1px)] [background-size:16px_16px]" />

              <button
                id="success-modal-close"
                onClick={onClose}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-cream-200/50 text-sage-600 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex justify-center mb-6">
                <span className="p-3 bg-gold-50 text-gold-500 rounded-full border border-gold-200 shadow-inner">
                  <Crown size={28} />
                </span>
              </div>

              <p className="text-[9px] font-sans tracking-[0.35em] text-gold-500 font-semibold uppercase mb-1">
                PROVISIONAL CREST EMBOSSED
              </p>
              <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-sage-900 mb-2">
                Invitation Requested
              </h3>
              <p className="text-xs text-sage-600 leading-relaxed max-w-sm mx-auto mb-8 font-light">
                Your invitation request letter has been securely pressed and stored in the LUMINA Founder archives. An email will be sent you within 24 hours with a payment link and detailed form on your preferences.
              </p>

              <div className="relative bg-white border border-cream-300 p-6 md:p-8 rounded-2xl shadow-md overflow-hidden text-left mb-6 max-w-sm mx-auto">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-200/10 rounded-bl-full pointer-events-none" />

                <div className="flex justify-between items-start border-b border-cream-200 pb-3 mb-4">
                  <div>
                    <span className="font-script text-[24px] tracking-[0.1em] text-sage-800 leading-none">Lumina</span>
                    <p className="text-[6px] font-sans tracking-[0.25em] text-sage-500 uppercase">
                      Celebrate You
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold-600 font-bold">
                      {serialNumber}
                    </span>
                    <p className="text-[6px] font-sans tracking-wider text-sage-400 uppercase">
                      MEMBER SERIAL
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs font-sans">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-sage-400 block">APPLICANT</span>
                    <span className="font-medium text-sage-800 uppercase tracking-widest text-[11px]">
                      {form.name}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-sage-400 block">CORRESPONDENCE</span>
                      <span className="text-sage-700 tracking-wide font-light text-[10px] break-all">
                        {form.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-sage-400 block">STATUS</span>
                      <span className="text-gold-600 font-semibold tracking-wider text-[9px] uppercase">
                        IN REVIEW
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-cream-200 border-dashed mt-4">
                    <div className="flex items-center space-x-1.5 text-[8.5px] text-sage-500">
                      <Award size={12} className="text-gold-500" />
                      <span>FOUNDING MEMBER CLASS</span>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1, stiffness: 200, damping: 15 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-inner overflow-hidden border border-white/20"
                      style={{
                        backgroundColor: getWaxHex(form.waxColor),
                        boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.25), 0 3px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      <div className="w-10 h-10 rounded-full border border-dashed border-white/10 flex items-center justify-center">
                        <span className="text-[10px] font-script text-white tracking-widest font-bold select-none drop-shadow-md pb-0.5">
                          Lumina
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <button
                id="completed-done-btn"
                onClick={onClose}
                className="px-8 py-2.5 border border-sage-800 text-sage-800 text-[10px] font-sans tracking-[0.2em] hover:bg-sage-800 hover:text-cream-100 transition-all duration-300"
              >
                RETURN TO RITUAL
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
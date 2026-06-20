import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Crown, Award } from 'lucide-react';
import { ApplicationInput } from '../types';
import { IMAGES } from '../constants/images';


interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
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

  // Lock background page scroll while modal is open (with iOS touch safety net)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const randomNo = Math.floor(Math.random() * 180) + 140;
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
  };

  const getWaxHex = (color: string) => {
    switch (color) {
      case 'sage': return '#7b947a';
      case 'burgundy': return '#800020';
      case 'gold':
      default: return '#bda169';
    }
  };

  const getWaxGlow = (color: string) => {
    switch (color) {
      case 'sage': return 'rgba(123, 148, 122, 0.4)';
      case 'burgundy': return 'rgba(128, 0, 32, 0.4)';
      case 'gold':
      default: return 'rgba(189, 161, 105, 0.4)';
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Provide a valid email address.';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!form.country.trim()) newErrors.country = 'Country is required.';
    if (!form.reason.trim()) {
      newErrors.reason = 'Please share your reflection.';
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
      setTimeout(() => {
        setIsCompleted(true);
        setIsSubmitting(false);
      }, 1400);
    }, 1000);
  };

  if (!isOpen) return null;

  const waxOptions: { name: string; value: 'gold' | 'sage' | 'burgundy'; hex: string }[] = [
    { name: 'Gold', value: 'gold', hex: '#d4bd94' },
    { name: 'Sage', value: 'sage', hex: '#7b947a' },
    { name: 'Burgundy', value: 'burgundy', hex: '#800020' }
  ];

  const aestheticOptions = [
    '@fern_creative_collective',
    'astylistguide.com',
    'thequietbotanist.com',
    'bamford.com',
    'thenewcraftmaker.com',
    'Nickeykehoe.com'
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-sage-950/85 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Subtle background ambient lights (decorative, doesn't intercept scroll/clicks) */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] bg-sage-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/*
        Single dedicated scroll container.
        - overflow-y-auto: this element owns the scrollbar, not the page.
        - overscroll-contain: stops scroll "spilling over" to the page behind
          once this container hits its top/bottom boundary.
      */}
      <div
        className="relative h-full w-full overflow-y-auto overscroll-contain"
        onClick={onClose}
      >
        <div className="flex min-h-full items-start md:items-center justify-center p-3 sm:p-6 md:p-10">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key="application-form"
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-5xl z-10 my-4 md:my-6 cursor-default select-text"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top controls bar — shared across both layouts */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[9px] font-sans tracking-[0.35em] text-gold-300 font-bold uppercase">
                      Private Circle Curation
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      id="close-application-modal"
                      type="button"
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-white/10 text-cream-100 transition-colors cursor-pointer"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

                {/*
                  THE LETTER
                  Desktop/tablet (md+): horizontal split — memorandum left, registry rail right.
                  Mobile (<md): vertical stack — registry strip on top, memorandum below.
                */}
                <div className="deckled-paper bg-white relative rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                  {/* Submitting Overlay — covers the whole letter regardless of layout */}
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-cream-50/98 z-40 flex flex-col items-center justify-center p-8 text-center">
                      <AnimatePresence>
                        {stampAnimation ? (
                          <motion.div
                            initial={{ y: -160, opacity: 0, scale: 1.1 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', damping: 12, stiffness: 120 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-16 h-24 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-900 rounded-t-full shadow-2xl border border-amber-950/40 relative flex items-end justify-center pb-3">
                              <div className="w-6 h-12 bg-amber-950/20 absolute bottom-5" />
                              <div className="w-12 h-3.5 bg-gradient-to-r from-yellow-500 to-yellow-400 border border-yellow-600/50 shadow-md flex items-center justify-center text-[6px] text-yellow-100 font-mono tracking-wider font-semibold">
                                BRASS SEAL
                              </div>
                            </div>
                            <span className="text-[10px] font-sans tracking-[0.3em] text-gold-600 font-bold uppercase mt-6 animate-pulse">
                              AFFIXING WAX EMBLEM...
                            </span>
                          </motion.div>
                        ) : (
                          <div className="space-y-4">
                            <div className="relative w-14 h-14 mx-auto">
                              <div className="absolute inset-0 rounded-full border border-gold-300 border-t-gold-500 animate-spin" />
                              <div className="absolute inset-2.5 rounded-full border border-dashed border-sage-300" />
                            </div>
                            <p className="font-serif italic text-sage-800 text-sm">
                              Melting the traditional wax seal...
                            </p>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* ===================== MOBILE-ONLY REGISTRY STRIP (vertical layout, sits on top) ===================== */}
                  <div className="md:hidden flex items-center justify-between gap-3 bg-sage-950 px-5 py-4">
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-gold-300 font-bold block">
                        {serialNumber}
                      </span>
                      <span className="text-[8px] font-sans tracking-wider text-cream-300/70 uppercase">
                        Invitation ID
                      </span>
                    </div>
                    <div className="flex hidden items-center gap-2">
                      {waxOptions.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => selectWaxColor(item.value)}
                          aria-label={`${item.name} seal`}
                          className={`w-7 h-7 rounded-full transition-all cursor-pointer ${
                            form.waxColor === item.value ? 'ring-2 ring-offset-2 ring-offset-sage-950 ring-gold-300 scale-110' : 'opacity-60'
                          }`}
                          style={{ backgroundColor: item.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ===================== LEFT / MAIN COLUMN — THE MEMORANDUM ===================== */}
                  <form id="lumina-application-form" onSubmit={handleSubmit} className="flex-1 min-w-0 flex flex-col">
                    <div className="flex-1 overflow-y-auto md:max-h-[72vh] px-5 sm:px-8 md:px-10 py-7 md:py-9">

                      {/* Header (desktop/tablet only — mobile uses the strip above) */}
                      <div className="hidden md:block mb-7 pb-5 border-b border-cream-200">
                        <h3 className="font-serif text-3xl md:text-[2.1rem] text-gold-500 tracking-wide leading-tight">
                          Request an Invitation
                        </h3>
                        <p className="font-sans text-[10px] text-sage-500 tracking-widest mt-1.5">
                          MEMBER ARCHIVES · CURATOR REVIEW REQUIRED
                        </p>
                      </div>
                      <div className="md:hidden mb-6">
                        <h3 className="font-serif text-2xl text-gold-500 tracking-wide leading-tight">
                          Request an Invitation
                        </h3>
                        <p className="font-sans text-[9px] text-sage-500 tracking-widest mt-1">
                          MEMBER ARCHIVES · CURATOR REVIEW
                        </p>
                      </div>

                      <div className="font-serif italic text-sage-900 text-[15px] md:text-base leading-loose">
                        <p className="not-italic font-sans text-[10px] font-bold tracking-[0.25em] text-gold-600 uppercase mb-6 border-b border-cream-200 pb-2">
                          MEMORANDUM OF INTENT
                        </p>

                        <p className="mb-4">Dear Lumina Curation Council,</p>

                        <p className="mb-4">
                          I present myself as{' '}
                          <span className="inline-block relative min-w-[180px] sm:min-w-[200px] align-baseline">
                            <input
                              id="app-input-name"
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleInputChange}
                              placeholder="Your Full Name"
                              className="w-full bg-transparent border-b border-cream-400 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-2 not-italic font-sans text-sage-950 placeholder:text-sage-300 text-sm transition-colors"
                            />
                            {errors.name && (
                              <span className="absolute left-0 -top-6 text-[9px] font-sans not-italic text-red-600 font-semibold">
                                {errors.name}
                              </span>
                            )}
                          </span>
                          , desiring to request a private circle invite.
                        </p>

                        <p className="mb-4">
                          Please address correspondence to{' '}
                          <span className="inline-block relative min-w-[200px] sm:min-w-[220px] align-baseline">
                            <input
                              id="app-input-email"
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleInputChange}
                              placeholder="email@example.com"
                              className="w-full bg-transparent border-b border-cream-400 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-2 not-italic font-sans text-sage-950 placeholder:text-sage-300 text-sm transition-colors"
                            />
                            {errors.email && (
                              <span className="absolute left-0 -top-6 text-[9px] font-sans not-italic text-red-600 font-semibold">
                                {errors.email}
                              </span>
                            )}
                          </span>
                          , or contact me directly via telephone at{' '}
                          <span className="inline-block relative min-w-[140px] sm:min-w-[150px] align-baseline">
                            <input
                              id="app-input-phone"
                              type="text"
                              name="phone"
                              value={form.phone}
                              onChange={handleInputChange}
                              placeholder="Contact Phone"
                              className="w-full bg-transparent border-b border-cream-400 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-2 not-italic font-sans text-sage-950 placeholder:text-sage-300 text-sm transition-colors"
                            />
                            {errors.phone && (
                              <span className="absolute left-0 -top-6 text-[9px] font-sans not-italic text-red-600 font-semibold">
                                {errors.phone}
                              </span>
                            )}
                          </span>
                          .
                        </p>

                        <p className="mb-4">
                          I currently reside in the country of{' '}
                          <span className="inline-block relative min-w-[130px] sm:min-w-[140px] align-baseline">
                            <input
                              id="app-input-country"
                              type="text"
                              name="country"
                              value={form.country}
                              onChange={handleInputChange}
                              placeholder="My Country"
                              className="w-full bg-transparent border-b border-cream-400 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-2 not-italic font-sans text-sage-950 placeholder:text-sage-300 text-sm transition-colors"
                            />
                            {errors.country && (
                              <span className="absolute left-0 -top-6 text-[9px] font-sans not-italic text-red-600 font-semibold">
                                {errors.country}
                              </span>
                            )}
                          </span>
                          .
                        </p>

                        <p className="mb-4">
                          My personal signature on Instagram is @{' '}
                          <span className="inline-block relative min-w-[140px] sm:min-w-[150px] align-baseline">
                            <input
                              id="app-input-instagram"
                              type="text"
                              name="instagram"
                              value={form.instagram}
                              onChange={handleInputChange}
                              placeholder="handle (optional)"
                              className="w-full bg-transparent border-b border-cream-400 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-0.5 px-2 not-italic font-sans text-sage-950 placeholder:text-sage-300 text-sm transition-colors"
                            />
                          </span>
                          .
                        </p>

                        <p className="mb-2">
                          In requesting this membership covenant, my personal alignment with Lumina's focus on beauty and presence is summarized below:
                        </p>
                        <div className="relative">
                          <textarea
                            id="app-input-reason"
                            name="reason"
                            value={form.reason}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Share what draws you to honor your journey..."
                            className="w-full bg-transparent border-b border-cream-400 hover:border-gold-400 focus:border-gold-500 focus:outline-none py-2 not-italic font-sans text-sm text-sage-950 placeholder:text-sage-300 placeholder:italic resize-none leading-relaxed transition-colors mt-2"
                          />
                          {errors.reason && (
                            <span className="absolute left-0 -bottom-5 text-[9px] font-sans not-italic text-red-600 font-semibold">
                              {errors.reason}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Aesthetic alignment tags */}
                      <div className="mt-7 pt-6 border-t border-cream-200/80">
                        <span className="block text-[9px] font-sans font-bold tracking-[0.25em] text-[#ab8d56] uppercase mb-1.5">
                          DESIGN RESIDENCE & ALIGNMENT
                        </span>
                        <p className="text-[11px] text-sage-500 font-sans leading-relaxed mb-4 font-light">
                          Choose the publications, collections, or ateliers that align with your visual worldview:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {aestheticOptions.map((value) => {
                            const isSelected = form.selectedAesthetics?.includes(value) || false;
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => toggleAesthetic(value)}
                                className={`px-3.5 py-1.5 rounded-full border text-[10px] font-sans tracking-wider transition-all duration-300 cursor-pointer ${
                                  isSelected
                                    ? 'bg-gold-500/10 border-gold-400 text-gold-800 font-bold'
                                    : 'bg-white/80 border-cream-300 text-sage-700 hover:border-gold-300'
                                }`}
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mobile-only: wax seal full picker (desktop has it in the rail) */}
                      <div className="md:hidden mt-7 pt-6 border-t border-cream-200/80">
                        <h5 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-sage-800 mb-1">
                          Invitation Cast Seal
                        </h5>
                        <p className="text-[10px] text-sage-500 font-light mb-3">
                          Select the wax color to cap this request letter.
                        </p>
                        <div className="flex items-center gap-2.5">
                          {waxOptions.map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => selectWaxColor(item.value)}
                              className={`flex items-center h-8 px-3 rounded-full border text-[9px] font-sans font-semibold tracking-widest transition-all duration-300 cursor-pointer ${
                                form.waxColor === item.value
                                  ? 'border-gold-500 bg-white text-gold-800 shadow-sm'
                                  : 'border-cream-300 hover:border-gold-300 text-sage-600'
                              }`}
                            >
                              <span className="w-2 h-2 rounded-full mr-2 shadow-inner" style={{ backgroundColor: item.hex }} />
                              {item.name.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Secure label */}
                      <div className="flex items-start gap-2.5 text-[10px] text-sage-500 leading-relaxed mt-6">
                        <Shield size={13} className="text-gold-500 mt-0.5 shrink-0" />
                        <p>
                          Lumina respects privacy boundaries. Invoices and aesthetic evaluations are conducted individually by email within 24 hours of invitation clearance.
                        </p>
                      </div>

                      {/* Mobile-only submit (desktop submit lives in the rail) */}
                      <button
                        id="submit-application-btn-mobile"
                        type="submit"
                        className="md:hidden w-full mt-6 py-4 bg-sage-900 hover:bg-gold-500 hover:text-sage-950 text-cream-100 uppercase tracking-[0.25em] text-[10px] font-sans font-bold transition-all duration-500 rounded-lg shadow-md cursor-pointer"
                      >
                        SUBMIT MEMORANDUM & PRESS SEAL
                      </button>
                    </div>
                  </form>

                  {/* ===================== RIGHT REGISTRY RAIL (desktop/tablet only, horizontal layout) ===================== */}
                  <div
                    className="hidden md:flex md:flex-col md:w-[280px] lg:w-[300px] shrink-0 bg-[#a7874f] text-cream-100 relative"
                    style={{ clipPath: 'polygon(3% 0%, 100% 0%, 100% 100%, 0% 100%, 2% 92%, 4% 84%, 1% 76%, 5% 68%, 2% 60%, 4% 52%, 1% 44%, 5% 36%, 2% 28%, 4% 20%, 1% 12%, 3% 4%)' }}
                  >
                    <div className="flex-1 flex flex-col px-7 py-9 overflow-y-auto">
                      {/* Registry header */}
                      <div className="mb-8">
                        <span className="font-serif text-xl text-cream-50 leading-none block">Lumina</span>
                        <p className="text-[7px] font-sans tracking-[0.3em]   uppercase font-bold mt-1">
                          Founder Registry
                        </p>
                      </div>

                      {/* Serial number */}
                      <div className="mb-8 pb-6 border-b border-white/10">
                        <span className="text-[8px] font-sans tracking-wider  uppercase block mb-1">
                          Invitation ID
                        </span>
                        <span className="text-[13px] font-mono tracking-widest text-gold-300 font-bold">
                          {serialNumber}
                        </span>
                      </div>

                      {/* Wax seal selector — the signature element */}
                      {/* <div className="mb-8 pb-6 border-b border-white/10">
                        <h5 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em]   mb-1">
                          Cast Seal
                        </h5>
                        <p className="text-[10px]   font-light mb-4 leading-relaxed">
                          Choose the wax that closes your letter.
                        </p>
                        <div className="flex items-center gap-3 mb-3">
                          {waxOptions.map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => selectWaxColor(item.value)}
                              aria-label={`${item.name} seal`}
                              className={`relative w-9 h-9 rounded-full transition-all cursor-pointer ${
                                form.waxColor === item.value ? 'ring-2 ring-offset-2 ring-offset-sage-950 ring-gold-300 scale-110' : 'opacity-50 hover:opacity-80'
                              }`}
                              style={{
                                backgroundColor: item.hex,
                                boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.4), inset 2px 2px 5px rgba(255,255,255,0.15)'
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-sans tracking-widest text-cream-300/80 uppercase">
                          {waxOptions.find((w) => w.value === form.waxColor)?.name}
                        </span>
                      </div> */}

                      {/* Live preview of seal as it would appear pressed */}
                      <div className="flex flex-col items-center justify-center py-6 mb-2">
                        <motion.div
                          
                        >
                           {/* <img
              src={IMAGES.logo}
              alt="Lumina"
              referrerPolicy="no-referrer"
              className="w-20 h-20 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            /> */}
                          <span className="font-script text-6xl text-gold-800 block">Lumina</span>

                        </motion.div>
                       
                      </div>
                    </div>

                    {/* Sticky submit footer in the rail */}
                    <div className="px-7 pb-7 pt-2">
                      <button
                        id="submit-application-btn"
                        type="submit"
                        form="lumina-application-form"
                        className="w-full py-4 bg-gold-200 hover:bg-cream-100 text-sage-950 uppercase tracking-[0.2em] text-[10px] font-sans font-bold transition-all duration-300 rounded-full shadow-md cursor-pointer"
                      >
                        Press Seal & Submit
                      </button>
                      <p className="text-[10px] text-cream-300/50 text-center mt-3 tracking-wide leading-relaxed">
                        Curators respond within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="application-completed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="deckled-paper relative w-full max-w-lg rounded-3xl p-6 md:p-10 text-center z-10 overflow-hidden my-6 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  id="success-modal-close"
                  type="button"
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-cream-200/50 text-sage-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>

                <div className="flex justify-center mb-5 mt-4">
                  <span className="p-3 bg-gold-50 text-gold-500 rounded-full border border-gold-200 shadow-inner">
                    <Crown size={28} />
                  </span>
                </div>

                <span className="text-[9px] font-sans tracking-[0.35em] text-gold-500 font-bold uppercase mb-1 block">
                  MEMBERSHIP PROPOSAL LOGGED
                </span>
                <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-sage-900 mb-2">
                  Invitation Requested
                </h3>
                <p className="text-xs text-sage-600 leading-relaxed max-w-sm mx-auto mb-6">
                  Your letter has been pressed and stored in the Lumina founder archive. Our curators will contact you within 24 hours.
                </p>

                {/* Realistic certificate box */}
                <div className="relative bg-white border border-cream-300 p-6 rounded-2xl shadow-xl overflow-hidden text-left mb-6 max-w-sm mx-auto">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold-100/30 to-transparent pointer-events-none" />

                  <div className="flex justify-between items-start border-b border-cream-200 pb-3 mb-4">
                    <div>
                      <span className="log text-2xl text-sage-900 leading-none">Lumina</span>
                      <p className="text-[6px] font-sans tracking-[0.25em] text-sage-400 uppercase font-bold">
                        Celebrate You
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono tracking-widest text-gold-600 font-bold">
                        {serialNumber}
                      </span>
                      <p className="text-[6px] font-sans tracking-wider text-sage-400 uppercase">
                        INVITATION ID
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs font-sans">
                    <div>
                      <span className="text-[7.5px] font-semibold uppercase tracking-wider text-sage-400 block">APPLICANT</span>
                      <span className="font-bold text-sage-900 uppercase tracking-widest text-[11px]">
                        {form.name}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <div>
                        <span className="text-[7.5px] font-semibold uppercase tracking-wider text-sage-400 block">CORRESPONDENCE</span>
                        <span className="text-sage-700 tracking-wide font-normal text-[10px] break-all">
                          {form.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-[7.5px] font-semibold uppercase tracking-wider text-sage-400 block">STATUS</span>
                        <span className="text-gold-600 font-bold tracking-wider text-[8.5px] uppercase">
                          PENDING CLEARANCE
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-cream-200 border-dashed mt-4">
                      <div className="flex items-center space-x-1.5 text-[8.5px] text-sage-500 font-medium">
                        <Award size={12} className="text-gold-500" />
                        <span>FOUNDING CIRCLE COVENANT</span>
                      </div>

                      {/* Highly stylized 3D wax seal */}
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.2, stiffness: 150, damping: 12 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-lg cursor-pointer"
                        style={{
                          backgroundColor: getWaxHex(form.waxColor),
                          boxShadow: `
                            inset -3px -3px 8px rgba(0,0,0,0.4), 
                            inset 3px 3px 8px rgba(255,255,255,0.2), 
                            0 4px 10px rgba(0,0,0,0.25),
                            0 0 20px ${getWaxGlow(form.waxColor)}
                          `
                        }}
                      >
                        <div className="w-10 h-10 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                          <span className="text-[8px] font-serif italic text-white/90 font-bold select-none drop-shadow-md pb-0.5">
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
                  className="px-8 py-2.5 border border-sage-800 text-sage-800 text-[9px] font-sans tracking-[0.2em] font-semibold hover:bg-sage-900 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  RETURN TO COVENANT
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
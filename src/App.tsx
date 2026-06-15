import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { useAcrollReveal } from './lib/acrollReveal';

import {
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Mail,
  Compass,
  Layers,
  FileText,
  BadgeAlert,
  HelpCircle,
  Gem
} from 'lucide-react';

import Lenis from 'lenis';
import { EDITIONS, GALLERY_ITEMS, MEMBER_QUOTES } from './data';
import { Edition, GalleryItem } from './types';

// Subcomponents
import Navigation from './components/Navigation';
import EditionDrawer from './components/EditionDrawer';
import ApplicationModal from './components/ApplicationModal';
import MediaLightbox from './components/MediaLightbox';

// GSAP Premium effects
import { useHoverTilt, useParallaxAmbient, useScrollStagger } from './lib/premium-effects';
import SplitTextHeading from './components/SplitTextHeading';

export default function App() {
  // useAcrollReveal('.acroll-reveal');
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // GSAP Target Element References
  const containerRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const celesteImageRef = useRef<HTMLDivElement>(null);
  const philosophyLeftRef = useRef<HTMLDivElement>(null);
  const philosophyRightRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const pricingBlockRef = useRef<HTMLDivElement>(null);
  const womensEditionCardRef = useRef<HTMLDivElement>(null);
  const peaceEditionCardRef = useRef<HTMLDivElement>(null);
  const galleryHeaderRef = useRef<HTMLDivElement>(null);
  const founderLetterRef = useRef<HTMLDivElement>(null);
  const founderQuotesRef = useRef<HTMLDivElement>(null);

  // Holographic parallax effect for soft background glows
  useParallaxAmbient(containerRef, '.ambient-shimmer', 35);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ultra luxury custom momentum damping
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Hand-crafted luxury 3D Tilt interactive effects
  useHoverTilt(heroImageRef, 12);
  useHoverTilt(celesteImageRef, 12);
  useHoverTilt(womensEditionCardRef, 8);
  useHoverTilt(peaceEditionCardRef, 8);

  // Smooth scroll sequence trigger structures
  useScrollStagger(heroLeftRef, '.stagger-hero', 0.85);
  useScrollStagger(philosophyLeftRef, '.stagger-vignette', 0.85);
  useScrollStagger(philosophyRightRef, '.stagger-philosophy', 0.85);
  useScrollStagger(inclusionsRef, '.stagger-inclusion', 0.85);
  useScrollStagger(pricingBlockRef, '.stagger-pricing', 0.85);
  useScrollStagger(galleryHeaderRef, '.stagger-gallery', 0.85);
  useScrollStagger(founderLetterRef, '.stagger-founder', 0.85);
  useScrollStagger(founderQuotesRef, '.stagger-quotes', 0.85);

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev === 0 ? MEMBER_QUOTES.length - 1 : prev - 1));
  };

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev === MEMBER_QUOTES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div ref={containerRef} className="bg-cream-100 text-sage-800 font-sans selection:bg-gold-200 selection:text-sage-900 min-h-screen relative overflow-x-hidden">
      {/* Premium Ambient Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1000px] pointer-events-none overflow-hidden z-0">
       <div className="ambient-shimmer absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-gold-100/30 blur-[130px]" />
       <div className="ambient-shimmer absolute top-[400px] left-[-200px] w-[500px] h-[500px] rounded-full bg-sage-200/20 blur-[120px]" />
       </div>

      {/* Subtle premium dark vignette gradient for top-header depth */}
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-sage-950/50 to-transparent pointer-events-none z-10" />

      {/* Sticky Top Navigation Bar */}
      <Navigation onRequestAccess={() => setIsApplicationOpen(true)} />

      {/* ================= HERO SECTION ================= */}
<section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden acroll-reveal">
        {/* Fullscreen Backdrop Image */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_hero_banner_1781157355322_n1wgsz.png"
            alt="ODE Premium Packaging"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out select-none"
          />
          {/* Subtle Ambient Vignette & Multi-layer Shading for elite design depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-sage-950/80 via-sage-950/60 to-transparent lg:block hidden pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-sage-950/80 via-transparent to-sage-950/90 lg:hidden block pointer-events-none" />
          <div className="absolute inset-0 bg-sage-950/20 mix-blend-multiply pointer-events-none" />
      
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Glassmorphic interactive content container on the left */}
          <div
            ref={heroImageRef}
            id="hero-illustration-wrapper-cielo"
            className="lg:col-span-6 bg-white/95 backdrop-blur-xl border border-cream-300 p-8 md:p-12 rounded-3xl shadow-2xl space-y-8 transition-colors duration-500 max-w-xl lg:max-w-none"
          >
            <div ref={heroLeftRef} className="space-y-8">
              <div className="space-y-4 stagger-hero ">
                <div className="flex items-center space-x-2">
                  <span className="h-[1px] w-8 bg-gold-400" />
                  <span className="text-xs font-sans tracking-[0.35em] text-gold-600 uppercase font-bold">
                   
PRIVATE CURATED CIRCLE
                  </span>
                </div>
                
                <SplitTextHeading className="log text-5xl md:text-5xl lg:text-7xl tracking-wide text-gold-400 leading-[1.08]">
                 Lumina
                </SplitTextHeading>
                {/* <span className="block font-serif italic font-light text-gold-600 -mt-1 text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                  To Honour You
                </span> */}
                <span className="block font-serif italic font-light text-gold-600 -mt-6 text-3xl leading-[1.1]">
                  Celebrate You
                </span>
              </div>

                <span className="block font-serif italic font-light  text-sage-800  text-base leading-[1.1]">
                  A year of beautiful surprises to celebrate you.</span>


              <p  className="stagger-hero text-sm  -mt-4  text-sage-900 leading-relaxed font-normal">
               A handful of times a year, carefully chosen gifts arrive for you because your steps towards possibility, clarity and joy are worth celebrating. 
              </p>

              {/* Bullet list of editions */}
              <div className="stagger-hero space-y-5 pt-4 border-t border-cream-300 font-sans">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-cream-200 text-gold-600 shrink-0 border border-cream-300/50">
                    <Calendar size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans tracking-widest font-bold text-sage-900 uppercase">
                      Women's Day Edition
                    </h4>
                    <p className="text-base text-sage-700 font-medium mt-0.5 animate-pulse-subtle">Dispatched annually on March 8 • Focus on bravery</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-cream-200 text-gold-600 shrink-0 border border-cream-300/50">
                    <Calendar size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans tracking-widest font-bold text-sage-900 uppercase">
                      Peace Day Edition
                    </h4>
                    <p className="text-base text-sage-700 font-medium mt-0.5">Dispatched annually on September 21 • Focus on rest</p>
                  </div>
                </div>
              </div>

              {/* CTA action buttons */}
              <div className="stagger-hero space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    id="hero-request-access"
                    onClick={() => setIsApplicationOpen(true)}
                    className="px-8 py-6.5 bg-sage-900 text-cream-100 hover:bg-gold-600 font-sans text-xs tracking-[0.25em] font-medium transition-all duration-500 uppercase rounded-full shadow-md cursor-pointer"
                  >
                    Request an Invitation

                  </button>
                  <div>
                  <div className="flex items-center space-x-2 text-base text-sage-900 font-semibold px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                    <span className="tracking-wide"> 400 Memberships</span>
                  </div>
                  <div className="flex items-center space-x-2 text-base text-sage-900 font-semibold px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                    <span className="tracking-wide">40  Reviews ongoing</span>
                  </div>
                </div>

                  </div>
               
              </div>
            </div>
          </div>

          {/* Floating elite wax seal details card badge on the right - on desktop */}
          <div className="lg:col-span-6 lg:flex hidden justify-end items-end h-full self-end pb-12">
            <div className="py-4 px-6 rounded-2xl bg-cream-50/95 backdrop-blur-md border border-gold-300/30 max-w-sm shadow-xl transform translate-y-8 animate-fade-in animate-duration-1000">
              <p className="text-[12px] font-semibold tracking-[0.3em] font-semibold text-gold-600 uppercase mb-1">
                THE FOUNDING SEAL
              </p>
              <p className="font-serif italic text-sage-900 text-sm leading-relaxed">
                "Every collection arrives nestled in hand-pressed envelope seals, delivering scent, texture, and beautiful stillness."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= THELumina PHILOSOPHY ================= */}
<section id="philosophy" className="py-24 bg-cream-200/50 border-y border-cream-300/40 px-6 lg:px-12 acroll-reveal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Visual Vignettes */}
          <div ref={philosophyLeftRef} className="lg:col-span-5 grid grid-cols-12 gap-4">
            <div className="col-span-8 overflow-hidden rounded-2xl aspect-[4/3] border border-cream-300 shadow-sm stagger-vignette">
              <img
                src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_hero_banner_1781157355322_n1wgsz.png"
                alt="Scented Candle and Ribbon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-4 overflow-hidden rounded-2xl h-full border border-cream-300 shadow-sm flex items-center justify-center bg-white p-3 stagger-vignette">
    <div className="text-center space-y-3">
      <span className="font-serif text-4xl md:text-5xl font-light text-gold-500 block">
        400
      </span>
      <p className="text-[10px] md:text-xs font-sans tracking-[0.25em] text-sage-700 font-bold uppercase">
       LIMITED
MEMBERS
      </p>
    </div>
  </div>
            <div className="col-span-12 overflow-hidden rounded-2xl aspect-[16/9] border border-cream-300 shadow-sm relative group stagger-vignette">
              <img
                src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_peace_day_1781157387142_jjfw9g.jpg"
                alt="Tactile Experience of Packaging"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter transition duration-500 brightness-95"
              />
              <div className="absolute inset-0 bg-sage-900/10 mix-blend-multiply" />
            </div>
          </div>

          {/* Right Column: Narrative philosophy */}
          <div ref={philosophyRightRef} className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-2 stagger-philosophy">
              <SplitTextHeading className="text-sm font-sans tracking-[0.3em] text-gold-500 font-semibold uppercase block">
                WHY LUMINA / WHY CELEBRATE YOU
              </SplitTextHeading>
              {/* <SplitTextHeading className="font-serif text-4xl md:text-5xl text-sage-900 tracking-tight leading-tight">
                We celebrate everyone.
              </SplitTextHeading>
              <span className="italic font-light text-gold-600 block mt-1 text-3xl md:text-4xl leading-tight">
                Until we forget ourselves.
              </span> */}
            </div>

            <div className="space-y-6 text-sm md:text-[15px] text-sage-900 font-normal leading-relaxed max-w-xl stagger-philosophy ">
              <p>
For years, my girlfriends and I sent flower photographs to each other regularly to honor and celebrate each other. More recently, a friend of mine sent surprise books for a year to a friend of hers to celebrate a milestone birthday year. Good surprises always bring you fully into the moment and into joy.              </p>
              <p>
                <strong className="font-semibold text-sage-950">LUMINA exists as a reminder to celebrate yourself </strong> and notice your steps — however ‘small’ they may feel — towards greater possibility, clarity, and joy.
              </p>
              <p>Through the element of surprise and beautiful objects, LUMINA hopes to create moments of delight and appreciation. A time to pause, notice beauty, and remind you of your own light.</p>
            </div>
           
           <div > <button
            id="pricing-request-access"
            onClick={() => setIsApplicationOpen(true)}
            className="w-[40%] py-8 bg-sage-900 hover:bg-gold-600 hover:shadow-lg text-cream-100 uppercase tracking-[0.25em] text-xs font-sans font-bold transition-all duration-500 rounded-full cursor-pointer shadow-md"
          >
            Request an Invitation

          </button></div>

            {/* <div className="pt-4 border-t border-cream-300/80 max-w-md font-serif italic text-sage-950 text-[16px] space-y-2 stagger-philosophy">
              <p className="leading-relaxed">"No decisions. No searching. No expectations.</p>
              <p className="text-gold-600 font-medium tracking-wide">Only the pleasure of surprise."</p>
            </div> */}
          </div>

        </div>
      </section>

      {/* ================= THETHE EXPERIENCE
 ================= */}
     
      {/* ================= EXPERIENCE ================= */}
<section id="experience" className="py-22 bg-[#faf8f5] px-6 lg:px-22 relative border-b border-cream-200 acroll-reveal">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <SplitTextHeading className="text-xs font-sans tracking-[0.4em] text-gold-500 font-bold uppercase block">
              THE EXPERIENCE
            </SplitTextHeading>
            {/* <SplitTextHeading className="font-serif text-3xl md:text-5xl text-sage-950 tracking-wide font-normal leading-tight">
              A Bespoke Curation Ritual
            </SplitTextHeading> */}
            <p  className="text-sm text-sage-600 font-sans font-light max-w-lg mx-auto">
              Throughout the year you receive between four to seven individual surprises that arrive at your door. <strong className="font-semibold text-sage-700 italic">The item and timing are not revealed in advance- why? </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Curation Info Left */}
            <div ref={womensEditionCardRef} id="edition-card-womens-day" className="p-10 bg-white border border-gold-600 rounded-3xl shadow-sm space-y-6">
              <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-gold-600 uppercase">THE BLUEPRINT</span>
              <h3 className="font-serif text-2xl text-sage-950">Guided by Your Preferences</h3>
              <p className="text-sm text-sage-600 font-light leading-relaxed">
                Every LUMINA surprise is guided by your preferences.We look forward to thoughtfully selecting items for you. You may receive something to wear, something for your home, a book, or something to inspire you. We seek out artists, makers, designers, and independent brands whose work is delightful and is meaningful.

              </p>
            </div>

            {/* Curation Info Right */}
            <div ref={philosophyRightRef} id="edition-card-intention" className="p-10 bg-white border border-gold-600 rounded-3xl shadow-sm space-y-6">
              <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-gold-600 uppercase">THE INTENTION</span>
              <h3 className="font-serif text-2xl text-sage-950">Self-Rediscovery</h3>
              <p className="text-sm text-sage-700 font-light leading-relaxed">
               Lumina’s selections invite self-celebration and self-rediscovery and are chosen for their beauty, craftsmanship, and purpose. Each item is chosen to bring beauty, meaning, and joy into your everyday life.
              </p>
            </div>
          </div>

          {/* Curated Categories
          <div className="bg-cream-100/50 rounded-2xl p-8 border border-cream-200 text-center space-y-6">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.25em] text-sage-800 font-bold">CURATED CATEGORIES INCLUDE</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {['Wearing Apparel', 'Home Comforts', 'Independent Lit', 'Atmospheric Scents', 'Artisan Keepsakes', 'Inspirational Treasures'].map((cat, index) => (
                <span key={index} className="px-4 py-2 bg-white rounded-full text-xs text-sage-850 border border-cream-300 font-medium tracking-wide">
                  {cat}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </section>




      {/* ================= THE FOUNDING MEMBERSHIP SUMMARY ================= */}
     
      {/* ================= THE MEMBERSHIP SUMMARY ================= */}
<section id="membership" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto relative border-b border-cream-250 acroll-reveal">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-sans tracking-[0.4em] text-gold-500 font-bold uppercase block">
            THE MEMBERSHIP
          </span>
          <SplitTextHeading className="font-serif text-3xl md:text-4xl lg:text-5xl text-sage-950 tracking-wide font-normal">
            Select Your Covenant Tier
          </SplitTextHeading>
          <p
           className="text-sm md:text-base text-sage-500 tracking-wide font-light max-w-lg mx-auto leading-relaxed">
            Choose your annual membership level. Both memberships receive a minimum of four surprise arrivals throughout the year, with a maximum of 400 members globally.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto mb-18">
          
          {/* Cielo Tier Card */}
          <motion.div  
          ref={heroImageRef}
            id="hero-illustration-wrapper-cielo"
            // whileHover={{ y: -8 }}
            className="p-10 md:p-14 bg-white border-2 border-cream-200/80 rounded-[32px] shadow-sm flex flex-col justify-between space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/20 rounded-bl-full pointer-events-none" />
            <div className="space-y-6">
              <motion.div 
               whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
  }}
  whileHover={{
    y: -5,
  }}
               className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold tracking-[0.35em] text-gold-600 uppercase">TIER I • CIELO</span>
                <span className="h-2 w-2 rounded-full bg-gold-400" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="font-serif text-4xl text-sage-950 font-light">Cielo</h3>
                <p className="font-sans text-3xl font-semibold text-sage-900 tracking-tight">
                  USD 350 <span className="text-xs font-normal text-sage-500 tracking-normal">annually</span>
                </p>
              </div>
              <p className="text-sm text-sage-600 font-light leading-relaxed leading-loose">
                Receive beautiful, carefully chosen surprise arrivals delivered directly to your doorstep. Tailored meticulously to surprise, inspire, and act as a profound ritual.
              </p>
              <ul className="space-y-3 pt-4 text-xs font-sans text-sage-700">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                  Minimum of four (4) surprise deliveries
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                  Guided strictly by your detailed preferences
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                  All invoicing done securely via email correspondence
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsApplicationOpen(true)}
              className="w-full py-4 border border-sage-950 text-sage-950 hover:bg-sage-950 hover:text-white transition-all duration-500 font-sans text-xs tracking-[0.25em] font-bold uppercase rounded-full cursor-pointer"
            >
              REQUEST AN INVITATION
            </button>
          </motion.div>

          {/* Celeste Tier Card */}
          <motion.div 
            // whileHover={{ y: -8 }} 
            ref={celesteImageRef}
            id="hero-illustration-wrapper-celeste"
            className="p-10 md:p-14 bg-[#101712] text-cream-100 border-2 border-gold-400/20 rounded-[32px] shadow-lg flex flex-col justify-between space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-bl-full pointer-events-none" />
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold tracking-[0.35em] text-gold-400 uppercase">TIER II • CELESTE</span>
                <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-4xl text-white font-light">Celeste</h3>
                <p className="font-sans text-3xl font-semibold text-gold-400 tracking-tight">
                  USD 700 <span className="text-xs font-normal text-sage-300 tracking-normal">annually</span>
                </p>
              </div>
              <p className="text-sm text-sage-300 font-light leading-relaxed leading-loose">
                An extensive, heightened annual surprise series spaced meticulously across the seasonal cycles. Curated with elite designer accessories and precious sensory objects.
              </p>
              <ul className="space-y-3 pt-4 text-xs font-sans text-sage-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                  Premium surprise arrivals distributed throughout the year
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                  Extensive materials & olfactory preference selection
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                  Private concierge communication & customization
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsApplicationOpen(true)}
              className="w-full py-4 bg-gold-500 text-slate-950 hover:bg-gold-400 transition-all duration-500 font-sans text-xs tracking-[0.25em] font-bold uppercase rounded-full cursor-pointer"
            >
              REQUEST AN INVITATION
            </button>
          </motion.div>

        </div>

        {/* Global Membership limits */}
        <div className="text-center  border-dashed max-w-4xl mx-auto mb-4  ">
          <p className="font-serif italic text-sage-950 text-sx  leading-snug">
            • Membership is limited strictly to four hundred members globally,
          </p>
          <p className="font-serif italic text-sage-950 text-sx  leading-snug">
           Memberships for 2027 close on December 31, 2026.
          </p>
        </div>

        {/* GIFTING block */}
        <div className="py-16 border-t border-cream-200 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 text-center md:text-left space-y-2">
            <span className="text-[10px] font-sans tracking-[0.3em] text-gold-500 font-bold uppercase block">
              GIFTING COVENANT
            </span>
            <p className="font-serif italic text-sage-950 text-2xl lg:text-3xl leading-snug">
              For yourself, or for a woman you wish to celebrate.
            </p>
          </div>
          <div className="md:col-span-7 bg-[#faf8f5] p-8 rounded-2.5xl border border-cream-200">
            <p className="text-sm text-sage-700 leading-relaxed font-light">
              LUMINA may be joined for yourself or offered as a gift. When gifted, the recipient becomes the Lumina member, enjoying all bespoke preference profiling and direct curation benefits.
            </p>
          </div>
        </div>

        {/* A NOTE ON RETURNS block */}
        <div className="py-12 border-t border-cream-200 max-w-5xl mx-auto space-y-4">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold-400" />
            <span className="text-[10px] font-sans tracking-[0.3em] text-gold-500 font-bold uppercase">
              A NOTE ON RETURNS
            </span>
          </div>
          <p className="text-sm text-sage-600 leading-relaxed font-light">
            Each LUMINA surprise is carefully chosen and offered as an annual collection. For this reason, returns cannot be accepted. If anything arrives damaged, please write to us at <a href="mailto:request@luminacelebrateyou.com" className="text-gold-600 hover:underline font-medium">request@luminacelebrateyou.com</a> within seven days and we will make it right.
          </p>
        </div>

        {/* Registration Bottom CTA */}
        <div ref={pricingBlockRef} className="pt-16 max-w-xl mx-auto text-center space-y-6 relative">
          <p className="text-[14px] text-sage-500 font-sans font-light italic leading-relaxed">
            All registration, invoicing, terms, and detailed aesthetic profiling are completed securely via direct email correspondence after review.
          </p>
          <button
            id="pricing-request-access"
            onClick={() => setIsApplicationOpen(true)}
            className="w-full py-5 bg-sage-950 hover:bg-gold-500 hover:shadow-xl text-cream-100 uppercase tracking-[0.3em] text-xs font-sans font-bold transition-all duration-500 rounded-full cursor-pointer shadow-lg"
          >
            REQUEST AN INVITATION
          </button>
        </div>
      </section>

      {/* ================= THE EDITIONS (Parallel Cards) ================= */}
<section id="editions" className="py-24 bg-sage-900 text-cream-100 px-6 lg:px-12 relative overflow-hidden acroll-reveal">
        {/* Subtle dark green glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#abbfb1_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-800 pb-8">
            <div className="space-y-3">
              <span className="text-[9px] font-sans tracking-[0.3em] text-gold-400 font-semibold uppercase block">
                ANNUAL CURATION SCHEDULE
              </span>
              <SplitTextHeading className="font-serif text-3xl md:text-4xl text-white tracking-wide font-normal">
                The Dual Seasonal Curations
              </SplitTextHeading>
            </div>
            <p className="text-xs md:text-sm text-sage-300 font-sans font-light max-w-sm">
              Each edition is crafted over twelve months, sourcing extraordinary objects and fine sensory components from trusted international niche creators.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            
            {/* Left Card: Women's Day */}
            <div
              ref={womensEditionCardRef}
              id="edition-card-womens-day"
              // onClick={() => setSelectedEdition(EDITIONS[0])}
              className="group cursor-pointer space-y-6"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] border border-sage-800 bg-sage-800 shadow-xl">
                <img
                  src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_womens_day_1781157374710_kemfpa.jpg"
                  alt={EDITIONS[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95 opacity-90 transition-transform duration-700 group-hover:scale-103 group-hover:brightness-100"
                />
                {/* Visual marker */}
                <div className="absolute top-4 left-4 bg-cream-100/90 backdrop-blur-sm px-3.5 py-1 rounded-full border border-gold-400/20 text-[9px] font-sans font-semibold tracking-widest text-gold-700 uppercase">
                  MARCH 8 DISPATCH
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-white tracking-wide group-hover:text-gold-300 transition-colors">
                    {EDITIONS[0].title}
                  </h3>
                  {/* <span className="text-gold-400 flex items-center gap-1 text-[11px] font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    EXAMINE <ArrowRight size={12} className="inline" />
                  </span> */}
                </div>
                <p className="text-gold-300 italic font-serif text-[15px]">
                  {EDITIONS[0].theme}
                </p>
                <p className="text-xs text-sage-300 font-sans font-light leading-relaxed">
                  A celebration of unshakeable confidence, bravery and limitless possibility. Specially generated to honor the woman you are becoming.
                </p>
              </div>
            </div>

            {/* Right Card: Peace Day */}
            <div
              ref={peaceEditionCardRef}
              id="edition-card-peace-day"
              // onClick={() => setSelectedEdition(EDITIONS[1])}
              className="group cursor-pointer space-y-6"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] border border-sage-800 bg-sage-800 shadow-xl">
                <img
                  src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_peace_day_1781157387142_jjfw9g.jpg"
                  alt={EDITIONS[1].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95 opacity-90 transition-transform duration-700 group-hover:scale-103 group-hover:brightness-100"
                />
                {/* Visual marker */}
                <div className="absolute top-4 left-4 bg-cream-100/90 backdrop-blur-sm px-3.5 py-1 rounded-full border border-gold-400/20 text-[9px] font-sans font-semibold tracking-widest text-gold-700 uppercase">
                  SEPTEMBER 21 DISPATCH
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-white tracking-wide group-hover:text-gold-300 transition-colors">
                    {EDITIONS[1].title}
                  </h3>
                  {/* <span className="text-gold-400 flex items-center gap-1 text-[11px] font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    EXAMINE <ArrowRight size={12} className="inline" />
                  </span> */}
                </div>
                <p className="text-gold-300 italic font-serif text-[15px]">
                  {EDITIONS[1].theme}
                </p>
                <p className="text-xs text-sage-300 font-sans font-light leading-relaxed">
                  A collection inspired by deep silence, restoration and active presence. Built to act as a profound physical sanctuary inside your home.
                </p>
              </div>
            </div>

          </div>

          {/* <div className="text-center pt-8">
            <span className="text-base font-sans font-light italic text-sage-400">
              * Click on either card above to dissect inside each bespoke curation.
            </span>
          </div> */}

        </div>
      </section>

      

      {/* ================= FOUNDER NOTE & QUOTES CAROUSEL ================= */}
<section id="Community" className="py-24 bg-cream-50 border-t border-cream-200 px-6 lg:px-24 acroll-reveal">
        <div className="max-w-full mx-auto grid grid-cols-1  gap-12 lg:gap-16 items-start">
          
          {/* Left Panel: Founder Note */}
          <div ref={founderLetterRef} className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-cream-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Portrait */}
            <div className="md:col-span-5 stagger-founder">
              <div  className=" overflow-hidden rounded-2xl border border-cream-300 shadow-sm relative group">
                <img  
                  src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510557/Odefounder_ybhyt1.jpg"
                  alt="Founder ofLumina"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover  transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* <p className="text-xs text-center text-sage-600 font-sans tracking-widest font-bold uppercase mt-4">
                FOUNDER & CURATOR
              </p> */}
               {/* <div className="pt-5 border-t border-cream-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-sage-500 font-sans tracking-wide">With gratitude,</p>
                  <p className="font-serif text-xl font-bold text-gold-600 mt-0.5 tracking-wide uppercase">founder </p>
                </div>
                <div className="h-11 w-11 rounded-full border border-gold-300 bg-gold-50/20 flex items-center justify-center font-serif italic text-gold-600 text-xl font-medium pl-0.5 pointer-events-none select-none shadow-sm">
                  M
                </div>
              </div> */}
            </div>

            {/* Letter Text */}
            <div className="md:col-span-7 space-y-6 stagger-founder">
              <div>
                {/* <span className="text-xs font-sans tracking-[0.3em] text-gold-600 font-bold uppercase block mb-1">
                  A NOTE FROM THE FOUNDER
                </span> */}
                <SplitTextHeading className="text-xs font-sans tracking-[0.3em] text-gold-600 font-bold uppercase block mb-1">
                THE COMMUNITY
                </SplitTextHeading>
                 <div className="pt-5 border-t border-cream-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-sage-500 font-sans tracking-wide">Founder,</p>
                  <p className="font-serif text-xl font-bold text-gold-600 mt-0.5 tracking-wide uppercase">Manisha </p>
                </div>
                <div className="h-11 w-11 rounded-full border border-gold-300 bg-gold-50/20 flex items-center justify-center font-serif italic text-gold-600 text-xl font-medium pl-0.5 pointer-events-none select-none shadow-sm">
                  M
                </div>
              </div>
                
              </div>
              
              <div className="font-serif text-base leading-relaxed text-sage-900 space-y-5 font-normal">
                <p ref={inclusionsRef}> 
                    One of the best compliments I have ever received is to be thanked for my world of time. Unhurried time for my friends. The other is that I could curate anything - from a meal, to an event, to a home to a closet and it would be appreciated                </p>
                <p ref={inclusionsRef}>
                          I am someone who sees the strengths in other women and appreciates the most unique qualities about them. I am in awe of women. And it has taken me a while to be in awe of myself, but I am closer than I have ever been. I want to celebrate other women and myself. LUMINA is my way of extending that celebration to a wider community of women.
                </p>
                <p ref={inclusionsRef} className="text-gold-700 font-medium italic text-lg leading-snug border-l-2 border-gold-400 pl-4 py-1 my-3 bg-gold-50/40 pr-2">
                            LUMINA is a community built around appreciation, beauty, generosity, and joy.
                  </p>
              </div>

             
          {/* <div ref={founderQuotesRef} className="lg:col-span-5 space-y-8 pt-4  ">
            <div className="space-y-3 stagger-quotes">
              <span className="text-xs font-sans tracking-[0.3em] text-gold-600 font-bold uppercase block">
                CORRESPONDENCE NOTES
              </span>
              <SplitTextHeading className="font-serif text-2xl md:text-3xl text-sage-950 tracking-wide font-normal">
                Notes From Our Members
              </SplitTextHeading>
            </div> */}

            {/* Slider Card */}
            {/* <div className="relative bg-white p-8 rounded-2xl border border-cream-200/80 shadow-md min-h-[220px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg"> */}
              
              {/* Quote marks background decoration */}
              {/* <div className="absolute top-4 right-6 text-gold-200/60 text-7xl font-serif leading-none select-none pointer-events-none"> */}
                
              {/* </div> */}

              {/* Text content with transitions */}
              {/* <div className="relative z-10 space-y-4">
                <AnimatePresence mLumina="wait">
                  <motion.p
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.35 }}
                    className="font-serif italic text-[15.5px] leading-relaxed text-sage-900"
                  >
                    "{MEMBER_QUOTES[currentQuoteIndex].quote}"
                  </motion.p>
                </AnimatePresence>
              </div> */}

              {/* Slider footer */}
              {/* <div className="flex items-center justify-between pt-6 border-t border-cream-200">
                <AnimatePresence mLumina="wait">
                  <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-sm font-serif font-bold text-sage-950">
                      {MEMBER_QUOTES[currentQuoteIndex].author}
                    </p>
                    <p className="text-xs text-sage-500 font-semibold tracking-wider mt-0.5 font-sans">
                      {MEMBER_QUOTES[currentQuoteIndex].yearJoined}
                    </p>
                  </motion.div>
                </AnimatePresence> */}

                {/* Controls */}
                {/* <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={prevQuote}
                    className="p-2 rounded-full hover:bg-cream-100 hover:text-gold-600 border border-cream-300 text-sage-700 transition cursor-pointer"
                    aria-label="Previous note"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextQuote}
                    className="p-2 rounded-full hover:bg-cream-100 hover:text-gold-600 border border-cream-300 text-sage-700 transition cursor-pointer"
                    aria-label="Next note"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div> */}

            {/* Authenticity Pledge Card */}
            {/* <div className="p-5 border border-cream-300 bg-white rounded-xl shadow-sm flex items-start gap-3 transition-colors hover:border-gold-300">
              <div className="mt-0.5 text-gold-600 shrink-0">
                <Compass size={18} />
              </div>
              <div className="space-y-1.5">
                <h5 className="font-serif text-sm text-sage-950 font-bold">Provenance Guarantee</h5>
                <p className="text-xs text-sage-700 font-medium font-sans leading-relaxed">
                  A private directory is archived internally.Lumina does not monetize, sell, or publicize any member data or mailing details.
                </p>
              </div>
            </div> */}

          {/* </div> */}
            </div>

          </div>

          {/* Right Panel: Feedback quote slider */}

        </div>
      </section>


            {/* ================= RETREATS ================= */}
<section id="retreats" className="py-28 bg-sage-900 text-cream-100 px-6 lg:px-12 relative overflow-hidden acroll-reveal">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#faf8f5_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          <div className="lg:col-span-5 overflow-hidden rounded-[24px] aspect-[3/4] border border-sage-800/80 shadow-2xl relative">
            <img
              src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510560/odeBoxs_mdzghh.png"
              alt="Deep restful nature sanctuary"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-sage-950/20" />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-sans tracking-[0.45em] text-gold-400 font-bold uppercase block">
                REST & RESTORATION
              </span>
              <SplitTextHeading className="font-serif text-4xl lg:text-5xl text-white tracking-wide leading-tight">
                Our Private Curated Retreats
              </SplitTextHeading>
            </div>
            
            <p className="text-sm md:text-base text-sage-200 leading-relaxed font-light">
              In time, LUMINA will host digital conversations, intimate retreats and thoughtfully designed experiences for members. Details will be shared with the community first.
            </p>

            <div className="pt-6 border-t border-sage-800 flex flex-wrap gap-8">
              <div>
                <span className="font-serif text-gold-400 text-3xl font-light">Rest & Pause</span>
                <p className="text-xs text-sage-300 mt-1">Slow living coordinates without noise</p>
              </div>
              <div>
                <span className="font-serif text-gold-400 text-3xl font-light">Explore Joy</span>
                <p className="text-xs text-sage-300 mt-1">Sanctuary walks & sensory integration</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA BOTTOM BANNER ================= */}
<section className="relative h-[480px] md:h-screen flex items-center justify-center overflow-hidden acroll-reveal">
        {/* Parallax structure background */}
        <div className="absolute inset-0 bg-sage-900">
          <img
            src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_hero_banner_1781157355322_n1wgsz.png"
            alt="ODE background texture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-32 contrast-[1.05]"
          />
        </div>

        {/* Floating elements inside banner */}
        <div className="relative max-w-2xl mx-auto px-6 text-center space-y-8 z-10 text-white">
          <div className="space-y-3">
            <span className="text-[9px] font-sans tracking-[0.4em] text-gold-400 font-semibold block uppercase">
INVITATION ONLY
            </span>
             <SplitTextHeading className="font-serif text-3xl md:text-5xl tracking-wide leading-tight text-white font-normal">
              Lumina Invitation Request
            </SplitTextHeading>
            <span className="font-script text-white block text-3xl md:text-5xl mt-1 text-gold-300">Celebrate You</span>
          </div>
  <p className="text-xs md:text-sm text-sage-200 leading-relaxed max-w-md mx-auto font-light">
            400 active memberships are curated annually. Applications are examined strictly upon detail of character and appreciation for physical craftsmanship.
          </p>

          <div className="space-y-3">
            <button
              id="cta-request-access"
              onClick={() => setIsApplicationOpen(true)}
              className="px-10 py-4 bg-gold-400 text-sage-950 font-sans text-xs tracking-[0.25em] font-medium hover:bg-white hover:text-sage-950 hover:shadow-lg transition-all duration-500 uppercase rounded-full"
            >
              Request an Invitation

            </button>
            <p className="text-sm text-sage-300 italic">
              Applications are reviewed individually on a rolling basis.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-sage-950 text-sage-100/90 py-7 px-6 lg:px-23 border-t border-sage-900">
        <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Brand */}

          <div>
             <div className="flex flex-col items-center  md:w-fit justify-center">
          <img
            src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510557/ODELOGO_wtwz1j.png"
            alt="ODE background texture"
            referrerPolicy="no-referrer"
            className="w-[60px]  ml-4 object-cover filter  contrast-[1.05]"
          />
           <span className="log text-4xl  text-gold-400 transition-colors duration-300 group-hover:text-gold-500">
              Lumina
            </span>
            <span className="text-[8px] font-sans tracking-[0.35em] text-gold-400 uppercase -mt-0.5">
             Celebrate You
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start  justify-center  text-center md:text-left">
         
            <p className="text-sm text-sage-400 md:max-w-xs mt-3 leading-relaxed font-light">
              An annual tactile gift experience and private membership circle designed to celebrate the outstanding beauty in a woman’s soul.
            </p>
          </div>
          </div>


          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[14px]  tracking-[0.2em] uppercase font-semibold
">
            <a href="#membership" className="font-semibold text-sm hover:text-gold-400 transition ">THE MEMBERSHIP</a>
            <a href="#philosophy" className="font-semibold text-sm hover:text-gold-400 transition ">OUR PHILOSOPHY</a>
            <a href="#founder" className="font-semibold text-sm hover:text-gold-400 transition ">FOUNDER</a>
            <a href="#editions" className="font-semibold text-sm hover:text-gold-400 transition ">THE EDITIONS</a>
            <a href="#gallery" className="font-semibold text-sm hover:text-gold-400 transition ">WHAT ARRIVES</a>
          </div>

          {/* Contact / Socials */}
          <div className="flex items-center space-x-6 text-sage-400 shrink-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-sage-900 hover:bg-gold-500 hover:text-white transition rounded-full border border-sage-800"
              aria-label="Instagram Profile"
            >
              <Instagram size={16} />
            </a>
            <a
              href="mailto:curator@Lumina.membership"
              className="p-2 bg-sage-900 hover:bg-gold-500 hover:text-white transition rounded-full border border-sage-800"
              aria-label="Contact Curator"
            >
              <Mail size={16} />
            </a>
          </div>

        </div>

        {/* Disclaimer / Credits */}
        <div className="max-w-full   mx-auto border-t border-sage-900   mt-5  flex flex-col sm:flex-row justify-between gap-4 text-xs text-sage-500 font-sans tracking-wide">
          <p className="mt-4">© {new Date().getFullYear()} Lumina Circlet. All covenants reserved globally.</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:underline">Privacy Charter</a>
            <a href="#" className="hover:underline">Membership Terms</a>
          </div>
        </div>
      </footer>

      {/* ================= MODALS & DRAWERS ================= */}
      
      {/* 1. Seasonal Edition Deep Dive Bottom Drawer */}
      <AnimatePresence>
        {selectedEdition && (
          <EditionDrawer
            edition={selectedEdition}
            onClose={() => setSelectedEdition(null)}
            onRequestAccess={() => setIsApplicationOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* 2. Personalized Sealing Letter Modal */}
      <AnimatePresence>
        {isApplicationOpen && (
          <ApplicationModal
            isOpen={isApplicationOpen}
            onClose={() => setIsApplicationOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 3. Immersive Gallery Lightbox Image Narrative */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <MediaLightbox
            item={selectedGalleryItem}
            onClose={() => setSelectedGalleryItem(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

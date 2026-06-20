import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Calendar, Instagram, Mail, ArrowDown, Sparkles } from 'lucide-react';

import { initSmoothScroll, initScrollAnimations } from './lib/scrollEngine';
import { EDITIONS, GALLERY_ITEMS, MEMBER_QUOTES } from './data';
import { Edition, GalleryItem } from './types';
import { IMAGES } from './constants/images';

import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import RevealHeading from './components/RevealHeading';
import EditionDrawer from './components/EditionDrawer';
import ApplicationModal from './components/ApplicationModal';
import MediaLightbox from './components/MediaLightbox';

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  useEffect(() => {
    const cleanupScroll = initSmoothScroll();
    let cleanupAnimations = () => {};

    const timer = setTimeout(() => {
      if (rootRef.current) {
        cleanupAnimations = initScrollAnimations(rootRef.current);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      cleanupAnimations();
      cleanupScroll();
    };
  }, []);

  const openApplication = () => setIsApplicationOpen(true);

  return (
     <div ref={rootRef} className="relative min-h-screen bg-ink text-cream-100">
      <div className="grain-overlay" aria-hidden />
      <ScrollProgress />
      <Navigation onRequestAccess={openApplication} />

      {/* ═══ PINNED CINEMATIC HERO ═══ */}
      <section id="hero-pin" className="relative h-screen overflow-hidden">
        <div className="hero-bg absolute inset-0 will-change-transform">
          <img
            src={IMAGES.hero}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink pointer-events-none" />
        <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/30 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <p className="hero-outline-text m text-outline-gold opacity-30 translate-y-8">Lumina</p>
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-20 md:pb-28">
          <div className="hero-badge inline-flex items-center gap-3 mb-8 w-fit glass-light rounded-full px-5 py-2">
            <Sparkles size={14} className="text-gold-400" />
            <span className="section-label !text-[9px] !tracking-[0.35em] text-gold-300">Private Curated Circle</span>
          </div>

          <h1 className="hero-title pl-2 font-script text-[clamp(4rem,12vw,9rem)] leading-[0.9] gold-gradient-text mb-2">
            Lumina
          </h1>
          <p className="hero-subtitle font-display italic text-3xl md:text-5xl text-champagne/90 mb-4">
            Celebrate You
          </p>
          <p className="hero-tagline max-w-lg text-sm md:text-base text-cream-100/65 font-light leading-relaxed mb-10">
            A year of beautiful surprises — carefully chosen gifts that honour your steps toward possibility, clarity, and joy.
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-5">
            <button type="button" onClick={openApplication} className="btn-primary">
              Request an Invitation
            </button>
            <div className="flex flex-col gap-1 text-xs tracking-widest uppercase text-gold-400/80">
              <span>40 Memberships</span>
              <span className="text-cream-100/40">Applications reviewed ongoing</span>
            </div>
          </div>

          <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-400/60">
            <span className="text-[9px] tracking-[0.4em] uppercase">Scroll to discover</span>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee-wrap py-8  bg-[#f1e9da] border-y border-gold-400/10 ">
        <div className="marquee-track">
          {[...Array(2)].map((_, gi) => (
            <div key={gi} className="flex gap-10 pr-16 ">
              {['Celebrate You','Lumina','Surprise & Delight','40 Members','Curated With Care',  ].map((t) => (
                <span key={`${gi}-${t}`} className="marquee-item   tracking-[11px] text-[#c9a96e] font-semibold  ">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PHILOSOPHY ═══ */}
      <section id="philosophy" className="scroll-section py-28 md:py-36 px-6 md:px-12 bg-cream-100 text-sage-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold-100/40 blur-[120px] pointer-events-none" data-parallax="0.15" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div data-reveal="clip" className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
            <img src={IMAGES.peaceDay} alt="Lumina curation" referrerPolicy="no-referrer" className="w-full h-full object-cover" data-parallax="0.08" />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-800/25 to-transparent" />
            <div className="absolute bottom-8 left-8 glass-panel rounded-2xl px-6 py-4">
              <span className="font-display text-5xl text-gold-600 block leading-none">40</span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-sage-700">Limited Members</span>
            </div>
          </div>

          <div className="space-y-8">
            <span className="section-label text-gold-600" data-reveal="up">Our Philosophy</span>
            <RevealHeading className="text-4xl md:text-6xl text-sage-950 leading-[1.05]">
              Why Lumina exists
            </RevealHeading>
            <div className="space-y-5 text-sage-800/85 leading-relaxed font-light" data-stagger>
              <p data-stagger-item>
                For years, my girlfriends and I sent flower photographs to honour one another. Good surprises bring you fully into the moment — into joy.
              </p>
              <p data-stagger-item>
                <strong className="font-medium text-sage-950">Lumina exists as a reminder to celebrate yourself</strong> and notice your steps toward greater possibility, clarity, and joy.
              </p>
              <p data-stagger-item>
                Through surprise and beautiful objects, we create moments of delight — a pause to notice beauty and your own light.
              </p>
            </div>
            <button type="button" onClick={openApplication} className="btn-outline !text-sage-900 !border-sage-800/30 hover:!bg-sage-900 hover:!text-cream-100" data-reveal="up" data-reveal-delay="0.2">
              Join the Circle
            </button>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" className="py-28 md:py-36 px-6 md:px-12 bg-[#faf7f2] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="section-label" data-reveal="up">The Experience</span>
            <RevealHeading className="text-4xl md:text-5xl text-sage-800" data-reveal="up">
              Four to seven surprises a year
            </RevealHeading>
            <p className="text-sage-800 font-light leading-relaxed" data-reveal="up">
              Each arrival is unannounced — the item and timing remain a secret, because anticipation is part of the ritual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8  " data-stagger>
            {[
              {
                label: 'The Blueprint',
                title: 'Guided by Your Preferences',
                body: 'Every surprise is guided by your preferences. You may receive something to wear, for your home, a book, or something to inspire — from artists and makers whose work is delightful and meaningful.',
              },
              {
                label: 'The Intention',
                title: 'Self-Rediscovery',
                body: 'Selections invite self-celebration and are chosen for beauty, craftsmanship, and purpose — bringing meaning and joy into everyday life.',
              },
            ].map((card) => (
              <div
                key={card.title}
                data-stagger-item
                className="group p-10 md:p-12 md:py-20 border    rounded-[2rem] hove:scale-y-100   bg-[#f1e9da] hover:border-gold-400/25 transition-colors duration-700"
              >
                <span className="section-label !text-[9px] mb-4 block">{card.label}</span>
                <h3 className="font-display text-3xl text-sage-800 mb-4">{card.title}</h3>
                <p className="text-sage-800 font-light leading-relaxed text-sm">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MEMBERSHIP ═══ */}
      <section id="membership" className="py-28 md:py-36 px-6 md:px-12 bg-[#faf7f2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="section-label" data-reveal="up" >The Membership</span>
            <RevealHeading className="text-4xl md:text-5xl  text-sage-800" data-reveal="up">
              Select Your Tier
            </RevealHeading>
            <p className=" text-sage-800 max-w-lg mx-auto  text-sage-900 " data-reveal="up">
              Both tiers receive a minimum of four surprise arrivals. Membership capped at{' '}
              <span className="member-counter text-gold-400 font-display text-2xl">0</span> globally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="tier-card p-10 md:p-12 rounded-[2rem] bg-cream-50 text-sage-900 border border-cream-200 flex flex-col justify-between min-h-[480px]">
              <div className="space-y-6">
                <span className="section-label !text-gold-600">Tier I · Cielo</span>
                <h3 className="font-display text-5xl">Cielo</h3>
                <p className="font-sans text-3xl font-semibold tracking-tight">
                  USD 350 <span className="text-sm font-normal text-sage-500">/ year</span>
                </p>
                <p className="text-sage-600  text-sage-900  leading-relaxed text-sm">
                  Beautiful surprise arrivals tailored to surprise, inspire, and become a profound personal ritual.
                </p>
                <ul className="space-y-2 text-xs text-sage-700">
                  {['Minimum 4 surprise deliveries', 'Guided by your preferences', 'Secure email invoicing'].map((li) => (
                    <li key={li} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold-500" />{li}
                    </li>
                  ))}
                </ul>
              </div>
              <button type="button" onClick={openApplication} className=" mt-8 w-full btn-primary rounded-full   cursor-pointer   text-xs tracking-[0.25em] uppercase font-semibold hover:bg-sage-900 hover:text-cream-100 transition-all duration-500  ">
                Request Invitation
              </button>
            </div>

            <div className="tier-card p-10 md:p-12 rounded-[2rem] bg-[#f1e9da] border border-gold-400/30 text-cream-100 flex flex-col justify-between min-h-[480px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/5 rounded-full blur-3xl" />
              <div className="space-y-6 relative">
                <span className="section-label">Tier II · Celeste</span>
                <h3 className="font-display text-sage-800 text-5xl">Celeste</h3>
                <p className="font-sans text-3xl font-semibold text-gold-400 tracking-tight">
                  USD 700 <span className="text-sm font-normal text-sage-400">/ year</span>
                </p>
                <p className="text-sage-300  text-sage-900  leading-relaxed text-sm">
                  An elevated annual series with elite designer accessories and precious sensory objects across the seasons.
                </p>
                <ul className="space-y-2 text-xs text-sage-800">
                  {['Premium arrivals throughout the year', 'Extended preference profiling', 'Private concierge communication'].map((li) => (
                    <li key={li} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold-400" />{li}
                    </li>
                  ))}
                </ul>
              </div>
              <button type="button" onClick={openApplication} className="mt-8 w-full btn-primary  cursor-pointer">
                Request Invitation
              </button>
            </div>
          </div>

          <p className="text-center font-display italic text-cream-100/40 text-sm" data-reveal="up">
            Memberships for 2027 close December 31, 2026 · Returns not accepted — damaged items replaced within 7 days
          </p>
        </div>
      </section>

      {/* ═══ HORIZONTAL EDITIONS (PINNED SCROLL) ═══ */}
      <section id="editions-horizontal" className="relative bg-[#f1e9da] overflow-hidden">
        <div className="py-16 px-6 md:px-12 border-b border-gold-400/10">
          <span className="section-label block mb-3" data-reveal="up">Annual Schedule</span>
          <RevealHeading className="text-4xl md:text-5xl text-sage-700 max-w-xl" data-reveal="up">
            Dual Seasonal Curations
          </RevealHeading>
        </div>

        <div id="editions-track" >
          {EDITIONS.map((edition) => (
            <article
              key={edition.id}
              className="edition-panel  "
              // onClick={() => setSelectedEdition(edition)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedEdition(edition)}
              role="button"
              tabIndex={0}
            >
              <div className="edition-panel-inner relative rounded-[2rem] overflow-hidden   cursor-pointer group border border-gold-400/15">
                <img
                  src={edition.id === 'womens' ? IMAGES.womensDay : IMAGES.peaceDay}
                  alt={edition.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover  transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink2 via-ink2/20 to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2 glass-light rounded-full px-4 py-2">
                  <Calendar size={12} className="text-gold-400" />
                  <span className="text-[9px] tracking-[0.3em] uppercase text-cream-100/80">{edition.date} Dispatch</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <h3 className="font-display text-3xl md:text-4xl text-cream-100 mb-2">{edition.title}</h3>
                  <p className="text-gold-300 italic font-display text-lg mb-3">{edition.theme}</p>
                  <p className="text-cream-100/60 text-sm font-light leading-relaxed line-clamp-2">{edition.description}</p>
                </div>
              </div>
            </article>
          ))}

          <article className="edition-panel flex items-center">
            <div className="edition-panel-inner p-12 rounded-[2rem] glass-light max-w-md">
              <span className="section-label mb-4 block">Explore</span>
              <h3 className="font-display text-3xl text-sage-800 mb-4">Tap any edition to examine the curation</h3>
              <p className="text-sage-800 text-sm font-light mb-8">Each seasonal collection is crafted over twelve months from trusted international niche creators.</p>
              <button type="button" onClick={() => setSelectedEdition(EDITIONS[0])} className="btn-outline bg-gold-500 text-black hover:text-sage-800 cursor-pointer text-xs">
                View Women's Day
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* ═══ GALLERY TAPE ═══ */}
      <section id="gallery" className="py-28 bg-cream-100 text-sage-900 overflow-hidden">
        <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-label !text-gold-600 mb-3 block" data-reveal="up">What Arrives</span>
            <RevealHeading className="text-4xl md:text-5xl text-sage-950" data-reveal="up">The Unboxing Ritual</RevealHeading>
          </div>
          <p className="text-sage-600 font-light max-w-sm text-sm" data-reveal="left">
            Scroll to drift through past curations — each object chosen for texture, scent, and stillness.
          </p>
        </div>

        <div id="gallery-tape">
          {GALLERY_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedGalleryItem(item)}
              className="gallery-card text-left group"
            >
              <div className="rounded-2xl overflow-hidden aspect-[3/4] mb-4 border border-cream-300 shadow-lg">
                <img
                  src={item.image.startsWith('http') ? item.image : IMAGES.giftBox}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-gold-600 font-semibold">{item.category}</span>
              <h4 className="font-display text-xl text-sage-950 mt-1">{item.title}</h4>
            </button>
          ))}
        </div>
      </section>

      {/* ═══ GIFT PATH ═══ */}
      {/* <section id="gift-path" className="py-28 px-6 md:px-12 bg-ink relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <span className="section-label mb-3 block">Unboxing Ritual</span>
          <RevealHeading className="text-4xl md:text-5xl text-cream-100">
            Every arrival follows its path
          </RevealHeading>
        </div>
      
      </section> */}

      {/* ═══ COMMUNITY / FOUNDER ═══ */}
      <section id="community" className="py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-cream-100 to-cream-200 text-sage-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 founder-portrait">
            <div data-reveal="clip" className="rounded-[2rem] overflow-hidden aspect-[3/4] shadow-2xl border border-cream-300">
              <img src={IMAGES.founder} alt="Manisha, Founder" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 founder-letter space-y-8">
            <span className="section-label !text-gold-600">The Community</span>
            <RevealHeading className="text-4xl md:text-5xl text-sage-950">A note from Manisha</RevealHeading>
            <div className="space-y-5 text-sage-800/85 font-light leading-relaxed" data-stagger>
              <p data-stagger-item>
                One of the best compliments I have received is to be thanked for my world of time — unhurried time for my friends. The other is that I could curate anything and it would be appreciated.
              </p>
              <p data-stagger-item>
                I see the strengths in other women and appreciate their unique qualities. Lumina is my way of extending that celebration to a wider community of women.
              </p>
              <blockquote data-stagger-item className="border-l-2 border-gold-400 pl-6 py-2 font-display italic text-xl text-gold-700">
                Lumina is a community built around appreciation, beauty, generosity, and joy.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MEMBER QUOTES ═══ */}
       <div className="marquee-wrap py-8  bg-[#f1e9da] border-y border-gold-400/10 ">
        <div className="marquee-track">
          {[...Array(2)].map((_, gi) => (
            <div key={gi} className="flex gap-10 pr-16 ">
              {['Celebrate You','Lumina','Surprise & Delight','40 Members','Curated With Care',  ].map((t) => (
                <span key={`${gi}-${t}`} className="marquee-item   tracking-[11px] text-[#c9a96e] font-semibold  ">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={IMAGES.hero} alt="" className="absolute inset-0 w-full h-full object-cover brightness-[0.45]" referrerPolicy="no-referrer" />
        <div className="absolute inset-0  " />
        <div className="relative z-10 text-center px-6 max-w-2xl space-y-8" data-reveal="scale">
          <span className="section-label">Invitation Only</span>
          <h2 className="font-script text-6xl md:text-8xl gold-gradient-text">Lumina</h2>
          <p className="text-cream-100/55 font-light leading-relaxed">
            40 memberships curated annually. Applications examined upon character and appreciation for craftsmanship.
          </p>
          <button type="button" onClick={openApplication} className="btn-primary">
            Request an Invitation
          </button>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className=" border-t border-gold-400/10 py-16 px-6 md:px-12 bg-[#20271f]  ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <span className="font-script text-4xl gold-gradient-text pl-3">Lumina</span>
            <p className="text-cream-100/40 text-sm mt-2 max-w-xs font-light">
              An annual tactile gift experience designed to celebrate the beauty in a woman&apos;s soul.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[11px] tracking-[0.2em] uppercase text-cream-100/50">
            <a href="#philosophy" className="hover:text-gold-400 transition-colors">Philosophy</a>
            <a href="#membership" className="hover:text-gold-400 transition-colors">Membership</a>
            <a href="#community" className="hover:text-gold-400 transition-colors">Community</a>
            <a href="#gallery" className="hover:text-gold-400 transition-colors">Gallery</a>
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 rounded-full glass-light hover:border-gold-400/40 transition-colors" aria-label="Instagram">
              <Instagram size={16} className="text-gold-400" />
            </a>
            <a href="mailto:request@luminacelebrateyou.com" className="p-3 rounded-full glass-light hover:border-gold-400/40 transition-colors" aria-label="Email">
              <Mail size={16} className="text-gold-400" />
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-cream-100/25 mt-12 tracking-wide">
          © {new Date().getFullYear()} Lumina · All rights reserved
        </p>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedEdition && (
          <EditionDrawer edition={selectedEdition} onClose={() => setSelectedEdition(null)} onRequestAccess={openApplication} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isApplicationOpen && <ApplicationModal isOpen={isApplicationOpen} onClose={() => setIsApplicationOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedGalleryItem && <MediaLightbox item={selectedGalleryItem} onClose={() => setSelectedGalleryItem(null)} />}
      </AnimatePresence>
    </div>
  );
}

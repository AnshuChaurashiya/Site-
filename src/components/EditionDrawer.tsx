import { motion } from 'motion/react';
import { X, Sparkles, Info, Heart } from 'lucide-react';
import { Edition } from '../types';

interface EditionDrawerProps {
  edition: Edition | null;
  onClose: () => void;
  onRequestAccess: () => void;
}

export default function EditionDrawer({ edition, onClose, onRequestAccess }: EditionDrawerProps) {
  if (!edition) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end justify-center">
      {/* Immersive backdrop */}
      <motion.div
        id="edition-drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-sage-950/75 backdrop-blur-md"
      />

      {/* Bottom sliding luxury sheet */}
      <motion.div
        id="edition-drawer-container"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 180 }}
        className="relative w-full max-w-5xl bg-cream-50 rounded-t-[36px] shadow-[0_-20px_60px_rgba(9,12,9,0.4)] p-6 md:p-12 border-t border-gold-300/40 overflow-y-auto max-h-[92vh] z-10 select-text"
      >
        {/* Header segment */}
        <div className="flex items-center justify-between border-b border-cream-300/60 pb-6 mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-sans tracking-[0.35em] text-gold-500 font-bold uppercase">
              ANNUAL SPECIFICATION
            </span>
            <h3 className="font-serif text-3xl md:text-4xl tracking-tight text-sage-950 mt-1">
              The {edition.title}
            </h3>
          </div>
          <button
            id="close-edition-drawer"
            className="p-2.5 rounded-full hover:bg-cream-200 transition-colors duration-300 text-sage-800 cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Curation specifications grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Visual Showcase (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative overflow-hidden rounded-[24px] bg-cream-200 aspect-[4/3] border border-cream-300/60 shadow-lg group">
              <img
                src={edition.image}
                alt={edition.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 py-1.5 px-3.5 rounded-full bg-sage-950/90 border border-gold-400/20 text-[9px] font-sans font-bold tracking-widest text-gold-300 shadow">
                {edition.date} DISPATCH
              </div>
            </div>

            {/* Inscription quote block */}
            <div className="p-6 rounded-[20px] bg-sage-50 border border-gold-300/20 shadow-inner flex flex-col">
              <span className="text-gold-500 mb-2">
                <Sparkles size={16} />
              </span>
              <p className="font-serif italic text-sage-900 text-sm leading-relaxed">
                "{edition.philosophy}"
              </p>
            </div>
          </div>

          {/* Details & Contents Deep Dive (Right) */}
          <div className="lg:col-span-7 space-y-7">
            <div className="space-y-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-sage-500 font-bold block">
                CURATOR THEME
              </span>
              <p className="font-serif italic text-xl md:text-2xl text-gold-600 leading-snug">
                {edition.theme}
              </p>
              <p className="text-sm text-sage-700 leading-relaxed font-light mt-4">
                {edition.description}
              </p>
            </div>

            {/* List and deep dive of what arrives */}
            <div className="space-y-4 pt-6 border-t border-cream-300/65">
              <h5 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-sage-900">
                CURATED INCLUSIONS:
              </h5>

              <div className="space-y-4">
                {edition.curatedItems.map((item) => (
                  <div
                    key={item.id}
                    id={`curated-item-${item.id}`}
                    className="p-5 rounded-xl bg-white border border-cream-200 shadow-sm hover:border-gold-300/50 hover:shadow transition-all duration-300"
                  >
                    <div className="flex md:items-center justify-between flex-col md:flex-row gap-1 border-b border-cream-100 pb-2 mb-2">
                      <span className="text-[9.5px] font-sans uppercase font-bold tracking-[0.2em] text-gold-600">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-sage-400 font-medium tracking-tight">
                        {item.material}
                      </span>
                    </div>
                    <h6 className="font-serif text-lg tracking-normal text-sage-950 font-bold">
                      {item.title}
                    </h6>
                    <p className="text-[12.5px] text-sage-700 leading-relaxed font-light mt-1.5">
                      {item.description}
                    </p>

                    {/* Care Instructions */}
                    <div className="mt-3.5 pt-3 border-t border-cream-100 flex items-start gap-2 text-[10px] text-sage-600">
                      <Info size={13} className="text-gold-500 mt-0.5 shrink-0" />
                      <p className="italic leading-relaxed">
                        <strong className="not-italic font-bold text-sage-800">Ritual Care:</strong> {item.careNote}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action panel */}
            <div className="pt-6 border-t border-cream-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-sage-600">
                <Heart size={14} className="text-gold-500 shrink-0 animate-pulse" />
                <span className="text-[11px] font-sans font-light tracking-wide">
                  Limited strictly to 400 active annual memberships globally.
                </span>
              </div>
              <button
                id="apply-for-edition-btn"
                onClick={() => {
                  onClose();
                  onRequestAccess();
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-sage-900 text-cream-100 font-sans text-[10px] font-bold tracking-[0.25em] hover:bg-gold-500 hover:text-sage-950 transition-all duration-300 shadow-md cursor-pointer"
              >
                APPLY FOR INVITE
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

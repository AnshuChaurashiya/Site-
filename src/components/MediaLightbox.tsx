import { motion } from 'motion/react';
import { X, Tag, Compass } from 'lucide-react';
import { GalleryItem } from '../types';

interface MediaLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function MediaLightbox({ item, onClose }: MediaLightboxProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 md:p-8">
      {/* Immersive backdrop overlay */}
      <motion.div
        id="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-sage-950/80 backdrop-blur-md"
      />

      {/* Lightbox container card */}
      <motion.div
        id="lightbox-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-cream-50 w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(9,12,9,0.5)] border border-gold-300/20 z-10 grid grid-cols-1 md:grid-cols-12 max-h-[85vh] select-text"
      >
        {/* Close Button top-right over image */}
        <button
          id="close-media-lightbox"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-cream-50/90 hover:bg-cream-200 text-sage-900 shadow backdrop-blur-sm transition-all duration-300 cursor-pointer border border-cream-200"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Product image (Left) */}
        <div className="md:col-span-7 bg-neutral-950 min-h-[280px] md:min-h-[460px] relative overflow-hidden group">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out select-none group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Story details panel (Right) */}
        <div className="md:col-span-5 p-6 md:p-10 flex flex-col justify-between bg-cream-50 overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-sans font-bold text-gold-600 tracking-[0.25em] uppercase">
                <Tag size={10} />
                {item.category}
              </span>
              <h4 className="font-serif text-2xl text-sage-950 tracking-tight leading-snug font-bold">
                {item.title}
              </h4>
            </div>

            <div className="h-px bg-cream-300/60" />

            <div className="space-y-5">
              <p className="text-[13px] text-sage-700 leading-relaxed font-light font-sans">
                {item.description}
              </p>
              <div className="pl-4 border-l-2 border-gold-300 py-1">
                <p className="text-[12px] text-sage-600 italic leading-relaxed font-serif">
                  "Each selection undergoes strict review by the founders to ensure sensory and tactile elegance."
                </p>
              </div>
            </div>
          </div>

          {/* Details footer */}
          <div className="pt-6 border-t border-cream-200/80 mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sage-800">
              <Compass size={14} className="text-gold-500 shrink-0" />
              <span className="text-[9px] font-sans tracking-widest uppercase font-bold">
                PROVENANCE JOURNAL RECORDED
              </span>
            </div>
            <p className="text-[10.5px] text-sage-500 font-sans font-light leading-relaxed">
              Every curated arrival is accompanied by detailed documentation detailing its creators, coordinates of origins, and material qualities.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

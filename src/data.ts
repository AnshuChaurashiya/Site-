import { Edition, GalleryItem, MemberQuote } from './types';

export const EDITIONS: Edition[] = [
  {
    id: 'womens',
    title: "Women's Day Edition",
    date: 'March 8',
    theme: 'Confidence, Bravery, & Possibility',
    philosophy: 'A salute to the path you have walked and the peaks you are yet to conquer.',
    description: 'Every Spring, as the light reawakens, the Women\'s Day curation arrives to inspire courage and self-recognition. Specially selected elements unite to celebrate your strength, warmth, and the delicate intelligence unique to you.',
    image: 'https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_womens_day_1781157374710_kemfpa.jpg',
    curatedItems: [ 
      {
        id: 'w1',
        title: 'Earth Velvet Eau de Parfum',
        category: 'Olfactory Signature',
        description: 'A custom fragrance featuring notes of aged sandalwood, warm amber, and top streams of organic white tea and clean ozone. Blends into an intensely personal skin finish.',
        careNote: 'Apply dry to pulse points. Store away from direct sunlight.',
        material: 'Hand-blown french glass, precious natural extracts (30ml)'
      },
      {
        id: 'w2',
        title: 'The Brass Medallion Compact',
        category: 'Tactile Keepsake',
        description: 'A substantial, heavy solid-brass mirror compact engraved with the ODE sunburst pattern. A beautiful weight to carry in your palm as a reminder of stillness.',
        careNote: 'Polish gently with a dry flannel piece to maintain the polished finish.',
        material: 'Solid core jewelers-grade brass, polished mirror'
      },
      {
        id: 'w3',
        title: 'Embossed Letter of Intention',
        category: 'Personal Ritual',
        description: 'Heavy stationery crafted from cotton rag paper with a letter pressed by the founder, inviting you to write down your personal acts of courage for the year.',
        careNote: 'Intended to be sealed with a wax stamp and read precisely one year from today.',
        material: '350gsm handmade cotton deckled paper, letterpress ink'
      }
    ]
  },
  {
    id: 'peace',
    title: 'Peace Day Edition',
    date: 'September 21',
    theme: 'Stillness, Restoration, & Presence',
    philosophy: 'An invitation to pause, breathe deep, and cross back into your own sanctuary.',
    description: 'As Autumn approaches and life moves indoors, the Peace Day curation shifts focus to restoration. It is built entirely around creating an exquisite shelter of sensory quietude and luxurious rest.',
    image: 'https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_peace_day_1781157387142_jjfw9g.jpg',
    curatedItems: [
      {
        id: 'p1',
        title: 'Solace Scented Candle',
        category: 'Atmospheric Ritual',
        description: 'A clean burning candle of pure soy wax infused with essential oils of mountain sage, cedar leaves, and winter cypress, nested in smoked moss-olive glass.',
        careNote: 'Trim the wick to 1/4 inch before each light. Burn for a minimum of two hours initially.',
        material: '100% natural soy wax, custom hand-blown tinted glass container (45hr burn)'
      },
      {
        id: 'p2',
        title: 'Embroidered Velvet Pouch',
        category: 'Tactile Storage',
        description: 'An exceptionally soft ivory-cream cotton velvet pouch finished with gold-threaded silk lining and personal monograms, for storing secret belongings.',
        careNote: 'Dry clean only. Gentle spot clean with warm water and soft cloth if necessary.',
        material: 'Premium organic cotton velvet, pure silk liner, metallic thread'
      },
      {
        id: 'p3',
        title: 'Weighted Linen Eyemask',
        category: 'Sensory Relief',
        description: 'Filled with organic dried lavender flowers and natural linseed, providing a perfect therapeutic cooling pressure to soothe tired eyes.',
        careNote: 'Can be placed in the freezer for 15 minutes before use for an cooling soothing session.',
        material: 'French-washed linen cover, organic lavender and linseed fill'
      }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-medallion',
    image: 'https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510560/odeBoxs_mdzghh.png',
    title: 'The Golden Crest Medallion',
    category: 'TACTILE TOKEN',
    description: 'An intricately detailed, heavy brass seal of honor, symbolizing a private pact between a woman and her inner strength.'
  },
  {
    id: 'gal-pouch',
    image: 'https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_hero_banner_1781157355322_n1wgsz.png',
    title: 'The Ivory Velvet Drawstring Pouch',
    category: 'HERITAGE ACCESSORY',
    description: 'Handcrafted with golden thread and silk lining. Crafted to house your most valued keepsakes in sensory splendor.'
  },
  {
    id: 'gal-womens',
    image: 'https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_womens_day_1781157374710_kemfpa.jpg',
    title: 'Women’s Day Spring Gathering',
    category: 'SPRING EDITION',
    description: 'A vibrant yet serene flatlay of tulips, Earth Velvet perfume, and the signature gold reflective compact.'
  },
  {
    id: 'gal-peaceday',
    image: 'https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510559/ode_peace_day_1781157387142_jjfw9g.jpg',
    title: 'Peace Day Autumn Sanctuary',
    category: 'AUTUMN EDITION',
    description: 'Featuring the Solace candle and organic botanical packages, built to inspire tranquility when the nights draw in.'
  },
  {
    id: 'gal-hero',
    image: 'https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510560/odeBoxs_mdzghh.png',
    title: 'The Signature Lumina Box',
    category: 'UNBOXING RITUAL',
    description: 'Unveiling the cream linen envelope set with custom beeswax seal. Experience the calming pleasure of elegant materials.'
  }
];

export const MEMBER_QUOTES: MemberQuote[] = [
  {
    id: 'q1',
    quote: "The anticipation has become one of my favorite moments of the year. Unboxing the sage package feels like opening a personal love letter written to my future self.",
    author: "Elena Rostov",
    yearJoined: "Founding Member, 2024"
  },
  {
    id: 'q2',
    quote: "It felt deeply personal despite being a surprise. Every object has a weight, a texture, and a scent that shows outstanding craftsmanship. No details were spared.",
    author: "Dr. Clara Sterling",
    yearJoined: "Founding Member, 2024"
  },
  {
    id: 'q3',
    quote: "ODE reminded me that I deserve beautiful things too. In a busy life of caring for everyone else, receiving my ODE package is my silent ritual of self-reclamation.",
    author: "Maia Lin",
    yearJoined: "Founding Member, 2025"
  },
  {
    id: 'q4',
    quote: "Splendidly curated. The Earth Velvet perfume instantly became my defining signature scent—subtle and deeply grounding.",
    author: "Victoria de Saint-Amand",
    yearJoined: "Founding Member, 2025"
  }
];

export interface CuratedItem {
  id: string;
  title: string;
  category: string;
  description: string;
  careNote: string;
  material: string;
}

export interface Edition {
  id: 'womens' | 'peace';
  title: string;
  date: string;
  theme: string;
  philosophy: string;
  description: string;
  image: string;
  curatedItems: CuratedItem[];
}

export interface MemberQuote {
  id: string;
  quote: string;
  author: string;
  yearJoined: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
}

export interface ApplicationInput {
  name: string;
  email: string;
  instagram: string;
  reason: string;
  waxColor: 'gold' | 'sage' | 'burgundy';
}

import { useState, useEffect } from 'react';

export interface Match {
  id: string;
  opponent: string;
  date: string;
  time: string;
  competition: string;
  venue: string;
  logo: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  category: string;
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
}

const DEFAULT_MATCHES: Match[] = [
  {
    id: 'm1',
    opponent: 'City Real',
    date: '2026-10-15',
    time: '19:00',
    competition: 'Super League',
    venue: 'Home',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 'm2',
    opponent: 'United FC',
    date: '2026-10-22',
    time: '20:45',
    competition: 'Champion Cup',
    venue: 'Away',
    logo: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=150&auto=format&fit=crop',
  }
];

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'New Training Facility Unveiled',
    date: '2026-09-12',
    summary: 'Ronz FC opens a state-of-the-art facility aiming to elevate youth prospect development.',
    image: 'https://images.unsplash.com/photo-1518605368461-1e1e114e5bb0?q=80&w=600&auto=format&fit=crop',
    category: 'ClubNews'
  },
  {
    id: 'n2',
    title: 'First Team Prepares for Derbey',
    date: '2026-09-20',
    summary: 'Coach talks tactics and mentality ahead of the crucial match against local rivals.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6edd1dec1d?q=80&w=600&auto=format&fit=crop',
    category: 'FirstTeam'
  }
];

const DEFAULT_STORE: StoreItem[] = [
  {
    id: 's1',
    name: 'Home Jersey 26/27',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1580087433276-a070eb3745ea?q=80&w=400&auto=format&fit=crop',
    category: 'Kits',
    tag: 'NEW'
  },
  {
    id: 's2',
    name: 'Training Jacket - Premium Edition',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?q=80&w=400&auto=format&fit=crop',
    category: 'Training',
  },
  {
    id: 's3',
    name: 'Club Scarf Legacy',
    price: 2099,
    image: 'https://images.unsplash.com/photo-1601002360567-27b9ef8ac7e3?q=80&w=400&auto=format&fit=crop',
    category: 'Accessories',
  }
];

const storeState = {
  matches: DEFAULT_MATCHES,
  news: DEFAULT_NEWS,
  store: DEFAULT_STORE,
  showMatches: true,
  showNews: true,
  showStore: true,
};

let listeners: Array<() => void> = [];

const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

// Initialize from localStorage immediately
try {
  const storedMatches = localStorage.getItem('ronz_matches');
  if (storedMatches) storeState.matches = JSON.parse(storedMatches);

  const storedNews = localStorage.getItem('ronz_news');
  if (storedNews) storeState.news = JSON.parse(storedNews);

  const storedStore = localStorage.getItem('ronz_store');
  if (storedStore) storeState.store = JSON.parse(storedStore);

  const storedShowMatches = localStorage.getItem('ronz_show_matches');
  if (storedShowMatches !== null) storeState.showMatches = JSON.parse(storedShowMatches);

  const storedShowNews = localStorage.getItem('ronz_show_news');
  if (storedShowNews !== null) storeState.showNews = JSON.parse(storedShowNews);

  const storedShowStore = localStorage.getItem('ronz_show_store');
  if (storedShowStore !== null) storeState.showStore = JSON.parse(storedShowStore);
} catch (e) {
  console.error("Local storage error:", e);
}

export const useDataStore = () => {
  // Use React state just to trigger re-renders
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const saveMatches = (newMatches: Match[]) => {
    storeState.matches = newMatches;
    localStorage.setItem('ronz_matches', JSON.stringify(newMatches));
    emitChange();
  };

  const saveNews = (newNews: NewsItem[]) => {
    storeState.news = newNews;
    localStorage.setItem('ronz_news', JSON.stringify(newNews));
    emitChange();
  };

  const saveStore = (newStore: StoreItem[]) => {
    storeState.store = newStore;
    localStorage.setItem('ronz_store', JSON.stringify(newStore));
    emitChange();
  };

  const setShowMatches = (val: boolean) => {
    storeState.showMatches = val;
    localStorage.setItem('ronz_show_matches', JSON.stringify(val));
    emitChange();
  };

  const setShowNews = (val: boolean) => {
    storeState.showNews = val;
    localStorage.setItem('ronz_show_news', JSON.stringify(val));
    emitChange();
  };

  const setShowStore = (val: boolean) => {
    storeState.showStore = val;
    localStorage.setItem('ronz_show_store', JSON.stringify(val));
    emitChange();
  };

  return {
    matches: storeState.matches, setMatches: saveMatches,
    news: storeState.news, setNews: saveNews,
    store: storeState.store, setStore: saveStore,
    showMatches: storeState.showMatches, setShowMatches,
    showNews: storeState.showNews, setShowNews,
    showStore: storeState.showStore, setShowStore
  };
};

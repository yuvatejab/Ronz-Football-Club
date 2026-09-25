import React, { useState } from 'react';
import { useDataStore, Match, NewsItem, StoreItem } from '../../store/dataStore';
import { Shield, Plus, Trash2, Edit2, Check, X, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminDashboard() {
  const {
    matches, setMatches, showMatches, setShowMatches,
    news, setNews, showNews, setShowNews,
    store, setStore, showStore, setShowStore
  } = useDataStore();
  const [activeTab, setActiveTab] = useState<'matches' | 'news' | 'store'>('matches');

  // New item states
  const [newMatch, setNewMatch] = useState<Partial<Match>>({});
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({});
  const [newStore, setNewStore] = useState<Partial<StoreItem>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMatch = () => {
    if (!newMatch.opponent || !newMatch.date) return;
    setMatches([...matches, { ...newMatch, id: `m-${Date.now()}` } as Match]);
    setNewMatch({});
    setIsAdding(false);
  };

  const handleDeleteMatch = (id: string) => {
    setMatches(matches.filter(m => m.id !== id));
  };

  const handleAddNews = () => {
    if (!newNews.title || !newNews.date) return;
    setNews([...news, { ...newNews, id: `n-${Date.now()}` } as NewsItem]);
    setNewNews({});
    setIsAdding(false);
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter(n => n.id !== id));
  };

  const handleAddStore = () => {
    if (!newStore.name || !newStore.price) return;
    setStore([...store, { ...newStore, id: `s-${Date.now()}` } as StoreItem]);
    setNewStore({});
    setIsAdding(false);
  };

  const handleDeleteStore = (id: string) => {
    setStore(store.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 sm:p-12 font-sans overflow-y-auto">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

        {/* Header */}
        <div className="bg-slate-950 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-black text-white">Ronz FC Admin Panel</h1>
              <p className="text-slate-400 text-xs font-mono">CONTENT MANAGEMENT SYSTEM</p>
            </div>
          </div>
          <button onClick={() => window.location.hash = ''} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-colors">
            Exit Admin
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 pt-4 gap-6 bg-slate-50 items-center justify-between">
          <div className="flex gap-6">
            {(['matches', 'news', 'store'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setIsAdding(false); }}
                className={`pb-3 px-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === tab ? 'border-[#dc2626] text-[#dc2626]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Toggle for visibility of these sections */}
          <div className="flex flex-col gap-2 pb-3 px-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Visible on website</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-700">Matches</span>
                <button onClick={() => setShowMatches(!showMatches)} className="outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] rounded-full mt-0.5">
                  {showMatches ? <ToggleRight className="w-7 h-7 text-[#dc2626]" /> : <ToggleLeft className="w-7 h-7 text-slate-300" />}
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-700">News</span>
                <button onClick={() => setShowNews(!showNews)} className="outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] rounded-full mt-0.5">
                  {showNews ? <ToggleRight className="w-7 h-7 text-[#dc2626]" /> : <ToggleLeft className="w-7 h-7 text-slate-300" />}
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-700">Store</span>
                <button onClick={() => setShowStore(!showStore)} className="outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] rounded-full mt-0.5">
                  {showStore ? <ToggleRight className="w-7 h-7 text-[#dc2626]" /> : <ToggleLeft className="w-7 h-7 text-slate-300" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black font-display text-slate-900 capitalize">Manage {activeTab}</h2>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-[#dc2626] transition-colors"
              >
                <Plus className="w-4 h-4" /> Add New
              </button>
            )}
          </div>

          {/* Add Forms */}
          {isAdding && activeTab === 'matches' && (
            <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Opponent Name" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewMatch({...newMatch, opponent: e.target.value})} />
              <input type="date" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewMatch({...newMatch, date: e.target.value})} />
              <input type="time" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewMatch({...newMatch, time: e.target.value})} />
              <input type="text" placeholder="Competition" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewMatch({...newMatch, competition: e.target.value})} />
              <input type="text" placeholder="Venue (Home/Away)" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewMatch({...newMatch, venue: e.target.value})} />
              <input type="text" placeholder="Logo Image URL" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewMatch({...newMatch, logo: e.target.value})} />
              <div className="col-span-1 border-t sm:col-span-2 flex justify-end gap-3 pt-4 border-slate-200">
                <button onClick={() => setIsAdding(false)} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
                <button onClick={handleAddMatch} className="px-5 py-2 rounded-xl text-sm font-bold bg-[#dc2626] text-white hover:bg-red-700 shadow-md">Save Match</button>
              </div>
            </div>
          )}

          {isAdding && activeTab === 'news' && (
            <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="News Title" className="p-3 rounded-xl border border-slate-300 col-span-1 sm:col-span-2" onChange={e => setNewNews({...newNews, title: e.target.value})} />
              <input type="date" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewNews({...newNews, date: e.target.value})} />
              <input type="text" placeholder="Category" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewNews({...newNews, category: e.target.value})} />
              <textarea placeholder="Summary Statement" className="p-3 rounded-xl border border-slate-300 col-span-1 sm:col-span-2 h-20" onChange={e => setNewNews({...newNews, summary: e.target.value})} />
              <input type="text" placeholder="Cover Image URL" className="p-3 rounded-xl border border-slate-300 col-span-1 sm:col-span-2" onChange={e => setNewNews({...newNews, image: e.target.value})} />
              <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 border-t pt-4 border-slate-200 mt-2">
                <button onClick={() => setIsAdding(false)} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
                <button onClick={handleAddNews} className="px-5 py-2 rounded-xl text-sm font-bold bg-[#dc2626] text-white hover:bg-red-700 shadow-md">Publish News</button>
              </div>
            </div>
          )}

          {isAdding && activeTab === 'store' && (
            <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Product Name" className="p-3 rounded-xl border border-slate-300 col-span-1 sm:col-span-2" onChange={e => setNewStore({...newStore, name: e.target.value})} />
              <input type="number" placeholder="Price (₹)" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewStore({...newStore, price: parseFloat(e.target.value)})} />
              <input type="text" placeholder="Category (e.g. Kits)" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewStore({...newStore, category: e.target.value})} />
              <input type="text" placeholder="Highlight Tag (e.g. NEW)" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewStore({...newStore, tag: e.target.value})} />
              <input type="text" placeholder="Product Image URL" className="p-3 rounded-xl border border-slate-300" onChange={e => setNewStore({...newStore, image: e.target.value})} />
              <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 border-t pt-4 border-slate-200 mt-2">
                <button onClick={() => setIsAdding(false)} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
                <button onClick={handleAddStore} className="px-5 py-2 rounded-xl text-sm font-bold bg-[#dc2626] text-white hover:bg-red-700 shadow-md">Add Product</button>
              </div>
            </div>
          )}

          {/* Data Lists */}
          <div className="space-y-4">
            {activeTab === 'matches' && matches.map(m => (
              <div key={m.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-xs border border-slate-200 overflow-hidden">
                    {m.logo ? <img src={m.logo} alt="logo" className="w-full h-full object-cover"/> : m.opponent.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{m.opponent}</h4>
                    <p className="text-xs text-slate-500 font-mono">{m.date} | {m.competition}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteMatch(m.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {activeTab === 'news' && news.map(n => (
              <div key={n.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    {n.image && <img src={n.image} alt={n.title} className="w-full h-full object-cover"/>}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 line-clamp-1">{n.title}</h4>
                    <p className="text-xs text-slate-500 font-mono">{n.date} | {n.category}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteNews(n.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {activeTab === 'store' && store.map(s => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 p-1">
                    {s.image && <img src={s.image} alt={s.name} className="w-full h-full object-contain"/>}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 tracking-tight">{s.name}</h4>
                    <p className="text-xs text-slate-500 font-mono">₹{s.price.toLocaleString('en-IN')} | {s.category}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteStore(s.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

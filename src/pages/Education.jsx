import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter, Clock, User, Calendar, X, Sparkles } from 'lucide-react';
import articlesData from '../data/articles.json';

export default function Education() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['All', 'Pet Care', 'Behavior & Training', 'Adoption Tips', 'Animal Welfare'];

  // Filter & Search articles
  const filteredArticles = useMemo(() => {
    return articlesData.filter((art) => {
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filter === 'All' || art.category === filter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, filter]);

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-forest font-heading font-bold text-sm uppercase tracking-widest">Education Center</span>
          <h1 className="text-4xl font-extrabold text-charcoal">Welfare & Care Articles</h1>
          <p className="text-charcoal/60">
            Resource guides written by veterinarians and animal trainers. Learn behavior tips, nutrition basics, and animal welfare standards.
          </p>
        </div>

        {/* Toolbar: Search & Filter */}
        <div className="bg-white border border-forest/10 p-6 rounded-4xl shadow-sm space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search articles by title or keywords (e.g. nutrition, behavior)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 rounded-full bg-cream/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-extrabold transition-all border ${
                  filter === cat
                    ? 'bg-forest border-forest text-white shadow-md shadow-forest/5'
                    : 'bg-cream/40 border-forest/10 text-charcoal hover:bg-forest/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Cards Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white border border-forest/10 rounded-4xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 relative bg-cream">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-forest text-white text-xs font-bold px-3 py-1 rounded-md">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 text-xs text-charcoal/40 font-bold">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{art.readTime}</span>
                      </span>
                      <span>•</span>
                      <span>{art.date}</span>
                    </div>

                    <h3 className="font-heading font-extrabold text-lg text-charcoal line-clamp-2">{art.title}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-3">{art.summary}</p>
                  </div>
                </div>

                <div className="p-6 border-t border-forest/5">
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="w-full bg-forest text-white font-heading font-bold py-2.5 rounded-full hover:bg-forest/90 transition-all text-xs flex items-center justify-center space-x-1.5 focus:outline-none"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Read Article</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-forest/10 rounded-4xl shadow-sm space-y-4">
            <BookOpen className="h-12 w-12 text-forest/40 mx-auto" />
            <h3 className="font-heading font-extrabold text-2xl text-charcoal">No articles found</h3>
            <p className="text-charcoal/50 max-w-sm mx-auto text-sm">
              We couldn't find any resources matching those keywords. Try searching for other terms.
            </p>
          </div>
        )}
      </div>

      {/* Article Full Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-charcoal"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-4xl shadow-2xl overflow-hidden border border-forest/10 z-10 max-h-[85vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="h-56 relative shrink-0 bg-cream">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-charcoal/60 hover:bg-forest text-white p-2 rounded-full z-20 focus:outline-none"
                  aria-label="Close reader"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="absolute bottom-4 left-4 bg-forest text-white font-heading font-bold text-xs px-4 py-1.5 rounded-full tracking-widest shadow-md">
                  {selectedArticle.category}
                </span>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto space-y-6">
                <div className="space-y-3">
                  <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-charcoal leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-xs font-bold text-charcoal/40">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{selectedArticle.author}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{selectedArticle.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>

                <p className="font-semibold text-charcoal/85 text-sm md:text-base border-l-4 border-orange pl-4 py-1 italic leading-relaxed">
                  "{selectedArticle.summary}"
                </p>

                <div className="text-charcoal/70 text-sm md:text-base leading-relaxed space-y-4 font-medium">
                  {selectedArticle.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-forest/5 bg-cream/20 shrink-0 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-charcoal text-white font-heading font-bold px-6 py-2.5 rounded-full hover:bg-forest transition-all text-xs"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

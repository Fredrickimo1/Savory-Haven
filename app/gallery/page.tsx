'use client';

import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

type Category = 'all' | 'food' | 'interior' | 'events';

interface GalleryItem {
  id:       string;
  emoji:    string;
  title:    string;
  category: Exclude<Category, 'all'>;
  bg:       string;
}

const galleryItems: GalleryItem[] = [
  { id: '1',  emoji: '🍲', title: 'Ofe Onugbu',          category: 'food',     bg: 'bg-orange-100'  },
  { id: '2',  emoji: '🐟', title: 'Grilled Tilapia',     category: 'food',     bg: 'bg-blue-100'    },
  { id: '3',  emoji: '🍢', title: 'Suya Skewers',        category: 'food',     bg: 'bg-red-100'     },
  { id: '4',  emoji: '🍚', title: 'Jollof Rice',         category: 'food',     bg: 'bg-yellow-100'  },
  { id: '5',  emoji: '🥣', title: 'Egusi Soup',          category: 'food',     bg: 'bg-green-100'   },
  { id: '6',  emoji: '🍹', title: 'Chapman Cocktail',    category: 'food',     bg: 'bg-pink-100'    },
  { id: '7',  emoji: '🪑', title: 'Main Dining Room',    category: 'interior', bg: 'bg-amber-100'   },
  { id: '8',  emoji: '🕯️', title: 'Evening Ambience',   category: 'interior', bg: 'bg-stone-100'   },
  { id: '9',  emoji: '🌿', title: 'Garden Terrace',      category: 'interior', bg: 'bg-emerald-100' },
  { id: '10', emoji: '🎉', title: 'Birthday Dinner',     category: 'events',   bg: 'bg-purple-100'  },
  { id: '11', emoji: '💼', title: 'Corporate Lunch',     category: 'events',   bg: 'bg-slate-100'   },
  { id: '12', emoji: '💍', title: 'Private Celebration', category: 'events',   bg: 'bg-rose-100'    },
];

const filters: { label: string; value: Category }[] = [
  { label: 'All',      value: 'all'      },
  { label: '🍽️ Food',  value: 'food'     },
  { label: '🏛️ Interior', value: 'interior' },
  { label: '🎊 Events', value: 'events'   },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [lightbox,     setLightbox]     = useState<GalleryItem | null>(null);

  const filtered = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-amber-950 py-16 px-4 text-center">
        <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
          Visual Story
        </p>
        <h1 className="font-display text-5xl font-bold text-white mb-3">
          Our Gallery
        </h1>
        <p className="text-amber-200 text-lg max-w-xl mx-auto">
          A glimpse into the food, spaces, and moments that make Savory Haven special.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-amber-100 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === f.value
                  ? 'bg-amber-700 text-white'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 shrink-0">
            {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item)}
              className={`group relative aspect-square rounded-2xl ${item.bg} flex flex-col items-center justify-center gap-2 border border-white hover:scale-105 hover:shadow-lg transition-all overflow-hidden`}
            >
              <span className="text-5xl group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>
              <span className="text-xs font-medium text-gray-600 px-2 text-center">
                {item.title}
              </span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl flex items-center justify-center">
                <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>No photos in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className={`relative ${lightbox.bg} rounded-3xl p-12 flex flex-col items-center gap-4 max-w-sm w-full shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-1.5 transition-colors"
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>
            <span className="text-8xl">{lightbox.emoji}</span>
            <div className="text-center">
              <p className="font-display text-xl font-bold text-gray-900">
                {lightbox.title}
              </p>
              <p className="text-sm text-gray-500 capitalize mt-1">
                {lightbox.category}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-amber-50 border-t border-amber-100 py-12 px-4 text-center">
        <p className="text-gray-600 mb-4 text-lg">
          Want to experience it in person?
        </p>
        <a
          href="/reservations"
          className="inline-block rounded-full bg-amber-700 hover:bg-amber-800 text-white font-bold px-8 py-3 transition-colors"
        >
          Reserve a Table
        </a>
      </div>

    </div>
  );
}
'use client';

import { useState } from 'react';
import Link         from 'next/link';
import { Search, ChefHat } from 'lucide-react';
import { siteConfig } from '@/config/site';

type DietaryTag = 'spicy' | 'vegetarian' | 'vegan' | 'gluten-free' | 'halal';

interface MenuItem {
  _id:           string;
  name:          string;
  description:   string;
  price:         number;
  category:      string;
  menuType:      'food' | 'drinks';
  dietaryTags:   DietaryTag[];
  isChefSpecial: boolean;
  imageUrl?:     string;
}

const tagStyles: Record<DietaryTag, string> = {
  'spicy':       'bg-red-100    text-red-700',
  'vegetarian':  'bg-green-100  text-green-700',
  'vegan':       'bg-emerald-100 text-emerald-700',
  'gluten-free': 'bg-blue-100   text-blue-700',
  'halal':       'bg-purple-100 text-purple-700',
};

const tagLabels: Record<DietaryTag, string> = {
  'spicy':       '🌶️ Spicy',
  'vegetarian':  '🌿 Vegetarian',
  'vegan':       '🌱 Vegan',
  'gluten-free': 'GF',
  'halal':       '☪️ Halal',
};

// Emoji fallbacks when no image
const categoryEmoji: Record<string, string> = {
  'Starters': '🍢',
  'Mains':    '🍲',
  'Desserts': '🍩',
  'Drinks':   '🍹',
};

export default function MenuClient({ items }: { items: MenuItem[] }) {
  const [activeTab,   setActiveTab]   = useState<'food' | 'drinks'>('food');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = activeTab === 'food'
    ? ['Starters', 'Mains', 'Desserts']
    : ['Drinks'];

  const filtered = items.filter((item) => {
    const matchesTab    = item.menuType === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-amber-950 py-16 px-4 text-center">
        <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
          Savory Haven
        </p>
        <h1 className="font-display text-5xl font-bold text-white mb-3">
          Our Menu
        </h1>
        <p className="text-amber-200 text-lg max-w-xl mx-auto">
          Authentic Nigerian flavours crafted with fresh, local ingredients.
        </p>
      </div>

      {/* Tabs + Search */}
      <div className="sticky top-16 z-30 bg-white border-b border-amber-100 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex rounded-full bg-amber-50 p-1 gap-1">
            {(['food', 'drinks'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
                className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-amber-700 text-white shadow'
                    : 'text-amber-700 hover:bg-amber-100'
                }`}
              >
                {tab === 'food' ? '🍽️ Food' : '🍹 Drinks'}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50"
            />
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mx-auto max-w-4xl px-4 py-12 space-y-14">

        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="font-medium">Menu is updating.</p>
            <p className="text-sm mt-1">
              Call us on{' '}
              <a href={"tel:" + siteConfig.phone} className="text-amber-600">
                {siteConfig.phone}
              </a>
              {' '}for today&apos;s specials.
            </p>
          </div>
        )}

        {categories.map((category) => {
          const categoryItems = filtered.filter(i => i.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <section key={category}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-display text-2xl font-bold text-gray-900">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-amber-100" />
              </div>

              <div className="space-y-4">
                {categoryItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-amber-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all"
                  >
                    {/* Image or emoji */}
                    <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-amber-100 flex items-center justify-center text-3xl">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        categoryEmoji[item.category] || '🍽️'
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            {item.isChefSpecial && (
                              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                <ChefHat className="h-3 w-3" /> Chef&apos;s Special
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                          {item.dietaryTags && item.dietaryTags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {item.dietaryTags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagStyles[tag]}`}
                                >
                                  {tagLabels[tag]}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-amber-700 font-bold text-base shrink-0">
                          ₦{item.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && items.length > 0 && (
          <div className="text-center py-16 text-gray-400">
            <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No dishes found for &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-amber-50 border-t border-amber-100 py-12 px-4 text-center">
        <p className="text-gray-600 mb-4">Ready to taste it in person?</p>
        <Link
          href="/reservations"
          className="inline-block rounded-full bg-amber-700 hover:bg-amber-800 text-white font-bold px-8 py-3 transition-colors"
        >
          Reserve a Table
        </Link>
      </div>

    </div>
  );
}
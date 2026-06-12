// Homepage: hero section, featured dishes, opening hours, and a location summary.
import Link from 'next/link';
import { UtensilsCrossed, Clock, MapPin, Phone, ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

const featuredDishes = [
  {
    id:          '1',
    name:        'Peppered Snail',
    description: 'Slow-cooked in our signature house pepper sauce with fresh garden herbs.',
    price:       '₦3,500',
    tag:         '🌶️ Spicy',
    emoji:       '🐌',
  },
  {
    id:          '2',
    name:        'Grilled Tilapia',
    description: 'Whole tilapia marinated in Nigerian spices, grilled over open flame.',
    price:       '₦6,500',
    tag:         '🌿 Gluten-Free',
    emoji:       '🐟',
  },
  {
    id:          '3',
    name:        'Ofe Onugbu',
    description: 'Traditional bitter leaf soup with assorted meat, served with eba or pounded yam.',
    price:       '₦4,200',
    tag:         '⭐ Chef\'s Special',
    emoji:       '🍲',
  },
];

const openingHours = [
  { day: 'Monday',        hours: 'Closed'        },
  { day: 'Tue – Thu',     hours: '12pm – 10pm'   },
  { day: 'Friday',        hours: '12pm – 11pm'   },
  { day: 'Saturday',      hours: '11am – 11pm'   },
  { day: 'Sunday',        hours: '11am – 9pm'    },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 overflow-hidden">

        {/* Background texture */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-800/50 border border-amber-600/30 rounded-full px-4 py-1.5 text-amber-300 text-sm mb-6">
            <UtensilsCrossed className="h-4 w-4" />
            <span>Port Harcourt&apos;s Finest Nigerian Cuisine</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Where Every Meal
            <span className="block text-amber-400">Tells a Story</span>
          </h1>

          <p className="text-amber-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Fresh ingredients, authentic flavours, and warm hospitality —
            right in the heart of Port Harcourt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservations"
              className="rounded-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-3.5 text-base transition-colors"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="rounded-full border-2 border-amber-400/60 hover:border-amber-400 text-amber-200 hover:text-white font-semibold px-8 py-3.5 text-base transition-colors"
            >
              View Our Menu
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce">
          <ChevronRight className="h-6 w-6 rotate-90" />
        </div>
      </section>

      {/* ── Featured Dishes ──────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-medium text-sm uppercase tracking-widest mb-2">
              From Our Kitchen
            </p>
            <h2 className="font-display text-4xl font-bold text-gray-900">
              Chef&apos;s Favourites
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group rounded-2xl border border-amber-100 bg-amber-50/50 p-6 hover:shadow-lg hover:border-amber-200 transition-all"
              >
                <div className="text-5xl mb-4">{dish.emoji}</div>
                <div className="inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                  {dish.tag}
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  {dish.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {dish.description}
                </p>
                <p className="text-amber-700 font-bold text-lg">{dish.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
            >
              See full menu <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Opening Hours + Location ─────────────────────── */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Hours */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 rounded-full p-2">
                <Clock className="h-5 w-5 text-amber-700" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900">Opening Hours</h2>
            </div>
            <div className="space-y-3">
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between items-center py-2 border-b border-amber-100">
                  <span className="text-gray-700 font-medium">{item.day}</span>
                  <span className={item.hours === 'Closed' ? 'text-red-400 font-medium' : 'text-amber-700 font-semibold'}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 rounded-full p-2">
                <MapPin className="h-5 w-5 text-amber-700" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900">Find Us</h2>
            </div>

            {/* Map placeholder */}
            <div className="w-full h-48 bg-amber-200/50 rounded-2xl flex items-center justify-center mb-4 border border-amber-200">
              <div className="text-center text-amber-700">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">{siteConfig.address.street}</p>
                <p className="text-sm">{siteConfig.address.city}, {siteConfig.address.state}</p>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={"tel:" + siteConfig.phone}
                className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="py-20 px-4 bg-amber-900 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Dine?
          </h2>
          <p className="text-amber-200 text-lg mb-8">
            Book your table now and experience the best of Nigerian cuisine.
          </p>
          <Link
            href="/reservations"
            className="inline-block rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-10 py-4 text-base transition-colors"
          >
            Reserve Your Table
          </Link>
        </div>
      </section>

    </div>
  );
}
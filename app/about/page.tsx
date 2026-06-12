// About page: company story, values, team profiles, and a call-to-action to reserve a table.
import Link from 'next/link';
import { Award, Heart, Leaf, UtensilsCrossed } from 'lucide-react';

const values = [
  {
    icon:        <Heart className="h-6 w-6 text-amber-600" />,
    title:       'Made with Love',
    description: 'Every dish is prepared fresh daily by our kitchen team using recipes passed down through generations.',
  },
  {
    icon:        <Leaf className="h-6 w-6 text-amber-600" />,
    title:       'Local Ingredients',
    description: 'We source directly from local farmers and fish markets in Rivers State to guarantee freshness.',
  },
  {
    icon:        <Award className="h-6 w-6 text-amber-600" />,
    title:       'Authentic Flavours',
    description: 'No shortcuts. Our pepper soups, soups, and grills are cooked the traditional Nigerian way.',
  },
];

const team = [
  {
    name:  'Chef Emeka Okafor',
    role:  'Executive Chef',
    emoji: '👨‍🍳',
    bio:   'With over 15 years in Nigerian cuisine, Chef Emeka trained in Lagos and Port Harcourt before founding Savory Haven. His philosophy is simple — great food starts with honest ingredients.',
  },
  {
    name:  'Ngozi Williams',
    role:  'Head of Operations',
    emoji: '👩‍💼',
    bio:   'Ngozi ensures every guest leaves with a smile. She manages front-of-house operations and has built Savory Haven\'s reputation for warm, attentive service.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-amber-950 py-16 px-4 text-center">
        <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
          Our Story
        </p>
        <h1 className="font-display text-5xl font-bold text-white mb-3">
          About Savory Haven
        </h1>
        <p className="text-amber-200 text-lg max-w-xl mx-auto">
          A celebration of Nigerian food, culture, and community.
        </p>
      </div>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="flex items-center gap-3 mb-6">
          <UtensilsCrossed className="h-8 w-8 text-amber-600 shrink-0" />
          <h2 className="font-display text-3xl font-bold text-gray-900">
            How It Started
          </h2>
        </div>
        <div className="space-y-4 text-gray-600 leading-relaxed text-base">
          <p>
            Savory Haven was born in 2018 from a simple belief — that Nigerian cuisine
            deserves the same respect and presentation as any cuisine in the world.
            Our founder, Chef Emeka Okafor, grew up watching his grandmother cook
            in a small kitchen in Owerri, where every meal was an event and every
            ingredient was chosen with care.
          </p>
          <p>
            When Chef Emeka returned to Port Harcourt after years of professional
            training, he wanted to create a space where people could experience
            the full depth of Nigerian flavour — not fast food versions, but the
            real, slow-cooked, fire-kissed dishes that define our culinary heritage.
          </p>
          <p>
            Today, Savory Haven is one of Port Harcourt&apos;s most beloved dining
            destinations. We serve families celebrating milestones, friends catching
            up over pepper soup, and visitors tasting Nigeria for the first time.
            Whatever brings you through our door, we promise one thing — you will
            eat well.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-amber-50 py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-10">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-amber-100">
                <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-10">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div key={member.name} className="flex gap-5 p-6 rounded-2xl border border-amber-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all">
              <div className="text-5xl shrink-0 w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                {member.emoji}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-amber-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-amber-900 py-14 px-4 text-center">
        <h2 className="font-display text-3xl font-bold text-white mb-3">
          Come Experience It Yourself
        </h2>
        <p className="text-amber-200 mb-6">
          The best way to understand Savory Haven is to sit down and eat with us.
        </p>
        <Link
          href="/reservations"
          className="inline-block rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-8 py-3 transition-colors"
        >
          Reserve a Table
        </Link>
      </div>

    </div>
  );
}
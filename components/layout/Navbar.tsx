'use client';

import Link                       from 'next/link';
import { usePathname }            from 'next/navigation';
import { useState }               from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { navLinks }               from '@/config/navigation';
import { siteConfig }             from '@/config/site';
import { cn }                     from '@/lib/utils/cn';

export function Navbar() {
  const pathname          = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-amber-800">
            <UtensilsCrossed className="h-6 w-6 text-amber-600" />
            <span>{siteConfig.name}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-amber-700',
                  pathname === link.href
                    ? 'text-amber-700 border-b-2 border-amber-600 pb-0.5'
                    : 'text-gray-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/reservations"
              className="rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800 transition-colors"
            >
              Reserve a Table
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block text-sm font-medium py-2 transition-colors hover:text-amber-700',
                pathname === link.href ? 'text-amber-700' : 'text-gray-600'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reservations"
            onClick={() => setIsOpen(false)}
            className="block text-center rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800 transition-colors mt-2"
          >
            Reserve a Table
          </Link>
        </div>
      )}
    </header>
  );
}
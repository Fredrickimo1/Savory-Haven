import Link           from 'next/link';
import { UtensilsCrossed, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navLinks }   from '@/config/navigation';

export function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <UtensilsCrossed className="h-6 w-6 text-amber-400" />
              <span>{siteConfig.name}</span>
            </div>
            <p className="text-sm text-amber-300 leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-amber-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Find Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-amber-300">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city}
                </span>
              </li>
              <li>
                <a
                  href={"tel:" + siteConfig.phone}
                  className="flex items-center gap-2 text-sm text-amber-300 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-amber-400" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={"mailto:" + siteConfig.email}
                  className="flex items-center gap-2 text-sm text-amber-300 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-amber-400" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-amber-800 pt-6 text-center text-xs text-amber-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

type Status = 'idle' | 'loading' | 'success' | 'error';

const openingHours = [
  { day: 'Monday',    hours: 'Closed'      },
  { day: 'Tue – Thu', hours: '12pm – 10pm' },
  { day: 'Friday',    hours: '12pm – 11pm' },
  { day: 'Saturday',  hours: '11am – 11pm' },
  { day: 'Sunday',    hours: '11am – 9pm'  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: '', email: '', subject: 'general_enquiry', message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-amber-950 py-16 px-4 text-center">
        <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
          Get in Touch
        </p>
        <h1 className="font-display text-5xl font-bold text-white mb-3">
          Contact Us
        </h1>
        <p className="text-amber-200 text-lg max-w-xl mx-auto">
          We are here — come find us, call us, or send us a message.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* Left — Details */}
        <div className="space-y-10">

          {/* Contact details */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-gray-900">Find Us</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 rounded-full p-2 shrink-0">
                  <MapPin className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Address</p>
                  <p className="text-gray-500 text-sm">
                    {siteConfig.address.street}<br />
                    {siteConfig.address.city}, {siteConfig.address.state}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-100 rounded-full p-2 shrink-0">
                  <Phone className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Phone</p>
                  <a
                    href={"tel:" + siteConfig.phone}
                    className="text-amber-700 hover:text-amber-900 text-sm font-medium transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-100 rounded-full p-2 shrink-0">
                  <Mail className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Email</p>
                  <a
                    href={"mailto:" + siteConfig.email}
                    className="text-amber-700 hover:text-amber-900 text-sm font-medium transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Opening hours */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <h2 className="font-display text-2xl font-bold text-gray-900">Opening Hours</h2>
            </div>
            <div className="space-y-2">
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between py-2 border-b border-amber-100 text-sm">
                  <span className="text-gray-700 font-medium">{item.day}</span>
                  <span className={item.hours === 'Closed' ? 'text-red-400 font-medium' : 'text-amber-700 font-semibold'}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="w-full h-52 bg-amber-100 rounded-2xl flex items-center justify-center border border-amber-200">
            <div className="text-center text-amber-700">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold text-sm">{siteConfig.address.street}</p>
              <p className="text-xs text-amber-600">{siteConfig.address.city}</p>
            </div>
          </div>

        </div>

        {/* Right — Form */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="h-5 w-5 text-amber-600" />
            <h2 className="font-display text-2xl font-bold text-gray-900">Send a Message</h2>
          </div>

          {status === 'success' ? (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Message Received!</h3>
              <p className="text-gray-500 text-sm">
                Thanks for reaching out. We will get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setStatus('idle'); setForm({ fullName: '', email: '', subject: 'general_enquiry', message: '' }); }}
                className="mt-4 text-sm text-amber-700 font-medium hover:text-amber-900"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Your Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Chidi Okonkwo"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="chidi@example.com"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="general_enquiry">General Enquiry</option>
                  <option value="private_event">Private Event</option>
                  <option value="feedback">Feedback</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-full bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white font-bold py-3 text-sm transition-colors"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
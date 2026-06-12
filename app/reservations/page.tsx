'use client';

// Reservation page: client-side booking form with validation and a success confirmation state.
import { useState } from 'react';
import { Calendar, Clock, Users, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { restaurantConfig } from '@/config/restaurant';
import { siteConfig }       from '@/config/site';

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30',
];

interface FormData {
  fullName:    string;
  email:       string;
  phone:       string;
  date:        string;
  time:        string;
  partySize:   string;
  specialReqs: string;
}

interface FormErrors {
  fullName?:  string;
  email?:     string;
  phone?:     string;
  date?:      string;
  time?:      string;
  partySize?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

function getMaxDateString() {
  const d = new Date();
  d.setDate(d.getDate() + restaurantConfig.advanceBookingDays);
  return d.toISOString().split('T')[0];
}



export default function ReservationsPage() {
  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '',
    date: '', time: '', partySize: '2', specialReqs: '',
  });
  const [errors,     setErrors]     = useState<FormErrors>({});
  const [status,     setStatus]     = useState<Status>('idle');
  const [bookingRef, setBookingRef] = useState('');

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      e.fullName = 'Enter your full name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address.';
    if (!form.phone.trim() || form.phone.trim().length < 10)
      e.phone = 'Enter a valid phone number.';
    if (!form.date)
      e.date = 'Pick a date for your reservation.';
    else if (form.date < getTodayString())
      e.date = 'Pick a date from today onwards.';
    if (!form.time)
      e.time = 'Select a time slot.';
    const size = parseInt(form.partySize);
    if (!size || size < 1)
      e.partySize = 'Enter party size.';
    else if (size > restaurantConfig.maxPartySize)
      e.partySize = `For groups over ${restaurantConfig.maxPartySize}, please call us.`;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

 async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/reserve', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          fullName:    form.fullName,
          email:       form.email,
          phone:       form.phone,
          date:        form.date,
          time:        form.time,
          partySize:   form.partySize,
          specialReqs: form.specialReqs,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBookingRef(data.bookingRef);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  // ── Success State ──────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 mb-4">
            We look forward to seeing you, <strong>{form.fullName.split(' ')[0]}</strong>.
          </p>
          <div className="bg-amber-50 rounded-2xl p-4 text-left space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Booking Ref</span>
              <span className="font-bold text-amber-700">{bookingRef}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{form.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Time</span>
              <span className="font-medium">{form.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Party Size</span>
              <span className="font-medium">{form.partySize} guests</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-6">
            A confirmation will be sent to <strong>{form.email}</strong>.
            To cancel or change, call us on {siteConfig.phone}.
          </p>
          <button
            onClick={() => { setStatus('idle'); setForm({ fullName: '', email: '', phone: '', date: '', time: '', partySize: '2', specialReqs: '' }); }}
            className="rounded-full bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────
  const partySize = parseInt(form.partySize) || 0;
  const isLargeGroup = partySize > restaurantConfig.largeGroupThreshold;

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-amber-950 py-16 px-4 text-center">
        <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
          Savory Haven
        </p>
        <h1 className="font-display text-5xl font-bold text-white mb-3">
          Reserve a Table
        </h1>
        <p className="text-amber-200 text-lg max-w-xl mx-auto">
          Pick your date, tell us how many, and we will have a table ready.
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl px-4 py-16">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <User className="h-4 w-4 text-amber-600" /> Your Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Ada Nwosu"
                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.fullName ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-amber-600" /> Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ada@example.com"
                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-amber-600" /> Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234 8147183590"
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-600" /> Date
              </label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                min={getTodayString()}
                max={getMaxDateString()}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.date ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-600" /> Time
              </label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.time ? 'border-red-400' : 'border-gray-200'}`}
              >
                <option value="">Select a time</option>
                {timeSlots.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
            </div>
          </div>

          {/* Party Size */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-amber-600" /> Party Size
            </label>
            <input
              name="partySize"
              type="number"
              min="1"
              max={restaurantConfig.maxPartySize}
              value={form.partySize}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.partySize ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.partySize && <p className="text-xs text-red-500">{errors.partySize}</p>}
            {isLargeGroup && !errors.partySize && (
              <p className="text-xs text-amber-600">
                For large groups, we recommend calling us directly on {siteConfig.phone}.
              </p>
            )}
          </div>

          {/* Special Requests */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Special Requests <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="specialReqs"
              value={form.specialReqs}
              onChange={handleChange}
              rows={3}
              placeholder="Allergies, dietary needs, occasion, seating preference..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            />
          </div>

          {/* Error banner */}
          {status === 'error' && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
              Something went wrong. Please call us on <strong>{siteConfig.phone}</strong>.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-full bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white font-bold py-3.5 text-base transition-colors"
          >
            {status === 'loading' ? 'Confirming...' : 'Confirm Reservation'}
          </button>

          <p className="text-center text-xs text-gray-400">
            Need to cancel? Call us on {siteConfig.phone} at least 4 hours before your booking.
          </p>

        </form>
      </div>
    </div>
  );
}
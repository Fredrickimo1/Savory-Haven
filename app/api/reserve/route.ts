import { NextRequest, NextResponse } from 'next/server';
import { createClient }              from '@supabase/supabase-js';

function generateBookingRef() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `RES-${date}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, date, time, partySize, specialReqs } = body;

    if (!fullName || !email || !phone || !date || !time || !partySize) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const bookingRef        = generateBookingRef();
    const RESEND_API_KEY    = process.env.RESEND_API_KEY;
    const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Savory Haven <onboarding@resend.dev>';
    const RESTAURANT_EMAIL  = process.env.RESTAURANT_EMAIL;

    if (!RESEND_API_KEY || !RESTAURANT_EMAIL) {
      console.error('[POST /api/reserve] Missing email config')
      return NextResponse.json(
        { success: false, error: 'Email service misconfigured' },
        { status: 500 }
      )
    }

    // ── Save to Supabase ──────────────────────────────────
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: dbError } = await supabase
      .from('reservations')
      .insert({
        booking_ref:  bookingRef,
        full_name:    fullName,
        email:        email,
        phone:        phone,
        date:         date,
        time:         time,
        party_size:   parseInt(partySize),
        special_reqs: specialReqs || null,
        status:       'confirmed',
        source:       'website',
      });

    if (dbError) {
      console.error('[Supabase insert error]', dbError);
      // Continue anyway — email is more important than DB for now
    }

    // ── Email to customer ─────────────────────────────────
    const customerResponse = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    RESEND_FROM_EMAIL,
        to:      [email],
        subject: `Your table at Savory Haven — ${date} at ${time}`,
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
            <h2 style="color:#92400e;">Booking Confirmed ✅</h2>
            <p>Hi <strong>${fullName.split(' ')[0]}</strong>,</p>
            <p>Your reservation at <strong>Savory Haven</strong> is confirmed.</p>
            <div style="background:#fef3c7;padding:16px;border-radius:12px;margin:16px 0;">
              <p style="margin:4px 0;"><strong>Booking Ref:</strong> ${bookingRef}</p>
              <p style="margin:4px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin:4px 0;"><strong>Time:</strong> ${time}</p>
              <p style="margin:4px 0;"><strong>Party Size:</strong> ${partySize} guests</p>
              ${specialReqs ? `<p style="margin:4px 0;"><strong>Special Requests:</strong> ${specialReqs}</p>` : ''}
            </div>
            <p>To cancel, call us on <strong>+234 801 234 5678</strong>.</p>
            <p style="color:#92400e;"><strong>— The Savory Haven Team</strong></p>
          </div>
        `,
      }),
    });

    const customerResult = await customerResponse.json().catch(() => ({}));
    if (!customerResponse.ok) {
      console.error('[Resend customer error]', customerResult)
      return NextResponse.json(
        { success: false, error: 'Failed to send booking confirmation', details: customerResult },
        { status: customerResponse.status || 502 }
      )
    }

    // ── Notification to restaurant ────────────────────────
    const restaurantResponse = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    RESEND_FROM_EMAIL,
        to:      [RESTAURANT_EMAIL],
        subject: `New Booking — ${fullName} · ${date} · ${time} · ${partySize} guests`,
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
            <h2 style="color:#92400e;">New Reservation 🍽️</h2>
            <div style="background:#fef3c7;padding:16px;border-radius:12px;margin:16px 0;">
              <p style="margin:4px 0;"><strong>Ref:</strong> ${bookingRef}</p>
              <p style="margin:4px 0;"><strong>Name:</strong> ${fullName}</p>
              <p style="margin:4px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin:4px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin:4px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin:4px 0;"><strong>Time:</strong> ${time}</p>
              <p style="margin:4px 0;"><strong>Party Size:</strong> ${partySize} guests</p>
              ${specialReqs ? `<p style="margin:4px 0;"><strong>Special Requests:</strong> ${specialReqs}</p>` : ''}
            </div>
          </div>
        `,
      }),
    });

    const restaurantResult = await restaurantResponse.json().catch(() => ({}));
    if (!restaurantResponse.ok) {
      console.error('[Resend restaurant error]', restaurantResult)
      return NextResponse.json(
        { success: false, error: 'Failed to notify restaurant', details: restaurantResult },
        { status: restaurantResponse.status || 502 }
      )
    }

    return NextResponse.json(
      { success: true, bookingRef },
      { status: 201 }
    );

  } catch (err) {
    console.error('[POST /api/reserve]', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
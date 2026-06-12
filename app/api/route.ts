import { NextRequest, NextResponse } from 'next/server';

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

    const bookingRef      = generateBookingRef();
    const RESEND_API_KEY  = process.env.RESEND_API_KEY!;
    const RESTAURANT_EMAIL = process.env.RESTAURANT_EMAIL!;

    // Email to customer
    const customerEmail = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Savory Haven <onboarding@resend.dev>',
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

    const customerResult = await customerEmail.json();
    console.log('[Resend customer]', customerResult);

    // Notification to restaurant
    const restaurantEmail = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Savory Haven Bookings <onboarding@resend.dev>',
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

    const restaurantResult = await restaurantEmail.json();
    console.log('[Resend restaurant]', restaurantResult);

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
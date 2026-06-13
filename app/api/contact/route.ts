import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, subject, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY   = process.env.RESEND_API_KEY;
    const RESTAURANT_EMAIL = process.env.RESTAURANT_EMAIL;

    if (!RESEND_API_KEY || !RESTAURANT_EMAIL) {
      return NextResponse.json(
        { success: false, error: 'Email service misconfigured' },
        { status: 500 }
      );
    }

    const subjectLabels: Record<string, string> = {
      general_enquiry: 'General Enquiry',
      private_event:   'Private Event',
      feedback:        'Feedback',
      complaint:       'Complaint',
      other:           'Other',
    };

    // Acknowledgement to sender
    const customerResponse = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Savory Haven <onboarding@resend.dev>',
        to:      [email],
        subject: 'We got your message — Savory Haven',
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
            <h2 style="color:#92400e;">Message Received ✅</h2>
            <p>Hi <strong>${fullName.split(' ')[0]}</strong>,</p>
            <p>Thanks for getting in touch. We have received your message
               and will get back to you within 24 hours.</p>
            <p>If it is urgent, call us on <strong>+234 8147183590</strong>.</p>
            <p style="color:#92400e;"><strong>— The Savory Haven Team</strong></p>
          </div>
        `,
      }),
    });

    const customerResult = await customerResponse.json();
    console.log('[Resend customer contact]', customerResult);

    if (!customerResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to send acknowledgement email', details: customerResult },
        { status: customerResponse.status }
      );
    }

    // Notification to restaurant
    const restaurantResponse = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Savory Haven <onboarding@resend.dev>',
        to:      [RESTAURANT_EMAIL],
        subject: `New Enquiry — ${subjectLabels[subject] || subject} from ${fullName}`,
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
            <h2 style="color:#92400e;">New Contact Form Message 📬</h2>
            <div style="background:#fef3c7;padding:16px;border-radius:12px;margin:16px 0;">
              <p style="margin:4px 0;"><strong>Name:</strong> ${fullName}</p>
              <p style="margin:4px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin:4px 0;"><strong>Subject:</strong> ${subjectLabels[subject] || subject}</p>
              <p style="margin:4px 0;"><strong>Message:</strong></p>
              <p style="margin:4px 0;white-space:pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      }),
    });

    const restaurantResult = await restaurantResponse.json();
    console.log('[Resend restaurant contact]', restaurantResult);

    if (!restaurantResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to notify restaurant', details: restaurantResult },
        { status: restaurantResponse.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('[POST /api/contact]', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
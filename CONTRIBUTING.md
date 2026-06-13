# Contributing to Savory Haven

## Local development

1. Copy `.env.example` to `.env.local`
2. Add your Supabase and Resend credentials
3. Run the development server:

```bash
npm install
npm run dev
```

## Email and reservations

This app uses Resend for email delivery and Supabase for reservations.

- `RESEND_API_KEY`: Resend API key
- `RESTAURANT_EMAIL`: restaurant notification email
- `RESEND_FROM_EMAIL`: verified sender email for Resend

For full email setup details, see [docs/EMAIL_SETUP.md](./docs/EMAIL_SETUP.md).

## Notes

- Resend sandbox mode only allows sending to verified test recipients.
- Verify your domain in Resend before sending emails to external customers.

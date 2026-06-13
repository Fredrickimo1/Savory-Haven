# Email Setup for Savory Haven

This project sends contact and reservation emails via Resend.

## Required environment variables

Copy `.env.example` to `.env.local` and set these values:

- `RESEND_API_KEY`: your Resend API key.
- `RESTAURANT_EMAIL`: the email address that receives restaurant notifications.
- `RESEND_FROM_EMAIL`: the verified sender email for Resend, for example `Savory Haven <hello@your-verified-domain.com>`.

## Resend domain verification

Resend requires a verified sending domain before you can send emails to non-test recipients.

1. Go to `https://resend.com/domains`
2. Add and verify your domain
3. Use a `RESEND_FROM_EMAIL` address from that domain

## Testing notes

- In Resend sandbox mode, you may only send emails to your own verified test address.
- If you get a `403 validation_error` from Resend, verify that:
  - `RESEND_FROM_EMAIL` is a verified sender address
  - the recipient address is allowed in your Resend account or domain

## Example env values

```env
RESEND_API_KEY=re_xxx
RESTAURANT_EMAIL=hello.savoryhaven@gmail.com
RESEND_FROM_EMAIL="Savory Haven <hello@your-verified-domain.com>"
```

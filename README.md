# Savory Haven — Restaurant Website

The official website for Savory Haven, a Nigerian restaurant in Port Harcourt. Built with Next.js, Sanity CMS, Supabase, and deployed on Vercel.

**Live site:** https://savory-haven-psi.vercel.app

---

## What This Site Does

- Displays the full restaurant menu, managed live through Sanity CMS
- Accepts table reservations, validated and stored in a Supabase database
- Sends automatic email confirmations to guests and notifications to the restaurant
- Provides a contact form for general enquiries and private events
- Shows opening hours, location, and a photo gallery
- Includes a WhatsApp quick-contact button on every page

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| CMS | Sanity.io |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Hosting | Vercel |

---

## Project Structure

savory-haven/

├── app/

│   ├── page.tsx                  Home page

│   ├── menu/                     Menu page (pulls from Sanity)

│   ├── reservations/             Reservation form

│   ├── about/                    About page

│   ├── gallery/                  Photo gallery

│   ├── contact/                  Contact form

│   └── api/

│       ├── reserve/route.ts      Reservation API (Supabase + Resend)

│       └── contact/route.ts      Contact form API (Resend)

├── components/

│   └── layout/                   Navbar, Footer, WhatsApp button

├── config/

│   ├── site.ts                   Restaurant name, contact info, address

│   ├── restaurant.ts             Business rules (max party size, etc.)

│   └── navigation.ts             Nav menu links

├── lib/

│   ├── sanity/                   Sanity client and queries

│   └── utils/                    Helper functions (price formatting, etc.)

└── sanity.config.ts               Sanity Studio configuration


## Getting Started Locally

### Prerequisites

- Node.js 18 or higher
- A Sanity account
- A Supabase account
- A Resend account

### 1. Clone and Install

```bash
git clone https://github.com/Fredrickimo1/Savory-Haven.git
cd savory-haven
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-token

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

RESEND_API_KEY=your-resend-api-key
RESTAURANT_EMAIL=hello.savoryhaven@gmail.com
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Run Sanity Studio

```bash
npx sanity dev
```

Open [http://localhost:3333](http://localhost:3333) to manage menu items and restaurant content.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run start` | Run the production build locally |
| `npx sanity dev` | Start the Sanity Studio locally |

---

## Managing Content

Restaurant staff can update the menu, photos, and hours without touching any code:

1. Go to the Sanity Studio (`localhost:3333` locally, or the deployed Studio URL once available)
2. Log in with the authorised account
3. Click **Menu Item** to add, edit, or remove dishes
4. Toggle **Available** off to hide a dish without deleting it
5. Click **Publish** — changes appear on the live site within 60 seconds

---

## Deployment

The site auto-deploys to Vercel on every push to the `main` branch.

```bash
git add .
git commit -m "your message here"
git push origin main
```

Environment variables must be set in the Vercel dashboard under **Project Settings → Environment Variables**, matching the same keys used in `.env.local`.

---

## Roadmap

- [ ] Custom domain (savoryhaven.app or similar)
- [ ] Real food and interior photography
- [ ] Restaurant Profile content fully driven by Sanity (hours, address, socials)
- [ ] Online ordering and deposits via Paystack
- [ ] Admin dashboard for viewing reservations

---

## Contact

For questions about this project, reach out at hello.savoryhaven@gmail.com.
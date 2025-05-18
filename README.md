# 💸 OnlyBucks – Tier-Based Creator Subscription Platform

OnlyBucks is a full-stack web application where creators can publish gated content and engage with subscribers based on tiered membership plans. Inspired by platforms like Patreon and OnlyFans (minus the spice 😅), users unlock features and content based on their subscription level.

## 🚀 Live Demo

👉 [Visit OnlyBucks](https://only-bucks.vercel.app)

---

## 🧠 Key Features

- 🔐 **Tier-Gated Content Access**
  - Creators decide which content is visible to which tier
- 💬 **Level-Based Engagement**
  - Level 2: Can comment on posts
  - Level 3: Can send up to 49 DMs to creators
- 📬 **Creator Dashboard**
  - Post content
  - View comments
  - Respond to DMs
  - Assign feature visibility per tier
- 💳 **Subscription Payments**
  - Integrated with Stripe via [Schematic](https://schematic.so)
- ✅ **Authentication & User Management**
  - Managed using Clerk
- ⚡ **Live Backend**
  - Built with Sanity.io and Sanity Studio for real-time updates
- 🧼 **Built with TypeScript**
  - Type-safe, clean, and scalable codebase

---

## 🛠️ Tech Stack

| Frontend         | Backend            | Auth & Payments     | CMS            |
|------------------|--------------------|----------------------|----------------|
| Next.js (App Router) | Sanity.io          | Clerk (Auth)         | Sanity Studio |
| TypeScript        | Schematic x Stripe | Stripe (Payments)    | Realtime content |

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/onlybucks.git
cd onlybucks

# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# Fill in values for:
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - CLERK_SECRET_KEY
# - SANITY_PROJECT_ID
# - STRIPE_SECRET_KEY
# - etc.

# Run development server
npm run dev

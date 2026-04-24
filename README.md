# LekkerDirect - South African Dropshipping Store

A high-performance, custom-built e-commerce platform designed to bridge the gap between South African consumers and global/local dropshipping suppliers. The store leverages "Instant EFT" via Ozow to cater to the 47 million bank account holders in SA, bypassing the need for credit cards.

## 🚀 Features

- **Modern Tech Stack**: Next.js 16 with App Router, TypeScript, and Tailwind CSS
- **Secure Payments**: Instant EFT integration with Ozow
- **Real-time Inventory**: Automated sync with Dropstore and Perfect Dealz suppliers
- **Responsive Design**: Mobile-first design optimized for South African users
- **User Authentication**: Supabase-based auth with POPIA compliance
- **Order Management**: Complete order tracking and fulfillment system

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database & Auth**: Supabase (PostgreSQL)
- **Payments**: Ozow API (Instant EFT)
- **Hosting**: Vercel (Edge Network)
- **UI Components**: Radix UI + Lucide Icons

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Ozow merchant account (for production)

## 🚀 Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd lekker-direct
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Supabase and Ozow credentials in `.env.local`

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql` in the Supabase SQL editor
   - Copy your project URL and anon key to `.env.local`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process
│   ├── product/[id]/      # Dynamic product pages
│   └── layout.tsx         # Root layout with Header/Footer
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   ├── Header.tsx        # Site header with navigation
│   ├── Footer.tsx        # Site footer
│   └── ProductCard.tsx   # Product display card
└── lib/                  # Utility functions
    ├── supabase.ts       # Supabase client configuration
    └── utils.ts          # General utilities
```

## 🗄️ Database Schema

The application uses the following main tables:

- **products**: Product catalog with supplier information
- **profiles**: User profiles and addresses
- **orders**: Order management and tracking
- **order_items**: Individual order line items
- **cart_items**: Shopping cart data
- **inventory_sync_logs**: Supplier sync tracking

See `supabase/schema.sql` for the complete schema definition.

## 💳 Payment Integration

### Ozow Integration

The application integrates with Ozow for Instant EFT payments:

1. **Payment Request Generation**: Server-side creation of secure payment requests
2. **SHA512 Hash**: Security implementation using SiteCode + Amount + Reference + SecretKey
3. **Redirect Flow**: User redirected to Ozow's secure payment page
4. **Webhook Handling**: Real-time payment status updates

### Payment Flow

1. User completes checkout form
2. Server generates Ozow payment request with SHA512 hash
3. User redirected to Ozow for bank authentication
4. Ozow sends webhook with payment result
5. Order status updated based on webhook response

## 📦 Supplier Integration

### Supported Suppliers

- **Dropstore**: API-based inventory sync
- **Perfect Dealz**: XML feed integration
- **GadgetGyz**: API-based integration

### Inventory Sync

Automated sync runs via Vercel Cron Jobs:
- **Dropstore**: Every 60 minutes
- **Perfect Dealz**: Every 120 minutes  
- **GadgetGyz**: Every 180 minutes

## 🔐 Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **POPIA Compliance**: South African data protection compliance
- **Secure Payment Processing**: Ozow's bank-level security
- **Environment Variables**: Sensitive data never exposed to client

## 📱 Performance Optimization

- **Incremental Static Regeneration**: Product pages revalidated every 60 minutes
- **Image Optimization**: Next.js Image component for optimized loading
- **Mobile-First Design**: Optimized for South African mobile users
- **Edge Network**: Vercel's global CDN for fast content delivery

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Configure Environment Variables**
   - Add all variables from `.env.local` to the Vercel environment
   - Set `NODE_ENV=production`

3. **Set Up Cron Jobs**
   Configure inventory sync schedules in the Vercel dashboard

### Environment Variables

Required for production:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OZOW_SITE_CODE`
- `OZOW_PRIVATE_KEY`
- `OZOW_API_KEY`
- `OZOW_IS_TEST_MODE` (set to `false` for production)

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Key Performance Indicators

- **Conversion Rate**: Percentage of users completing Ozow flow
- **Sync Accuracy**: Order forwarding success rate to suppliers  
- **Page Speed**: Target 90+ on Google PageSpeed Insights Mobile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential to LekkerDirect.

## 📞 Support

For support, contact the development team or create an issue in the project repository.

---

**LekkerDirect** - South Africa's favourite online store. Quality products, instant EFT payments, delivered to your door.

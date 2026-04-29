# LekkerDirect Implementation Plan

## 📋 Overview
LekkerDirect is a South African e-commerce platform built with Next.js 14, Supabase, and Ozow payments. This document outlines the complete implementation strategy, architecture, and development roadmap.

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 14.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime (optional)

### Payments
- **Payment Gateway**: Ozow (Instant EFT)
- **Webhooks**: Custom webhook handling for payment confirmations

### Infrastructure
- **Hosting**: Vercel (planned)
- **Environment**: Node.js
- **Package Manager**: npm

## 📊 Database Schema

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id TEXT,
  supplier_type TEXT,
  title TEXT NOT NULL,
  description TEXT,
  price_zar DECIMAL(10,2) NOT NULL,
  original_price_zar DECIMAL(10,2),
  category TEXT,
  image_url TEXT,
  additional_images TEXT[],
  stock_count INTEGER DEFAULT 0,
  sku TEXT,
  features TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Orders Table (To be implemented)
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  ozow_transaction_id TEXT,
  shipping_address JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Order Items Table (To be implemented)
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_order DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Profiles Table (To be implemented)
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  address JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Development Phases

### Phase 1: Core E-commerce Foundation ✅
**Status**: Completed

#### Completed Features:
1. **Project Setup**
   - Next.js 14 with TypeScript and Tailwind CSS
   - Supabase client configuration
   - Environment variable management

2. **UI Components**
   - Header with navigation
   - Footer with links
   - Product grid component
   - Product card component
   - Cart item component
   - Cart page

3. **Product Management**
   - Product repository pattern with Supabase
   - Product catalog page
   - Product detail page
   - Category pages (Electronics, Fashion, Home)
   - Product categorization (26 products)

4. **Shopping Cart**
   - Add to cart functionality
   - Update quantities
   - Remove items
   - Cart persistence (localStorage)
   - Cart summary

5. **Checkout**
   - Checkout page with order summary
   - Ozow payment integration
   - Payment redirect handling
   - Order confirmation

### Phase 2: User Authentication & Profiles ✅
**Status**: Completed (branch: `user/authentication`)

#### Completed Features:
1. **Database Migration**
   - `supabase/migrations/01_auth_trigger.sql` — Postgres function + trigger to auto-create a `profiles` row on every new `auth.users` signup

2. **Middleware & Auth Routing**
   - `src/middleware.ts` — Cookie-based route guard; redirects unauthenticated users from `/account/*` to `/login`, and logged-in users away from `/login` and `/signup`
   - `src/app/auth/callback/route.ts` — Handles Supabase email-link callbacks (email confirmation, password reset)

3. **Authentication Pages** (under `(auth)` route group with glassmorphism card layout)
   - `src/app/(auth)/layout.tsx` — Shared auth page layout with decorative background blobs
   - `src/app/(auth)/login/page.tsx` — Email/password login with show/hide toggle
   - `src/app/(auth)/signup/page.tsx` — Signup with full name, email confirmation success state
   - `src/app/(auth)/reset-password/page.tsx` — Request reset link + update password (Suspense-wrapped)

4. **Account Pages** (server-rendered, protected)
   - `src/app/account/layout.tsx` — Server-side session check, sidebar + main content grid
   - `src/app/account/page.tsx` — Dashboard with live order count and profile completeness
   - `src/app/account/profile/page.tsx` — Edit name, phone, shipping address with upsert
   - `src/app/account/orders/page.tsx` — Full order history with status badges and item previews

5. **Components & Hooks**
   - `src/components/account/AccountSidebar.tsx` — User avatar/initials, active nav, sign-out
   - `src/hooks/useAuth.tsx` — Client-side auth state hook (session, user, loading, signOut)
   - `src/lib/supabase/browser.ts` — Shared `createBrowserClient` factory

6. **Integrations**
   - `src/components/layout/Header.tsx` — Auth-aware; shows avatar+dropdown for logged-in users, "Sign in" CTA for guests
   - `src/app/checkout/CheckoutClient.tsx` — Pre-fills shipping form from user profile, passes `user_id` to order creation API
   - `src/app/api/checkout/route.ts` — Persists `user_id` on the `orders` row

### Phase 3: Order Management System (Next)
**Status**: Pending

#### Implementation Steps:
1. **Order Tracking**
   - Create orders table
   - Create order items table
   - Implement order creation
   - Generate order numbers
   - Track order status

2. **Order History**
   - Display user's order history
   - Order detail page
   - Track order status changes
   - Download order invoices

3. **Order Status Workflow**
   - Pending → Paid → Processing → Shipped → Delivered
   - Status update notifications
   - Admin status management
   - Cancellation handling

### Phase 4: Admin Dashboard
**Status**: Pending

#### Implementation Steps:
1. **Admin Authentication**
   - Admin role management
   - Protect admin routes
   - Admin login

2. **Dashboard Overview**
   - Sales statistics
   - Order overview
   - Product inventory
   - Revenue charts

3. **Product Management**
   - Add/edit/delete products
   - Bulk product upload
   - Inventory management
   - Category management

4. **Order Management**
   - View all orders
   - Update order status
   - Process refunds
   - Export order data

5. **User Management**
   - View all users
   - User details
   - Ban/unban users
   - User activity logs

### Phase 5: Supplier Integration
**Status**: Pending

#### Implementation Steps:
1. **Supplier API Integration**
   - Dropstore API integration
   - Perfect Dealz API integration
   - Additional supplier APIs

2. **Sync Engine**
   - Automated product sync
   - Inventory updates
   - Price synchronization
   - Error handling and retry logic

3. **Order Forwarding**
   - Forward orders to suppliers
   - Track supplier order status
   - Update inventory based on supplier stock
   - Handle order fulfillment

4. **Admin Sync Controls**
   - Manual sync trigger
   - Sync history and logs
   - Sync scheduling
   - Error monitoring

### Phase 6: Payment Webhooks
**Status**: Pending

#### Implementation Steps:
1. **Webhook Endpoint**
   - Create API route for Ozow webhooks
   - Verify webhook signatures
   - Handle payment success
   - Handle payment failure

2. **Order Processing**
   - Update order status on payment
   - Send confirmation emails
   - Trigger supplier order forwarding
   - Update inventory

3. **Security**
   - Implement webhook authentication
   - Rate limiting
   - Replay attack prevention
   - Logging and monitoring

### Phase 7: Production Deployment
**Status**: Pending

#### Implementation Steps:
1. **Environment Setup**
   - Configure production environment variables
   - Set up Vercel project
   - Configure build settings
   - Set up domain

2. **Database Migration**
   - Migrate Supabase to production
   - Set up production RLS policies
   - Configure backup strategy
   - Set up monitoring

3. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Caching strategy
   - CDN configuration

4. **Monitoring & Analytics**
   - Set up error tracking
   - Performance monitoring
   - User analytics
   - Sales dashboard

5. **Security**
   - Security headers
   - CORS configuration
   - Rate limiting
   - DDoS protection

## 🔐 Security Considerations

### Row Level Security (RLS)
- Public read access for products
- Authenticated write access for orders
- Admin-only access for management
- User-specific data isolation

### API Security
- Environment variable protection
- API key rotation strategy
- Rate limiting on public endpoints
- Input validation and sanitization

### Payment Security
- Ozow webhook signature verification
- Secure order processing
- PCI compliance (no card data stored)
- Transaction logging

## 📈 Performance Targets

- **Page Speed**: 90+ on Google PageSpeed Insights (Mobile)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Conversion Rate**: > 3%
- **Sync Accuracy**: > 99%

## 🧪 Testing Strategy

### Unit Testing
- Repository methods
- Utility functions
- Business logic

### Integration Testing
- API endpoints
- Database operations
- Payment flow

### E2E Testing
- User registration flow
- Checkout process
- Order management
- Admin operations

## 📝 API Documentation

### Public Endpoints
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Get products by category

### Authenticated Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User signup
- `GET /api/user/orders` - Get user orders
- `POST /api/orders` - Create order

### Admin Endpoints
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `POST /api/admin/sync` - Trigger supplier sync
- `POST /api/admin/categorize` - Categorize products

### Webhook Endpoints
- `POST /api/webhooks/ozow` - Ozow payment webhook

## 🚀 Deployment Checklist

- [ ] Configure all environment variables
- [ ] Set up production Supabase project
- [ ] Run database migrations
- [ ] Configure RLS policies
- [ ] Set up Ozow production credentials
- [ ] Configure domain on Vercel
- [ ] Set up SSL certificate
- [ ] Configure CDN
- [ ] Set up monitoring
- [ ] Configure error tracking
- [ ] Set up backup strategy
- [ ] Test payment flow in production
- [ ] Test supplier sync
- [ ] Load testing
- [ ] Security audit
- [ ] Performance optimization

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Ozow Documentation](https://developer.ozow.com/)

### Key Files
- `src/infrastructure/supabase/` - Supabase client and repositories
- `src/domain/models/` - Domain models
- `src/lib/suppliers/` - Supplier integrations
- `supabase/` - Database schemas and migrations
- `.env.local` - Environment variables

## 🔄 Version History

- **v0.2.0** (Current): User Authentication & Profiles
  - Login, Signup, Reset Password pages
  - Account dashboard, profile management, order history
  - Auth-aware Header with user dropdown
  - Checkout pre-fill from saved profile
  - Orders linked to user accounts

- **v0.1.0**: Core e-commerce functionality
  - Product catalog and categories
  - Shopping cart
  - Ozow checkout integration
  - 26 products from Perfect Dealz

## 📞 Support

For issues or questions, refer to the project README or contact the development team.

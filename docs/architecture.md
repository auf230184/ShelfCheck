# ShelfCheck – Architecture

## Overview

ShelfCheck follows a client-server architecture. The Expo mobile app communicates with a REST API backend. Product data is fetched from Open Food Facts at scan time and cached in the database. Health ratings are computed server-side and stored with each product.

```
┌─────────────────────────────────────────┐
│           Expo App (React Native)        │
│  Expo Router │ Components │ Hooks        │
└──────────────────┬──────────────────────┘
                   │ REST API (JSON)
┌──────────────────▼──────────────────────┐
│           Node.js + Hono Backend         │
│  /products  /nutrition  /users  /notify  │
└──────────────────┬──────────────────────┘
                   │ Prisma ORM
┌──────────────────▼──────────────────────┐
│              PostgreSQL                  │
│  users │ products │ daily_logs           │
└─────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│        Open Food Facts API               │
│  Barcode → name, image, macros,          │
│            Nutri-Score                   │
└─────────────────────────────────────────┘
```

## Mobile App Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Home – expiry overview (traffic light sorted)
│   ├── scan.tsx           # Barcode scanner screen
│   ├── log.tsx            # Daily macro log
│   └── settings.tsx       # Notification settings
├── product/[id].tsx       # Product detail view
└── _layout.tsx            # Root layout, auth guard

components/
├── TrafficLight.tsx       # GREEN / YELLOW / RED badge
├── ProductCard.tsx        # Card with name, expiry, rating
├── MacroBar.tsx           # Animated progress bar for macros
└── BarcodeScanner.tsx     # Camera + barcode detection wrapper

hooks/
├── useProducts.ts         # Fetch + cache product list
├── useScanner.ts          # Barcode scanner logic
└── useNotifications.ts    # Register + manage push tokens

lib/
├── api.ts                 # All backend API calls (typed with Zod)
├── nutrition.ts           # calculateHealthRating() function
└── notifications.ts       # Expo push notification helpers

types/
└── index.ts               # Shared TypeScript types

constants/
└── thresholds.ts          # Nutrition thresholds for traffic light
```

## Backend Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── products.ts    # GET/POST/DELETE /products
│   │   ├── nutrition.ts   # GET /nutrition/:barcode (Open Food Facts proxy)
│   │   └── users.ts       # POST /users, PATCH /users/:id (push token)
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client singleton
│   │   ├── openfoodfacts.ts  # API wrapper + response parser
│   │   └── healthRating.ts   # Server-side rating calculation
│   └── index.ts           # Hono app entry point
└── prisma/
    └── schema.prisma      # DB schema
```

## Database Schema (Prisma)

```prisma
model User {
  id        String    @id @default(uuid())
  pushToken String?
  products  Product[]
  createdAt DateTime  @default(now())
}

model Product {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  barcode      String
  name         String
  brand        String?
  imageUrl     String?
  expiryDate   DateTime
  quantity     Float    @default(100)
  unit         String   @default("g")
  // Macros per 100g
  calories     Float?
  protein      Float?
  carbs        Float?
  fat          Float?
  fiber        Float?
  sugar        Float?
  salt         Float?
  nutriScore   String?  // A B C D E
  healthRating String   // GREEN YELLOW RED
  createdAt    DateTime @default(now())
}
```

## Data Flow: Barcode Scan

```
1. User opens scan.tsx
2. expo-barcode-scanner detects EAN barcode
3. App calls GET /nutrition/:barcode on backend
4. Backend fetches Open Food Facts API
5. Backend parses macros + Nutri-Score
6. Backend calls calculateHealthRating()
7. App shows product preview with pre-filled data
8. User enters expiry date + quantity
9. App calls POST /products to save
10. Backend stores product + schedules notification
```

## Health Rating Algorithm

Located in `backend/src/lib/healthRating.ts` and mirrored in `app/lib/nutrition.ts`.

Priority order:
1. If Nutri-Score exists: A/B → GREEN, C → YELLOW, D/E → RED
2. Fallback scoring (per 100g):
   - calories > 400 → +1 points
   - sugar > 15g → +2 points
   - salt > 1.5g → +2 points
   - fat > 20g → +1 point
   - protein > 10g → -1 point
   - fiber > 3g → -1 point
   - Score ≤ 1 → GREEN, ≤ 3 → YELLOW, > 3 → RED

## Push Notifications

- On first app launch: request permission + register Expo push token
- Token stored in User.pushToken via PATCH /users/:id
- Backend checks expiry dates daily (cron job)
- Sends push notification N days before expiry (N configurable in settings)
- Default: 3 days warning

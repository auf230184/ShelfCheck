# ShelfCheck 🥦

A mobile app for tracking food expiry dates and nutritional health. Scan barcodes, get automatic product info, and receive push notifications before your food expires.

**Team:** Noah Aufner, Matteo Greiner — HTL Spengergasse, WMC 2025/26

---

## Features

- 📷 Barcode scan → automatic product info via Open Food Facts
- 🗓️ Expiry date tracking with push notifications
- 🟢🟡🔴 Health rating per product (based on Nutri-Score + macros)
- 📊 Full macro breakdown (calories, protein, carbs, fat, sugar, salt)

---

## Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) (for PostgreSQL)
- [Expo Go](https://expo.dev/go) app on your phone (for testing)

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/<your-repo>/shelfcheck.git
cd shelfcheck
```

### 2. Start the database

```bash
docker run --name shelfcheck-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=shelfcheck \
  -p 5432:5432 \
  -d postgres
```

### 3. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```bash
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shelfcheck"' > .env
```

Run migrations and generate Prisma client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Setup the Expo app

```bash
cd ../app
npm install
```

---

## Running the project

You need **two terminals** running at the same time.

**Terminal 1 – Backend:**
```bash
cd backend
npx tsx watch src/index.ts
```

**Terminal 2 – Expo app:**
```bash
cd app
npx expo start
```

Then scan the QR code with the Expo Go app on your phone.

---

## Project Structure

```
shelfcheck/
├── app/                  # Expo / React Native frontend
│   ├── app/              # Expo Router screens
│   ├── components/       # UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # API calls, utilities
│   └── constants/        # Thresholds, config
├── backend/              # Node.js + Hono REST API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   └── lib/          # Prisma, Open Food Facts, health rating
│   └── prisma/           # DB schema + migrations
└── docs/
    ├── architecture.md
    └── plan.md
```

---

## Useful Commands

| Command | Description |
|---|---|
| `npx expo start` | Start Expo dev server |
| `npx tsx watch src/index.ts` | Start backend with hot reload |
| `npx prisma migrate dev` | Run new DB migrations |
| `npx prisma studio` | Open visual DB browser |
| `npx tsc --noEmit` | TypeScript type check |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | Expo, React Native, TypeScript, Expo Router |
| Backend | Node.js, Hono |
| Database | PostgreSQL, Prisma ORM |
| Barcode | expo-camera, expo-barcode-scanner |
| Product API | Open Food Facts (free, no auth) |
| Notifications | expo-notifications |
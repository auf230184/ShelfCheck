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
- [Expo Go](https://expo.dev/go) app on your phone (for testing)
- A free [Convex](https://convex.dev) account

No Docker, no database setup required.

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/auf230184/shelfcheck.git
cd shelfcheck
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Connect to Convex

```bash
npx convex dev
```

This opens the browser to log in to Convex. Select the existing `shelfcheck` project. It will automatically create `.env.local` with your `EXPO_PUBLIC_CONVEX_URL`.

---

## Running the project

You need **two terminals** running at the same time.

**Terminal 1 – Convex backend:**
```bash
npx convex dev
```

**Terminal 2 – Expo app:**
```bash
npx expo start
```

Then scan the QR code with the Expo Go app on your phone.

---

## Project Structure

```
shelfcheck/
├── convex/               # Convex backend (database, queries, mutations)
│   ├── _generated/       # Auto-generated – do not edit
│   ├── schema.ts         # Database schema
│   ├── products.ts       # Product queries + mutations
│   └── users.ts          # User queries + mutations
├── app/                  # Expo Router screens
├── components/           # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, health rating logic
├── constants/            # Thresholds, config
├── assets/
├── docs/
│   ├── architecture.md
│   └── plan.md
└── README.md
```

---

## Useful Commands

| Command | Description |
|---|---|
| `npx convex dev` | Start Convex backend + sync functions |
| `npx expo start` | Start Expo dev server |
| `npx tsc --noEmit` | TypeScript type check |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | Expo, React Native, TypeScript, Expo Router |
| Backend | Convex (hosted, serverless) |
| Database | Convex DB (built-in, no setup needed) |
| Auth | Convex Auth |
| Barcode | expo-camera, expo-barcode-scanner |
| Product API | Open Food Facts (free, no auth) |
| Notifications | expo-notifications |
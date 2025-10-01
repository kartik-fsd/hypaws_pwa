# Hypaws Lead PWA – Claude CLI Prompt

**Goal:**  
Create a **Progressive Web App (PWA)** named **Hypaws Lead PWA** using **TypeScript**, **Tailwind CSS**, and **Supabase**.  
The app must be strictly typed and must not use `any`, `unknown`, or `undefined`.  
Use **explicit, strict types everywhere**.  
⚠️ **No lazy templating or implicit typing allowed**.

---

## Tech Stack

- **Language:** TypeScript (strict mode enabled)
- **UI Framework:** Next.js
- **Styling:** Tailwind CSS
- **Backend/DB:** Supabase (for auth, database, and realtime features)
- **PWA Features:** Service Workers, Offline Support, Installable App

---

## Design & UX

- **Approach:** Mobile-first, PWA ready ,Dashboard for admin have sidebar minizable , mutli paged dont put all the data in one page and cluter also dont make pages for every small component .
- **Style:** AIRBNB, professional
- **Icons:** Minimal, clean, not overloaded
- **ENV:** ENV IS LOADED AND DATABASE IS CREATED CHECK THE FOLDER database

---

## Pages & Layout

### 1️⃣ Login Page

- **Title:** "Login with phone number and password"
- **Fields:** `Phone Number`, `Password`
- **Flow:**
  1. User enters phone number
  2. Enters password
  3. Verification
  4. Redirect based on role (Admin or Tasker)

### 2️⃣ Admin Dashboard

- **Components:**
  - **Tasker Leads List**
    - Displays: Tasker Name, Lead Name, Number, Pet Type, Pet Name, Area Name, Last Location Timestamp
  - **Live Location Map**
    - Shows taskers' latest locations
    - Refresh interval: **30 minutes**
    - Marker Info: Tasker Name, Last Known Location, Time
  - **Tasker Access Form**
    - Fields:
      - Tasker Name (text, required)
      - Phone Number (phone, required)
      - Assigned Area (text, optional)
    - Submit Button: "Grant Access"
    - Action: Store tasker in Supabase DB and enable tasker login

### 3️⃣ Tasker Dashboard

- **Components:**
  - **Add New Lead Button**
    - Navigates to Tasker Add Lead Page
  - **Tasker Leads List**
    - Displays: Lead Name, Number, Pet Type, Pet Name, Area Name
  - **Location Tracking**
    - Sends live location to Supabase every **30 minutes**
    - Updates Admin dashboard map in realtime

### 4️⃣ Tasker Add Lead Page

- **Form Fields:**
  - Name (text, required)
  - Number (phone, required)
  - Pet Type (dropdown: Dog, Cat, required)
  - Pet Name (text, optional)
  - Pet DOB (date)
  - Pet Breed (text)
  - Pet Food (text)
  - Pet Treat (text)
  - Area Name (text)
  - Nearby Landmark (text)
- **Submit Button:** "Save Lead"
- **Action:** Save to Supabase and refresh Tasker Dashboard list

---

## Features

- **Authentication:**
  - Login with phone number + password
  - Roles: `Admin`, `Tasker`
  - **Role Rules:**
    - **Admin:** Full access to dashboard, tasker management, leads, and map
    - **Tasker:** Access only if admin has added them to DB
- **Tracking:**
  - Location tracking every **30 minutes**
  - Visible in admin map and lead list
- **Offline Support:** Full PWA caching and fallback
- **Responsive:** Fully mobile-first and desktop-friendly

---

## Branding

- **App Name:** Hypaws
- **Tone:** Friendly and approachable for pet parents and taskers

---

## Development Rules

✅ Use **strict TypeScript types** everywhere.  
✅ Do **not** use:

- `any`
- `unknown`
- `undefined`
  ✅ Use clear and explicit interfaces/types for:
- User Roles
- Lead Data
- Location Tracking
  ✅ All Supabase queries must use **typed responses** (no implicit `any`).  
  ✅ Tailwind classes must be applied cleanly (no inline style hacks).  
  ✅ Code should be modular, maintainable, and production-ready.  
  ✅ No lazy or auto-generated templates—write clean, explicit logic.

---

## Output

Generate:

1. A **full TypeScript project structure** with:
   - `src/` folder containing components, pages, hooks, services
   - Supabase client with strict type definitions
   - Tailwind configuration
2. Example implementations for:
   - **Login flow** (with Supabase auth)
   - **Admin dashboard** (list + map + tasker access form)
   - **Tasker dashboard** (add lead + location tracking)
3. Typed Supabase schemas for:
   - `users` (roles: Admin, Tasker)
   - `leads`
   - `locations`
4. Service Worker setup for offline caching and PWA installability.

---

### ⚡️ Instruction to Claude CLI

Use this markdown as the **prompt** to generate the complete project codebase.  
Follow all rules strictly.  
Return a ready-to-run TypeScript + Tailwind + Supabase PWA with **no type violations**.

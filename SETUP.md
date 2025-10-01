# Hypaws Lead PWA - Setup Instructions

## 1. Supabase Configuration

### Disable Email Confirmation (Important!)
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers** → **Email**
3. **Disable** "Confirm email" option
4. Click **Save**

This allows users to login immediately without email verification.

### Run Database Schema
1. Go to **SQL Editor** in Supabase
2. Open `database/FINAL-SCHEMA.sql`
3. Copy and paste the entire content
4. Click **Run**

## 2. Environment Variables

Create `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these values from:
- Supabase Dashboard → **Project Settings** → **API**

## 3. Create PWA Icons

Add these placeholder icons to the `public` folder:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can use any logo or create simple ones at https://favicon.io/

## 4. Create Test Admin User

In Supabase SQL Editor, run:

```sql
-- Create admin user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  role,
  aud,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  '+1234567890@hypaws.local',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  '{"name": "Admin User", "phone_number": "+1234567890"}'::jsonb,
  'authenticated',
  'authenticated',
  NOW(),
  NOW()
) RETURNING id;

-- Save the returned ID and insert into users table
INSERT INTO public.users (id, phone_number, role, name, assigned_area)
VALUES (
  'paste-the-uuid-from-above',
  '+1234567890',
  'admin',
  'Admin User',
  NULL
);
```

## 5. Start the Development Server

```bash
npm install
npm run dev
```

## 6. Login Credentials

- **Admin**: `+1234567890` / `admin123`
- **Add Taskers**: Use the "Manage Taskers" page in admin dashboard

## 7. How It Works

### Authentication
- Phone numbers are converted to email format: `+1234567890@hypaws.local`
- This allows us to use Supabase's built-in email auth without phone provider setup
- Users still see and enter phone numbers in the UI

### User Flow
1. Admin logs in → Can manage taskers and view all leads
2. Admin creates tasker account with phone + password
3. Tasker logs in → Can add leads and track location
4. Location automatically updates every 30 minutes
5. Admin can view tasker locations on map

## Troubleshooting

### "Email not confirmed" error
- Make sure you disabled email confirmation in Supabase Auth settings

### "Invalid login credentials" error
- Make sure you created the admin user correctly
- Check that the phone number format matches exactly

### Location tracking not working
- Browser must have location permissions enabled
- Works best on HTTPS (production) or localhost

### Map not loading
- Make sure you're connected to the internet (uses OpenStreetMap)
- Check browser console for errors

## Production Deployment

1. Deploy to Vercel/Netlify
2. Add environment variables to hosting platform
3. Update Supabase Site URL in **Authentication** → **URL Configuration**
4. Enable HTTPS for location tracking
5. Install PWA on mobile devices for best experience
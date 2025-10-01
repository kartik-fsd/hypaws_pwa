# Hypaws Lead PWA - Database Setup

Clean, final database setup for the Hypaws Lead Management PWA.

## Quick Setup Instructions

### Step 1: Clean Database
In your Supabase SQL Editor, run these commands to clean existing tables:

```sql
-- Clean existing tables
DROP TABLE IF EXISTS public.locations CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP VIEW IF EXISTS public.leads_with_tasker CASCADE;
DROP VIEW IF EXISTS public.taskers_with_latest_location CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS pet_type CASCADE;
```

### Step 2: Setup Database Schema
Run the file in this exact order:

1. **01-setup-database.sql** - Creates all tables, types, and policies
2. **02-create-test-users.sql** - Creates test users (if you have auth access)
3. **03-alternative-user-creation.sql** - Alternative method (if auth creation fails)

## Database Structure

### Tables Created:
- **users** - User profiles (admin/tasker)
- **leads** - Customer leads assigned to taskers
- **locations** - GPS tracking for taskers

### Views Created:
- **leads_with_tasker** - Leads joined with tasker info
- **taskers_with_latest_location** - Taskers with their latest GPS location

### Security:
- Row Level Security (RLS) enabled
- Proper policies for admin/tasker access
- Service role has full access

## Test Credentials

After setup, you can login with:

### Method 1: Real Auth (if auth users created successfully)
- **Admin**: `+1234567890` / `admin123`
- **Tasker**: `+1987654321` / `tasker123`

### Method 2: Bypass Auth (if auth issues persist)
- Go to: `http://localhost:3001/bypass-login`
- Use same credentials above

## Troubleshooting

### If auth creation fails:
1. Use **03-alternative-user-creation.sql** instead of **02-create-test-users.sql**
2. Use the bypass login page to access the app
3. The app will work normally with bypass authentication

### If you get permission errors:
```sql
-- Grant all permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
```

### If RLS blocks access:
```sql
-- Temporarily disable RLS for testing
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations DISABLE ROW LEVEL SECURITY;
```

## Application Features Supported

✅ **User Authentication** (admin/tasker roles)
✅ **Lead Management** (CRUD operations)
✅ **GPS Location Tracking**
✅ **Real-time Updates**
✅ **Admin Dashboard** (manage taskers, view all leads)
✅ **Tasker Dashboard** (manage assigned leads, location tracking)
✅ **Live Location Map** (view all taskers on map)
✅ **Progressive Web App** (offline support, installable)

## Next Steps

1. Run the database setup scripts
2. Test login with provided credentials
3. Explore the admin and tasker dashboards
4. Add real taskers through the admin interface
5. Test location tracking and lead management

The database is now clean, properly structured, and ready for production use!
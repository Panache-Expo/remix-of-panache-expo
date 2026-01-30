# 🗄️ Database Setup Instructions

## ❌ Current Error
```
Database Error: Could not find the table 'public.contact_submissions' in the schema cache
```

**Reason**: The tables haven't been created in your Supabase project yet.

---

## ✅ Solution: Create Tables in Supabase

### Step 1: Open Supabase SQL Editor
1. Go to https://supabase.com
2. Login to your project
3. Click **"SQL Editor"** in left sidebar
4. Click **"New query"**

### Step 2: Copy & Paste SQL
Copy the entire contents of `DATABASE_SETUP.sql` file and paste into the SQL editor.

**Location**: `/Users/dhruvroshan/Documents/GitHub/remix-of-panache-expo/DATABASE_SETUP.sql`

### Step 3: Run the SQL
Click the **"Run"** button (or Cmd+Enter)

### Step 4: Verify Tables Created
You should see:
- ✅ `contact_submissions` table
- ✅ `workshop_registrations` table  
- ✅ `profiles` table

Or in Supabase Dashboard, go to **"Table Editor"** and refresh - you should see all 3 tables.

---

## 📋 What Gets Created

### Table 1: `contact_submissions`
```
Columns:
- id (UUID, Primary Key)
- first_name (TEXT)
- last_name (TEXT)
- email (TEXT)
- subject (TEXT)
- message (TEXT)
- user_id (UUID, optional)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Table 2: `workshop_registrations`
```
Columns:
- id (UUID, Primary Key)
- first_name (TEXT)
- last_name (TEXT)
- email (TEXT)
- phone (TEXT)
- workshop (TEXT)
- experience_level (TEXT)
- agreed_to_terms (BOOLEAN)
- newsletter_subscription (BOOLEAN)
- user_id (UUID, optional)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Table 3: `profiles`
```
Columns:
- id (UUID, Primary Key, References auth.users)
- first_name (TEXT)
- last_name (TEXT)
- email (TEXT)
- created_at (Timestamp)
- updated_at (Timestamp)
```

---

## 🔐 Security Policies Included

All tables have Row Level Security (RLS) enabled with permissive policies:
- ✅ Anyone can submit contact forms
- ✅ Anyone can register for workshops
- ✅ Users can manage their own profiles

---

## 🧪 Test After Setup

### Step 1: Start your app
```bash
npm run dev
```

### Step 2: Check the diagnostic
- Look at top of page (should show green ✅)
- Should say: "✅ Database connected successfully!"

### Step 3: Test form submission
1. Go to `/contact` page
2. Fill out the contact form
3. Click "Send Message"
4. You should see success toast

### Step 4: Verify in Supabase
1. Go to Supabase Dashboard
2. Click **"Table Editor"**
3. Select **"contact_submissions"**
4. You should see your submission row!

---

## 🆘 Troubleshooting

### Still getting "table not found" error?
1. Verify you ran the SQL in Supabase
2. Check **Table Editor** to confirm table exists
3. Refresh your app (Cmd+R or Ctrl+R)
4. Check browser console (F12) for errors

### Error when running SQL?
- You might be missing some old policies
- Try running just this first:
```sql
DROP TABLE IF EXISTS public.contact_submissions CASCADE;
DROP TABLE IF EXISTS public.workshop_registrations CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
```
Then run the full `DATABASE_SETUP.sql` again

### Can submit form but data not appearing?
1. Check RLS policies are enabled
2. Check Supabase logs for errors
3. Try inserting test data directly in Supabase Table Editor

---

## 📝 Quick Summary

| Step | Action | Status |
|------|--------|--------|
| 1 | Go to Supabase SQL Editor | ⏳ Do this |
| 2 | Copy DATABASE_SETUP.sql | ⏳ Do this |
| 3 | Paste & Run SQL | ⏳ Do this |
| 4 | Verify tables in Table Editor | ⏳ Do this |
| 5 | Refresh your app | ⏳ Do this |
| 6 | Test contact form | ⏳ Do this |
| 7 | Check Supabase for data | ⏳ Do this |

---

## ✨ After Setup

Your app will:
- ✅ Show green ✅ diagnostic (database connected)
- ✅ Accept form submissions
- ✅ Save data to Supabase
- ✅ Display success messages
- ✅ Handle errors gracefully

---

**Follow these steps and your database will be ready!** 🚀

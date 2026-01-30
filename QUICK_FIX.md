# 🚀 Quick Fix Guide

## The Problem
```
Database Error: Could not find the table 'public.contact_submissions' in the schema cache
```

## The Solution (3 Steps)

### ✅ Step 1: Get the SQL Script
File: `DATABASE_SETUP.sql` (in project root)

### ✅ Step 2: Run in Supabase
1. Go to: https://supabase.com → Your Project
2. Click: **SQL Editor** → **New query**
3. Copy all content from `DATABASE_SETUP.sql`
4. Paste into the editor
5. Click: **Run** (or Cmd+Enter)

### ✅ Step 3: Verify & Test
1. Go to **Table Editor**
2. You should see 3 tables:
   - `contact_submissions` ✓
   - `workshop_registrations` ✓
   - `profiles` ✓
3. Refresh your app
4. Test the contact form

---

## Expected Result After Setup

**Before**: ❌ Red error box at top
```
❌ Table Not Found: contact_submissions
You need to run the database setup SQL...
```

**After**: ✅ Green success box at top
```
✅ Database Connected
Tables verified and accessible. Ready to use!
```

---

## 🧪 Test It

1. Form submission should work
2. Data appears in Supabase Table Editor
3. No errors in browser console (F12)

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `DATABASE_SETUP.sql` | SQL to create tables |
| `DATABASE_SETUP_INSTRUCTIONS.md` | Detailed instructions |
| `.env.local` | Your credentials (already created) |
| `src/components/DatabaseDiagnostic.tsx` | Connection status checker |

---

## ❓ Questions?

- **"Which SQL do I run?"** → All of `DATABASE_SETUP.sql`
- **"Where do I run it?"** → Supabase SQL Editor
- **"Still not working?"** → Check browser console (F12) for errors
- **"How do I verify?"** → Check Supabase Table Editor, refresh app

---

**Do this now → Your app will work! ⚡**

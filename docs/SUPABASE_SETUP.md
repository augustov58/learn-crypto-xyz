# Supabase Setup Guide

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project

## Setup Steps

### 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 2. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Run Database Migrations

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `lib/supabase/migrations.sql`
4. Paste and run the SQL in the SQL Editor
5. Verify tables were created:
   - `user_progress`
   - `user_favorites`
   - `user_learning_paths`

### 4. Configure Authentication

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable the providers you want:
   - **Email** (enabled by default)
   - **GitHub** (optional - requires OAuth app setup)
   - **Google** (optional - requires OAuth app setup)

#### For OAuth Providers (Optional):

**GitHub:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret
5. Add to Supabase Authentication → Providers → GitHub

**Google:**
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Set authorized redirect URI to: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret
5. Add to Supabase Authentication → Providers → Google

### 5. Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your app URL (e.g., `http://localhost:3000` for dev)
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)

### 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click "Sign In" button
4. Try creating an account with email/password
5. Verify you can sign in and see your user menu

## Troubleshooting

### "Invalid API key" error
- Verify your `.env.local` file has the correct values
- Make sure you're using the `anon` key, not the `service_role` key
- Restart your dev server after changing `.env.local`

### OAuth redirect errors
- Verify callback URLs are correctly configured in Supabase
- Check that OAuth providers are enabled in Supabase dashboard
- Ensure redirect URLs match exactly (including protocol and port)

### Database connection errors
- Verify migrations were run successfully
- Check that Row Level Security (RLS) policies are enabled
- Verify your Supabase project is active (not paused)

### Authentication not working
- Check browser console for errors
- Verify environment variables are loaded (check Network tab)
- Ensure Supabase project is not paused or deleted

## Security Notes

- Never commit `.env.local` to version control
- The `anon` key is safe to use in client-side code (it's public)
- Row Level Security (RLS) ensures users can only access their own data
- Always use the `anon` key in client code, never the `service_role` key

## Next Steps

After setup is complete:
1. Test authentication flow
2. Test progress syncing
3. Test favorites functionality
4. Set up production environment variables when deploying


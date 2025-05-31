# Vercel Portal

A React + Supabase + Creem registration and payment dashboard, deployable on Vercel.

## Setup

1. Clone this repo.
2. Add your environment variables in the Vercel dashboard:
   - `CREEM_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy to Vercel (connect your repo, Vercel will auto-detect build settings).

## Features

- User registration (Supabase)
- Payment/upgrade (Creem, via `/api/checkout`)
- Dashboard with upgrade button 
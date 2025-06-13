# FoodWasteRescue

Turn surplus food in Myrtle Beach into community meals with real-time alerts and one-tap pickups.

## Prerequisites
- Node.js (>=14.x)
- npm or yarn
- React Native CLI
- A Supabase account
- Git

## Installation
```bash
git clone https://github.com/<you>/FoodWasteRescue.git
cd FoodWasteRescue
npm install    # or `yarn install`

## Environment Variables
1. Copy `.env.example` to `.env`
2. Set your `SUPABASE_URL` and `SUPABASE_ANON_KEY`

## Running Locally
# Android
npx react-native run-android

# iOS (macOS only)
npx pod-install ios && npx react-native run-ios

## Database Schema
Run these in Supabase SQL Editor:
```sql
-- create businesses & surplus_alerts tables...

## Features
- Business signup & login
- Post “Surplus Alert” with photo, description, weight, time window
- Rescuer map & list view with “Claim” functionality
- Admin dashboard showing lbs rescued & CO₂ saved

## Contributing
1. Fork the repo
2. Create a feature branch
3. Open a PR against `main`

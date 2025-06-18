// src/api/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL   = 'https://gjbmyrsxzhyjocmfpchw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqYm15cnN4emh5am9jbWZwY2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjY3ODUsImV4cCI6MjA2NTc0Mjc4NX0.jdyRk1Zoui1Byd7jz_BOJ9eJHuLU5mfgJDPp9wm6BwE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

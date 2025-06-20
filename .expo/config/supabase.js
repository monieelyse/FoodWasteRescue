import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wdeeuhwgkzabjcaimmln.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

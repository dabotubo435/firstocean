import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jhmnprjsevoygnbuadka.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobW5wcmpzZXZveWduYnVhZGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxODA5OTIsImV4cCI6MjA0MDc1Njk5Mn0.WTdyFE-ccnro0xgk2mHaBIhUyMyno4Eu6O8gNUMFiOI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

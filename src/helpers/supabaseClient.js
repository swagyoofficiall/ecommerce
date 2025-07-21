// src/helpers/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.GATSBY_SUPABASE_URL;
const supabaseAnonKey = process.env.GATSBY_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are not set');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

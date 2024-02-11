import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAPI = process.env.SUPABASE_API;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAPI);

export default supabase;

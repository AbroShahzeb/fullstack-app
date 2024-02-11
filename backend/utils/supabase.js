import { createClient } from "@supabase/supabase-js";
// import dotenv from "dotenv";
// dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAPI = process.env.SUPABASE_API;
console.log(supabaseUrl, supabaseAPI);

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAPI);

export default supabase;

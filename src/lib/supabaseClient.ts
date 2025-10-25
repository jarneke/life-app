import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables"); // Warn if env variables are missing
}

// Supabase client — initialized with URL and key from environment variables
export const supabase = createClient(`${supabaseUrl}`, `${supabaseKey}`);

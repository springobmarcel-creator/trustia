import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://jfomycvzlajzcjruetsv.supabase.co"
const supabaseKey = "DEIN_SUPABASE_ANON_KEY"

export const supabase = createClient(supabaseUrl, supabaseKey)

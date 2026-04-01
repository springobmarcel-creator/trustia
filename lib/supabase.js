import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://jfomycwzljazcjcructsy.supabase.co"
const supabaseKey = "sb_publishable_4m-kPvQvfLSdTQC6Qw7EHg_CfcnbNCl"

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false
}
})

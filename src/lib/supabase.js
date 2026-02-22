import { createClient } from "@supabase/supabase-js"


// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient("https://xmimpyvfpuzfdkiqkgue.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtaW1weXZmcHV6ZmRraXFrZ3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1Njc2MjcsImV4cCI6MjA4NjE0MzYyN30.K8YBPisoXxK6An_PJTAB9pXP3NM5G3SuxGP6oCyMCGQ")
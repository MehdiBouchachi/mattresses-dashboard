import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://initwjuydablyalgmeqt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaXR3anV5ZGFibHlhbGdtZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDM0MjUsImV4cCI6MjA4ODYxOTQyNX0.xM0AMtJlr36RcuLHW4Md2SaEgPuuBLpzEHbxgE86900";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jnzgpxiezxwmetjcgvil.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuemdweGllenh3bWV0amNndmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzMDM3MDYsImV4cCI6MjAyNjg3OTcwNn0.mQoSEyij_02vmL-ME_eO0Lm9uSKIl1zlucOOP4JL5JM'
export const Supabase = createClient(supabaseUrl, supabaseKey)
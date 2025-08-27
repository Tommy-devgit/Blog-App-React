import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mjtmqwlsjivygcblriup.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdG1xd2xzaml2eWdjYmxyaXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5ODA5NjYsImV4cCI6MjA3MDU1Njk2Nn0.EyV60dHEMtDIMOZnH7cP9rJrfwqdLJetLGoWBo2wMCc'

export const supabase = createClient(supabaseUrl, supabaseKey)

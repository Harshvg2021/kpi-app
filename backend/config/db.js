const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const bcrypt = require('bcrypt');

SUPABASE_URL="https://ocgsmhtkmcpsolkookuy.supabase.co"
SUPABASE_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZ3NtaHRrbWNwc29sa29va3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyODM1OTQsImV4cCI6MjA0NTg1OTU5NH0.E8A3GLbzQ-L6c_Q3c_u_b0ZXuSC9NqYSDbiXV35kqvY"
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const email = "test@gmail.com"
let password = "abc123"
const insertData = async ()=>{
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword
    const { data, error } = await supabase
        .from('user')
        .insert([
            {
                email,
                password,
            },
        ]);
    if(error){
        console.log(error)
    }
}
insertData();
module.exports = supabase;

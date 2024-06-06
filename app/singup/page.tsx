import React from 'react'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default  async function SingUP() {
  
  const { data, error } = await supabase.auth.signUp({
    email: 'example@email.com',
    password: 'example-password',
  });

  if (error) {
    console.error('Error signing up:', error.message);
  } else {
    console.log('Sign up successful:', data);
  }

  return (
      <h2>SignUP</h2>
  );
}


import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function SignIn() {

const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
})

if (error) {
    console.error('Error signing in:', error.message);
  } else {
    console.log('Sign in successful:', data);
  }

  return (
    <div>
      <h2>Sign In Page</h2>
    </div>
  );
}
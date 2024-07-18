'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { destroyCookieToken } from '@/utils/cookies';
import { NextPageContext } from 'next';

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/private')
}


export const signOut = async (ctx?: NextPageContext) => {
  destroyCookieToken(ctx);
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
};
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { destroyCookieToken } from '@/utils/cookies';
import { NextPageContext } from 'next';

export async function login(formData: FormData): Promise<string | null> {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return "パスワード、メールアドレスが一致しません";
  }

  revalidatePath('/', 'layout')
  return null; // ログイン成功時にはエラーメッセージを返さない
}


export const signOut = async (ctx?: NextPageContext) => {
  destroyCookieToken(ctx);
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
};
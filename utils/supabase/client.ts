import { Database } from "@/types/supabase";
import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js";
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

export function createClient(context?: GetServerSidePropsContext): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const client = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);

  let token;
  if (context) {
    // サーバーサイドでクッキーを取得
    const cookies = nookies.get(context);
    token = cookies['supabase-auth-token'];
  } else if (typeof window !== 'undefined') {
    // クライアントサイドでクッキーを取得
    const cookies = nookies.get(null);
    token = cookies['supabase-auth-token'];
  }

  if (token) {
    client.auth.setSession({ access_token: token, refresh_token: '' });
  }

  return client;
}

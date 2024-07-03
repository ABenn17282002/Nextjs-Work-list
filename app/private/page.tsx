import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ClientPrivatePage from './ClientPrivatePage';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (userError || sessionError || !userData?.user || !sessionData?.session) {
    redirect('/login');
    return null;
  }

  // セッションの有効期限をチェック
  const sessionExpiresAt = sessionData.session.expires_at ? sessionData.session.expires_at * 1000 : null; // ミリ秒に変換
  const currentTime = new Date().getTime();

  if (!sessionExpiresAt || currentTime > sessionExpiresAt) {
    redirect('/login');
    return null;
  }

  // 型アサーションを使用して userData.user.email が string 型であることを保証
  const user = { email: userData.user.email as string };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ClientPrivatePage user={user} />
    </Suspense>
  );
}

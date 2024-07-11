import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ClientPrivatePage from './components/ClientPrivatePage';
import BrowserBackHandler from './components/BrowserBackHandler';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user ) {
    redirect('/login');
    return null;
  }

  // 型アサーションを使用して userData.user.email が string 型であることを保証
  const user = { email: userData.user.email as string };

  return (
    <>
      <BrowserBackHandler /> 
      <Suspense fallback={<p>Loading...</p>}>
        <ClientPrivatePage user={user} />
      </Suspense>
    </>
  );
}

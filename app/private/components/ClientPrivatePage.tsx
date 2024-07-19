'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { signOut } from '../../login/actions';
import Modal from './Modal'; 
import { SESSION_TIMEOUT } from '@/utils/constants';

type ClientPrivatePageProps = {
  user: {
    email: string;
  };
};

export default function ClientPrivatePage({ user }: ClientPrivatePageProps) {
  const router = useRouter();
  const [sessionExpired, setSessionExpired] = useState(false);

  const handleLogout = useCallback(async () => {
    await signOut();
    document.cookie = 'sb-access-token=; Max-Age=0; path=/;';
    document.cookie = 'sb-refresh-token=; Max-Age=0; path=/;';
    router.replace('/login');
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionExpired(true);
    }, SESSION_TIMEOUT); // ここで変数を使用

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (sessionExpired) {
      const redirectTimer = setTimeout(() => {
        handleLogout();
      }, 5000); // 5秒後にログインページにリダイレクト

      return () => clearTimeout(redirectTimer);
    }
  }, [sessionExpired, handleLogout]);

  return (
    <div>
      <p>Hello {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      {sessionExpired && (
        <Modal>
          <p>セッションの有効期限が切れました。<br></br>ログインしなおしてください。</p>
        </Modal>
      )}
    </div>
  );
}

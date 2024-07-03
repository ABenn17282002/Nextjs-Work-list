'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '../login/actions';

type ClientPrivatePageProps = {
  user: {
    email: string;
  };
};

export default function ClientPrivatePage({ user }: ClientPrivatePageProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(); // サーバーサイドでセッションを無効化
    // クッキーを削除
    document.cookie = 'sb-access-token=; Max-Age=0; path=/;';
    document.cookie = 'sb-refresh-token=; Max-Age=0; path=/;';
    router.replace('/login'); // replace を使用して履歴を置き換え
  };

  return (
    <div>
      <p>Hello {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
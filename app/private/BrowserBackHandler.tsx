'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '../login/actions';
import styles from '../components/BrowserBackHandler.module.css';

const BrowserBackHandler: React.FC = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handlePopState = async (event: PopStateEvent) => {
      console.log("Pop state detected");
      setIsLoggingOut(true);
      console.log("Logging out state set to true");

      setTimeout(async () => {
        try {
          console.log("Starting signOut process");
          await signOut(); // サーバーサイドでセッションを無効化
          console.log("signOut process completed");

          // クッキーを削除
          document.cookie = 'sb-access-token=; Max-Age=0; path=/;';
          document.cookie = 'sb-refresh-token=; Max-Age=0; path=/;';
          console.log("Cookies cleared");

          router.replace('/login'); // replace を使用して履歴を置き換え
          console.log("Navigated to /login");
        } catch (error) {
          console.error("Error during signOut: ", error);
        }
      }, 1000); // 100ミリ秒の遅延
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return (
    isLoggingOut ? (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
        </div>
      </div>
    ) : null
  );
};

export default BrowserBackHandler;

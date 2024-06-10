'use client';

import React, { useState } from 'react';
// Supabase クライアントを作成するためのインポート
import { createClient, User } from '@supabase/supabase-js';

// 環境変数からSupabaseのURLと匿名キーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントを作成
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// LoginPageコンポーネントを定義
export default function LoginPage() {
  // メールアドレスとパスワードの状態を管理
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // ログインしたユーザーの状態 (User型またはnull)
  const [user, setUser] = useState<User | null>(null);

  // ログインフォームの送信処理
  const handleLogin = async (event: React.FormEvent) => {
    // フォームのデフォルト動作をキャンセル
    event.preventDefault();

    // SupabaseのsignInWithPasswordメソッドを使って認証を試みる
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email, 
      password: password, 
    });

    // エラーが発生した場合、エラーメッセージを設定
    if (error) {
      setError(error.message); 
    } else {
      setSuccess('ログインに成功しました！'); // 成功メッセージを状態に設定
      setUser(data.user); // ログインユーザー情報を状態に設定
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>メールアドレス:</label>
          <input
            type="email"
            value={email} // email状態の値を設定
            onChange={(e) => setEmail(e.target.value)} // 入力値をemail状態に反映
            required
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password} // password状態の値を設定
            onChange={(e) => setPassword(e.target.value)} // 入力値をpassword状態に反映
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {user && (
        <div>
          <h2>ログインユーザー情報</h2>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

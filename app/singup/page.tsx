'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 環境変数からSupabaseのURLと匿名キーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントを作成
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegisterPage() {
  // フォーム入力の状態を管理
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // エラーメッセージを管理（nullまたは文字列）
  const [error, setError] = useState<string | null>(null);
  // 登録成功のフラグを管理
  const [success, setSuccess] = useState<boolean>(false);

  // フォーム送信時に呼び出されるサインアップ処理
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト動作を防止
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      // エラーメッセージを設定
      setError(error.message);
    } else {
      // エラーメッセージをリセットし、成功フラグを立てる
      setError(null);
      setSuccess(true);
    }
  };

  return (
    <div className="register-container">
      <h1>サインアップ</h1>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">サインアップ</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">サインアップが成功しました！メールを確認してアカウントを確認してください。</p>}
    </div>
  );
}

"use client";
import { getSupabaseClient } from "@/utils/supabase/client";
import { useState } from "react";
import { getURL } from "@/utils/helpers";

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [isSend, setIsSend] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const supabase = getSupabaseClient();

  const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Reset error message
    setIsSend(false); // Reset send status

    try {
      console.log("Sending email:", email);

      const res = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await res.json();
      console.log("Response status:", res.status);
      console.log("Response body:", result); // ログを追加

      if (res.status !== 200) {
        setErrorMessage(result.message);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getURL("login/reset-password"),
      });
      if (error) {
        setErrorMessage("エラーが発生しました。");
        throw error;
      }
      setIsSend(true);
    } catch (error) {
      console.error("Error in handleSubmitEmail:", error);
      setErrorMessage("エラーが発生しました。");
    }
  };

  const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <p className="mb-4 text-lg text-gray-700 text-center whitespace-nowrap">
          登録されているメールアドレスを入力してください
        </p>
        <form
          onSubmit={handleSubmitEmail}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          {isSend && (
            <p className="text-green-500 text-center mb-4">
              メールを送信しました。メールボックスをご確認ください。
            </p>
          )}
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={handleSetEmail}
              placeholder="メールアドレス"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

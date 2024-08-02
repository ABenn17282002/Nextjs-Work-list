"use client";
import { getSupabaseClient } from "@/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { useState } from "react";
import { getURL } from "@/utils/helpers";

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [isSend, setIsSend] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseClient();

  const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log("Checking email existence in Supabase:", email);

      // 直接クエリでメールアドレスの存在を確認
      const { data, error: emailCheckError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      console.log("Supabase email check response:", data, emailCheckError);

      if (emailCheckError || !data) {
        setError("アカウントに紐づいたメールアドレスを送ってください");
        return;
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getURL("login/reset-password"),
      });

      if (resetError) {
        const errorMessage = resetError instanceof AuthError && resetError.status === 429
          ? "リクエストが多すぎます。しばらくしてからもう一度お試しください。"
          : "メール送信中にエラーが発生しました。";

        setError(errorMessage);
        return;
      }

      setIsSend(true);
    } catch (error) {
      console.error("Unexpected error:", error);
      const errorMessage = error instanceof AuthError
        ? "認証エラーが発生しました。"
        : "予期しないエラーが発生しました。";

      setError(errorMessage);
    }
  };

  const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  if (isSend) {
    return (
      <p className="text-green-500">
        メールを送信しました。メールボックスをご確認ください。
      </p>
    );
  }

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
          <div className="mb-4">
            {error && <p className="text-red-500">{error}</p>}
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

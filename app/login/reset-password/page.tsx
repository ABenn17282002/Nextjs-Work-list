"use client";
import { getSupabaseClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // For Next.js 13+ with app directory

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [isSend, setIsSend] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const supabase = getSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setShowModal(true);
      }
    };
    checkSession();
  }, [supabase]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        router.push('/login'); // Redirect to login page after 5 seconds
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showModal, router]);

  const handleSubmitPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (showModal) return; // If modal is shown, prevent form submission

    try {
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error) {
        if (error.message === "New password should be different from the old password.") {
          setError("新しいパスワードは現在のパスワードと異なるものを入力してください。");
        } else {
          setError("エラーが発生しました。もう一度お試しください。");
        }
        throw error;
      }
      setIsSend(true);
      setError(null); // Reset error on successful submission
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(null); // Reset error when user starts typing a new password
  };

  const Modal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="text-lg mb-4">認証が切れています。再度メールアドレスを送信してください</p>
        <p className="text-sm text-gray-600">5秒後にログインページにリダイレクトされます...</p>
      </div>
    </div>
  );

  if (isSend) {
    return (
      <p className="text-green-500 text-center mt-4">
        パスワードが更新されました。
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs p-8 bg-white rounded-lg shadow-md">
        <p className="text-lg text-gray-700 mb-4">
          新しいパスワードを入力してください
        </p>
        <form onSubmit={handleSubmitPassword} className="space-y-4">
          <input
            className={`w-full p-2 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? "border-red-500" : ""
            }`}
            type="password"
            value={password}
            onChange={handleSetPassword}
            placeholder="パスワード"
            disabled={showModal} // Disable input when modal is shown
          />
          {error && !showModal && (
            <p className="text-red-500 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={showModal} // Disable button when modal is shown
          >
            送信
          </button>
        </form>
      </div>
      {showModal && <Modal />}
    </div>
  );
}

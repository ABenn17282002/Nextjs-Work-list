"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-sm w-full text-center">
        <p className="text-green-500 text-lg">
          登録完了しました。メールを確認してください。
        </p>
      </div>
    </div>
  );
}

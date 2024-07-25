"use client";

import { useState } from "react";

export default function RegisterUser() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);

    // サーバー側でバリデーションと処理を行う
    const response = await fetch("/api/signup", {
      method: "POST",
      body: formdata,
    });

    const result = await response.json();

    if (result.error) {
      setErrors(result.error);
    } else {
      window.location.href = "/registersuccess";
    }
  };

  const renderGeneralError = () => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.includes("name") && errorKeys.includes("email") && errorKeys.includes("password") && errorKeys.includes("confirmPassword")) {
      return "名前、email、パスワード、パスワード確認を入力してください";
    }
    return errors.general;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md max-w-sm w-full">
        {renderGeneralError() && <div className="mb-4 text-red-500">{renderGeneralError()}</div>}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="名前"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!renderGeneralError() && errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!renderGeneralError() && errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="パスワード"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!renderGeneralError() && errors.password && <div className="text-red-500">{errors.password}</div>}
        </div>
        <div className="mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="パスワード確認"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!renderGeneralError() && errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="ml-2">パスワードを表示</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          登録
        </button>
      </form>
    </div>
  );
}

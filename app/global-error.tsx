"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2 className="font-bold mb-2">エラー</h2>
        <p>エラーが発生しました。</p>
        <button
          onClick={() => reset()}
          className="bg-red-600 text-white mt-2 px-4 py-2 rounded hover:bg-red-500 transition ease-in-out duration-200"
        >
          もう一度試す
        </button>
      </body>
    </html>
  );
}
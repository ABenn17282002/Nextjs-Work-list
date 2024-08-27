module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',    // Next.jsの`app`ディレクトリ内のすべてのファイル
    './pages/**/*.{js,ts,jsx,tsx}',  // Next.jsの`pages`ディレクトリ内のすべてのファイル
    './components/**/*.{js,ts,jsx,tsx}',  // `components`ディレクトリ内のすべてのファイル
    './layouts/**/*.{js,ts,jsx,tsx}',  // 任意で`layouts`ディレクトリを追加
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

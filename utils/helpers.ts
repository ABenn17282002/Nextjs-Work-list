export const getURL = (path: string = '') => {
    // NEXT_PUBLIC_SITE_URLが設定されていて、空でないかを確認する。これは本番環境でのサイトURLに設定する。
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL &&
        process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_SITE_URL
            : // 設定されていない場合、Vercelが自動的に設定するNEXT_PUBLIC_VERCEL_URLを確認する。
            process?.env?.NEXT_PUBLIC_VERCEL_URL &&
            process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
                ? process.env.NEXT_PUBLIC_VERCEL_URL
                : // 両方とも設定されていない場合、ローカル開発用にlocalhostをデフォルトとして設定する。
                'http://localhost:3000/';

    // URLの前後の空白を取り除き、末尾のスラッシュを削除する。
    url = url.replace(/\/+$/, '');
    // URLに`http`が含まれていない場合、localhost以外には`https://`を追加する。
    url = url.includes('http') ? url : `https://${url}`;
    // パスの先頭にスラッシュがないことを確認し、二重スラッシュを避ける。
    path = path.replace(/^\/+/, '');

    // URLとパスを結合して返す。パスが指定されていない場合はURLだけを返す。
    return path ? `${url}/${path}` : url;
};

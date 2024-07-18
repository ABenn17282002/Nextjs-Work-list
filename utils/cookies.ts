import { setCookie, destroyCookie, parseCookies } from 'nookies';
import type { NextPageContext } from 'next';

// クッキーにトークンをセットする
export const setCookieToken = (ctx: NextPageContext | null, token: string) => {
  setCookie(ctx ?? null, 'accessToken', token, {
    maxAge: 60, // 1分間
    path: '/',
  });
}

// クッキーを削除する
export const destroyCookieToken = (ctx: NextPageContext | undefined) => {
  destroyCookie(ctx ?? null, 'accessToken', { path: '/' });
}

// クッキーを抽出する
export const extractCookie = (ctx: NextPageContext | undefined) => {
  return parseCookies(ctx ?? null);
}

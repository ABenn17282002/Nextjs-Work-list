import { setCookie, destroyCookie, parseCookies } from 'nookies';
import type { NextPageContext } from 'next';
import { COOKIE_MAX_AGE } from './constants';

// クッキーにトークンをセットする
export const setCookieToken = (ctx: NextPageContext | null, token: string) => {
  console.log('Setting cookie token:', token); // デバッグ情報を出力
  setCookie(ctx ?? null, 'accessToken', token, {
    maxAge: COOKIE_MAX_AGE, 
    path: '/',
  });
  console.log('Cookie set with maxAge:', COOKIE_MAX_AGE); // デバッグ情報を出力
}

// クッキーを削除する
export const destroyCookieToken = (ctx: NextPageContext | undefined) => {
  destroyCookie(ctx ?? null, 'accessToken', { path: '/' });
}

// クッキーを抽出する
export const extractCookie = (ctx: NextPageContext | undefined) => {
  return parseCookies(ctx ?? null);
}

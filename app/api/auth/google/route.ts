import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';

// COOKIE_SECRETが必ずstring型であることを保証
const cookieSecret: string = process.env.COOKIE_SECRET as string;

if (!cookieSecret) {
  throw new Error("COOKIE_SECRET is not defined in the environment variables.");
}

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_URL}${process.env.GOOGLE_AUTHORIZED_REDIRECT}`
);

export async function GET(request: NextRequest) {
  let code, scope;

  if (request.nextUrl.searchParams) {
    code = request.nextUrl.searchParams.get("code");
    scope = request.nextUrl.searchParams.get("scope");
  }

  if (!code) {
    const authUrl = oauth2Client.generateAuthUrl({
      prompt: "consent",
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    });
    return Response.redirect(authUrl);
  }

  const { tokens } = await oauth2Client.getToken(code);
  // return Response.json(tokens);

  // トークンをJWTとしてサイン
  const signedCookieContent = jwt.sign(tokens, cookieSecret, {
    expiresIn: "7d",
  });

  // クッキーを設定
  const cookieStore = cookies();
  cookieStore.set({
    name: "tokens",
    value: signedCookieContent,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // トークンが存在しない場合の処理
  if (!tokens || !tokens.id_token) {
    throw new Error("IDトークンが取得できませんでした。");
  }

  // userInfoCookieContentとしてIDトークンを使用
  const userInfoCookieContent = jwt.decode(tokens.id_token);
  return Response.json(userInfoCookieContent);

}

export async function DELETE() {
  // DELETEメソッドの処理をここに追加
}

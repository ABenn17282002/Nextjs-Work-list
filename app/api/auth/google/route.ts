import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';

const cookieSecret = process.env.COOKIE_SECRET;
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
  return Response.json(tokens);
}

export async function DELETE() {
  // DELETEメソッドの処理をここに追加
}

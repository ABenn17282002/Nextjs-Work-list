import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

// ミドルウェア関数をエクスポート
export async function middleware(req:NextRequest) {
    // 次のレスポンスを作成
    const res = NextResponse.next();
    // Supabaseミドルウェアクライアントを作成
    const supabase = createMiddlewareClient({ req, res });

    // 認証されたユーザーを取得
    const { data: { user } } = await supabase.auth.getUser();

    // ユーザーが存在し、かつルートが'/'の場合、'/works-list'にリダイレクト
    if (user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/works-list', req.url));
    }

    // ユーザーが存在しない場合、かつルートが'/'でない場合、'/'にリダイレクト
    if (!user && req.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // それ以外の場合は次のレスポンスを返す
    return res;
}

// ミドルウェアの設定
export const config = {
    matcher: ['/', '/works-list'], // ミドルウェアを適用するルート
};
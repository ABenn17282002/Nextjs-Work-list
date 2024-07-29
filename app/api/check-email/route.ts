import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      console.error("Email is required");
      return NextResponse.json({ message: 'メールアドレスを入力してください' }, { status: 400 });
    }

    console.log("Received email:", email);

    const supabase = createClient();

    const { data, error } = await supabase
      .from('users') // テーブル名を正しいものに置き換えてください
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.details === 'The result contains 0 rows') {
      console.error("Email not found");
      return NextResponse.json({ message: 'そのメールアドレスは登録されていません。' }, { status: 404 });
    }

    if (error) {
      console.error("Error checking email:", error);
      return NextResponse.json({ message: 'エラーが発生しました。' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email exists' }, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ message: 'エラーが発生しました。' }, { status: 500 });
  }
}

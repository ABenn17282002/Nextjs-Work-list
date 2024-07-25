import { NextRequest, NextResponse } from 'next/server';
import { signup } from '@/app/register/actions';

export async function POST(request: NextRequest) {
  const formdata = await request.formData();
  const result = await signup(formdata);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  } else {
    return NextResponse.json({ success: true });
  }
}

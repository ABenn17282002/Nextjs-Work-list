import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// Ensure dynamic rendering for components using cookies
export const dynamic = "force-dynamic"; 

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)

    console.log(requestUrl.origin)
    return NextResponse.redirect(requestUrl.origin + '/')
}
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // ถ้าผู้ใช้ยังไม่ได้ล็อกอินและพยายามเข้าถึง /dashboard
  if (pathname.startsWith('/dashboard') && !user) {
    // เก็บข้อความใน sessionStorage
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('message', 'กรุณา Login ก่อนเข้าใช้งาน')

    return NextResponse.redirect(url)
  }

  // ถ้าผู้ใช้ล็อกอินแล้ว หรือไม่ใช่หน้า /dashboard
  return NextResponse.next()
}

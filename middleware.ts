import { NextResponse, NextMiddleware, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get('token');
  // const token = true;
  // // const currentUrl = request.nextUrl.clone();
 
  // if (token) {
  //   const Admin = "admin";
  //   if (Admin) {
  //     return NextResponse.next();
  //   } 
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|dashboard.png|Group.png|assets/images).*)',
  ],
};

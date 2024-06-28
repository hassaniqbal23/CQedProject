import { NextResponse, NextRequest } from 'next/server';

// const ALLOWED_PATHS = [
//   '/login',
//   '/students/sign-in',
//   '/teachers/sign-in',
//   '/universities/sign-in',
//   '/admin/forgot-password',
//   '/teachers/forget-password',
//   '/students/forget-password',
//   '/universities/forget-password',
// ];

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get('token');
  // const url = request.nextUrl.pathname;

  // if (ALLOWED_PATHS.includes(url)) {
  //   return NextResponse.next();
  // }

  // if (token) {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_HOST}/users/me`,
  //     {
  //       headers: { Authorization: `Bearer ${token.value}` },
  //     }
  //   );
  //   const data = await response.json();
  //   const currentRole = data.data?.role?.name;

  //   if (currentRole === 'teacher') {
  //     if (url.startsWith('/teachers')) {
  //       return NextResponse.next();
  //     }
  //     return NextResponse.redirect(new URL('/accessDenied', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|dashboard.png|avatar3.svg|animalRescue.svg|avatar2.svg|avatar1.svg|Group.png|firebase-messaging-sw.js|assets/images|assets/flags|assets/GCEd|assets/sidebaricons|assets/profile/|membersCard.svg|messageIcon.svg|yellowChart.svg|avatar1.svg|avatar2.svg|avatar3.svg|Bin.png|briefcase.svg|cake.png|Cartoon.svg|Chat.svg|check.svg|circle.svg|community.svg|country-flags|culture.svg|diversity.svg|edit.svg|Ellipse 3728.svg|Emily.png|Emily1.png|favicon.ico|female.svg|firebase-messaging-sw.js|friends.svg|globally.jpeg|Globe.svg|graduate.svg|handArt.svg|IconsMenu.svg|imageUpload.svg|John.jpeg|logo-white.svg|logo.svg|male.svg|next.svg|notification.mp3|online-course.svg|teacherIcon.svg|thirteen.svg|thumbsup.png|translate.png|uplode.svg|vercel.svg|Videoconference.svg|World.svg|worldHand.svg).*)',
  ],
};

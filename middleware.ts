import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl.pathname;

  if (url.startsWith('/auth-api')) return;

  const isAdminPage = url.startsWith('/admin');
  const isTeachersPage = url.startsWith('/teachers');
  const isStudentsPage = url.startsWith('/students');
  const responseWithFetchApi = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const status = responseWithFetchApi.status;
  const data = await responseWithFetchApi.json();
  const userRole = data?.data?.role?.name;
  const isAdminRole = userRole === '*';
  const isTeacherRole = userRole === 'teacher';
  const isStudentRole = userRole === 'student';

  const isLoginPage =
    url.startsWith('/login') ||
    url.endsWith('/sign-in') ||
    url.endsWith('/sign-up');

  if (status === 401 && !isLoginPage) {
    return NextResponse.redirect(new URL('/students/sign-in', request.url));
  }

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/students/sign-in', request.url));
  }

  if (isLoginPage) {
    if (isTeacherRole) {
      return NextResponse.redirect(new URL('/teachers/dashboard', request.url));
    } else if (isStudentRole) {
      return NextResponse.redirect(new URL('/students/dashboard', request.url));
    } else if (isAdminRole) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  if (!isAdminPage && isAdminRole) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  } else if (!isTeachersPage && isTeacherRole) {
    return NextResponse.redirect(new URL('/teachers/dashboard', request.url));
  } else if (!isStudentsPage && isStudentRole) {
    return NextResponse.redirect(new URL('/students/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|dashboard.png|avatar3.svg|animalRescue.svg|avatar2.svg|avatar1.svg|Group.png|firebase-messaging-sw.js|assets/images|assets/flags|assets/GCEd|assets/sidebaricons|assets/profile/|membersCard.svg|messageIcon.svg|yellowChart.svg|avatar1.svg|avatar2.svg|avatar3.svg|Bin.png|briefcase.svg|cake.png|Cartoon.svg|Chat.svg|check.svg|circle.svg|community.svg|country-flags|culture.svg|diversity.svg|edit.svg|Ellipse 3728.svg|Emily.png|Emily1.png|favicon.ico|female.svg|firebase-messaging-sw.js|friends.svg|globally.jpeg|Globe.svg|graduate.svg|handArt.svg|IconsMenu.svg|imageUpload.svg|John.jpeg|logo-white.svg|logo.svg|male.svg|next.svg|notification.mp3|online-course.svg|teacherIcon.svg|thirteen.svg|thumbsup.png|translate.png|uplode.svg|vercel.svg|Videoconference.svg|World.svg|worldHand.svg).*)',
  ],
};

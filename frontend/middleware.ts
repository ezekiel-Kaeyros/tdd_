import { NextResponse, NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  if (!request?.cookies.get('session')) {
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    '/convert:path*',
    '/admin:path*',
    '/super-admin:path*',
    '/configfiles:path*',
    '/super-admin:path*/admin',
    '/super-admin:path*/settings',
    '/super-admin:path*/settings/configfiles',
    '/super-admin:path*/settings/profile',
    '/super-admin:path*/users',
    '/admin/users',
    '/admin/settings',
    '/admin/users/',
    '/admin/settings/profile',
  ],
};

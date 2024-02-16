
import { NextResponse , NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const path=request.nextUrl.pathname;
    const isPublicPath= path==='/login'||path==='/signUp'|| path==='/verifyemail';
    const token = request.cookies.get('token')||"";

    if (isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }    // if your are logged in , then you not see the login and signup page
    
    if (!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login",request.nextUrl));  //if you try to access a private route 
      //if it is private route but user did not logedin,then redirect to

    }

}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
      '/',
      '/profile',
      '/login',
      '/signUp',
      '/verifyemail'
    ]
  }
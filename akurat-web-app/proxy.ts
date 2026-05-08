import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value }) =>
              request.cookies.set(name, value)
          )

          response = NextResponse.next()

          cookiesToSet.forEach(
            ({ name, value, options }) =>
              response.cookies.set(
                name,
                value,
                options
              )
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const isAuthPage =
    pathname === '/login' ||
    pathname === '/register'

  const isDashboard =
    pathname.startsWith('/dashboard')

  // Guest tries dashboard
  if (!user && isDashboard) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  // Logged user tries login/register
  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    )
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
}
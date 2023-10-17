import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')
  const password = request.nextUrl.searchParams.get('password')

  // TODO

  return Response.json({ username, password })
}

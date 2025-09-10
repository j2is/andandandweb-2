import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const PROTECTED_PASSWORD = process.env.PROTECTED_PASSWORD

if(!process.env.PROTECTED_PASSWORD){
	throw new Error('PROTECTED_PASSWORD is not set')
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('auth-token')?.value
}

export async function setAuthCookie() {
  const cookieStore = await cookies()
  // Set a simple auth token - in production, use a proper JWT or session token
  cookieStore.set('auth-token', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 hours
  })
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

export async function verifyAuth() {
  const authToken = await getAuthCookie()
  return authToken === 'authenticated'
}

export async function requireAuth() {
  const isAuthenticated = await verifyAuth()
  if (!isAuthenticated) {
    redirect('/login')
  }
}

 
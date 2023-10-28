export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function getToken(): string {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token is empty')
  }
  return token
}

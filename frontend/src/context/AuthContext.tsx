import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { fetchCurrentUser, loginUser, registerUser } from "../api/authService.js"
import type { AuthUser, LoginPayload, RegisterPayload } from "../api/authService.js"

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (data: LoginPayload) => Promise<void>
  register: (data: RegisterPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setLoading(false)
      return
    }

    fetchCurrentUser()
      .then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (data: LoginPayload) => {
    const { token } = await loginUser(data)
    localStorage.setItem("token", token)
    const { user } = await fetchCurrentUser()
    setUser(user)
  }, [])

  const register = useCallback(async (data: RegisterPayload) => {
    await registerUser(data)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

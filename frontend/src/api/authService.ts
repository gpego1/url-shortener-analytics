import { api } from "./client.js"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
}

export async function registerUser(data: RegisterPayload): Promise<AuthUser> {
    const response = await api.post<AuthUser>("/api/auth/register", data)
    return response.data;
}

export async function loginUser(data: LoginPayload): Promise<{ token: string }> {
    const response = await api.post<{ token: string }>("/api/auth/login", data)
    return response.data
}

export async function fetchCurrentUser(): Promise<{ user: AuthUser }> {
    const response = await api.get<{ user: AuthUser }>("/api/auth/me")
    return response.data
}
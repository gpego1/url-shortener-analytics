import axios from "axios"

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRequest = error.config?.url?.includes("/api/auth/login")
            || error.config?.url?.includes("/api/auth/register")
        if (error.response?.status === 401 && !isAuthRequest) {
            localStorage.removeItem("token")
            window.location.href = "/login"
        }
        return Promise.reject(error);
    }
)
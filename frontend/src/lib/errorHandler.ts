import axios, { AxiosError } from "axios"

type ApiErrorBody = {
    message?: string
    errors?: Record<string, string[]>
}

export type ApiErrorResult = {
    status: number | null
    message: string
}

const STATUS_MESSAGES: Record<number, string> = {
    400: "Invalid Request. Verify the information you provided.",
    403: "Unauthorized",
    500: "Internal Server Error. Try again later"
}

function extractValidationMessage(data?: ApiErrorBody): string | null {
    if (!data?.errors) return null
    return Object.values(data.errors).flat().join(", ")
}

export function getApiErrorMessage(err: unknown): ApiErrorResult {
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ApiErrorBody>

        if (!axiosError.response) {
            return {
                status: null,
                message: "Não foi possível conectar ao servidor. Verifique sua conexão.",
            }
        }

        const { status, data } = axiosError.response

        if (status === 422) {
            return {
                status,
                message: extractValidationMessage(data) ?? data?.message ?? "Não foi possível validar os dados enviados.",
            }
        }

        return {
            status,
            message: data?.message ?? STATUS_MESSAGES[status] ?? `Erro inesperado (status ${status}).`,
        }
    }

  
    return {
        status: null,
        message: "Ocorreu um erro inesperado.",
    }
}
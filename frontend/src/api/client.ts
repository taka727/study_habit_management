import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL is not set')
}

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    const headers = config.headers ?? {}
    if (headers instanceof AxiosHeaders) {
      headers.set('Authorization', `Bearer ${token}`)
    } else {
      ;(headers as Record<string, string>).Authorization = `Bearer ${token}`
    }
    config.headers = headers as InternalAxiosRequestConfig['headers']
  }
  return config
}

export const responseErrorInterceptor = (error: unknown) => {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    (error as { response?: { status?: number } }).response?.status === 401
  ) {
    localStorage.removeItem('token')
  }
  return Promise.reject(error)
}

// リクエストインターセプター（認証トークン付与）
apiClient.interceptors.request.use(requestInterceptor)

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor,
)

export default apiClient

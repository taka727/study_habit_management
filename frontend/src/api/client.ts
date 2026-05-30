import axios, { AxiosHeaders, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import mockClient from './mockClient'

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

function createRealClient(): AxiosInstance {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  if (!baseURL) {
    throw new Error('VITE_API_BASE_URL is not set')
  }
  const client = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  })
  client.interceptors.request.use(requestInterceptor)
  client.interceptors.response.use((response) => response, responseErrorInterceptor)
  return client
}

const apiClient =
  import.meta.env.VITE_USE_MOCK === 'true'
    ? mockClient
    : (createRealClient() as unknown as typeof mockClient)

export default apiClient

import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { dispatch } from './mock/index'

function ok<T>(data: T): Promise<AxiosResponse<T>> {
  return Promise.resolve({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: {} } as InternalAxiosRequestConfig,
  })
}

function unhandled(method: string, url: string): Promise<never> {
  const error = Object.assign(new Error(`[mock] unhandled ${method} ${url}`), {
    response: { status: 404, data: { message: 'Not Found' } },
  })
  return Promise.reject(error)
}

function handle<T>(method: string, url: string, body?: unknown): Promise<AxiosResponse<T>> {
  const result = dispatch(method, url, body)
  return result !== null ? ok(result as T) : unhandled(method, url)
}

const mockClient = {
  get<T>(url: string): Promise<AxiosResponse<T>> {
    return handle<T>('GET', url)
  },
  post<T>(url: string, body?: unknown): Promise<AxiosResponse<T>> {
    return handle<T>('POST', url, body)
  },
  put<T>(url: string, body?: unknown): Promise<AxiosResponse<T>> {
    return handle<T>('PUT', url, body)
  },
  delete<T>(url: string): Promise<AxiosResponse<T>> {
    return handle<T>('DELETE', url)
  },
  interceptors: {
    request: { use: (_fn: unknown) => 0 },
    response: { use: (_onFulfilled: unknown, _onRejected?: unknown) => 0 },
  },
}

export default mockClient

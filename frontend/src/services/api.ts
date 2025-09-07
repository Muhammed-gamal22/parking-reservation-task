import axios from 'axios'

export const API_BASE =  'http://localhost:3000/api/v1'

export const apiClient = axios.create({ baseURL: API_BASE })

// apiClient.interceptors.request.use((config) => {
//   // attach token from cookie/localStorage if available (client-only)
//   if (typeof window !== 'undefined'){
//     const token = localStorage.getItem('token')
//     if (token) config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

export const getData = async (url: string) => {
  const r = await apiClient.get(url)
  return r.data
}

export const postData = async (url: string, body?: any) => {
  const r = await apiClient.post(url, body)
  return r.data
}
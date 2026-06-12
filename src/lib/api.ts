import axios from 'axios'
import type { Analytics, CreateThreatDto, IngestionDto, Threat, ThreatFilters, ThreatsResponse } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? ''

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? error.message ?? 'Unknown error'
    return Promise.reject(new Error(message))
  }
)

export const threatsApi = {
  create: async (data: CreateThreatDto): Promise<Threat> => {
    const res = await apiClient.post<Threat>('/threats', data)
    return res.data
  },

  list: async (filters: ThreatFilters = {}): Promise<ThreatsResponse> => {
    const params = new URLSearchParams()
    if (filters.page) params.set('page', String(filters.page))
    if (filters.limit) params.set('limit', String(filters.limit))
    if (filters.severity) params.set('severity', String(filters.severity))
    if (filters.indicator) params.set('indicator', filters.indicator)
    const res = await apiClient.get<ThreatsResponse>(`/threats?${params.toString()}`)
    return res.data
  },
}

export const ingestionApi = {
  ingest: async (data: IngestionDto): Promise<{ processed: number; results: Threat[] }> => {
    const res = await apiClient.post<{ processed: number; results: Threat[] }>('/ingestion', data)
    return res.data
  },
}

export const analyticsApi = {
  get: async (): Promise<Analytics> => {
    const res = await apiClient.get<Analytics>('/analytics')
    return res.data
  },
}

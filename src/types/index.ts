export type ThreatType = 'IP' | 'DOMAIN' | 'HASH'

export interface Threat {
  id: string
  indicator: string
  type: ThreatType
  severity: number
  riskScore?: number
  enrichment?: {
    reputation?: string
    geoIp?: string
    recurrence?: number
  }
  containment?: boolean
  createdAt: string
  updatedAt?: string
}

export interface ThreatsResponse {
  data: Threat[]
  total: number
  page: number
  limit: number
}

export interface ThreatFilters {
  page?: number
  limit?: number
  severity?: number
  indicator?: string
}

export interface CreateThreatDto {
  indicator: string
  type: string
  severity: number
}

export interface IngestionDto {
  threats: CreateThreatDto[]
}

export interface Analytics {
  totalThreats: number
  criticalThreats: number
  containedThreats: number
  averageSeverity: number
  byType: Record<string, number>
  bySeverity: Record<string, number>
  recentActivity?: Array<{ date: string; count: number }>
  topIndicators?: Array<{ indicator: string; count: number; severity: number }>
}

export interface ApiError {
  statusCode: number
  message: string
  error?: string
}

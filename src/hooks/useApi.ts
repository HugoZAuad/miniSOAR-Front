'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { analyticsApi, ingestionApi, threatsApi } from '@/lib/api'
import type { CreateThreatDto, IngestionDto, ThreatFilters } from '@/types'

export function useThreats(filters: ThreatFilters = {}) {
  return useQuery({
    queryKey: ['threats', filters],
    queryFn: () => threatsApi.list(filters),
    staleTime: 30_000,
  })
}

export function useCreateThreat() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateThreatDto) => threatsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threats'] })
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useIngest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IngestionDto) => ingestionApi.ingest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threats'] })
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => analyticsApi.get(),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })
}

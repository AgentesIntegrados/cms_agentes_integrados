'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef } from 'react'

export function useSearchRouting() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const routerRef = useRef(router)
  
  // Atualizar ref quando router mudar
  routerRef.current = router
  
  // Função debounced para atualizar URL
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  
  const debouncedSetRoute = useCallback((state: Record<string, any>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      const { query, page = 1 } = state
      const params = new URLSearchParams()
      
      if (query) {
        params.set('q', query)
      }
      
      if (page > 1) {
        params.set('page', page.toString())
      }
      
      const queryString = params.toString()
      const url = queryString ? `?${queryString}` : ''
      
      routerRef.current.push(`/search${url}`)
    }, 500)
  }, [])
  
  const getRouteState = useCallback(() => {
    const query = searchParams.get('q') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    
    return { query, page }
  }, [searchParams])
  
  return {
    routeState: getRouteState(),
    setRouteState: debouncedSetRoute,
  }
}
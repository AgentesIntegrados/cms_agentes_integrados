'use client'

import { InstantSearch, InstantSearchProps } from 'react-instantsearch'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { liteClient as algoliasearch } from 'algoliasearch/lite'

interface InstantSearchWrapperProps extends Omit<InstantSearchProps, 'searchClient' | 'indexName'> {
  searchClient: {
    appId: string
    apiKey: string
  }
  indexName: string
}

export default function InstantSearchWrapper({
  searchClient: { appId, apiKey },
  indexName,
  children,
  ...props
}: InstantSearchWrapperProps) {
  const searchParams = useSearchParams()
  
  const client = useMemo(() => algoliasearch(appId, apiKey), [appId, apiKey])
  
  // Configurar roteamento personalizado sem acessar headers síncronos
  const routeState = useMemo(() => {
    const query = searchParams.get('q') || ''
    const page = searchParams.get('page') || '1'
    
    return {
      query,
      page: parseInt(page, 10),
    }
  }, [searchParams])
  
  // Estado inicial para SSR
  const initialState = useMemo(() => {
    if (routeState.query) {
      return {
        query: routeState.query,
        page: routeState.page,
      }
    }
    return undefined
  }, [routeState])
  
  // Temporariamente retornando apenas children para evitar erro de build
  // TODO: Atualizar quando react-instantsearch suportar React 19
  return (
    <>
      {children}
    </>
  )
}
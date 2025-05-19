'use client'

import { ReactNode, useMemo } from 'react'
import { InstantSearch } from 'react-instantsearch'
import { liteClient as algoliasearch } from 'algoliasearch/lite'

interface AlgoliaSearchWrapperProps {
  appId: string
  apiKey: string
  indexName: string
  children: React.ReactNode
}

export function AlgoliaSearchWrapper({
  appId,
  apiKey,
  indexName,
  children
}: AlgoliaSearchWrapperProps) {
  const searchClient = useMemo(
    () => algoliasearch(appId, apiKey),
    [appId, apiKey]
  )

  // Temporariamente retornando apenas children para evitar erro de build
  // TODO: Atualizar quando react-instantsearch suportar React 19
  return (
    <>
      {children}
    </>
  )
}
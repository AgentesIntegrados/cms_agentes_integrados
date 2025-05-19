'use client';

import { useHits, UseHitsProps } from 'react-instantsearch';
import SearchResult from './SearchResult';
import { useSearchParams } from 'next/navigation';

export default function CustomHits(props: UseHitsProps) {
  const { hits } = useHits(props);
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Ordenar resultados para priorizar correspondências exatas no título
  const sortedHits = [...hits].sort((a, b) => {
    const titleA = a.title?.toLowerCase() || '';
    const titleB = b.title?.toLowerCase() || '';
    
    // Correspondências exatas primeiro
    if (titleA === query && titleB !== query) return -1;
    if (titleB === query && titleA !== query) return 1;
    
    // Depois correspondências que começam com a query
    if (titleA.startsWith(query) && !titleB.startsWith(query)) return -1;
    if (titleB.startsWith(query) && !titleA.startsWith(query)) return 1;
    
    // Depois correspondências que contêm a query
    if (titleA.includes(query) && !titleB.includes(query)) return -1;
    if (titleB.includes(query) && !titleA.includes(query)) return 1;
    
    // Manter ordem original para o resto
    return 0;
  });

  return (
    <div className="space-y-4">
      {sortedHits.map((hit) => (
        <SearchResult key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
}
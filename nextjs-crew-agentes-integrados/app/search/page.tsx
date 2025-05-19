'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { InstantSearch, Configure, Pagination } from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import BreakingNews from '../components/BreakingNews';
import CustomHits from '../components/CustomHits';

// Configuração do cliente Algolia
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div>
      <BreakingNews />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {query ? `Resultados para: "${query}"` : 'Busca'}
        </h1>
        
        <InstantSearch 
          searchClient={searchClient} 
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'posts'}
          initialUiState={{
            [process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'posts']: {
              query: query
            }
          }}
        >
          <Configure 
            hitsPerPage={10}
            attributesToRetrieve={['title', 'overview', 'poster_path', 'objectID']}
          />

          {/* Resultados */}
          <CustomHits />

          {/* Paginação */}
          <div className="mt-6">
            <Pagination
              classNames={{
                root: 'flex items-center justify-center gap-1',
                list: 'flex items-center gap-1',
                item: 'px-2 py-1 text-sm border rounded hover:bg-gray-50 cursor-pointer transition-colors',
                selectedItem: 'px-2 py-1 text-sm border rounded bg-blue-600 text-white border-blue-600',
                disabledItem: 'px-2 py-1 text-sm border rounded opacity-40 cursor-not-allowed',
                link: 'block',
              }}
              showFirst={false}
              showLast={false}
              showPrevious={true}
              showNext={true}
              padding={2}
            />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SearchContent />
    </Suspense>
  );
}
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { InstantSearch, SearchBox, Hits, Configure, Pagination } from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import BreakingNews from '../components/BreakingNews';
import SearchResult from '../components/SearchResult';

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
          <Configure hitsPerPage={10} />
          
          {/* Barra de busca */}
          <div className="mb-8">
            <SearchBox
              placeholder="Digite sua busca..."
              classNames={{
                root: 'relative',
                form: 'relative',
                input: 'w-full border p-3 pl-10 pr-24 rounded border-gray-300 focus:border-blue-500 focus:outline-none',
                submit: 'absolute left-3 top-1/2 -translate-y-1/2',
                reset: 'absolute right-14 top-1/2 -translate-y-1/2',
                submitIcon: 'w-5 h-5 text-gray-400',
                resetIcon: 'w-4 h-4 text-gray-400',
              }}
            />
          </div>

          {/* Resultados */}
          <div className="space-y-4">
            <Hits 
              hitComponent={SearchResult}
              classNames={{
                root: 'mt-6',
                list: 'space-y-4',
                item: 'list-none',
              }}
            />
          </div>

          {/* Paginação */}
          <div className="mt-8">
            <Pagination
              classNames={{
                root: 'flex flex-row items-center justify-center space-x-2',
                list: 'flex flex-row items-center space-x-2',
                item: 'px-3 py-2 border rounded hover:bg-gray-50 cursor-pointer',
                selectedItem: 'px-3 py-2 border rounded bg-blue-600 text-white',
                disabledItem: 'px-3 py-2 border rounded opacity-50 cursor-not-allowed',
                link: 'block w-full h-full',
              }}
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
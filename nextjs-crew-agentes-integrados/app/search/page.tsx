'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import BreakingNews from '../components/BreakingNews';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  date: string;
  author: { name: string };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  
  // Simulação de resultados para demonstração
  const mockResults: SearchResult[] = [
    {
      id: "1",
      title: "WhiteBIT Crowns World's Top Trader in First-Ever Live International Crypto Trading Cup",
      slug: "whitebit-crowns-worlds-top-trader",
      date: "MAY 15, 2025",
      author: { name: "ALBERT BROWN" },
      excerpt: "A competição Trading Cup da WhiteBIT estabeleceu um novo recorde com Max Hamaha sendo nomeado o melhor trader do mundo."
    },
    {
      id: "2",
      title: "Here is Where XRP May Stand in the Next 10 Years",
      slug: "xrp-future-predictions",
      date: "MAY 15, 2025",
      author: { name: "SAM WISDOM RAPHAEL" },
      excerpt: "Especialistas analisam o futuro do XRP e preveem um crescimento significativo nos próximos 10 anos."
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main>
      <Header />
      <div className="pt-24">
        <BreakingNews />
        
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            {query ? `Resultados para: "${query}"` : 'Busca'}
          </h1>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Digite sua busca..."
                  className="w-full border p-3 pl-10 rounded border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="ml-2 bg-blue-600 text-white px-4 py-3 rounded"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Resultados */}
          {query && (
            <div className="mt-8">
              <div className="space-y-6">
                {mockResults.map((result) => (
                  <div key={result.id} className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold mb-2">
                      <Link href={`/posts/${result.slug}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                        {result.title}
                      </Link>
                    </h3>
                    
                    {result.excerpt && (
                      <p className="text-gray-700 mb-2">
                        {result.excerpt}
                      </p>
                    )}
                    
                    <div className="text-sm text-gray-500">
                      {result.author.name} - {result.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Mensagem quando não há resultados */}
          {query && mockResults.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">Nenhum resultado encontrado para &quot;{query}&quot;</p>
              <p className="mt-2 text-gray-500">Tente outro termo de busca</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SearchContent />
    </Suspense>
  );
}
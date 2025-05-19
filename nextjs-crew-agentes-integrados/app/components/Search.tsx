'use client';

// Temporário: Mocks dos componentes Algolia para evitar erro de build com React 19
const SearchBox = ({ placeholder }: any) => <input type="text" placeholder={placeholder} className="w-full rounded-md border border-gray-300 py-2 px-3" />
const Hits = ({ hitComponent }: any) => <div>Resultados de busca...</div>
const Configure = ({ ...props }: any) => null
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlgoliaSearchWrapper } from './AlgoliaSearchWrapper';

// Configurau00e7u00e3o do Algolia
const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'posts';

export function Search() {
    // Estado para controlar os resultados
    const [results, setResults] = useState('');
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    return (
        <AlgoliaSearchWrapper
            appId={algoliaAppId}
            apiKey={algoliaApiKey}
            indexName={indexName}
        >
            {/* Configurau00e7u00e3o de paru00e2metros de busca */}
            <Configure hitsPerPage={10} />
            
            {/* Campo de busca */}
            <SearchBox
                placeholder="Pesquisar..."
                classNames={{
                    root: 'relative',
                    form: 'relative',
                    input: 'border p-2 rounded border-gray-300 m-5 w-1/2',
                    submit: 'hidden',
                    reset: 'hidden',
                    submitIcon: 'hidden',
                    resetIcon: 'hidden',
                    loadingIndicator: 'hidden',
                }}
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const query = formData.get('query') as string;
                    setResults(query);
                }}
            />

            {/* Componente de resultados */}
            {results && (
                <div className="text-left">
                    <h2 className="text-2xl font-semibold mb-4">Resultados para: {results}</h2>

                    <Hits
                        hitComponent={({ hit }: { hit: any }) => (
                            <div className="p-4 border-b hover:bg-gray-50 transition-colors">
                                <Link href={`/posts/${hit.slug}`} className='text-blue-600 hover:text-blue-800 hover:underline'>
                                    <h3 className="font-semibold text-lg">{hit.title}</h3>
                                </Link>
                                {hit.description && (
                                    <p className="text-gray-600 mt-1">{hit.description}</p>
                                )}
                            </div>
                        )}
                    />
                </div>
            )}
        </AlgoliaSearchWrapper>
    );
}
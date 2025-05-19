interface EmptyStateProps {
  query?: string;
  suggestions?: string[];
}

export default function EmptyState({ query, suggestions = [] }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mb-4">
        <svg 
          className="mx-auto h-24 w-24 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        {query 
          ? `Nenhum resultado encontrado para "${query}"`
          : 'Digite algo para buscar'
        }
      </h3>
      
      <p className="text-gray-500 mb-6">
        {query 
          ? 'Tente usar outras palavras-chave ou verifique a ortografia'
          : 'Use a barra de busca acima para encontrar o que procura'
        }
      </p>
      
      {suggestions.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-3">Talvez você queira buscar por:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
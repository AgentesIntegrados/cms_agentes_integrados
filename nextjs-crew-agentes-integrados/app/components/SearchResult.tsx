import Link from 'next/link';

interface SearchResultProps {
  hit: {
    objectID: string;
    title: string;
    slug?: string;
    body?: string;
    excerpt?: string;
    overview?: string;
    poster_path?: string;
    coverImage?: string;
    date?: string;
    _createdAt?: string;
    author?: { name: string };
  };
}

export default function SearchResult({ hit }: SearchResultProps) {
  const imageUrl = hit.poster_path || hit.coverImage;
  const description = hit.excerpt || hit.body || hit.overview || '';
  const date = hit.date || hit._createdAt;
  
  return (
    <article className="group p-4 border rounded-lg hover:shadow-lg transition-all duration-200">
      <div className="flex gap-4">
        {imageUrl && (
          <div className="flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={hit.title}
              className="w-24 h-24 object-cover rounded-md"
            />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            {hit.slug ? (
              <Link 
                href={`/posts/${hit.slug}`}
                className="text-gray-900 group-hover:text-blue-600 transition-colors"
              >
                {hit.title}
              </Link>
            ) : (
              <span className="text-gray-900">{hit.title}</span>
            )}
          </h3>
          
          {description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {description.substring(0, 150)}...
            </p>
          )}
          
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {hit.author?.name && (
              <span>{hit.author.name}</span>
            )}
            {date && (
              <time dateTime={date}>
                {new Date(date).toLocaleDateString('pt-BR')}
              </time>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
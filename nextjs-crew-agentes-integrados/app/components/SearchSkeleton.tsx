export default function SearchSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg animate-pulse">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="flex gap-3">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-3 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
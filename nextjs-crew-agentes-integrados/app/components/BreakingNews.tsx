export default function BreakingNews() {
  const newsItems = [
    "Dogecoin Falls 6% as Long Liquidations Cross $12 Million: Is $0.2060 Next?"
  ];

  // Duplicar para criar loop contínuo
  const duplicatedNews = [...newsItems, ...newsItems];

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex flex-row items-center">
        <div className="bg-blue-600 text-white px-6 py-3 font-bold text-sm uppercase whitespace-nowrap">
          BREAKING NEWS
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="relative py-3">
            <div className="flex animate-marquee whitespace-nowrap">
              {duplicatedNews.map((item, index) => (
                <span key={index} className="text-sm font-medium mx-4">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 px-4">
          <button className="text-gray-400 hover:text-gray-600 p-2" aria-label="Previous news">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-2" aria-label="Next news">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
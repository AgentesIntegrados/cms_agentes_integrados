export default function BreakingNews() {
  const newsItems = [
    "WhiteBIT Crowns World's Top Trader in First-Ever Live International Crypto Trading Cup",
    "Here is Where XRP May Stand in the Next 10 Years",
    "Franklin Templeton to Establish Singapore's First Tokenized Fund for Retail Investors"
  ];

  // Duplicar para criar loop contínuo
  const duplicatedNews = [...newsItems, ...newsItems];

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-stretch">
        <div className="bg-blue-600 text-white px-4 py-2 font-bold text-sm whitespace-nowrap flex items-center justify-center">
          BREAKING NEWS
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="relative py-2">
            <div className="flex animate-marquee whitespace-nowrap">
              {duplicatedNews.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm sm:text-base font-medium px-4">{item}</span>
                  <span className="text-gray-500 px-2">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 px-4">
          <button className="text-gray-600 hover:text-blue-600 p-1" aria-label="Previous news">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-blue-600 p-1" aria-label="Next news">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
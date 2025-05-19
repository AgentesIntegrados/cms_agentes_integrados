import Link from "next/link";
import Image from "next/image";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: {
    name: string;
  };
  imageUrl?: string;
};

type Props = {
  news: NewsItem[];
};

export default function LatestNews({ news }: Props) {
  // Se não houver notícias, use estas como exemplo
  const defaultNews: NewsItem[] = [
    {
      id: "1",
      title: "WhiteBIT Crowns World's Top Trader in First-Ever Live International Crypto Trading Cup",
      slug: "whitebit-crowns-worlds-top-trader",
      date: "MAY 15, 2025",
      author: { name: "ALBERT BROWN" },
      imageUrl: "/images/whitebit-winner.jpg"
    },
    {
      id: "2",
      title: "Here is Where XRP May Stand in the Next 10 Years",
      slug: "xrp-future-predictions",
      date: "MAY 15, 2025",
      author: { name: "SAM WISDOM RAPHAEL" }
    },
    {
      id: "3",
      title: "Franklin Templeton to Establish Singapore's First Tokenized Fund for Retail Investors",
      slug: "franklin-templeton-fund",
      date: "MAY 15, 2025",
      author: { name: "ABDULKARIM ABDULWAHAB" }
    },
    {
      id: "4",
      title: "Al Abraaj Becomes First Public Bitcoin Treasury Company in the Middle East",
      slug: "al-abraaj-bitcoin-treasury",
      date: "MAY 15, 2025",
      author: { name: "OLIVIA STEPHANIE" }
    }
  ];

  const displayNews = news && news.length > 0 ? news : defaultNews;

  return (
    <section className="pb-8">
      <div className="border-b border-gray-200 mb-8">
        <h2 className="text-4xl font-bold mb-4">Latest News</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {displayNews.map((item, index) => (
          <article key={item.id} className={`border-b border-gray-200 pb-6 ${index === displayNews.length - 1 ? 'border-b-0' : ''}`}>
            <div className="flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                <Link href={`/posts/${item.slug}`} className="hover:text-blue-600 transition-colors">{item.title}</Link>
              </h3>
              <div className="text-gray-500 uppercase text-sm mb-2">
                {item.author.name} - {item.date}
              </div>
            </div>
            
            {index === 0 && item.imageUrl && (
              <div className="mt-4 relative w-full overflow-hidden">
                <div className="relative w-full aspect-[16/9]">
                  <Image 
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
      
      {/* Slider para a imagem principal (mobile only) */}
      <div className="mt-8 flex justify-center md:hidden">
        <div className="flex space-x-4">
          <button aria-label="Previous" className="p-2 rounded-lg bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button aria-label="Next" className="p-2 rounded-lg bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
} 
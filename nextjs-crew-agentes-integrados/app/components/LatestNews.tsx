interface NewsItem {
  title: string;
  author: string;
  date: string;
}

export default function LatestNews() {
  const newsItems: NewsItem[] = [
    {
      title: "Meliuz Chair Says Bitcoin is Like a Nuclear Reactor on the Brazilian Firm's Balance Sheet",
      author: "MARK BRENNAN",
      date: "MAY 19, 2025"
    },
    {
      title: "Analyst on Dogecoin: 'No Way I'd Skip This Trade — Chart Signals a Run to $0.45'",
      author: "ELENDU BENEDICT",
      date: "MAY 19, 2025"
    },
    {
      title: "Why Is Bitcoin Falling Today? Here is The Likely Reason",
      author: "OLIVIA STEPHANIE",
      date: "MAY 19, 2025"
    },
    {
      title: "Dogecoin Falls 6% as Long Liquidations Cross $12 Million: Is $0.2060 Next?",
      author: "MARK BRENNAN",
      date: "MAY 19, 2025"
    }
  ];

  return (
    <div className="w-full bg-white p-6">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <article key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 hover:text-blue-600 cursor-pointer">
              {item.title}
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              <span className="uppercase">{item.author}</span>
              <span className="mx-2">-</span>
              <span>{item.date}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
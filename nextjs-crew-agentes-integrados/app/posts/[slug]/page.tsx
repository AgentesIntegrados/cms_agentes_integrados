import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import BreakingNews from "../../components/BreakingNews";

import Avatar from "@/app/components/Avatar";
import CoverImage from "@/app/components/CoverImage";
import { MorePosts } from "@/app/components/Posts";
import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params: resolvedParams,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

// Simula busca de dados de um backend ou CMS
const getPostBySlug = (slug: string) => {
  // Dados mockados - idealmente viriam do Sanity
  return {
    id: "1",
    title: "WhiteBIT Crowns World's Top Trader in First-Ever Live International Crypto Trading Cup",
    content: `
      <p>WhiteBIT, a leading cryptocurrency exchange, has concluded its first-ever International Crypto Trading Cup, crowning Max Hamaha as the world's top trader after a fierce competition that attracted participants from over 50 countries.</p>
      
      <p>The live event, which was streamed to over 500,000 viewers globally, showcased the skill and strategy of elite crypto traders competing for a prize pool of $1 million and the prestigious title of World's Top Crypto Trader.</p>
      
      <p>"This competition has set a new standard for what's possible in the trading community," said Max Hamaha during his acceptance speech. "I'm honored to be recognized among such talented traders from around the world."</p>
      
      <p>The competition required participants to demonstrate their trading prowess across various market conditions, including spot trading, futures, and market volatility challenges designed to test their risk management and decision-making abilities.</p>
      
      <p>WhiteBIT CEO Volodymyr Nosov expressed his enthusiasm for the event's success: "The Trading Cup represents our commitment to fostering a competitive and innovative trading environment. We wanted to create a platform where the best traders could showcase their skills and inspire others."</p>
      
      <p>Industry analysts noted that the competition highlighted the growing professionalization of cryptocurrency trading and the increasing sophistication of trading strategies in the maturing digital asset market.</p>
      
      <p>Following the success of this inaugural event, WhiteBIT has announced plans to make the Trading Cup an annual competition, with qualifying rounds to be held quarterly on their platform.</p>
      
      <p>For aspiring traders inspired by the competition, WhiteBIT has also launched an educational initiative that will provide resources and mentorship opportunities with top performers from the Trading Cup.</p>
    `,
    date: "MAY 15, 2025",
    author: { name: "ALBERT BROWN" },
    imageUrl: "/images/crypto-trading-cup.jpg",
    related: [
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
      }
    ]
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  return (
    <main>
      <Header />
      <div className="pt-24">
        <BreakingNews />
        
        <article className="container mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="text-gray-500 uppercase text-sm mb-6">
            {post.author.name} - {post.date}
          </div>
          
          {post.imageUrl && (
            <div className="mb-8 relative w-full overflow-hidden rounded-lg">
              <div className="relative w-full aspect-[16/9]">
                <Image 
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
          
          <div 
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {post.related && post.related.length > 0 && (
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {post.related.map((item) => (
                  <article key={item.id} className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-bold mb-2">
                      <Link href={`/posts/${item.slug}`} className="hover:text-blue-600 transition-colors">
                        {item.title}
                      </Link>
                    </h3>
                    <div className="text-gray-500 uppercase text-sm">
                      {item.author.name} - {item.date}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}

import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/src/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {post.mainImage && (
        <img
          className="mt-6 w-full rounded-lg"
          src={
            urlFor(post.mainImage)?.width(1280).height(720).url() || 
            ''
          }
          alt={post.mainImage.alt || "Post image"}
        />
      )}
      <h1 className="mt-8 text-4xl font-bold">{post.title}</h1>
      <p className="mt-4 text-gray-600">
        Published on {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose mt-8 max-w-none">
        <PortableText value={post.body} />
      </div>
    </main>
  );
}
import { type Metadata } from "next";

import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import { type BlogPostWithSlug, getAllPosts } from "@/lib/blogPosts";
import { formatDate } from "@/lib/formatDate";

function BlogPost({ post }: { post: BlogPostWithSlug }) {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card className="md:col-span-3">
                <Card.Title href={`/blog/${post.slug}`}>
                    {post.title}
                </Card.Title>
                <Card.Eyebrow
                    as="time"
                    dateTime={post.date}
                    className="md:hidden"
                    decorate
                >
                    {formatDate(post.date)}
                </Card.Eyebrow>
                <Card.Description>{post.description}</Card.Description>
                <Card.Cta>Read post</Card.Cta>
            </Card>
            <Card.Eyebrow
                as="time"
                dateTime={post.date}
                className="mt-1 hidden md:block"
            >
                {formatDate(post.date)}
            </Card.Eyebrow>
        </article>
    );
}

export const metadata: Metadata = {
    title: "Blog",
    description: "Jake Chitel's personal blog!",
};

export default async function BlogIndex() {
    let posts = await getAllPosts();

    return (
        <SimpleLayout
            title={metadata.description!}
            intro="A glimpse into one of our world's most truly disturbed minds."
        >
            <div className="md:border-l md:border-indigo-100 md:pl-6 md:dark:border-indigo-600/40">
                <div className="flex max-w-3xl flex-col space-y-16">
                    {posts.map((post) => (
                        <BlogPost key={post.slug} post={post} />
                    ))}
                    {!posts.length && (
                        <p className="text-zinc-500 dark:text-zinc-300">
                            No posts yet. Check again soon!
                        </p>
                    )}
                </div>
            </div>
        </SimpleLayout>
    );
}

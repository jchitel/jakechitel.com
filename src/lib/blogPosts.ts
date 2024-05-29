import glob from "fast-glob";

interface BlogPost {
    title: string;
    description: string;
    author: string;
    date: string;
}

export interface BlogPostWithSlug extends BlogPost {
    slug: string;
}

async function importPost(postFilename: string): Promise<BlogPostWithSlug> {
    let { post } = (await import(`../app/blog/${postFilename}`)) as {
        default: React.ComponentType;
        post: BlogPost;
    };

    return {
        slug: postFilename.replace(/(\/page)?\.mdx$/, ""),
        ...post,
    };
}

export async function getAllPosts() {
    let filenames = await glob("*/page.mdx", {
        cwd: "./src/app/blog",
    });

    let posts = await Promise.all(filenames.map(importPost));

    return posts.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

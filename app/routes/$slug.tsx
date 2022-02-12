import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import { getPost } from "../services/post";

export const loader:LoaderFunction = async ({ params }) => {
    if (!params.slug) return new Response("Not Found", { status: 404 });
    const post = await getPost(params.slug);
    if (post.count == 0) return new Response("Not Found", { status: 404 });
    return post.data;
}

export default function PostSlug() {
    const post = useLoaderData();
    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.content}} />
        </div>
    );
}
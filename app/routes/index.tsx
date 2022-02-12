import { Link, useLoaderData } from "remix";
import { articles } from "@prisma/client";
import { getPosts } from '../services/post';


interface ResponseFormatArray {
  count: number,
  data: articles[],
  total_pages: number,
  page: number,
  limit: number,
  error: boolean,
  error_message: string
};

export const loader = () => {
  return getPosts(1, 10);
};

export default function Index() {
  const posts: ResponseFormatArray = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {
          posts.data.map(post => (
            <li key={post.slug}>
              <Link to={`${post.slug}`}>{post.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

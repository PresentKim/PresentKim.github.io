import type { PostData } from '$lib/components/blog';

export async function load({ url, fetch, params }: LoadArguments) {
  const { tag } = params;
  const response = await fetch(`${url.origin}/blog/index`);
  const allPosts = await response.json();

  return {
    tag,
    posts: allPosts.filter((post: PostData) => post.tags.includes(tag))
  };
}

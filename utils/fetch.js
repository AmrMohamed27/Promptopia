export async function fetchPosts() {
  const res = await fetch(`${process.env.ORIGIN_URL}/api/posts`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await res.json();
  return posts.reverse();
}

export async function fetchUser(id) {
  try {
    const response = await fetch(`${process.env.ORIGIN_URL}/api/user/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPostById(id) {
  const res = await fetch(`${process.env.ORIGIN_URL}/api/posts/${id}`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const post = await res.json();
  return post;
}

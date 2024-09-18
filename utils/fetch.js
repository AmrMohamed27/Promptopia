export async function fetchPosts() {
  const res = await fetch(`${process.env.ORIGIN_URL}/api/posts`);
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
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

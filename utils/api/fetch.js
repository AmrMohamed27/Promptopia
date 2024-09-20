// Get all posts
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
// Get All Posts on Client Side
export async function fetchClientPosts() {
  const res = await fetch(`/api/posts`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await res.json();
  return posts.reverse();
}
// Get user by id
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
// Get post by id
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
// Delete post by id
export const deletePost = async (postId) => {
  const response = await fetch("/api/posts/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });
  if (!response.ok) {
    throw new Error(response.error || "Something went wrong");
  }
  return response;
};
// Add user by id to upvoters of post
export const upvotePost = async (postId, userId, method) => {
  const response = await fetch(`/api/posts/upvote`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, postId }),
  });
  if (!response.ok) {
    throw new Error(response.error || "Something went wrong");
  }
  return response;
};
// Create Post
export const createPost = async (prompt, tagsString, userId) => {
  const tags = tagsString.split(", ");
  try {
    const body = JSON.stringify({
      prompt,
      tags,
      userId,
    });
    const response = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    console.log("Error creating or editing post: " + error.message);
  }
};
// Edit Post
export const editPost = async (prompt, tagsString, postId) => {
  const tags = tagsString.split(", ");
  try {
    const body = JSON.stringify({
      prompt,
      tags,
    });
    const response = await fetch(`/api/posts/edit/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    console.log("Error creating or editing post: " + error.message);
  }
};

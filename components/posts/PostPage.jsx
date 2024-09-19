"use client";

import CommentForm from "@components/comments/CommentForm";
import PromptCard from "./PromptCard";
import CommentCard from "@components/comments/CommentCard";
import { useState } from "react";

const PostPage = ({ initialPost }) => {
  const [post, setPost] = useState(initialPost);
  return (
    <div className="flex flex-col w-full mt-4 gap-16">
      {initialPost && <PromptCard post={post} setPost={setPost} />}
      <CommentForm post={post} setPost={setPost} />
      <div className="flex flex-col gap-8">
        {post?.comments && post.comments != [] ? (
          post.comments.map((comm) => (
            <CommentCard
              key={comm._id}
              comment={comm}
              post={post}
              setPost={setPost}
            />
          ))
        ) : (
          <p>No Comments</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;

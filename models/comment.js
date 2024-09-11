import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, "Comment text is required"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Comment creator is required"],
  },
  parentPost: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Parent post is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
  upvotes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
});

const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;

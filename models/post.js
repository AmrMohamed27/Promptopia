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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new Schema({
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tags: {
    type: [String],
    required: [true, "At least add 1 tag"],
    validate: {
      validator: function (v) {
        return v.every((tag) => /^#/.test(tag));
      },
      message: (props) =>
        `${props.value} is not a valid tag! Each tag must start with '#'.`,
    },
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required"],
  },
  upvotes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  comments: [CommentSchema], // Embedding CommentSchema for replies
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;

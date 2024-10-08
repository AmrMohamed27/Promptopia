import { Schema, model, models } from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: [
      {
        creator: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        upvotes: {
          type: [Schema.Types.ObjectId],
          ref: "User",
          default: [],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;

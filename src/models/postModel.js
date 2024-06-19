import mongoose from "mongoose";;

const postSchema = new mongoose.Schema(
    {
        postedBy: {
            type: String,
            ref: "User",
            required: true,
        },
        video: {
            type: String,
        },
        category: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
import mongoose from "mongoose";
import { string } from "zod";

const postSchema = mongoose.Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        vid: {
            type: string,
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        replies: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                text: {
                    type: string,
                    required: true,
                },
                userProfilePic: {
                    type: string,
                },
                username: {
                    type: string,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
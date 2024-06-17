import Post from '../models/postModel.js';
import User from '../models/user.model.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);


        if (!req.file) {
            throw new Error('No file uploaded');
        }

        
        console.log('Upload successful. Cloudinary response:', req.file);


        const post = new Post({
      ...req.body,
      video: req.file.path,
      postedBy: user.userName,
    });

        await post.save();
        res.status(201).send(post);
    } catch (error) {
        console.error('Error posting:', error);
        res.status(400).send({ error: error.message });
    }
};
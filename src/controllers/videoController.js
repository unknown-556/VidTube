import Post from "../models/postModel.js"

export const getvideos = async (req,res) => {
    try{
        const allvideos = await Post.find()
        if(!allvideos){
            res.status(400).json ({message:'No videos found in database'})
        }else {
            console.log({message:'videos found successfully',allvideos})
            return res.status(200).json({ message: 'video found successfully', allvideos });
            // return res.json({allvideos})
        }
    
        }   catch (error) {
            console.error ('Error while getting videos')
            res.status(500).json({message:error.message})
            console.error(error);
        }
}    


export const getvideo = async (req, res) => {
    try {
        const videoId = req.params.id; 
        const video = await Post.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: `No video with ID: ${videoId} found` });
        } else {
            console.log('video found successfully', video);
            return res.status(200).json({ message: 'video found successfully', video });
            // return res.json({video});
            
        }
    } catch (error) {
        console.error('Error while getting article', error);
        return res.status(500).json({ message: error.message });
    }
};


export const myvideo = async (req, res) => {
    
    try {
        const name = req.user.name
        const videos = await Post.find({ postedBy: name });

        if (videos.length === 0) {
            return res.status(404).json({ message: 'No videos found for this user' });
        } else {
            console.log('videos found successfully', videos);
            return res.json({ videos });
        }
    } catch (error) {
        console.error('Error while getting videos');
        return res.status(500).json({ message: error.message });
    }
};


export const getRandomVideos = async (req, res, next) => {
    try {
        const randomVideos = await Post.aggregate([{ $sample: { size: 3 } }]);
        return res.status(200).json({ message: 'video found successfully', randomVideos });
            // return res.json({randomVideos})
    } catch (error) {
        console.error('Error while getting videos', error);
        res.status(500).json({ message: error.message });
    }
};
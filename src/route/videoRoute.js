import express from "express";
const router=express.Router()
import{ getvideo, getvideos, myvideo, related, getRandomVideos} from '../controllers/videoController.js'
import auth from "../middleware/auth.js";

router.get("/", getvideos)
router.get('/videos', auth, myvideo);
router.get("/get/:id", getvideo)

router.get("/related/:category", related)

router.get("/random", getRandomVideos)



export default router
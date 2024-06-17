import express from "express";
const router=express.Router()
import{ getvideo, getvideos, myvideo, getRandomVideos } from '../controllers/videoController.js'
import auth from "../middleware/auth.js";

router.get("/", getvideos)
router.get('/videos', auth, myvideo);
router.get("/:id", getvideo)

router.get("/random", getRandomVideos);


export default router
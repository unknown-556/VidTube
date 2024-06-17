import express from "express";
import authRoute from './authRoute.js'
import postRoute from './postRoute.js'
import videoRoute from './videoRoute.js'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/post', postRoute )

router.use('/get', videoRoute)




export default router;
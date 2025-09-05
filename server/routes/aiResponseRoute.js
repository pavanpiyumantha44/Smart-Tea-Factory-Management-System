import express from "express"
import { getTextOutput } from "../controllers/AIResponseController.js";
import {uploadData} from '../lib/filesUpload.js'

const router = express.Router()

router.post("/analyzeImage", uploadData.single('image'),getTextOutput)

export default router;
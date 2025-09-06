import express from 'express'
import { reportData } from '../controllers/reportController.js';

const router = express.Router();

router.post('/generateReport',reportData);

export default router;
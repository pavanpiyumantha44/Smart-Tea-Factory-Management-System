import express from 'express'
import {summaryStats } from '../controllers/summaryController.js';

const router = express.Router();

router.get('/summaryStats',summaryStats)

export default router;
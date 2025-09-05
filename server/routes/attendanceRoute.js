import express from 'express'
import {addInitialData,getAllAttendance} from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/getAll',getAllAttendance);
router.post('/addInitial',addInitialData);
// router.get('/getItem/:id',getStockItem);
// router.put('/edit/:id',updateStockItem);

export default router;
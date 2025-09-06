import express from 'express'
import {addInitialData,getAllAttendance,markCheckIn,markCheckOut,markAbsent,markLeave,markHalfDay} from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/getAll',getAllAttendance);
router.post('/addInitial',addInitialData);
router.put('/checkIn/:id',markCheckIn);
router.put('/checkOut/:id',markCheckOut);
router.put('/absent/:id',markAbsent);
router.put('/leave/:id',markLeave);
router.put('/halfDay/:id',markHalfDay);

export default router;
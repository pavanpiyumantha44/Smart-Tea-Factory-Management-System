import express from 'express'
import {getTeaPluckersSalary,otherWorkersSalary,addSalary} from '../controllers/payrollContorller.js'
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/getTeaPluckers',verifyToken,getTeaPluckersSalary);
router.get('/getOthers',verifyToken,otherWorkersSalary);
router.post('/addSalary',verifyToken,addSalary);
// router.put('/edit/:id',verifyToken,updateAccount);

export default router;



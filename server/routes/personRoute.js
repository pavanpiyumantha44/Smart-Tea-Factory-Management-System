import express from 'express'
import { addPerson, getRoles, getPersonCount, getAllPerson, deletePerson,getAllSupervisors,getAllworkers,getAllTeaPluckers } from '../controllers/personController.js';
import verifyToken from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/add',verifyToken,addPerson);
router.get('/getRoles',verifyToken,getRoles);
router.get('/getAllSupervisors',verifyToken,getAllSupervisors);
router.get('/getPersonCount',verifyToken,getPersonCount);
router.get('/getAllPerson',verifyToken,getAllPerson);
router.get('/getAllTeaPluckers',verifyToken,getAllTeaPluckers);
router.get('/getAllWorkers',verifyToken,getAllworkers);
router.delete('/deletePerson/:id',verifyToken,deletePerson);

export default router;
import express from 'express'
import {createTask,allTasks,updateTaskStatus,getTask,updateTaskInfo} from '../controllers/taskController.js';
import verifyToken from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/newTask',verifyToken,createTask);
router.get('/getAllTasks',verifyToken,allTasks);
router.put('/updateStatus/:id',verifyToken,updateTaskStatus);
router.get('/getTask/:id',verifyToken,getTask)
router.put('/edit/:id',verifyToken,updateTaskInfo);
// router.post('/add',createTeam);
// router.post('/newTeamMember',addNewTeamMember);
// router.put('/delete/:id',deleteTeam);
// router.get('/withoutTeams',soloWorkers);
// router.delete('/deleteTeamMember',deleteTeamMember)

export default router;
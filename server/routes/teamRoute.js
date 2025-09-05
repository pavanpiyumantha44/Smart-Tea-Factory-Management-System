import express from 'express'
import { getAllTeams,createTeam,deleteTeam,soloWorkers,getTeamInfo,updateTeamInfo,addNewTeamMember,getTeamMembers,deleteTeamMember } from '../controllers/teamsController.js';
import verifyToken from '../middlewares/authMiddleware.js';
const router = express.Router();


router.get('/getAllTeams',verifyToken,getAllTeams);
router.get('/getTeam/:id',verifyToken,getTeamInfo);
router.get('/getTeamMembers/:id',verifyToken,getTeamMembers)
router.put('/edit/:id',verifyToken,updateTeamInfo);
router.post('/add',verifyToken,createTeam);
router.post('/newTeamMember',verifyToken,addNewTeamMember);
router.put('/delete/:id',verifyToken,deleteTeam);
router.get('/withoutTeams',verifyToken,soloWorkers);
router.delete('/deleteTeamMember',verifyToken,deleteTeamMember)

export default router;
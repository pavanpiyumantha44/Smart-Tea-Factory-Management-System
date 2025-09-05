import express from 'express'
import {addSingleRecord,getAllRecords,addBulkRecords} from '../controllers/teaPluckingController.js';
import verifyToken from '../middlewares/authMiddleware.js';
const router = express.Router();



router.post('/addSingle',verifyToken,addSingleRecord);
router.post('/addBulk',verifyToken,addBulkRecords);
router.get('/getAll',verifyToken,getAllRecords);
// router.get('/getTeamMembers/:id',getTeamMembers)
// router.put('/edit/:id',updateTeamInfo);
// router.post('/add',createTeam);
// router.post('/newTeamMember',addNewTeamMember);
// router.put('/delete/:id',deleteTeam);
// router.get('/withoutTeams',soloWorkers);
// router.delete('/deleteTeamMember',deleteTeamMember)

export default router;
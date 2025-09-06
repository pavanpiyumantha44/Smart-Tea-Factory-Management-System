import express from 'express'
import { getAll,deleteAccount,updateAccount } from '../controllers/accountController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/getAllAccounts',verifyToken,getAll);
router.put('/delete/:id',verifyToken,deleteAccount);
router.put('/edit/:id',verifyToken,updateAccount);

export default router;
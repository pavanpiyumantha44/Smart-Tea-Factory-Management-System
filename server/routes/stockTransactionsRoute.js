import express from 'express'
import {getAllTransactions} from '../controllers/stockTransactionsController.js'

const router = express.Router();

router.get('/getAll',getAllTransactions);

export default router;
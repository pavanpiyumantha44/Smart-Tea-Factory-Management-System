import express from 'express'
import {createStockItem,getAllStockItems,getStockItem,updateStockItem} from '../controllers/stockController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/getAll',verifyToken,getAllStockItems);
router.post('/add',verifyToken,createStockItem);
router.get('/getItem/:id',verifyToken,getStockItem);
router.put('/edit/:id',verifyToken,updateStockItem);

export default router;
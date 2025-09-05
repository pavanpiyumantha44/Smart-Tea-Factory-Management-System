import express from 'express'
import { addPlace, getAllPlaces,deletePlace } from '../controllers/placeController.js';

const router = express.Router();

router.post('/createPlace',addPlace);
router.get('/getPlaces',getAllPlaces);
// router.get('/getPersonCount',getPersonCount)
// router.get('/getAllPerson',getAllPerson)
router.put('/deletePlace/:id',deletePlace)

export default router;
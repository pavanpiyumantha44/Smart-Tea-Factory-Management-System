import express from 'express'
import { addPlace, getAllPlaces,deletePlace,updatePlaceDetails } from '../controllers/placeController.js';

const router = express.Router();

router.post('/createPlace',addPlace);
router.get('/getPlaces',getAllPlaces);
router.put('/deletePlace/:id',deletePlace)
router.put('/edit/:id',updatePlaceDetails)

export default router;
import API from "./api";

export const createPlace = (data)=>API.post('/places/createPlace',data);
export const allPlaces = ()=>API.get('/places/getPlaces');
export const deletePlace = (id)=>API.put(`/places/deletePlace/${id}`);
export const updatePlace = (id,data)=>API.put(`/places/edit/${id}`,data);
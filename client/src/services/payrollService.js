import API from "./api";

export const addSalary = (data)=>API.post('/payroll/addSalary',data);
export const getTeaPluckersSalary = ()=>API.get('/payroll/getTeaPluckers');
export const getOtherWorkersSalary = ()=>API.get('/payroll/getOthers');
export const deletePlace = (id)=>API.put(`/places/deletePlace/${id}`);
export const updatePlace = (id,data)=>API.put(`/places/edit/${id}`,data);
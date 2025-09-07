import API from "./api";

export const addInitialData = (data)=>API.post('/attendance/addInitial',data);
export const getAllAttendance = ()=>API.get('/attendance/getAll');
export const markAsCheckIn = (id,data)=>API.put(`/attendance/checkIn/${id}`,data);
export const markAsCheckOut = (id,data)=>API.put(`/attendance/checkOut/${id}`,data);
export const markAsAbsent = (id,data)=>API.put(`/attendance/absent/${id}`,data);
export const markAsLeave = (id,data)=>API.put(`/attendance/leave/${id}`,data);
export const markAsHalfDay = (id,data)=>API.put(`/attendance/halfDay/${id}`,data);
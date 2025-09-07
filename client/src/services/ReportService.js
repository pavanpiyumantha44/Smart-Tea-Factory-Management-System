import API from "./api";

export const getReport = (data)=>API.post('/reports/generateReport',data);

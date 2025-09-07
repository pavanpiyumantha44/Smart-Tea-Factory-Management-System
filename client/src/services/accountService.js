import API from "./api";

export const allAccounts = ()=>API.get('/account/getAllAccounts');
export const createAccount = (data)=>API.post('/auth/register',data);
export const updateAccount = (id,data)=>API.put(`/account/edit/${id}`,data);
export const deleteAccount = (id)=>API.put(`/account/delete/${id}`);
export const allPersons = ()=>API.get(`/person/getAllPerson`);
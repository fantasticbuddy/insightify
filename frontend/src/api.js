import axios from 'axios';
const api = axios.create({baseURL: 'http://localhost:8000/'});
export const setAuthToken = ()=>{
    let token = localStorage.getItem('token');
    if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
    }
    return false;
}
export const deleteAuthToken = ()=>{
    delete api.defaults.headers.common['Authorization'];
}

export default api;
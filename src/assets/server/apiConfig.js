import axios from 'axios'
const baseURL = 'http://10.20.1.143:8000/'
export const free5gMano  = axios.create({
    baseURL:baseURL
})

axios.interceptors.response.use(function(res){
    return res;
},function(err){
    console.log(err)
    return Promise.reject(err);
})
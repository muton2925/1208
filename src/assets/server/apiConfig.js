import axios from 'axios'
const baseURL = 'http://10.20.1.40/basic/'
const free5gMano  = axios.create({
    baseURL:baseURL
})
export const Login = (name, pwd) => free5gMano.post(`login/`,{
    "name": name,
    "password": pwd,
});

import axios from 'axios'
//axios.defaults.withCredentials = true;

const http =  axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials : true,
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    } 
});



export default http;

import http from '../http';
import {useContext} from 'react';
import {UserContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

function SignOut(){
    const {setUser} =  useContext(UserContext);
    //const {setAuth}=   useContext(UserContext);
    const navigate = useNavigate();
   
        http.get('/csrf-cookie').then(response => {
            http.post('/logout',SignOut)
                .then((res)=>{ 
                    localStorage.removeItem("auth")
                    localStorage.removeItem("username")
                    setUser(null);
                    //setAuth(false);
                    navigate('/');
                })
            
        })
   
   

}

export default SignOut;
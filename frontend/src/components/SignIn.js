import React,{useState,useContext} from 'react';
import {UserContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import http from '../http';

function SignIn(){
    const {setUser} =  useContext(UserContext);

    const [login,setLogin] = useState({
        email :"",
        password :'',
        errors:[]
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLogin(values=>({...login,[name]:value}))
    }
    

    const submitForm = (e) =>{
        e.preventDefault();
        http.get('/csrf-cookie').then(response => {
            http.post('/login',login)
                .then((res)=>{ 
                    // console.log(res.data.id)
                    // console.log(res.data.email)
                    localStorage.setItem("auth","true")
                    localStorage.setItem("username",res.data.username)
                    setUser({...setUser,user:res.data})
                    //setAuth(true);
                    navigate('/dashboard')
                })
                .catch(error => {
                    if(error.response.status === 422)
                    {
                        setLogin({...setLogin,errors: error.response.data.errors});
                        console.log(login);
                    }
                })
        });
    }
return(
    <div className="mt-2">
        <h1>Log In </h1>
       
        <div className='d-flex justify-content-center mt-2'>
       
            <div className='col-md-6 '>
                <div className='card p-4 d-flex justify-content-center'>
                
                    <div className="mb-3">
                        <label  className="form-label">Email address</label>
                        <input type="text" name="email" className="form-control"  placeholder="" 
                        value={login.email || ''}
                        onChange={handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input type="password" name="password" className="form-control "  placeholder="" 
                        value={login.password || ''}
                        onChange={handleChange}/>
                    </div>
                   
                    
                    <button type="button"  onClick={submitForm} className='btn btn-info mt-2 '>Login</button>

                </div>

            </div>
        </div>
    </div>
);

}

export default SignIn;
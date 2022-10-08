import React,{useState,useContext} from "react";
import {UserContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

import http from '../http';


function Register(){
    const {setUser} =  useContext(UserContext);
    const [register,setRegister] = useState({
        name:"",
        email:"",
        password:"",
        errors:[],
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegister(values=>({...values,[name]:value}))
    }

    const submitForm = (e) =>{

        e.preventDefault();
        
        http.get('/csrf-cookie').then(response => {
        
        http.post('/register',register)
        .then((res)=>{ 
                 //console.log(res);
                // console.log('hiiiiii');
                // console.log(res.data.userId)
                // console.log(res.data.username)
                localStorage.setItem("auth","true")
                localStorage.setItem("username",res.data.username)
                setUser({...setUser,user:res.data})
                navigate('/dashboard');
        })
        .catch(error => {
            if(error.response.status === 422)
            {
                console.log(error.response.data.errors)
                setRegister({...setRegister,errors: error.response.data.errors});
                
            }
        })

        
    });
        
    }

    return(
        <div>
        
        <h2>Register User</h2>
        <div className='row' >
            <div className='col-md-6'>
                <div className='card p-4'>
                    
                    <div className="mb-3">
                        <label  className="form-label">Name</label>
                        <input type="text" name="name" className="form-control"  placeholder="" 
                        value={register.name || ''}
                        onChange={handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label  className="form-label">Email address</label>
                        <input type="text" name="email" className="form-control"  placeholder="" 
                        value={register.email || ''}
                        onChange={handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input type="password" name="password" className="form-control"  placeholder="" 
                        value={register.password || ''}
                        onChange={handleChange}/>
                    </div>
                   

                    <button type="button"  onClick={submitForm} className='btn btn-info mt-2'>Register</button>

                </div>

            </div>
        </div>
    </div>
    );
}
export default Register;
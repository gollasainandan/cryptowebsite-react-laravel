
import React,{useContext} from 'react';
import {CurrencyConetxt} from '../context/CurrencyContext'
import {UserContext} from '../context/UserContext'
import { useNavigate  } from "react-router-dom";


import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';


function Header(){
const {currency,setCurrency} =  useContext(CurrencyConetxt);
const {user}=   useContext(UserContext);
const navigate = useNavigate();

    return(

       
        <MDBNavbar expand='lg' light bgColor='light' className="shadow-2">
            <MDBContainer fluid>
                <MDBNavbarBrand onClick={() => navigate('/')} className='mb-0 h1'>Crypto</MDBNavbarBrand>
                <MDBNavbarNav>
                    
            
                     {
                        (true)  ?(
                                    <MDBNavbarItem >
                                        <MDBNavbarLink   onClick={() => navigate('dashboard')} >
                                            dashboard
                                        </MDBNavbarLink>
                                        
                                        <MDBNavbarLink   onClick={() => navigate('signout')}>
                                            Sign Out
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                        
                                ): (
                                        <MDBNavbarItem >
                                            <MDBNavbarLink  onClick={() => navigate('signin')}>
                                                Sign In
                                            </MDBNavbarLink>
                                            <MDBNavbarLink  onClick={() => navigate('signup')}>
                                                Sign Up
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                )
                    }    
                </MDBNavbarNav>
                    <div className='float-right  block'>
                        <select value={currency} onChange = {e => setCurrency(e.target.value)}  className='py-2 rounded-2 fw-light fs-6' >
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="INR">INR</option>
                        </select>
                    </div>
            </MDBContainer>
        </MDBNavbar>

    );

}

export default Header;


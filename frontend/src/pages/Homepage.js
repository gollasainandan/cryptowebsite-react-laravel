import React from "react";

import CoinsList from './CoinsList';
// import {useContext} from 'react';
// import {UserContext} from '../context/UserContext'

function Homepage(){
    //const {user} =  useContext(UserContext);
    //console.log(user);
    return(
       
        <div className="">
           
            <CoinsList/>
        </div>
    )
}
export default Homepage;
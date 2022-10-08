import React, {useContext} from "react";
import {UserContext} from '../context/UserContext';
import {WishlistContext} from '../context/WishlistContext';


function Dashboard(){
    const {user} =  useContext(UserContext);
    const {wishlist} =  useContext(WishlistContext);
return(
    <div>
        <h1>welcome to dashboard {user}
        {console.log(wishlist)}
        </h1>
    </div>
)
}
export default Dashboard;
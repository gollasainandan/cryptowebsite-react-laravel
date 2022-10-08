import {useContext} from "react";
import {UserContext} from '../context/UserContext'
import { Navigate } from 'react-router-dom';

function PrivateRoutes({children}){

    const {auth}=   useContext(UserContext);

    return auth ? (children) : <Navigate to="/signin" />;
}
export default PrivateRoutes;
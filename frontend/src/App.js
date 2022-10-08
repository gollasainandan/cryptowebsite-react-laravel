import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import CurrencyConetxtProvider  from './context/CurrencyContext';
import WishlistContextProvider  from './context/WishlistContext';
//import PrivateRoutes from './pages/PrivateRoutes';
import Header from './components/header'
import Homepage from './pages/Homepage';
import Coinspage from './components/Coinspage';

import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SignOut from './components/signOut';


function App() {
  
  return (
    <BrowserRouter>

      <CurrencyConetxtProvider>
      <WishlistContextProvider>
      <Header />
        <Routes>
          <Route path ="/"  element ={<Homepage/>} exact/>
          <Route path ="/coin/:id"  element ={<Coinspage/>}  />

          <Route path ="/signup"  element ={<Register/>} exact/> 
          <Route path ="/signin"  element ={<SignIn/>} exact/>

          <Route path ="/signout"  element ={<SignOut/>} exact/> 
          <Route path ="/dashboard" element={<Dashboard /> } exact></Route>
      


        </Routes>
      </WishlistContextProvider>
      </CurrencyConetxtProvider>

    </BrowserRouter>
  );
}

export default App;

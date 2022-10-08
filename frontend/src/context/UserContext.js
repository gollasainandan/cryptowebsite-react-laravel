import React,{createContext,useState,useEffect} from 'react';

export const UserContext = createContext();

function UserContextProvider(props){

    //alert('hi');
    const [user,setUser]= useState(null);
    
    //const auth = localStorage.getItem('auth');
    useEffect(() => {
        const username = localStorage.getItem('username');
        //alert('inside context');
        setUser(username);
      }, []);

    return(
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;
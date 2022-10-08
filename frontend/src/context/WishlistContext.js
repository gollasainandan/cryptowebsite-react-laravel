import React,{createContext,useState} from 'react';

export const WishlistContext = createContext();

function WishlistContextProvider(props){
    const [wishlist,setWishlist] = useState([]);
    //console.log(wishlist)

    return(
        <WishlistContext.Provider value={{wishlist,setWishlist}}>
            {props.children}
        </WishlistContext.Provider>
    );

}

export default WishlistContextProvider;
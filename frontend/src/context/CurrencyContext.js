import React,{createContext,useEffect,useState} from 'react';

export const CurrencyConetxt = createContext();

function CurrencyConetxtProvider(props){
    const [currency,setCurrency]= useState('USD');
    const [symbol,setSymbol] =useState("$");

    useEffect(()=>{
        if(currency === 'USD')setSymbol('$');
        else if(currency === 'GBP')
            setSymbol('£');
        else if(currency === 'INR')
            setSymbol('₹');
    },[currency]);
    
    return(
        <CurrencyConetxt.Provider value={{currency,symbol,setCurrency}}>
            {props.children}
        </CurrencyConetxt.Provider>
    );

}
export default CurrencyConetxtProvider;
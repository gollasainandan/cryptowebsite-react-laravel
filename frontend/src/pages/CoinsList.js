import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import {CurrencyConetxt} from '../context/CurrencyContext';
import SearchBox from '../components/SearchBox';
import CoinsGrid from '../components/coinsGrid';
import PaginationPage from '../components/PaginationPage';


export const CoinListApi = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

function CoinsList(){
    const {currency} =  useContext(CurrencyConetxt);
    const {symbol} = useContext(CurrencyConetxt);
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState("");
    const [currentPage,setCurrentPage]= useState(1);
    const [postPerPage] =useState(10);

    const searchCoin = (value) => setSearch(value);
    const paginate = (pagenumber) => setCurrentPage(pagenumber);
    
    const fetchCoins = async () => {
        setLoading(true);
        const {data} = await axios.get(CoinListApi(currency));
        
        setCoins(data);
        setLoading(false);
        //console.log(coins);
        
    };
    
    useEffect(()=>{
        fetchCoins();
    },[currency]);
    
    
    
    const handleSearch = () => {
        return coins.filter(
            (coin) =>
            (coin.name.toLowerCase().includes(search)) ||
            (coin.symbol.toLowerCase().includes(search))
            
        );
    }
   

    
    return(
        <div className='container mt-5 px-lg-5 flex-column justify-content-center'>
            <h1 className='mb-4 flex text-align-center font-monospace'>CryptoCurrency Prices by Market Cap</h1>
            <div className="bg-white  rounded-5 mb-4" >
                <SearchBox searchCoin={searchCoin}/>
            </div>
            <div>
                <CoinsGrid symbol={symbol} loading ={loading} handleSearch ={handleSearch} postPerPage={postPerPage} currentPage ={currentPage}/>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <PaginationPage postPerPage = {postPerPage} totalPosts = {coins.length} paginate ={paginate}/>
            </div>
        </div>
    );
}
export default CoinsList;
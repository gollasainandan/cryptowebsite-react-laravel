import axios from "axios";
import React, {useContext,useEffect, useState} from "react";
import {  useParams } from 'react-router-dom';
import CoinChart from './coinChart'
import {CurrencyConetxt} from '../context/CurrencyContext';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import DOMPurify from "dompurify";
import {  MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';



export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

  export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function Coinspage(){
    const {currency} =  useContext(CurrencyConetxt);
    const {symbol} =  useContext(CurrencyConetxt);
const [coin, setCoin] = useState();
const {id} = useParams();
//console.log(id);
//console.log(currency);
const fetchCoin  = async () =>{
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
}
//console.log(coin);
useEffect(()=>{
    fetchCoin();
},[]);

if(!coin) return (<MDBProgress>
    <MDBProgressBar width={75} valuemin={0} valuemax={100} />
  </MDBProgress>)
    return(
        <MDBContainer className="my-4">
            <MDBRow className="d-flex border rounded  py-2 mt-2 bg-light">
                    <MDBCol  xs={12} md={6} className="py-2 justify-content-around">
                        <div className="d-flex">
                            <span className="px-2 mt-2">
                                <img
                                    src ={coin?.image.large}
                                    alt ={coin?.name}
                                    height="100"
                                    width="100"
                                    className="roundedCircle"
                                />
                            </span>

                            <span className="px-2 mt-2 fs-3 ">
                                <p className='fw-bold mb-1'>{coin.name}</p>
                                <p className='text-muted mb-0'>{coin.symbol}</p>
                            </span>
                        </div>   
                    </MDBCol >
                    <MDBCol  xs={12} md={6} className="py-2 justify-content-center">
                        <div className="py-2 fs-3 ">
                            { <p className='fw-bold mb-1'><span className="">Rank :</span> {coin?.market_cap_rank}</p> }
                        </div>
                        <div  className="py-2 fs-3 ">
                            { <p className='fw-bold mb-1'>Price : {symbol}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</p> }
                        </div>
                    </MDBCol >
            </MDBRow>
            <MDBRow className="d-flex border rounded  py-2 mt-2 bg-light">
                <MDBCol   xs={12} md={6}>
                    <div  className="py-2">
                        { <p className='fw-bold mb-1'><span className="text-muted">Market Cap :</span> {symbol}{
                            numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                                )
                                }M</p>
                        }
                    </div>
                    <div  className="py-2">
                        { <p className='fw-bold mb-1'><span className="text-muted">Total Supply :</span> {
                            numberWithCommas(coin?.market_data.circulating_supply) }M</p>
                        }
                    </div>
                    <div  className="py-2">
                        { <p className='fw-bold mb-1'><span className="text-muted">Curculating Supply :</span> {
                            numberWithCommas(coin?.market_data.circulating_supply) }M</p>
                        }
                    </div>
                    
                </MDBCol >
                <MDBCol  xs={12} md={6}>
                    <div  className="py-2">
                        { <p className='fw-bold mb-1'><span className="text-muted">Fully Diluted Valuation :</span> {symbol}{
                            numberWithCommas(coin?.market_data.circulating_supply) }M</p>
                        }
                    </div>
                    <div  className="py-2">
                        { <p className='fw-bold mb-1'> <span className="text-muted">24h Low :</span> {symbol}{
                            numberWithCommas(coin?.market_data.low_24h[currency.toLowerCase()].toString()) }</p>
                        }
                    </div>
                    <div  className="py-2">
                        { <p className='fw-bold mb-1'><span className="text-muted">24h High :</span>{symbol} {
                            numberWithCommas(coin?.market_data.high_24h[currency.toLowerCase()].toString()) }</p>
                        }
                    </div>
                </MDBCol >
            </MDBRow>
            
            <MDBRow md={1} xs={1} className="d-flex border rounded  py-2 mt-2 bg-light">
                <div><h2>About</h2></div>
                <MDBCol >
                <p dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(coin?.description.en)
                }}>

                </p>
                </MDBCol >
            </MDBRow>
            <MDBRow md={1} xs={1} className="d-flex border rounded  py-2 mt-2 bg-light">
                <MDBCol >
                    <CoinChart coin={coin}/>
                </MDBCol >
            </MDBRow>
            <MDBRow className="d-flex border rounded  py-2 mt-2 bg-light">
                <MDBTable align='middle' hover className="mb-0 border" responsive >
                            <MDBTableHead className="bg-light">
                                <tr >
                                
                                <th scope='col' className="fw-bold">24h</th>
                                <th scope='col' className="fw-bold">7 Days</th>
                                <th scope='col' className="fw-bold">1 Month</th>
                                <th scope='col' className="fw-bold">2 Month</th>
                                <th scope='col' className="fw-bold">1Year</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                  
                                    <td className ={(coin?.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()])>0 ? "text-success" : "text-danger"}>
                                        {coin?.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()].toFixed(2)}%
                                    </td>
                                    <td className ={(coin?.market_data.price_change_percentage_7d_in_currency[currency.toLowerCase()])>0 ? "text-success" : "text-danger"}>
                                        {coin?.market_data.price_change_percentage_7d_in_currency[currency.toLowerCase()].toFixed(2)}%
                                    </td>
                                    <td className ={(coin?.market_data.price_change_percentage_30d_in_currency[currency.toLowerCase()])>0 ? "text-success" : "text-danger"}>
                                        {coin?.market_data.price_change_percentage_30d_in_currency[currency.toLowerCase()].toFixed(2)}%
                                    </td>
                                    <td className ={(coin?.market_data.price_change_percentage_60d_in_currency[currency.toLowerCase()])>0 ? "text-success" : "text-danger"}>
                                        {coin?.market_data.price_change_percentage_60d_in_currency[currency.toLowerCase()].toFixed(2)}%
                                    </td> 
                                    <td className ={(coin?.market_data.price_change_percentage_1y_in_currency[currency.toLowerCase()])>0 ? "text-success" : "text-danger"}>
                                        {coin?.market_data.price_change_percentage_1y_in_currency[currency.toLowerCase()].toFixed(2)}%
                                    </td> 
                                    
                                </tr>
                            </MDBTableBody>
                </MDBTable>
            </MDBRow>
        </MDBContainer>
    )
}
export default Coinspage;


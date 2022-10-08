import React,{useContext} from "react";
import {WishlistContext} from '../context/WishlistContext'
import { useNavigate  } from "react-router-dom";
import { MDBProgress, MDBProgressBar,MDBCheckbox  } from 'mdb-react-ui-kit';
import { MDBBadge,  MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
function CoinsGrid({symbol,loading,handleSearch,postPerPage,currentPage}){
    const {wishlist,setWishlist} =  useContext(WishlistContext);
    //console.log(wishlist);
    
    const navigate = useNavigate ();
 //for pagination
 const indexOfLastPost = currentPage * postPerPage;
 const indexOfFirstPost = indexOfLastPost - postPerPage;
 const currentPosts = handleSearch().slice(indexOfFirstPost,indexOfLastPost);//(0,10) (10,20)
 //console.log(currentPosts)

 const handleWishlist = (coin) => {
    
   setWishlist([...wishlist,{coin}]);
}

    
 
    return(
        <div className="bg-white border rounded-5 mb-4">
            {
                loading ? 
                (<MDBProgress>
                    <MDBProgressBar width={75} valuemin={0} valuemax={100} />
                  </MDBProgress>):
                (
                    <MDBTable align='middle' hover className="mb-0" responsive>
                            <MDBTableHead className="bg-light">
                                <tr >
                                    <th></th>
                                <th scope='col' className="fw-bold">Rank</th>
                                <th scope='col' className="fw-bold">Coin</th>
                                <th scope='col' className="fw-bold">Price</th>
                                <th scope='col' className="fw-bold">24h Change</th>
                                <th scope='col' className="fw-bold">Market Cap</th>
                                </tr>

                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    currentPosts
                                    .map((row) =>{
                                        const profit = row.price_change_percentage_24h > 0;
                            
                                        return(
                                            <tr key ={row.name}  className="hover-zoom">
                                                
                                                <td className="fw-bold">
                                                   
                                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' onClick={(e)=>handleWishlist(row)} />
                                                    
                                               
                                                </td>
                                                
                                                <td className="fw-bold">
                                                    {row.market_cap_rank}
                                                </td>


                                                <td onClick={() => navigate(`/coin/${row.id}`)}>
                                                    <div className='d-flex align-items-center' >
                                                        <img src={row?.image} alt ={row.name} style={{ width: '45px', height: '45px' }} className='rounded-circle'></img>
                                                        <div className='ms-3' >
                                                            <p className='fw-bold mb-1'>{row.name}</p>
                                                            <p className='text-muted mb-0'>{row.symbol}</p>
                                                        </div>
                                                    </div>
                                                </td>



                                                <td className="fw-bold" >
                                                
                                                    {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                                                    
                                                </td>
                                                <td>
                                                    <MDBBadge color={(profit)?'success' :'danger'} pill >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                    </MDBBadge>
                                                </td>
                                                <td className="fw-bold">
                                                    {symbol}{numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </MDBTableBody>
                    </MDBTable>
                           
                )
            } 
        </div>
    );
    
}
export default CoinsGrid;
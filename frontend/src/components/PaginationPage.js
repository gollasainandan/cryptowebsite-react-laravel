import React from "react";
//import Pagination from 'react-bootstrap/Pagination';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
const PaginationPage = ({postPerPage,totalPosts,paginate}) => {
    const pageNumbers = [];
    //cont [active,setActive]=[1];
for(let i=1; i<= Math.ceil(totalPosts/postPerPage); i++)
{
    pageNumbers.push(i);
}
    return(
       <div className="bg-white"> 

       <MDBPagination size='' className="border rounded-5 mb-0" >
           {
             
             
            pageNumbers.map(number =>(
                <MDBPaginationItem     key={number}  onClick = { () => paginate(number)} className="border">
                    <MDBPaginationLink href='#'  >{number}</MDBPaginationLink>
                </MDBPaginationItem>
                // <Pagination.Item key={number} active={number === active} onClick = { () => paginate(number)}>
                //     {number}
                // </Pagination.Item>
            ))
           
           
           }
            </MDBPagination>
            
       </div>
    );

}
export default PaginationPage;

        
        
        
 
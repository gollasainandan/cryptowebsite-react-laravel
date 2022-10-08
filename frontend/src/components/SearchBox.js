import React from "react";
import { MDBInput } from 'mdb-react-ui-kit';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
function SearchBox({searchCoin}){

return(
    <div >
                <MDBInput
                    label="Search Coin"
                    type='text' 
                    size='lg'
                    onChange={(e)=>searchCoin(e.target.value)}
                    />

                    
                    
                
            </div>
);
}
export default SearchBox;
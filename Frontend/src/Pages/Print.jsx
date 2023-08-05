
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Printing from '../Components/Printingpage/Printing'
import { useParams } from 'react-router-dom';
import { getselectedinvioce } from '../apicalls/Invoice';

const Print = () => {
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(()=>{
        const fetchInvoiceData = async () => {
            try {
              const response = await getselectedinvioce(id);
              setInvoiceData(response.Data); // Store the fetched invoice data in state
            } catch (error) {
              // Handle the error
            }
          };
      
          fetchInvoiceData();
    },[id])

    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Printing invoiceData={invoiceData} />
                {/* <Company /> */}
            </div>
        </>
    )
}

export default Print

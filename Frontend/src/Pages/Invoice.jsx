import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Invoicepage from '../Components/Invoicepage/Invoicepage'
import { getallcompanies } from '../apicalls/Company';
import { getallServices } from '../apicalls/Service';

const Invoice = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [companydetails, setcompanydetails] = useState([]);
  const [servicedetails, setservicedetails] = useState([]);

    const getcomapanydata = async () => {
        const response = await getallcompanies()
        console.log(response, "hhhhhhhffffffsssssssss");
        setcompanydetails(response.Data)
      }
    
      const getServicedata = async () => {
        const responseservice = await getallServices()
        console.log(responseservice, "hhhhhhhffffffsssssssss");
        setservicedetails(responseservice.Data)
      }
    useEffect(() => {
        getcomapanydata()
        getServicedata()
        const timestamp = Date.now(); // Get the current timestamp
        const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
        const newInvoiceNumber = `B2C${timestamp}${randomNum}`;
        setInvoiceNumber(newInvoiceNumber);
      }, [])
    return (
        
        <div style={{ display: 'flex'}}>
            <Sidebar />
            <Invoicepage invoiceNumber={invoiceNumber} servicedetails={servicedetails} companydetails={companydetails} />
        </div>
    )
}

export default Invoice

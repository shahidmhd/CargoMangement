import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Details from '../Components/Details/Details'
import { getallcompanies } from '../apicalls/Company'
import { getallServices } from '../apicalls/Service'
import { useParams } from 'react-router-dom'
import { getselectedinvioce } from '../apicalls/Invoice'
const Detailpage = () => {
    const [companydetails, setcompanydetails] = useState([]);
    const [servicedetails, setservicedetails] = useState([]);

    const getcomapanydata = async () => {
        const response = await getallcompanies()
        console.log(response, "companydetails");
        setcompanydetails(response.Data)
      }
    
      const getServicedata = async () => {
        const responseservice = await getallServices()
        console.log(responseservice, "servicedetails");
        setservicedetails(responseservice.Data)
      }
      const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);

console.log(invoiceData);
  useEffect(() => {
      const fetchInvoiceData = async () => {
          try {
              const response = await getselectedinvioce(id);
              setInvoiceData(response.Data);
          } catch (error) {
           console.log(error);
          }
      };

      fetchInvoiceData();
  }, [id]);

    useEffect(()=>{
        getcomapanydata()
        getServicedata()
    },[])
  return (
    <div style={{ display: 'flex'}}>
            <Sidebar />
            <Details companydetails={companydetails} servicedetails={servicedetails} invoiceData={invoiceData}/>
        </div>
  )
}

export default Detailpage




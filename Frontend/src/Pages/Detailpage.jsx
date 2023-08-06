import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Details from '../Components/Details/Details'
import { getallcompanies } from '../apicalls/Company'
import { getallServices } from '../apicalls/Service'
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

    useEffect(()=>{
        getcomapanydata()
        getServicedata()
    },[])
  return (
    <div style={{ display: 'flex'}}>
            <Sidebar />
            <Details companydetails={companydetails} servicedetails={servicedetails}/>
        </div>
  )
}

export default Detailpage




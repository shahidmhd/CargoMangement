
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Invoicetables from '../Components/Invoicetable/Invoicetables'
import { getallinvoices } from '../apicalls/Invoice'

const Invoicetable = () => {
    const [invoices,setallinvoices]=useState([])
const  getallinvoice=async()=>{
   const response=await getallinvoices()
   console.log(response.Data);
   setallinvoices(response.Data)
}
   useEffect(()=>{
    getallinvoice()
   },[])
  return (
   <>
     <div style={{ display: 'flex'}}>
            <Sidebar />
            <Invoicetables invoices={invoices} />
        </div>
   </>
  )
}

export default Invoicetable

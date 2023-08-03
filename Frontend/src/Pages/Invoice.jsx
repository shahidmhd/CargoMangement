import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Invoicepage from '../Components/Invoicepage/Invoicepage'

const Invoice = () => {
    return (
        
        <div style={{ display: 'flex'}}>
            <Sidebar />
            <Invoicepage />
        </div>
    )
}

export default Invoice

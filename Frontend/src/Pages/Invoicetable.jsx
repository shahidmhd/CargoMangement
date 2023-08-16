
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Invoicetables from '../Components/Invoicetable/Invoicetables'
import { getallinvoices } from '../apicalls/Invoice'
import Loading from './Loading'

const Invoicetable = () => {
  const [invoices, setallinvoices] = useState([])
  const [render, setrender] = useState(false)
  const [loading, setloading] = useState(true)
  const getallinvoice = async () => {
    setloading(true)
    const response = await getallinvoices()
    setallinvoices(response.Data)
    setloading(false)
  }
  useEffect(() => {
    getallinvoice()
  }, [render])
  return (
    // <>
    //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //     {loading ? '' : <Sidebar />}
    //     {loading ? (
    //       <Loading />
    //     ) : (
    //       <Invoicetables render={render} setrender={setrender} invoices={invoices} />
    //     )}
    //   </div>
    // </>
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {loading ? <Loading /> : null}
          {!loading && <Invoicetables render={render} setrender={setrender} invoices={invoices} />}
        </div>
      </div>
    </>
  )
}

export default Invoicetable

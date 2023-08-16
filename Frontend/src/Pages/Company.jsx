
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Companycreation from '../Components/CompanyCreation/Companycreation'
import { getallcompanies } from '../apicalls/Company'
import Loading from './Loading'
import { toast } from 'react-toastify'


const Company = () => {
  const [company, setcompany] = useState([])
  const [render, setrender] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getallcompany()
  }, [render])

  const getallcompany = async () => {
    try {
      setLoading(true);
      const response = await getallcompanies()
      if (response.success) {
        setcompany(response.Data)
        setLoading(false)
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      toast.error("err.message")
    }

  }


  return (
    // <>
    //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //     {loading ? '' : <Sidebar />}
    //     {loading ? (
    //       <Loading />
    //     ) : (
    //       <Companycreation Company={company} render={render} setrender={setrender} />
    //     )}
    //   </div>
    // </>
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {loading ? <Loading /> : null}
         {!loading&& <Companycreation Company={company} render={render} setrender={setrender} />}
        </div>
      </div>
    </>

  )
}

export default Company

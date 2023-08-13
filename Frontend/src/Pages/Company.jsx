
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Companycreation from '../Components/CompanyCreation/Companycreation'
import { getallcompanies } from '../apicalls/Company'
import Loading from './Loading'


const Company = () => {
  const [company, setcompany] = useState([])
  const [render, setrender] = useState(false)
  const [loading, setLoading] = useState(true);

  const getallcompany = async () => {
    setLoading(true);
    const response = await getallcompanies()
    setcompany(response.Data)
    setLoading(false)

  }
  useEffect(() => {
    getallcompany()
  }, [render])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {loading ? '' : <Sidebar />}
        {loading ? (
          <Loading />
        ) : (
          <Companycreation Company={company} render={render} setrender={setrender} />
        )}
      </div>
    </>
  )
}

export default Company

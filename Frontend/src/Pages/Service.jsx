import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Servicecreation from '../Components/ServiceCreation/Servicecreation'
import { getallServices } from '../apicalls/Service'
import Loading from './Loading'
const Service = () => {
  const [service, setservice] = useState([])
  const [render, setrender] = useState(false)
  const [loadind, setloading] = useState(true)
  const getallService = async () => {
    setloading(true)
    const response = await getallServices()
    console.log(response.Data, "fnrej");
    setservice(response.Data)
    setloading(false)


  }
  useEffect(() => {
    getallService()
  }, [render])
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loadind ? '' : <Sidebar />}
      {loadind ? (
        <Loading />
      ) : (
        <Servicecreation Service={service} render={render} setrender={setrender} />
      )}
    </div>
  )
}

export default Service

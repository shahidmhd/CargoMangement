import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Servicecreation from '../Components/ServiceCreation/Servicecreation'
import { getallServices } from '../apicalls/Service'
import Loading from './Loading'
import { toast } from 'react-toastify'
const Service = () => {
  const [service, setservice] = useState([])
  const [render, setrender] = useState(false)
  const [loadind, setloading] = useState(true)
  const getallService = async () => {
    try {
      setloading(true)
      const response = await getallServices()
      if (response.success) {
        setservice(response.Data)
        setloading(false)
      }else{
        toast.error(response.message)
      }
    } catch (err) {
      console.log(err)

    }
  }
  useEffect(() => {
    getallService()
  }, [render])
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {loadind ? <Loading /> : null}
          {!loadind && <Servicecreation Service={service} render={render} setrender={setrender} />}
        </div>
      </div>
    </>
  )
}

export default Service

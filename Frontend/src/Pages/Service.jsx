import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Servicecreation from '../Components/ServiceCreation/Servicecreation'
import { getallServices } from '../apicalls/Service'
const Service = () => {
  const [service,setservice]=useState([])
  const [render,setrender]=useState(false)
  const getallService=async()=>{
    
    const response=await getallServices()
    console.log(response.Data,"fnrej");
    setservice(response.Data)


   }
  useEffect(() => {
    getallService()
  }, [render])
  return (
    <div style={{ display: 'flex' }}>
    <Sidebar/>
   <Servicecreation Service={service}render={render} setrender={setrender}/>
    {/* <Company /> */}
  </div>
  )
}

export default Service

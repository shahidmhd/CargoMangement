import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Servicecreation from '../Components/ServiceCreation/Servicecreation'
const Service = () => {
  return (
    <div style={{ display: 'flex' }}>
    <Sidebar/>
   <Servicecreation/>
    {/* <Company /> */}
  </div>
  )
}

export default Service

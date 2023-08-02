
import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Companycreation from '../Components/CompanyCreation/Companycreation'

const Company = () => {
  
  return (
   <>
   <div style={{ display: 'flex' }}>
        <Sidebar/>
        <Companycreation/>
        {/* <Company /> */}
      </div>
   </>
  )
}

export default Company

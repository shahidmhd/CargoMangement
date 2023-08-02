
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Companycreation from '../Components/CompanyCreation/Companycreation'
import { getallcompanies } from '../apicalls/Company'


const Company = () => {
  const [company,setcompany]=useState([])
  const [render,setrender]=useState(false)

  const getallcompany=async()=>{
    const response=await getallcompanies()
    console.log(response.Data,"fnrej");
    setcompany(response.Data)

   }
  useEffect(() => {
    getallcompany()
  }, [render])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Companycreation Company={company}render={render} setrender={setrender}/>
        {/* <Company /> */}
      </div>
    </>
  )
}

export default Company

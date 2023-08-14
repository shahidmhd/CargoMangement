
import React, { useState } from 'react'
import Reportpage from '../Components/Report/Reportpage'
import Sidebar from '../Components/Sidebar/Sidebar';
import Loading from './Loading';

const Report = () => {
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    return (
        <>
        <div style={{display:'flex'}}>

            <Sidebar />
            <Reportpage />
            </div>

        </>
    )
}

export default Report

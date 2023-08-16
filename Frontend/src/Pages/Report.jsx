
import React, { useState } from 'react'
import Reportpage from '../Components/Report/Reportpage'
import Sidebar from '../Components/Sidebar/Sidebar';
import Loading from './Loading';

const Report = () => {
    const [isLoading, setIsLoading] = useState(false); // Add a loading state
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {isLoading ? <Loading /> : null}
                    <Reportpage />
                </div>
            </div>
        </>
    )
}

export default Report

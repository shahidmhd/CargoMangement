
import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Printing from '../Components/Printingpage/Printing'

const Print = () => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Printing />
                {/* <Company /> */}
            </div>
        </>
    )
}

export default Print

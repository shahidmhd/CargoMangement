
// import React, { useEffect, useState } from 'react'
// import Reportpage from '../Components/Report/Reportpage'
// import Sidebar from '../Components/Sidebar/Sidebar';
// import Loading from './Loading';
// import { getallcompanies } from '../apicalls/Company';
// import { getallServices } from '../apicalls/Service';
// import { getallinvoices } from '../apicalls/Invoice';

// const Report = () => {
//     const [loading, setIsLoading] = useState(true); // Add a loading state
//     const [invoiceData, setInvoiceData] = useState(null);
//     const [companydetails, setcompanydetails] = useState([]);
//     const [servicedetails, setservicedetails] = useState([]);


//     useEffect(() => {
//         getcomapanydata()
//         getServicedata()
//         fetchInvoiceData()
//         setIsLoading(false)
//     }, [])


//     const getcomapanydata = async () => {
//         const response = await getallcompanies()
//         setcompanydetails(response.Data)
//     }

//     const getServicedata = async () => {
//         const responseservice = await getallServices()
//         setservicedetails(responseservice.Data)
//     }

//     const fetchInvoiceData = async () => {
//         const response = await getallinvoices();
//         setInvoiceData(response.Data)
//     }
//     console.log(invoiceData,"invoi");
//     console.log(companydetails,"companydetails");
//     console.log(servicedetails,"service");

//     return (
//         // <>
//         //     <div style={{ display: 'flex' }}>
//         //         <Sidebar />
//         //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
//         //             {isLoading ? <Loading /> : null}
//         //             <Reportpage invoiceData={invoiceData} />
//         //         </div>
//         //     </div>
//         // </>
//          <>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         {loading ? '' : <Sidebar />}
//         {loading ? (
//           <Loading/>
//         ) : (
//             <Reportpage invoiceData={invoiceData} />
//         )}
//       </div>
//     </>
//     )
// }

// export default Report


import React, { useEffect, useState } from 'react'
import Reportpage from '../Components/Report/Reportpage'
import Sidebar from '../Components/Sidebar/Sidebar';
import Loading from './Loading';
import { getallcompanies } from '../apicalls/Company';
import { getallServices } from '../apicalls/Service';
import { getallinvoices, getnotdeletedinvoices } from '../apicalls/Invoice';

const Report = () => {
    const [loading, setLoading] = useState(true); // Use setLoading instead of setIsLoading
    const [invoiceData, setInvoiceData] = useState(null);
    const [companydetails, setCompanyDetails] = useState([]);
    const [serviceDetails, setServiceDetails] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true); // Start loading
            await Promise.all([getCompanyData(), getServiceData(), fetchInvoiceData()]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const getCompanyData = async () => {
        const response = await getallcompanies();
        setCompanyDetails(response.Data);
    };

    const getServiceData = async () => {
        const response = await getallServices();
        setServiceDetails(response.Data);
    };

    const fetchInvoiceData = async () => {
        const response = await getnotdeletedinvoices();
        setInvoiceData(response.Data);
    };

    return (
        // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        //     {loading ? <Loading /> : <Sidebar />}
        //     {loading ? null : <Reportpage invoiceData={invoiceData} />}
        // </div>
        <>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {loading ? <Loading /> : null}
            {!loading&&<Reportpage invoiceData={invoiceData} companydetails={companydetails} serviceDetails={serviceDetails} />}
          </div>
        </div>
      </>
    );
};

export default Report;

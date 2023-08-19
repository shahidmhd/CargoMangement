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

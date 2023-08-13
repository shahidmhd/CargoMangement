import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Invoicepage from '../Components/Invoicepage/Invoicepage';
import { getallcompanies } from '../apicalls/Company';
import { getallServices } from '../apicalls/Service';
import Loading from './Loading';

const Invoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [companydetails, setCompanydetails] = useState([]);
  const [servicedetails, setServicedetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCompanyData = async () => {
    const response = await getallcompanies();
    setCompanydetails(response.Data);
  };

  const getServiceData = async () => {
    const responseService = await getallServices();
    setServicedetails(responseService.Data);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([getCompanyData(), getServiceData()]);
      setLoading(false);
      const timestamp = Date.now(); // Get the current timestamp
      const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
      const newInvoiceNumber = `B2C${timestamp}${randomNum}`;
      setInvoiceNumber(newInvoiceNumber);
    }

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? '' : <Sidebar />}
      {loading ? (
        <Loading />
      ) : (
        <Invoicepage invoiceNumber={invoiceNumber} servicedetails={servicedetails} companydetails={companydetails} />
      )}
    </div>
  );
};

export default Invoice;

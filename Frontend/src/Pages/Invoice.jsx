import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Invoicepage from '../Components/Invoicepage/Invoicepage';
import { getallcompanies } from '../apicalls/Company';
import { getallServices } from '../apicalls/Service';
import Loading from './Loading';
import { getallinvoices } from '../apicalls/Invoice';
import { toast } from 'react-toastify';

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

  const getallInvoices = async () => {
    const response = await getallinvoices()
    if (response.success) {
      const invoiceCounter = response.Data.length + 1;
      const formattedCounter = invoiceCounter.toString().padStart(2, '0');
      const newInvoiceNumber = `B2CO${formattedCounter}`;
      setInvoiceNumber(newInvoiceNumber);
    } else {
      toast.error("invoices is not getting")
    }



  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([getCompanyData(), getServiceData(), getallInvoices()]);
      setLoading(false);
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

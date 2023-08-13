import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Printing from '../Components/Printingpage/Printing';
import { useParams } from 'react-router-dom';
import { getselectedinvioce } from '../apicalls/Invoice';
import Skeleton from 'react-loading-skeleton';

const Print = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await getselectedinvioce(id);
        setInvoiceData(response.Data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        // Handle the error
        setIsLoading(false); // Set loading to false in case of error as well
      }
    };

    fetchInvoiceData();
  }, [id]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {isLoading ? '' : <Sidebar />}
      {isLoading ? ( // Display loading indicator if isLoading is true
        <div style={styles.loadingContainer}>
          <div className="loading-spinner"></div>
          <p className='text-bold font-weight-500'>Loading...........</p>
        </div>
      ) : (
        <Printing invoiceData={invoiceData} />
      )}
    </div>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black'
  },
};

export default Print;

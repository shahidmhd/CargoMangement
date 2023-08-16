import React, { useEffect, useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { Document, Page } from 'react-pdf';
const Reportpage = ({ invoiceData }) => {
  const generatePdf = () => {
    const MyPdfDocument = () => (
      <Document>
        <Page>
          <Text>PDF Content Here</Text> {/* Replace with your actual PDF content */}
        </Page>
      </Document>
    );

    return (
      <div style={{ display: 'none' }}>
        <MyPdfDocument />
      </div>
    );
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  }
  console.log(invoiceData, "jjjj");

  const [totals, setTotals] = useState({
    taxableValue: 0,
    igst: 0,
    sgst: 0,
    cgst: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    console.log(invoiceData, "first");
    if (invoiceData && invoiceData.length > 0) {
      let totalTaxableValue = 0;
      let totalIGST = 0;
      let totalSGST = 0;
      let totalCGST = 0;
      let totalAmount = 0;

      invoiceData.forEach((item) => {
        item.tableRows.forEach((row) => {
          const taxableValue = row.weight * row.amount;
          const igst = (taxableValue * 0.18).toFixed(2);
          const sgst = (taxableValue * 0.09).toFixed(2); // SGST is half of IGST
          const cgst = (taxableValue * 0.09).toFixed(2); // CGST is half of IGST
          const rowTotal = (taxableValue + parseFloat(igst)).toFixed(2);

          totalTaxableValue += taxableValue;
          totalIGST += parseFloat(igst);
          totalSGST += parseFloat(sgst);
          totalCGST += parseFloat(cgst);
          totalAmount += parseFloat(rowTotal);
        });
      });

      setTotals({
        taxableValue: totalTaxableValue.toFixed(2),
        igst: totalIGST.toFixed(2),
        sgst: totalSGST.toFixed(2),
        cgst: totalCGST.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      });
    }
  }, [invoiceData]);


  const data = () => {
    return {
      columns: [
        {
          label: 'No',
          field: 'No',
          width: 50,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'No',
          },
        },
        {
          label: 'Invoice No',
          field: 'InvoiceNo',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Invoice No',
          },
        },
        {
          label: 'InvoiceDate',
          field: 'InvoiceDate',
          width: 100,
        },
        {
          label: 'Box No',
          field: 'BoxNo',
          width: 100,
        },
        {
          label: 'Airway Bill',
          field: 'Airwaybill',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Service Name',
          field: 'ServiceName',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Company Name',
          field: 'CompanyName',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'HSN Code',
          field: 'HSNCode',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Weight',
          field: 'weight',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Unit Value',
          field: 'unitvalue',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Taxable Value',
          field: 'Taxablevalue',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'IGST',
          field: 'IGST',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'SGST',
          field: 'SGST',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'CGST',
          field: 'CGST',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Total',
          field: 'Total',
          sort: 'disabled',
          width: 100,
        },
      ],
      rows: invoiceData?.flatMap((item, index) =>
        item.tableRows.map((row, rowIndex) => ({
          No: index + 1,
          InvoiceNo: item.invoiceNumber,
          InvoiceDate: formatDate(item.selectedDate),
          BoxNo: item.boxNo,
          Airwaybill: item.airwayBillNo,
          ServiceName: row.serviceName,
          CompanyName: item.selectedCompanyId.companyname,
          HSNCode: row.HSNCode,
          weight: row.weight,
          unitvalue: row.amount,
          Taxablevalue: row.weight * row.amount,
          IGST: (row.weight * row.amount * 0.18).toFixed(2),
          SGST: ((row.weight * row.amount * 0.18) / 2).toFixed(2), // SGST is half of IGST
          CGST: ((row.weight * row.amount * 0.18) / 2).toFixed(2), // CGST is half of IGST
          Total: (row.weight * row.amount + row.weight * row.amount * 0.18).toFixed(2), // Taxablevalue + gst18

        }))
      )
    }

  };
  return (
    <>
      <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
        {/* Invoice Heading */}
        <div className='mb-4'>
          <h1 className='text-center mb-3'>Manage Your Report</h1>
        </div>
        {/*  */}
        <div className='text-center mb-3'>
          <button className='btn btn-large ms-2' onClick={() => {


            const pdfBlob = new Blob([<MyPdfDocument />], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const printWindow = window.open(pdfUrl, '_blank');
            printWindow.onload = () => {
              printWindow.print();
            };
          }} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>PDF</button>
          <button className='btn btn-large ms-2' style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>EXCEL</button>
          <button className='btn btn-large ms-2' style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>CSV</button>
        </div>

        <CDBContainer>
          <CDBCard>
            <CDBCardBody>
              <CDBDataTable
                striped
                bordered
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={data()}
                materialSearch={true}
              />
            </CDBCardBody>
          </CDBCard>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            marginBottom: '20px',
            marginRight: '20px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
              <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>IGST: {totals.igst}</h3>
              <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>SGST: {totals.sgst}</h3>
              <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>CGST: {totals.cgst}</h3>
              <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Totalamount: {totals.totalAmount}</h3>
            </div>
          </div>
        </CDBContainer>
      </div>
    </>
  );
};

export default Reportpage;
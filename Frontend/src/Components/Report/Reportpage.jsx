import React, { useEffect, useState, useRef } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import { CSVLink } from 'react-csv';
// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { fetchcompanyinvoices, fetchserviceinvoices, searchdatas } from '../../apicalls/Invoice';





const Reportpage = ({ invoiceData, companydetails, serviceDetails }) => {
  // const tableRef = useRef(null);


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [showPdf, setShowPdf] = useState(false);
  const [invoiceDatas, setinvoiceDatas] = useState(invoiceData)
  const [searchedinvoices, setsearchedinvoices] = useState([])
  const [companyInvoice, setcompanyInvoice] = useState([])
  const [serviceInvoice, setserviceInvoice] = useState([])



  const handlePdfClick = () => {
    setShowPdf(true);
  };





  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }



  const handleDateChange = (date) => {

    setSelectedDate(date);
  };



  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };
  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }




  const filterDataByDate = async (startdate, enddate) => {
    const formattedStartDate = formatDateToDDMMYYYY(startdate);
    const formattedEndDate = formatDateToDDMMYYYY(enddate);
    console.log(startdate, enddate);
    const response = await searchdatas(formattedStartDate, formattedEndDate)
    setinvoiceDatas(response.filteredInvoices)

  }


  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleCompanyChange = async (event) => {
    setSelectedCompany(event.target.value);
    const response = await fetchcompanyinvoices(event.target.value)
    if (response.success) {
      setinvoiceDatas(response.matchingInvoices)
      console.log(response.matchingInvoices, "company matched datas");
    } else {
      setinvoiceDatas(invoiceData)
    }

  };

  const handleServiceChange = async (event) => {
    setSelectedService(event.target.value);
    console.log(event.target.value, "selected service")
    console.log(invoiceDatas, "service invoice datas")

    // Find the current invoiceData object
    const currentInvoiceData = invoiceDatas.find(invoiceData => {
      return invoiceData.tableRows && invoiceData.tableRows.some(row => row.serviceName === event.target.value);
    });

    if (currentInvoiceData) {
      // Filter and get the matching tableRow from the current invoiceData
      const selectedTableRow = currentInvoiceData.tableRows.find(row => row.serviceName === event.target.value);

      if (selectedTableRow) {
        // Push the selected tableRow to an array
        const matchedTableRows = [];
        matchedTableRows.push(selectedTableRow);

        console.log("Matched TableRows:", matchedTableRows);
        console.log(currentInvoiceData, "llllll");
        // setinvoiceDatas(invoiceDatas); // If you want to update the state
      } else {
        console.log("No matching tableRow found in the current invoiceData.");
      }
    } else {
      console.log("No matching invoice data found.");
    }
  
  // const response = await fetchserviceinvoices(event.target.value)
  // setinvoiceDatas(response.matchingInvoices)
  // console.log(response.matchingInvoices, "service matched datas");
};

const [totals, setTotals] = useState({
  taxableValue: 0,
  igst: 0,
  sgst: 0,
  cgst: 0,
  totalAmount: 0,
});


useEffect(() => {
  if (invoiceDatas && invoiceDatas.length > 0) {
    let totalTaxableValue = 0;
    let totalIGST = 0;
    let totalSGST = 0;
    let totalCGST = 0;
    let totalAmount = 0;

    invoiceDatas.forEach((item) => {
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
}, [invoiceDatas]);


const data = () => {
  if (!Array.isArray(invoiceDatas)) {
    return {
      columns: [],
      rows: [],
    };
  }
  const formattedTotalAmount = `Total: ${totals.totalAmount}`;
  const formattedtotalIGST = `Total: ${totals.igst}`;
  const formattedtotalSGST = `Total: ${totals.sgst}`;
  const formattedtotalCGST = `Total: ${totals.cgst}`;
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
    rows: [...invoiceDatas?.flatMap((item, index) =>
      item.tableRows.map((row, rowIndex) => ({
        No: index + 1,
        InvoiceNo: item.invoiceNumber,
        InvoiceDate: formatDate(item.selectedDate),
        BoxNo: item.boxNo,
        Airwaybill: item.airwayBillNo,
        ServiceName: row.serviceName,
        CompanyName: item.selectedCompanyId?.companyname || 'Company Deleted',
        HSNCode: row.HSNCode,
        weight: row.weight,
        unitvalue: row.amount,
        Taxablevalue: row.weight * row.amount,
        IGST: (row.weight * row.amount * 0.18).toFixed(2),
        SGST: ((row.weight * row.amount * 0.18) / 2).toFixed(2), // SGST is half of IGST
        CGST: ((row.weight * row.amount * 0.18) / 2).toFixed(2), // CGST is half of IGST
        Total: (row.weight * row.amount + row.weight * row.amount * 0.18).toFixed(2), // Taxablevalue + gst18
      }))
    ),
    // Add an additional row with empty values
    {
      No: '',
      InvoiceNo: '',
      InvoiceDate: '',
      BoxNo: '',
      Airwaybill: '',
      ServiceName: '',
      CompanyName: '',
      HSNCode: '',
      weight: '',
      unitvalue: '',
      Taxablevalue: '',
      IGST: formattedtotalIGST,
      SGST: formattedtotalSGST,
      CGST: formattedtotalCGST,
      Total: formattedTotalAmount,
    },
    ]
  }
};
return (
  <>
    <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
      <div className='mb-4'>
        <h1 className='text-center mb-3'>Manage Your Report</h1>
      </div>
      {/*  */}
      <div className='text-center mb-3'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-auto'>
            From:  <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat='dd/MM/yyyy'
              placeholderText='Select a date'
              className='datepicker mx-2 narrow-datepicker'
            />
          </div>
          <div className='col-md-auto'>
            To:     <DatePicker
              selected={selectedDate2}
              onChange={handleDateChange2}
              dateFormat='dd/MM/yyyy'
              placeholderText='Select a date'
              className='datepicker mx-2 narrow-datepicker'
            />
            <button className='btn btn-large p-2' style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }} onClick={() => filterDataByDate(selectedDate, selectedDate2)}>
              Search
            </button>
          </div>
          <div className='col-md-auto'>
            <button className='btn btn-large p-2' style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }} onClick={handlePdfClick}>PDF</button>
          </div>
          <div className='col-md-auto'>
            {/* <DownloadTableExcel
                filename="users_table"
                sheet="users"
                tablePayload={data().rows} // Make sure this is the correct data format
              >
                <button className='btn btn-large p-2' style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>
                  Excel
                </button>
              </DownloadTableExcel> */}
            <CSVLink
              data={data().rows} // Provide the data you want to export
              filename={'report.xls'} // Set the filename for the downloaded CSV file
              className='btn btn-large p-2'
              style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}
            >
              Excel
            </CSVLink>


          </div>
          <div className='col-md-auto'>
            <div>
              <CSVLink
                data={data().rows} // Provide the data you want to export
                filename={'report.csv'} // Set the filename for the downloaded CSV file
                className='btn btn-large p-2'
                style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}
              >
                CSV
              </CSVLink>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <select className="select" style={{
            border: 'none', background: 'none', color: 'black', padding: '5px'
          }}
            onChange={handleCompanyChange}
            value={selectedCompany}
          >
            <option value="">Select company</option>
            {companydetails?.map((company) => (
              <option key={company._id} value={company._id}>
                {company.companyname}
              </option>
            ))}
          </select>

          <select className="select" style={{ border: 'none', background: 'none', color: 'black', padding: '5px' }}
            onChange={handleServiceChange}
            value={selectedService}
          >
            <option value="">Select service</option>
            {serviceDetails?.map((service) => (
              <option key={service._id} value={service.id}>
                {service.servicename}
              </option>
            ))}
          </select>

        </div>

      </div>

      <CDBContainer>
        <CDBCard>
          <CDBCardBody>
            <CDBDataTable
              // ref={tableRef}
              striped
              bordered
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={data()}
              materialSearch={true}
            />
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
                <h6 style={{ marginBottom: '10px', fontSize: '1rem' }}>IGST: {totals.igst}</h6>
                <h6 style={{ marginBottom: '10px', fontSize: '1rem' }}>SGST: {totals.sgst}</h6>
                <h6 style={{ marginBottom: '10px', fontSize: '1rem' }}>CGST: {totals.cgst}</h6>
                <h6 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Totalamount: {totals.totalAmount}</h6>
              </div>
            </div>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      {showPdf && (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
          <PdfDocument data={invoiceDatas} />
        </PDFViewer>
      )}
    </div>
  </>
);
};

export default Reportpage;
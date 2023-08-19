import React, { useEffect, useState, useRef } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import { CSVLink } from 'react-csv';
// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { fetchcompanyinvoices, fetchserviceinvoices, searchdatas } from '../../apicalls/Invoice';
import './Report.css'




const Reportpage = ({ invoiceData, companydetails, serviceDetails }) => {
  // const tableRef = useRef(null);


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [invoiceDatas, setinvoiceDatas] = useState(invoiceData)
  const [searchedinvoices, setsearchedinvoices] = useState([])
  const [companyInvoice, setcompanyInvoice] = useState([])
  const [serviceInvoice, setserviceInvoice] = useState([])



  // const handlePdfClick = () => {
  //   setShowPdf(true);
  // };





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
    } else {
      setinvoiceDatas(invoiceData)
    }

  };

  const handleServiceChange = async (event) => {
    setSelectedService(event.target.value);
    // console.log(event.target.value, "selected service")
    // console.log(invoiceDatas, "service invoice datas")

    // // Find the current invoiceData object
    // const currentInvoiceData = invoiceDatas.find(invoiceData => {
    //   return invoiceData.tableRows && invoiceData.tableRows.some(row => row.serviceName === event.target.value);
    // });

    // if (currentInvoiceData) {
    //   // Filter and get the matching tableRow from the current invoiceData
    //   const selectedTableRow = currentInvoiceData.tableRows.find(row => row.serviceName === event.target.value);

    //   if (selectedTableRow) {
    //     // Initialize an array to collect matched tableRows
    //     const matchedTableRows = [];

    //     // Loop through each invoiceData object
    //     invoiceDatas.forEach(invoiceData => {
    //       // Check if the invoiceData has tableRows
    //       if (invoiceData.tableRows) {
    //         // Filter and get the matching tableRows from the current invoiceData
    //         const matchedRows = invoiceData.tableRows.filter(row => row.serviceName === event.target.value);

    //         // Push the matched tableRows to the array
    //         matchedTableRows.push(...matchedRows);
    //       }
    //     });
    //     console.log(matchedTableRows,"gggggggggggggggggggggg");
    //     currentInvoiceData.tableRows = matchedTableRows;
    //     // currentInvoiceData.tableRows.push(matchedTableRows)
    //     console.log(currentInvoiceData,"jjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    //   } else {
    //     console.log("No matching tableRow found in the current invoiceData.");
    //   }
    // } else {
    //   console.log("No matching invoice data found.");
    // }

    const response = await fetchserviceinvoices(event.target.value)
    setinvoiceDatas(response.matchingInvoices)
    console.log(response.matchingInvoices, "service matched datas");
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
    const formattedTotalAmount = `${totals.totalAmount}`;
    const formattedtotalIGST = ` ${totals.igst}`;
    const formattedtotalSGST = ` ${totals.sgst}`;
    const formattedtotalCGST = `${totals.cgst}`;
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
        Taxablevalue: 'Total:',
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
      <div className='container-fluid p-5' style={{ minHeight: '100vh', overflowY: 'auto' }}>
        <div className='mb-4'>
          <h1 className='text-center mb-3'>Manage Your Report</h1>
        </div>
        <div className='text-center mb-3'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-auto'>
              From:   <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat='dd/MM/yyyy'
                placeholderText='Select a date'
                className='datepicker mx-2 narrow-datepicker form-control'
              />
            </div>
            <div className='col-md-auto'>
              To:  <DatePicker
                selected={selectedDate2}
                onChange={handleDateChange2}
                dateFormat='dd/MM/yyyy'
                placeholderText='Select a date'
                className='datepicker mx-2 narrow-datepicker form-control'
              />
            </div>
            <div className='col-md-auto'>
              <button
                className='btn btn-large btn-dark btn-sm mb-2'
                onClick={() => filterDataByDate(selectedDate, selectedDate2)}
              >
                Search
              </button>
            </div>
            <div className='row justify-content-center align-items-center d-flex mt-3'>
              {/* <div className='col-md-auto mb-2'>
                <button className='btn btn-sm btn-dark' disabled>
                  PDF
                </button>
              </div> */}
              <div className='col-md-auto mb-2'>
                <CSVLink
                  data={data().rows}
                  filename={'report.xls'}
                  className='btn btn-sm btn-dark'
                >
                  Excel
                </CSVLink>
              </div>
              <div className='col-md-auto mb-2'>
                <CSVLink
                  data={data().rows}
                  filename={'report.csv'}
                  className='btn btn-sm btn-dark'
                >
                  CSV
                </CSVLink>
              </div>
              <div className='col-md-auto mb-2'>
                <button className='btn btn-sm btn-dark' disabled>
                  PDF
                </button>
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

        <div className='custom-datatable-container'> {/* Add a container for the table */}
    <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <div className='custom-datatable-scrollable'> {/* Add a scrollable wrapper */}
            <CDBDataTable
              striped
              bordered
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={data()}
              materialSearch={true}
              className="custom-datatable" // Add a custom class name to the table
            />
          </div>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  </div>
</div>
        {/* {showPdf && (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
          <PdfDocument data={invoiceDatas} />
        </PDFViewer>
      )} */}
    

    </>

  );
};

export default Reportpage;
import React from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
const Reportpage = () => {
  const calculateTotalGST = () => {
    const rows = data().rows;
    let totalGST = 0;
    for (const row of rows) {
      totalGST += parseFloat(row.IGST);
    }
    return totalGST.toFixed(2); // Format to 2 decimal places
  };

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
      rows: [
        {
          No: 1,
          InvoiceNo: 'Tiger Nixon',
          InvoiceDate: '1/2/2002',
          BoxNo: '123',
          Airwaybill: '1233',
          ServiceName: 'cargoservice',
          CompanyName: 'cyenosure',
          HSNCode: '345555',
          weight: '100',
          unitvalue: '200',
          Taxablevalue: '1000',
          IGST: '18',
          SGST: '18',
          CGST: '18',
          Total: '1000',
        }
      ],
    };
  };
  return (
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
            footer={[
              {
                label: 'Total GST',
                field: 'TotalGST',
                value: calculateTotalGST(),
              },
              // Add other footer elements here if needed
            ]}
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};

export default Reportpage;
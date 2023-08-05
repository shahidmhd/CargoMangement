import React, { useState } from 'react'
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
// import { getselectedinvioce } from '../../apicalls/Invoice';


function Invoicetables({ invoices }) {
  const navigate = useNavigate()
  console.log(invoices, "hfdssss");
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  }

  const handleprintpage = async(item) => {
    console.log(item);
    // const response=await getselectedinvioce(item._id)
    navigate(`/print/${item._id}`);
  };
  return (
    <>
      <div className='container-fluid p-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='mb-3'>
            </div>
            <div className='p-3' style={{ height: '400px', overflow: 'auto' }}>
              <MDBTable align='middle'>
                <MDBTableHead>
                  <tr>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      Invoice Number
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      box no
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      bill no
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      company name
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      total weight
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      Date
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      Actions
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {invoices &&
                    invoices.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='ms-3'>
                              <p className='fw-bold mb-1'>{item.invoiceNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item.boxNo}</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item.airwayBillNo}</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item.selectedCompanyId.companyname}</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item.totalWeight}</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{formatDate(item.selectedDate)}</p>
                        </td>

                        <td>
                          <MDBBadge  onClick={() => handleprintpage(item)} color='black' pill>
                            deatails
                          </MDBBadge>
                        </td>
                      </tr>
                    ))}

                </MDBTableBody>

              </MDBTable>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Invoicetables
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from 'mdb-react-ui-kit';


const Printing = () => {
  
 
  
  return (
    <MDBContainer className="py-5" style={{width:"50%"}} >
      <MDBCard style={{ border: '3px solid black' }}>
        <div
          style={{ backgroundColor: "#fff", height: "12em", display: "flex", border: '2px solid black' }}
          className="w-100">
        
         
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='ps-1' style={{ color:'black', height: '30%', width: '55em', display: 'flex',justifyContent:"center" }}>
              <h1>INDBX PRIVET LIMITED</h1>
            </div>
            <div className="p-3" style={{ display: 'flex', justifyContent: 'space-between', }}>
              <p>
                KP 14/432, CHULLIKKAPARAMBA,<br />
                <span style={{ fontWeight: 300 }}>CHERUVADI, Kozhikode, Kerala, 673661</span>

                <br></br>
                <br></br>
                <p>GSTIN:32AAGCI3195M1ZA</p>
              </p>
              <p className='date-input'>
                 <div style={{border:"solid 2px",textAlign:"center"}}>16/07/2003</div>
                <b> Invoice NO:FG51212D</b>
              </p>
            </div>
          </div>

        </div>
        <MDBCardBody>
          <MDBRow>
            <MDBCol xl="12">
              <MDBTypography listUnStyled>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", paddingLeft: "10%", paddingBottom: "3%" }}>
                    <li className="text-muted">
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                      <span className="fw-bold ms-1"></span>Company
  
                        <option>company </option>

                       
                    </li>
                    <li className="text-muted" style={{ paddingLeft: "5%" }}>
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                      <span className="fw-bold ms-1"></span>Box No:4520
                    </li>
                    <li className="text-muted" style={{ paddingLeft: "5%" }}>
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                      <span className="fw-bold ms-1"></span>Total weight:56
                    </li>
                    <li className="text-muted" style={{ paddingLeft: "5%" }}>
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA", paddingLeft:"20%" }} /> */}
                      <span className="fw-bold ms-1"></span>AirwayBill N.O:SAE4851
                    </li>
                  </div>
                </div>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
          <MDBRow className="my-2 mx-1 justify-content-center">
            <MDBCol lg="12" className="table-responsive">
              <MDBTable striped borderless>
                <MDBTableHead className="text-white" style={{ backgroundColor: "#84B0CA" }}>
                  <tr>
                    <th scope="col" style={{ backgroundColor: "black", color: "white" }}>
                      N.O
                    </th>
                    <th scope="col" style={{ backgroundColor: "black", color: "white" }}>
                      Service Name
                    </th>
                    <th scope="col" style={{ backgroundColor: "black", color: "white" }}>
                      HSN Code
                    </th>
                    <th scope="col" style={{ backgroundColor: "black", color: "white" }}>
                      Weight
                    </th>
                    <th scope="col" style={{ backgroundColor: "black", color: "white" }}>
                      Amount
                    </th>
                    <th scope="col" style={{ backgroundColor: "black", color: "white" }}>
                      Total
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody  style={{ justifyItems: "center" }}>
                 
                   
                  
                  <tr>
                    <td>1</td>
                    <td>superfast delivery</td>
                    <td>DS1230</td>
                    <td>15</td>
                    <td>1542</td>
                    <td>45120</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>superfast delivery</td>
                    <td>DS1230</td>
                    <td>15</td>
                    <td>1542</td>
                    <td>45120</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>superfast delivery</td>
                    <td>DS1230</td>
                    <td>15</td>
                    <td>1542</td>
                    <td>45120</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="8">
              <p className="ms-3">Note:</p>
            </MDBCol>
            <MDBCol xl="3">
              <MDBTypography listUnStyled>
                <li className="text-muted ms-3">
                  <span className="text-black me-4">SubTotal</span>₹120
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">GST 18%</span>₹150
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">SGST 9%</span>₹210
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">IGST 9%</span>₹210
                </li>
              </MDBTypography>
              <p className="text-black float-start">
                <span className="text-black me-3">Total Amount</span>
                <span style={{ fontSize: "25px" }}>₹780</span>
              </p>
            </MDBCol>
          </MDBRow>
          <hr style={{ border: '3px solid black' }} />
          {/* ... (rest of the JSX) */}
          <MDBRow>
            <MDBCol xl="10">
              <p>Thank you for your purchase</p>
            </MDBCol>
            <MDBCol xl="2">
              <MDBBtn
                className="text-capitalize"
                style={{ backgroundColor: "#60bdf3" }}
              
              >
                Print
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )};


export default Printing;
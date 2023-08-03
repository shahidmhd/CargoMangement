import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit';
import { getallcompanies } from '../../apicalls/Company';
import { getallServices } from '../../apicalls/Service';

const Invoicepage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [companydetails, setcompanydetails] = useState([]);
  const [servicedetails, setservicedetails] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedHSNCode, setSelectedHSNCode] = useState("");
  const [weight, setWeight] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [tableRows, setTableRows] = useState([]);

  const getcomapanydata = async () => {
    const response = await getallcompanies()
    console.log(response, "hhhhhhhffffffsssssssss");
    setcompanydetails(response.Data)
  }

  const getServicedata = async () => {
    const responseservice = await getallServices()
    console.log(responseservice, "hhhhhhhffffffsssssssss");
    setservicedetails(responseservice.Data)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getcomapanydata()
    getServicedata()
  }, [])

  const handleServiceChange = (event) => {
    const selectedServiceId = event.target.value;
    const selectedServiceData = servicedetails.find((service) => service._id === selectedServiceId);
    console.log(selectedServiceData, "j");
    if (selectedServiceData) {
      setSelectedService(selectedServiceData);
      setSelectedHSNCode(selectedServiceData.HSNCode);
      setAmount(selectedServiceData.Rate);
      setTotal(weight * selectedServiceData.Rate);
    } else {
      setSelectedService(null);
      setSelectedHSNCode("");
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setTotal(weight * event.target.value);
  };

  const addTableRow = () => {
    const newRow = {
      id: tableRows.length + 1,
      serviceName: selectedService.servicename,
      HSNCode: selectedHSNCode,
      weight,
      amount,
      total: weight * amount,
    };

    setTableRows([...tableRows, newRow]);

    setSelectedService(null);
    setSelectedHSNCode("");
    setWeight(0);
    setAmount(0);
    setTotal(0);
  };

  const handleEnterKeyPress = (event) => {
    if (event.charCode === 13) {
      addTableRow();
    }
  };

  return (
    <MDBContainer className="py-5" style={{ paddingRight: "15%", display: "block" }}>
      <MDBCard className="">
        <div style={{ backgroundColor: '#fff', height: '12em', display: 'flex' }} className="w-100">
          <div style={{ backgroundColor: '#79c8db', height: '100%', width: '10em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* hii */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#d6e3c5', height: '30%', width: '55em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h1>INDBX PRIVET LIMITED</h1>
            </div>
            <div className="p-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>
                KP 14/432, CHULLIKKAPARAMBA,<br />
                <span style={{ fontWeight: 300 }}>CHERUVADI, Kozhikode, Kerala, 673661</span>

                <br></br>
                <br></br>
                <p>GSTIN:32AAGCI3195M1ZA</p>
              </p>
              <p className='date-input'>
                <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" placeholderText="Select a date" className='datepicker' /><br />
                <b> Invoice NO:B2C01</b>
              </p>
            </div>
          </div>

          <div className='.hide-on-print' style={{ backgroundColor: '#79c8db', height: '30%', width: '16em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
              color="#79c8db"
              backgroundColor='#79c8db'
              ripple="dark"
              className="text-capitalize border-0"
            >
              <MDBIcon fas icon="print" color="primary" className="me-1" />
              Print
            </button>
          </div>
        </div>
        <MDBCardBody>
          <MDBRow>
            <MDBCol xl="8">

              <MDBTypography listUnStyled>

                <div style={{ display: 'flex', alignItems: 'center' }}>


                  <div style={{ display: 'flex', paddingLeft: "10%", paddingBottom: "3%" }}>
                    <li className="text-muted">
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                      <span className="fw-bold ms-1"></span>Company
                      <select className="select" style={{ border: 'none', background: 'none', color: 'black', padding: '5px' }}>
                        {companydetails && companydetails.map((item, index) => (
                          <option key={index} value={item.id}> {item.companyname} </option>

                        ))}
                      </select>
                    </li>
                    <li className="text-muted" style={{ paddingLeft: "5%" }}>
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                      <span className="fw-bold ms-1"></span>Box No:<input type='number' style={{ width: "100px" }}></input>
                    </li>
                    <li className="text-muted" style={{ paddingLeft: "5%" }}>
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                      <span className="fw-bold ms-1"></span>Total weight:<div
                        style={{
                          width: "100px",
                          height: "30px",
                          border: "1px solid #000",
                          display: "inline-block",
                          padding: "5px"
                        }}
                      >100</div>
                    </li>
                    <li className="text-muted" style={{ paddingLeft: "5%" }}>
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA", paddingLeft:"20%" }} /> */}
                      <span className="fw-bold ms-1"></span>AirwayBill N.O:<input type='number' style={{ width: "100px" }}></input>
                    </li>

                  </div>
                </div>

              </MDBTypography>
            </MDBCol>

          </MDBRow>
          <MDBRow className="my-2 mx-1 justify-content-center">
            <MDBTable striped borderless>
              <MDBTableHead
                className="text-white"
                style={{ backgroundColor: "#84B0CA" }}
              >
                <tr>
                  <th scope="col" style={{ backgroundColor: '#79c8db', color: 'white' }}>N.O</th>
                  <th scope="col" style={{ backgroundColor: '#79c8db', color: 'white' }}>Service Name</th>
                  <th scope="col" style={{ backgroundColor: '#79c8db', color: 'white' }}>HSN Code</th>
                  <th scope="col" style={{ backgroundColor: '#79c8db', color: 'white' }}>Weight</th>
                  <th scope="col" style={{ backgroundColor: '#79c8db', color: 'white' }}>Amount</th>
                  <th scope="col" style={{ backgroundColor: '#79c8db', color: 'white' }}>Total</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody style={{ justifyItems: "center" }}>
                {tableRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.serviceName}</td>
                    <td>{row.HSNCode}</td>
                    <td>{row.weight}</td>
                    <td>{row.amount}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
                <tr>
                  <td>{tableRows.length + 1}</td>
                  <td>
                    <select
                      className="select"
                      style={{
                        border: 'none',
                        background: 'none',
                        color: 'black',
                        padding: '5px',
                      }}
                      onChange={handleServiceChange}
                    >
                      {servicedetails && servicedetails.map((item, index) => (
                        <option key={index} value={item._id}> {item.servicename} </option>
                      ))}
                    </select>
                  </td>
                  <td>{selectedHSNCode}</td>
                  <td>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={amount} onChange={handleAmountChange} onKeyPress={handleEnterKeyPress} />
                  </td>
                  <td>{total}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="8">
              <p className="ms-3">
                Add additional notes and payment information
              </p>
            </MDBCol>
            <MDBCol xl="3">
              <MDBTypography listUnStyled>
                <li className="text-muted ms-3">
                  <span className="text-black me-4">SubTotal</span>₹.5666
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">GST 18%</span>₹.100
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">SGST 9%</span>₹.50
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">IGST 9%</span>₹.50
                </li>
              </MDBTypography>
              <p className="text-black float-start">
                <span className="text-black me-3"> Total Amount</span>
                <span style={{ fontSize: "25px" }}>₹.1221</span>
              </p>
            </MDBCol>
          </MDBRow>
          <hr />
          {/* ... (rest of the JSX) */}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Invoicepage;

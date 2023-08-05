import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";
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
import { getallcompanies } from '../../apicalls/Company';
import { getallServices } from '../../apicalls/Service';
import { toast } from 'react-toastify';
import { AddINVOICEdata } from '../../apicalls/Invoice';

const Invoicepage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [companydetails, setcompanydetails] = useState([]);
  const [servicedetails, setservicedetails] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedHSNCode, setSelectedHSNCode] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [boxNo, setBoxNo] = useState("");
  const [airwayBillNo, setAirwayBillNo] = useState("");

  const [totalWeight, setTotalWeight] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState('');
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

  const calculateTotal = () => {
    if (selectedService) {
      setTotal(weight * amount);
    } else {
      setTotal(0);
    }
  };
  useEffect(() => {
    getcomapanydata()
    getServicedata()
    const timestamp = Date.now(); // Get the current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    const newInvoiceNumber = `B2C${timestamp}${randomNum}`;
    setInvoiceNumber(newInvoiceNumber);
  }, [])

  const handleServiceChange = (event) => {
    const selectedServiceId = event.target.value;
    const selectedServiceData = servicedetails.find((service) => service._id === selectedServiceId);
    console.log(selectedServiceData, "j");
    if (selectedServiceData) {
      setSelectedService(selectedServiceData);
      setSelectedServiceId(selectedServiceData._id); // Store the selected service _id
      setSelectedHSNCode(selectedServiceData.HSNCode);
      setAmount(selectedServiceData.Rate);
      setTotal(weight * selectedServiceData.Rate);
    } else {
      setSelectedService(null);
      setSelectedServiceId(null); // Reset the selected service _id
      setSelectedHSNCode("");
    }
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setTotal(weight * event.target.value);
  };

const handleweightchange=(e)=>{
   setWeight(e.target.value)
}


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



  const [subtotal, setSubtotal] = useState(0);
  const [gst18, setGst18] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [CGST, setCGST] = useState(0);

  // ... (previous code)

  useEffect(() => {
    // Calculate the subtotal whenever tableRows or total of any row changes
    const calculatedSubtotal = tableRows.reduce((acc, row) => acc + row.total, 0);
    setSubtotal(calculatedSubtotal);

    const calculatedTotalWeight = tableRows.reduce((acc, row) => acc + parseFloat(row.weight), 0);
    setTotalWeight(calculatedTotalWeight);


    const calculatedGst18 = calculatedSubtotal * 0.18;
    const gstRounded = parseFloat(calculatedGst18.toFixed(2)); // Round GST to two decimal places
    setGst18(gstRounded);

    const sgst = gstRounded / 2;
    const sgstRounded = parseFloat(sgst.toFixed(2)); // Round SGST to two decimal places
    setSGST(sgstRounded);

    const cgst = gstRounded / 2;
    const cgstRounded = parseFloat(cgst.toFixed(2)); // Round CGST to two decimal places
    setCGST(cgstRounded);


    calculateTotal();
  }, [tableRows, weight, amount, selectedService]);
  const totalAmount = subtotal + gst18;

  const handleCompanyChange = (event) => {
    const selectedCompanyId = event.target.value;
    setSelectedCompanyId(selectedCompanyId); // Store the selected company _id
  };

  const handleRowDelete = (rowId) => {
    const updatedRows = tableRows.filter((row) => row.id !== rowId);
    setTableRows(updatedRows);
  };

  const handleSaveButtonClick = async() => {
    if (!selectedCompanyId) {
      toast.error("Please select a company", {
        hideProgressBar: true,
      });
      return;
    }

    if (!selectedServiceId) {
      toast.error("Please select a service", {
        hideProgressBar: true,
      });
      return;
    }

    if (!boxNo || boxNo.trim() === "") {
      toast.error("Please enter a valid box number", {
        hideProgressBar: true,
      });
      return;
    }

    if (!airwayBillNo || airwayBillNo.trim() === "") {
      toast.error("Please enter a valid airway bill number", {
        hideProgressBar: true,
      });
      return;
    }

    if (tableRows.length === 0) {
      toast.error("Please add at least one row", {
        hideProgressBar: true,
      });
      return;
    }
    // if (weight <= 0 || isNaN(weight)) {
    //   toast.error("Please enter a valid weight", { hideProgressBar: true });
    //   return;
    // }

    // if (amount <= 0 || isNaN(amount)) {
    //   toast.error("Please enter a valid amount", { hideProgressBar: true });
    //   return;
    // }
    // Prepare the data to be saved
    const dataToSave = {
      selectedDate: format(selectedDate, "dd/MM/yyyy"),
      selectedCompanyId, // Use the selected company _id
      invoiceNumber,
      boxNo, // Include Box No in the data to be saved
      airwayBillNo, // Include AirwayBill No in the data to be saved
      tableRows,
      subtotal,
      gst18,
      SGST,
      CGST,
      totalAmount,
      totalWeight
    };

    // Here you can save the data to your backend or do whatever you need with it
    const response=await AddINVOICEdata(dataToSave)
 if(response.success){
  toast.success('Invoice saved successfully!', {
    hideProgressBar: true,
  });
 }
  };
  return (
    <MDBContainer className="py-5" >
      <MDBCard style={{ border: '3px solid black' }}>
        <div
          style={{ backgroundColor: "#fff", height: "12em", display: "flex", border: '2px solid black' }}
          className="w-100"
        >
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
                <b> Invoice NO:{invoiceNumber ? invoiceNumber : 'B2C01'}</b>
              </p>
            </div>
          </div>

          <div className='.hide-on-print' style={{ backgroundColor: '#79c8db', height: '30%', width: '16em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <button
              color="#79c8db"
              backgroundColor='#79c8db'
              ripple="dark"
              className="text-capitalize border-0"
            >
              <MDBIcon fas icon="print" color="primary" className="me-1" />
              Print
            </button> */}
          </div>
        </div>
        <MDBCardBody>
          <MDBRow>
            <MDBCol xl="8">
              <MDBTypography listUnStyled>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", paddingLeft: "10%", paddingBottom: "3%" }}>
                    <li className="text-muted">
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                      <span className="fw-bold ms-1"></span>Company
                      <select className="select" onChange={handleCompanyChange} style={{ border: 'none', background: 'none', color: 'black', padding: '5px', }}>
                        <option value="">Select company</option>
                        {companydetails && companydetails.map((item, index) => (
                          <option key={index} value={item._id}> {item.companyname} </option>

                        ))}
                      </select>
                    </li>
                    <li className="text-muted" style={{ paddingLeft: "5%" }}>
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                      <span className="fw-bold ms-1"></span>Box No:<input type='number' style={{ width: "100px" }} value={boxNo}
                        onChange={(e) => setBoxNo(e.target.value)}></input>
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
                      >{totalWeight ? totalWeight : '0'}</div>
                    </li>
                    <li className="text-muted" style={{ paddingLeft: "5%" }}>
                      {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA", paddingLeft:"20%" }} /> */}
                      <span className="fw-bold ms-1"></span>AirwayBill N.O:<input type='number' style={{ width: "100px" }} value={airwayBillNo}
                        onChange={(e) => setAirwayBillNo(e.target.value)}></input>
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
                    <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                      N.O
                    </th>
                    <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                      Service Name
                    </th>
                    <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                      HSN Code
                    </th>
                    <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                      Weight
                    </th>
                    <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                      Amount
                    </th>
                    <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                      Total
                    </th>
                    <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                      option
                    </th>
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
                      <td>
                        <button className='btn' size="sm" onClick={() => handleRowDelete(row.id)} >
                          <MDBIcon style={{ color: 'red' }} fas icon="trash-alt" />
                        </button>
                      </td>
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
                        {/* Default "Select Service Name" option */}
                        <option value="">Select Service Name</option>

                        {/* Mapping through servicedetails */}
                        {servicedetails && servicedetails.map((item, index) => (
                          <option key={index} value={item._id}>{item.servicename}</option>
                        ))}
                      </select>
                    </td>
                    <td>{selectedHSNCode}</td>
                    <td>
                      <input type="number" value={weight} onChange={handleweightchange} onKeyPress={handleEnterKeyPress} />
                    </td>
                    <td>
                      <input type="number" value={amount} onChange={handleAmountChange} onKeyPress={handleEnterKeyPress} />
                    </td>
                    <td>{total}</td>
                    <td><button className='btn' size="sm"  >
                      <MDBIcon style={{ color: 'red' }} fas icon="trash-alt" />
                    </button></td>
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
                  <span className="text-black me-4">SubTotal</span>₹{subtotal}
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">GST 18%</span>₹{gst18}
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">SGST 9%</span>₹{SGST}
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">CGST 9%</span>₹{CGST}
                </li>
              </MDBTypography>
              <p className="text-black float-start">
                <span className="text-black me-3">Total Amount</span>
                <span style={{ fontSize: "25px" }}>₹{totalAmount ? totalAmount : 0}</span>
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
              <button
                className="text-capitalize btn"
                style={{ backgroundColor: "#60bdf3", color: 'white' }}
                onClick={handleSaveButtonClick}
              >
                <MDBIcon fas icon="save" className="me-2" />
                SAVE
              </button>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Invoicepage;

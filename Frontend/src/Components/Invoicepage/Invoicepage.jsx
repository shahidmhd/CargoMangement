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
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { AddINVOICEdata } from '../../apicalls/Invoice';

const Invoicepage = ({ invoiceNumber, servicedetails, companydetails }) => {
  const [servicetable,setserviceTable]=useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);
  const [selectedHSNCode, setSelectedHSNCode] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [boxNo, setBoxNo] = useState("");
  const [airwayBillNo, setAirwayBillNo] = useState("");

  const [totalWeight, setTotalWeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  // const [render, setrender] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [gst18, setGst18] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [CGST, setCGST] = useState(0);

  const [serviceDetails, setServiceDetails] = useState([])


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  let sub = serviceDetails.reduce((acc, item) => acc + item.subtotal, 0);
  useEffect(() => {
    setSubtotal(sub)
    const calculatedGst = (sub * 18) / 100;
    setGst18(calculatedGst);
    setSGST(calculatedGst / 2)
    setCGST(calculatedGst / 2)
  }, [sub])
  const calculateTotal = () => {
    if (selectedService) {
      setTotal(weight * amount);
      // setSubtotal(weight * amount)

      const isServiceExist = serviceDetails.find((item) => item?.serviceId === selectedService._id)
      if (isServiceExist) {
        setServiceDetails(
          serviceDetails.map((item) => {
            if (item.serviceId == selectedService._id.toString()) {
              const subtotal = weight * amount;
              return { ...item, serviceId: selectedService._id, subtotal: subtotal };
            }
            return item
          })
        )
      } else {
        serviceDetails.push({ serviceId: selectedService._id, subtotal: weight * amount })
      }

      const totalWithoutGST = subtotal + weight * amount;
      const gstAmount = (totalWithoutGST * selectedService.GST) / 100;
      setGst18(gstAmount);
      setSGST(gstAmount / 2)
      setCGST(gstAmount / 2)
      setTotalWeight(totalWeight + weight - totalWeight)

    } else {
      setTotal(total);
      setSubtotal(subtotal)
      setGst18(gst18);
      setSGST(SGST)
      setCGST(CGST)

    }
  };

  const handleServiceChange = (event) => {
    const selectedServiceId = event.target.value;
    const selectedServiceData = servicedetails.find((service) => service._id === selectedServiceId);
    if (selectedServiceData) {
      console.log(selectedServiceData._id,"hgggggggggddd");
      setSelectedService(selectedServiceData);
      setSelectedServiceId(selectedServiceData._id); // Store the selected service _id
      setSelectedHSNCode(selectedServiceData.HSNCode);
      setAmount(selectedServiceData.Rate);
      setTotal(weight * selectedServiceData.Rate);
      // setSubtotal(weight*selectedService.Rate)
    } else {
      setSelectedService(null);
      setSelectedServiceId(null); // Reset the selected service _id
      setSelectedHSNCode("");
      setAmount(0)
      setTotal(0)
    }
  };



  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    // setTotal(weight * event.target.value);
  };



  const handleweightchange = (e) => {
    setWeight(Number(e.target.value))


  }


  const addTableRow = () => {
    servicetable.push(selectedService)
    console.log(servicetable,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    console.log(selectedService,"jjjjjjjjjjjjjjjjjjjj");
    const newRow = {
      id: tableRows.length + 1,
      serviceId:selectedService._id,
      serviceName: selectedService.servicename,
      HSNCode: selectedHSNCode,
      weight,
      amount,
      total: weight * amount,
    };

    setTableRows([...tableRows, newRow]);




    // Automatically select the first service in the dropdown
    if (servicedetails.length > 0) {
      const firstService = servicedetails[0];
      setSelectedService(firstService);
      setSelectedServiceId(firstService._id);
      setSelectedHSNCode(firstService.HSNCode);
      setAmount(firstService.Rate);
      setTotal(weight * firstService.Rate);
    }

    // Calculate the new subtotal by summing up individual row totals
    const newSubtotal = tableRows.reduce((acc, row) => acc + row.total, 0) + newRow.total;
    const calculatedGst18 = newSubtotal * 0.18;
    const gstRounded = parseFloat(calculatedGst18.toFixed(2));
    const sgst = gstRounded / 2;
    const sgstRounded = parseFloat(sgst.toFixed(2));
    const cgst = gstRounded / 2;
    const cgstRounded = parseFloat(cgst.toFixed(2));

    setSubtotal(newSubtotal);
    setGst18(gstRounded);
    setSGST(sgstRounded);
    setCGST(cgstRounded);

    setSelectedHSNCode("");
    setWeight(0);
    setAmount(0);
    setTotal(0);




  // Calculate and update the new total weight
  const newTotalWeight = tableRows.reduce((acc, row) => acc + row.weight, 0) + weight;
  setTotalWeight(newTotalWeight);
  };



  const handleEnterKeyPress = (event) => {
    if (weight <= 0) {
      toast.success("select  weight")
    } else {
      if (event.charCode === 13) {
        addTableRow();

      // Calculate the new total weight by summing up all the weights in tableRows
      const newTotalWeight = tableRows.reduce((acc, row) => acc + row.weight, 0);
      setTotalWeight(newTotalWeight);
      }
    }

  };


  // ... (previous code)


  useEffect(() => {

    calculateTotal();

  }, [tableRows, weight, amount, selectedService]);
  const totalAmount = subtotal + gst18;

  const handleCompanyChange = (event) => {
    const selectedCompanyId = event.target.value;
    setSelectedCompanyId(selectedCompanyId); // Store the selected company _id
  };
  const handleRowDelete = (rowId) => {
    
    // Find the deleted row and get its serviceId
    const deletedRow = tableRows.find((row) => row.id === rowId);
    const deletedServiceId = deletedRow?.serviceId;

    // Calculate the new subtotal by subtracting the deleted row's total
    const newSubtotal = subtotal - deletedRow.total;

    // Remove the deleted row from tableRows
    const updatedRows = tableRows.filter((row) => row.id !== rowId);
    setTableRows(updatedRows);

    // Remove the corresponding service from serviceDetails
    if (deletedServiceId) {
      setServiceDetails((prevServiceDetails) =>
        prevServiceDetails.filter((item) => item.serviceId !== deletedServiceId)
      );
    }


    // Recalculate the GST and other related values based on the new subtotal
    const calculatedGst18 = newSubtotal * 0.18;
    const gstRounded = parseFloat(calculatedGst18.toFixed(2));
    const sgst = gstRounded / 2;
    const sgstRounded = parseFloat(sgst.toFixed(2));
    const cgst = gstRounded / 2;
    const cgstRounded = parseFloat(cgst.toFixed(2));

    setSubtotal(newSubtotal);
    setGst18(gstRounded);
    setSGST(sgstRounded);
    setCGST(cgstRounded);
  };


  const handleSaveButtonClick = async () => {
    console.log(subtotal, gst18, CGST, SGST, totalAmount);
    if (!selectedCompanyId) {
      toast.error("Please select a company", {
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

    // Map the tableRows to include the serviceId in each row
    const updatedTableRows = tableRows.map(row => ({
      ...row,
      serviceId: selectedServiceId, // or row.serviceId if you have a serviceId per row
    }));

    // Get all the selected service IDs from both the selectedServiceId and serviceDetails
    const allSelectedServiceIds = [
      selectedServiceId,
      ...serviceDetails.map(item => item.serviceId)
    ];

    const dataToSave = {
      selectedDate: format(selectedDate, "dd/MM/yyyy"),
      selectedCompanyId,
      invoiceNumber,
      boxNo,
      airwayBillNo,
      tableRows: updatedTableRows, // Use the updated tableRows
      subtotal,
      gst18,
      SGST,
      CGST,
      totalAmount,
      totalWeight,
      serviceIds: allSelectedServiceIds,
    };

    console.log(dataToSave, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

    // Here you can save the data to your backend or do whatever you need with it
    const response = await AddINVOICEdata(dataToSave);
    if (response.success) {
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
                        {servicedetails && servicedetails.map((item) => (
                          <option key={item._id} value={item._id}>{item.servicename}</option>
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
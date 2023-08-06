import React, { useState } from 'react';
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

const Details = ({ companydetails, servicedetails }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Service, Setservice] = useState(null);
    const [HSNCode, setHSNCode] = useState('');
    const [Rate, setRate] = useState(0);
    const [Total, setTotal] = useState(0);
    const [subtotal, setsubtotal] = useState(0);
    const [Totalamount, setTotalamount] = useState(0);
    const [gst, setgst] = useState(0);
    const [SGST, setSGST] = useState(0);
    const [CGST, setCGST] = useState(0);
    const [count, setcount] = useState(1);
    const [weight, setweight] = useState(0);
    const [tableRows, setTableRows] = useState([
        {
            id: 1,
            serviceName: '',
            HSNCode: '',
            weight: 0,
            amount: 0,
            total: 0,
        },
    ]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleServiceChange = (serviceId) => {
        const selectedService = servicedetails.find((item) => item._id === serviceId);
        Setservice(selectedService);
        setHSNCode(selectedService.HSNCode);
        setRate(selectedService.Rate);
        setTotal(selectedService.Rate);
        setsubtotal(selectedService.Rate);

        // Calculate the GST amount
        const gstAmount = (selectedService.Rate * selectedService.GST) / 100;
        setgst(gstAmount);
        setSGST(gstAmount / 2);
        setCGST(gstAmount / 2);
        setTotalamount(selectedService.Rate + gstAmount);

    };

    const handleamountchange = (amount) => {
        if (amount) {
            setRate(amount);
        } else {
            setRate(Service.Rate);
        }

    }

    const handleweightchange = (weight) => {
        setweight(weight);
        if (weight) {
            setRate(weight * Service.Rate);
            setTotal(Service.Rate * weight);
            setsubtotal(Service.Rate * weight);
            const gstAmount = (Service.Rate * weight * Service.GST) / 100;
            setgst(gstAmount);
            setSGST(gstAmount / 2);
            setCGST(gstAmount / 2);
            setTotalamount(Service.Rate*weight + gstAmount);
        } else {
            const defaultValue = Service.Rate;
            setRate(defaultValue);
            setTotal(Service.Rate);
            setsubtotal(Service.Rate);
            const gstAmount = (Service.Rate * Service.GST) / 100;
            setgst(gstAmount);
            setSGST(gstAmount / 2);
            setCGST(gstAmount / 2);
            setTotalamount(Service.Rate + gstAmount);
        }
    };



    return (
        <MDBContainer className="py-5">
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
                                <b> Invoice NO:B2C01</b>
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
                                            <select
                                                className="select"
                                                style={{ border: 'none', background: 'none', color: 'black', padding: '5px' }}
                                            >
                                                <option value="">Select company</option>
                                                {companydetails &&
                                                    companydetails.map((item) => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.companyname}
                                                        </option>
                                                    ))}
                                            </select>
                                        </li>
                                        <li className="text-muted" style={{ paddingLeft: "5%" }}>
                                            {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA",paddingLeft:"20%"}} /> */}
                                            <span className="fw-bold ms-1"></span>Box No:<input type='number' style={{ width: "100px" }} ></input>
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
                                            >rrew</div>
                                        </li>
                                        <li className="text-muted" style={{ paddingLeft: "5%" }}>
                                            {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA", paddingLeft:"20%" }} /> */}
                                            <span className="fw-bold ms-1"></span>AirwayBill N.O:<input type='number' style={{ width: "100px" }}
                                            ></input>
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

                                    <tr >
                                        <td>{count}</td>
                                        <td>
                                            <select
                                                className="select"
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    color: 'black',
                                                    padding: '5px',
                                                }}
                                                onChange={(e) => handleServiceChange(e.target.value)}
                                            >
                                                <option value="">Select Service Name</option>
                                                {servicedetails &&
                                                    servicedetails.map((item) => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.servicename}
                                                        </option>
                                                    ))}
                                            </select>
                                        </td>
                                        <td>{HSNCode ? HSNCode : ''}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={weight}
                                                onChange={(e) => handleweightchange(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Rate ? Rate : ''}
                                                onChange={(e) => handleamountchange(e.target.value)}
                                            />
                                        </td>
                                        <td>{Total ? Total : 0}</td>
                                        <td>


                                            <MDBIcon style={{ color: 'green', cursor: 'pointer' }} fas icon="plus" />



                                            {/* <MDBIcon onClick={() => handleDeleteRow(index)} style={{ color: 'red',cursor:'pointer' }} fas icon="trash-alt" /> */}

                                        </td>
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
                                    <span className="text-black me-4">SubTotal</span>₹{subtotal ? subtotal : 0}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">GST 18%</span>₹{gst ? gst : 0}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">SGST 9%</span>₹{SGST ? SGST : 0}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">CGST 9%</span>₹{CGST ? CGST : 0}
                                </li>
                            </MDBTypography>
                            <p className="text-black float-start">
                                <span className="text-black me-3">Total Amount</span>
                                <span style={{ fontSize: "25px" }}>₹{Totalamount ? Totalamount : '0'}</span>
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

                            >
                                <MDBIcon fas icon="save" className="me-2" />
                                SAVE
                            </button>
                        </MDBCol>
                    </MDBRow>
                    {/* ... (rest of the JSX) */}
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Details;

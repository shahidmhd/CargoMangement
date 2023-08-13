import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
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

const Details = ({ companydetails, servicedetails, invoiceData }) => {
    console.log(servicedetails, "servicedetails");
    console.log(invoiceData, "invoicedata");
    const [selectedDate, setSelectedDate] = useState(
        invoiceData?.selectedDate ? parseISO(invoiceData.selectedDate) : new Date()
    );
    const [selctedCompantId, setselectedCompanyId] = useState(invoiceData?.selectedCompanyId._id || '');
    const [boxNo, setBoxno] = useState(invoiceData?.boxNo)
    const [Airwaybillno, setAirwaybillno] = useState(invoiceData?.airwayBillNo)
    const [SelectedService, setSelectedService] = useState(null)
    const [SelectedServiceId, setSelectedServiceId] = useState(null)
    const [HSNCode, setHSNCode] = useState(null)
    const [invoiceDatas, setinvoiceDatas] = useState(invoiceData)
    const [tableRows, settableRows] = useState(invoiceData?.tableRows)


    const handleCompanyChange = (e) => {
        const selectedCompanyId = e.target.value;
        setselectedCompanyId(selectedCompanyId);
    };



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };





    const handleServiceChange = (index, serviceId) => {
        console.log(index, serviceId);
        const selectedServiceId = serviceId;
        const selectedServiceData = servicedetails.find((service) => service._id === selectedServiceId);
        console.log(selectedServiceData, "selected data");

        if (selectedServiceData) {
            const updatedTableRows = [...tableRows]; // Clone the tableRows array
            updatedTableRows[index] = {
                ...updatedTableRows[index],
                serviceName: selectedServiceData.servicename,
                HSNCode: selectedServiceData.HSNCode,
                amount: selectedServiceData.Rate,
                total: selectedServiceData.Rate
            };

            settableRows(updatedTableRows); // Update the tableRows state
            setSelectedService(selectedServiceData);
            setSelectedServiceId(selectedServiceData._id);
        } else {
            // Handle the case when the selected service is not found
        }
    };


    const handleWeightChange = (index, newWeight) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].weight = Number(newWeight);
        const rowTotal = newWeight * updatedTableRows[index].amount;
        updatedTableRows[index].total = rowTotal;

        settableRows(updatedTableRows);

    };


    useEffect(() => {
        const subtotal = tableRows.reduce((total, row) => {
            const rowSubtotal = row.amount || 0;
            return total + rowSubtotal;
        }, 0);



        const gst18 = subtotal * 0.18;
        const CGST = gst18 / 2
        const SGST = gst18 / 2
        const totalAmount = subtotal + gst18

        const updatedInvoiceData = {
            ...invoiceData,
            subtotal,
            gst18,
            CGST,
            SGST,
            totalAmount
        };
        console.log(updatedInvoiceData,"updated");

        setinvoiceDatas(updatedInvoiceData);
    }, [tableRows]);



    const handleDeleteRow = (index) => {
        const updatedRows = [...tableRows];
        updatedRows.splice(index, 1);
        settableRows(updatedRows,);
    };

    const handleSave = () => {
        const savedData = {
            CGST: invoiceDatas.CGST,
            SGST: invoiceDatas.SGST,
            airwayBillNo: Airwaybillno,
            boxNo: boxNo,
            gst18: invoiceDatas.gst18,
            invoiceNumber: invoiceData.invoiceNumber,
            selectedCompanyId: selctedCompantId,
            selectedDate: selectedDate,
            subtotal: invoiceDatas.subtotal,
            tableRows: tableRows,
            totalAmount: invoiceDatas.totalAmount,
            totalWeight: invoiceDatas.totalWeight
        };

        console.log(savedData);
        // You can perform further actions with the savedData, such as sending it to an API, etc.
        
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
                            <div>
                                <p>
                                    KP 14/432, CHULLIKKAPARAMBA,<br />
                                    <span style={{ fontWeight: 300 }}>CHERUVADI, Kozhikode, Kerala, 673661</span>
                                </p>
                                <p>GSTIN:32AAGCI3195M1ZA</p>
                            </div>
                            <p className='date-input'>
                                <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" placeholderText="Select a date" className='datepicker' /><br />
                                <b> Invoice NO:{invoiceData?.invoiceNumber}</b>
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
                                                value={selctedCompantId}
                                                onChange={handleCompanyChange}
                                            >
                                                <option value={invoiceData?.selectedCompanyId._id}>{invoiceData?.selectedCompanyId.companyname}</option>
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
                                            <span className="fw-bold ms-1"></span>Box No:<input type='number' onChange={(e) => setBoxno(e.target.value)} value={boxNo} style={{ width: "100px" }} ></input>
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
                                            >{invoiceDatas?.totalWeight}</div>
                                        </li>
                                        <li className="text-muted" style={{ paddingLeft: "5%" }}>
                                            {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA", paddingLeft:"20%" }} /> */}
                                            <span className="fw-bold ms-1"></span>AirwayBill N.O:<input type='number' onChange={(e) => setAirwaybillno(e.target.value)} value={Airwaybillno} style={{ width: "100px" }}
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
                                            Action
                                        </th>

                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody style={{ justifyItems: "center" }}>

                                    {tableRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <select
                                                    className="select"
                                                    style={{
                                                        border: 'none',
                                                        background: 'none',
                                                        color: 'black',
                                                        padding: '5px',
                                                    }}
                                                    onChange={(e) => handleServiceChange(index, e.target.value)}
                                                >
                                                    <option value={row._id}>{row.serviceName || 'Select a service'}</option>
                                                    {servicedetails &&
                                                        servicedetails.map((item) => (
                                                            <option key={item._id} value={item._id}>
                                                                {item.servicename}
                                                            </option>
                                                        ))}
                                                </select>

                                            </td>

                                            <td>{HSNCode ? HSNCode : row.HSNCode}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.weight}
                                                    onChange={(e) => handleWeightChange(index, e.target.value)}

                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.amount || defaultRate}

                                                />
                                            </td>
                                            <td>{row.total || 0}</td>
                                            <td>
                                                <button
                                                    className='btn'
                                                    size="sm"
                                                    onClick={() => handleDeleteRow(index)}
                                                >
                                                    <MDBIcon style={{ color: 'red' }} fas icon="trash-alt" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
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
                                    <span className="text-black me-4">SubTotal</span>₹{invoiceDatas?.subtotal}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">GST 18%</span>₹{invoiceDatas?.gst18}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">SGST 9%</span>₹{invoiceDatas?.SGST}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">CGST 9%</span>₹{invoiceDatas?.CGST}
                                </li>
                            </MDBTypography>
                            <p className="text-black float-start">
                                <span className="text-black me-3">Total Amount</span>
                                <span style={{ fontSize: "25px" }}>₹{invoiceDatas?.totalAmount}</span>
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
                            <button className="text-capitalize btn"
                                style={{ backgroundColor: "#60bdf3", color: 'white' }}
                                onClick={handleSave}
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

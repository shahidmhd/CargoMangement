// import React, { useState } from 'react'
// import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// import Addservice from '../../Modal/Addservice';
// import EditService from '../../Modal/EditService';
// import DeleteserviceModal from '../../Modal/DeleteServicemodal';

// function Servicecreation({ Service, render, setrender }) {
//   console.log(Service, "hhhhhhhhdddddddddddddd");
//   const [showModal, setShowModal] = useState(false)
//   const [showeditModal, setShoweditModal] = useState(false);
//   const [selectedservice, setSelectedservice] = useState(null);
//   const [showdeleteModal, setShowdeleteModal] = useState(false);
//   const [selectedId, setSelectedid] = useState(null);


//   const handleEditClick = (item) => {
//     console.log(item);
//     setSelectedservice(item)
//     setShoweditModal(true);
//   };
//   return (
//     <>
//       <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
//          {/* Invoice Heading */}
//          <div className='mb-4'>
//                     <h1 className='text-center mb-3'>Manage Your Services</h1>
//                     <p className='text-center text-muted'>
//                         Welcome to the Service Management Dashboard.</p>
//                 </div>
//                 {/*  */}
//         <div className='row justify-content-center'>
//           <div className='col-lg-12 col-md-12 col-sm-12'>
//             <div className='mb-3'>
//               <button onClick={() => setShowModal(true)} className='btn ' style={{ backgroundColor: 'black', color: 'white' }}>
//                 Add Service
//               </button>
//             </div>
//             <div className='p-3' style={{ height: '700px', overflow: 'auto' }}>
//               <MDBTable align='middle'>
//                 <MDBTableHead>
//                   <tr>
//                   <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       No
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Service Name
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       HSNcode
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Rate
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       GST
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       SGST
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       CGST
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       UOM(kg)
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Actions
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Actions
//                     </th>
//                   </tr>
//                 </MDBTableHead>
//                 <MDBTableBody>
//                   {Service &&
//                     Service.map((item,index) => (
//                       <tr key={item._id} >
//                         <td>
//                           <p className='fw-normal mb-1'>{index+1}</p>
//                         </td>
//                         <td>
//                           <div className='d-flex align-items-center'>
//                             <div className='ms-3'>
//                               <p className='fw-bold mb-1'>{item?.servicename}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item?.HSNCode}</p>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>₹ {item?.Rate}</p>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item?.GST}%</p>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item?.SGST}%</p>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item?.CGST}%</p>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item?.UOM}</p>
//                         </td>
//                         <td>
//                           <MDBBadge onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }} color='primary' pill>
//                             Edit
//                           </MDBBadge>
//                         </td>
//                         <td>
//                           <MDBBadge onClick={() => {
//                             setSelectedid(item._id)
//                             setShowdeleteModal(true)
//                           }} style={{ cursor: 'pointer' }} color='danger' pill>
//                             Delete
//                           </MDBBadge>
//                         </td>
//                       </tr>
//                     ))}

//                 </MDBTableBody>

//               </MDBTable>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Addservice showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender} />
//       {showeditModal && <EditService Service={selectedservice} showeditModal={showeditModal} setShoweditModal={setShoweditModal} render={render} setrender={setrender} />}
//       {showdeleteModal && <DeleteserviceModal render={render} setrender={setrender} id={selectedId} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal}/>}
//     </>
//   )
// }

// export default Servicecreation


import React, { useState } from 'react';
import { CDBContainer, CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import Addservice from '../../Modal/Addservice';
import EditService from '../../Modal/EditService';
import DeleteserviceModal from '../../Modal/DeleteServicemodal';


const Servicecreation = ({ Service, render, setrender }) => {
 
  const [showModal, setShowModal] = useState(false)
  const [showeditModal, setShoweditModal] = useState(false);
  const [selectedservice, setSelectedservice] = useState(null);
  const [showdeleteModal, setShowdeleteModal] = useState(false);
  const [selectedId, setSelectedid] = useState(null);



  const handleEditClick = (item) => {
    console.log(item);
    setSelectedservice(item)
    setShoweditModal(true);
  };

  const generateRows = () => {
    return Service.map((item, index) => ({
      No: index + 1,
      servicename: item.servicename,
      HSNCode: item.HSNCode,
      Rate: item.Rate,
      GST: item.GST,
      SGST: item.SGST,
      CGST: item.CGST,
      UOM: item.UOM,
      editButton: <button onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }} className="btn btn-primary btn-sm">Edit</button>,
      deleteButton: <button onClick={() => {
        setSelectedid(item._id)
        setShowdeleteModal(true)
      }} style={{ cursor: 'pointer' }} className="btn btn-danger btn-sm">Delete</button>,

    }));
  };

  const data = () => {
    if (!Array.isArray(Service)) {
      return {
          columns: [],
          rows: [],
      };
  }
    return {
      columns: [
        {
          label: 'No',
          field: 'No',
          width: 100,
        },
        {
          label: 'Service Name',
          field: 'servicename',
          width: 200,
        },
        {
          label: 'HSN Code',
          field: 'HSNCode',
          width: 150,
        },
        {
          label: 'Rate',
          field: 'Rate',
          width: 100,
        },
        {
          label: 'GST%',
          field: 'GST',
          width: 100,
        },
        {
          label: 'SGST%',
          field: 'SGST',
          width: 100,
        },
        {
          label: 'CGST%',
          field: 'CGST',
          width: 100,
        },
        {
          label: 'UOM(kg)',
          field: 'UOM',
          width: 100,
        },
        {
          label: 'option',
          field: 'editButton',
          width: 100,
        },
        {
          label: 'option',
          field: 'deleteButton',
          width: 100,
        },

      ],
      rows: generateRows(),

    };
  };

  return (
    <>
      <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
        {/* Invoice Heading */}
        <div className='mb-4'>
          <h1 className='text-center mb-3'>Manage Your Services</h1>
          <p className='text-center text-muted'>
            Welcome to the Service Management Dashboard.</p>
        </div>
        {/*  */}
        <div className='text-center mb-3'>
          <button className='btn btn-large' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add service</button>
        </div>

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
              />
            </CDBCardBody>
          </CDBCard>
        </CDBContainer>
      </div>
      {showModal && <Addservice showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender} />}
      {showeditModal && <EditService Service={selectedservice} showeditModal={showeditModal} setShoweditModal={setShoweditModal} render={render} setrender={setrender} />}
      {showdeleteModal && <DeleteserviceModal render={render} setrender={setrender} id={selectedId} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} />}
    </>
  );
};

export default Servicecreation;

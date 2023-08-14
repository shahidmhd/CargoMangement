// import React, { useState } from 'react';
// import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// import Addcompany from '../../Modal/Addcompany';
// import Editcompany from '../../Modal/Editcompany';
// import DeleteModal from '../../Modal/DeleteModal';



// const CompanyCreation = ({ Company, render, setrender }) => {
//     const [showModal, setShowModal] = useState(false)
//     const [showeditModal, setShoweditModal] = useState(false);
//     const [showdeleteModal, setShowdeleteModal] = useState(false);
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const [selectedId, setSelectedid] = useState(null);

//     const handleEditClick = (item) => {
//         setSelectedCompany(item);
//         setShoweditModal(true);
//     };


//     return (
//         <>

//             <div className='container-fluid p-5'  style={{ height: '100vh', overflowY: 'auto' }}>
//                 {/* Invoice Heading */}
//                 <div className='mb-4'>
//                     <h1 className='text-center mb-3'>Manage Your Companies</h1>
//                     <p className='text-center text-muted'>
//                         Welcome to the Company Management Dashboard.</p>
//                 </div>
//                 {/*  */}
//                 <div className='row justify-content-center'>
//                     <div className='col-lg-12 col-md-10 col-sm-12'>
//                         <div className='mb-4 p-2'>
//                             <button onClick={() => setShowModal(true)} className='btn' style={{ backgroundColor: 'black', color: 'white' }}>
//                                 Add New Company
//                             </button>
//                         </div>
//                         <div className='p-3' style={{ height: '700px', overflow: 'auto' }}>
//                             <MDBTable align='middle'>
//                                 <MDBTableHead>
//                                     <tr>
//                                         <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                                             NO
//                                         </th>
//                                         <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                                             company Name
//                                         </th>
//                                         <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                                             Location
//                                         </th>
//                                         <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                                             Person
//                                         </th>
//                                         <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                                             Contact No
//                                         </th>
//                                         <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                                             Actions
//                                         </th>
//                                         <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                                             Actions
//                                         </th>
//                                     </tr>
//                                 </MDBTableHead>
//                                 <MDBTableBody>
//                                     {Company &&
//                                         Company.map((item, index) => (
//                                             <tr key={item._id}><td>
//                                                 <p className='fw-normal mb-1'>{index + 1}</p>
//                                             </td>

//                                                 <td>
//                                                     <div className='d-flex align-items-center'>
//                                                         <div className='ms-3'>
//                                                             <p className='fw-bold mb-1'>{item.companyname}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <p className='fw-normal mb-1'>{item.location}</p>
//                                                 </td>
//                                                 <td>
//                                                     <p className='fw-normal mb-1'>{item.person}</p>
//                                                 </td>
//                                                 <td>{item.contactNo}</td>
//                                                 <td>
//                                                     <MDBBadge onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }} color='primary' pill>
//                                                         Edit
//                                                     </MDBBadge>
//                                                 </td>
//                                                 <td>
//                                                     <MDBBadge style={{ cursor: 'pointer' }} onClick={() => {
//                                                         setSelectedid(item._id)
//                                                         setShowdeleteModal(true)
//                                                     }} color='danger' pill>
//                                                         Delete
//                                                     </MDBBadge>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                 </MDBTableBody>

//                             </MDBTable>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Addcompany showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender} />
//             {Company && <Editcompany showeditModal={showeditModal} setShoweditModal={setShoweditModal} Company={selectedCompany} render={render} setrender={setrender} />}
//             {showdeleteModal && <DeleteModal id={selectedId} render={render} setrender={setrender} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} />}
//         </>
//     );
// };

// export default CompanyCreation;


import React, { useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import Addcompany from '../../Modal/Addcompany';
import Editcompany from '../../Modal/Editcompany';
import DeleteModal from '../../Modal/DeleteModal';
const Companycreation = ({ Company, render, setrender }) => {
    const [showModal, setShowModal] = useState(false)
    const [showeditModal, setShoweditModal] = useState(false);
    const [showdeleteModal, setShowdeleteModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedId, setSelectedid] = useState(null);

    const handleEditClick = (item) => {
        setSelectedCompany(item);
        setShoweditModal(true);
    };

    const data = () => {
        if (!Array.isArray(Company)) {
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
                    label: 'Company Name',
                    field: 'companyname',
                    width: 200,
                },
                {
                    label: 'Contact No',
                    field: 'contactNo',
                    width: 150,
                },
                {
                    label: 'Location',
                    field: 'location',
                    width: 150,
                },
                {
                    label: 'Person',
                    field: 'person',
                    width: 150,
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
            rows: Company.map((item, index) => ({
                No: index + 1,
                companyname: item?.companyname,
                contactNo: item?.contactNo,
                location: item?.location,
                person: item?.person,
                editButton: (
                    <button
                        onClick={() => handleEditClick(item)}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-primary btn-sm"
                    >
                        Edit
                    </button>
                ),
                deleteButton: (
                    <button
                        style={{ cursor: 'pointer' }} onClick={() => {
                            setSelectedid(item._id)
                            setShowdeleteModal(true)
                        }}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                ),
            })),
        };
    };

    return (
        <>
            <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
                {/* Invoice Heading */}
                <div className='mb-4'>
                    <h1 className='text-center mb-3'>Manage Your Companies</h1>
                    <p className='text-center text-muted'>
                        Welcome to the Company Management Dashboard.</p>
                </div>
                {/*  */}
                <div className='text-center mb-3'>
                    <button className='btn btn-large' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Company</button>
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
            <Addcompany showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender} />
            {Company && <Editcompany showeditModal={showeditModal} setShoweditModal={setShoweditModal} Company={selectedCompany} render={render} setrender={setrender} />}
            {showdeleteModal && <DeleteModal id={selectedId} render={render} setrender={setrender} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} />}
        </>
    );
};

export default Companycreation;

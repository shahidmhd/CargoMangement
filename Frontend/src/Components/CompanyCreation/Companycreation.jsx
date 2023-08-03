import React, { useState } from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Addcompany from '../../Modal/Addcompany';
import Editcompany from '../../Modal/Editcompany';
import DeleteModal from '../../Modal/DeleteModal';



const CompanyCreation = ({ Company, render, setrender }) => {
    const [showModal, setShowModal] = useState(false)
    const [showeditModal, setShoweditModal] = useState(false);
    const [showdeleteModal, setShowdeleteModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedId, setSelectedid] = useState(null);

    const handleEditClick = (item) => {
        setSelectedCompany(item);
        setShoweditModal(true);
    };


    return (
        <>

            <div className='container-fluid p-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-12 col-md-10 col-sm-12'>
                        <div className='mb-4 p-2'>
                            <button onClick={() => setShowModal(true)} className='btn' style={{ backgroundColor: 'lightblue' }}>
                                Add New Company
                            </button>
                        </div>
                        <div className='p-3' style={{ height: '400px', overflow: 'auto' }}>
                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr>
                                        <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                                            company Name
                                        </th>
                                        <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                                            Location
                                        </th>
                                        <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                                            Person
                                        </th>
                                        <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                                            Contact No
                                        </th>
                                        <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                                            Actions
                                        </th>
                                        <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                                            Actions
                                        </th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {Company &&
                                        Company.map((item) => (
                                            <tr key={item._id}>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='ms-3'>
                                                            <p className='fw-bold mb-1'>{item.companyname}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.location}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.person}</p>
                                                </td>
                                                <td>{item.contactNo}</td>
                                                <td>
                                                    <MDBBadge onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }} color='primary' pill>
                                                        Edit
                                                    </MDBBadge>
                                                </td>
                                                <td>
                                                    <MDBBadge onClick={() => {
                                                        setSelectedid(item._id)
                                                        setShowdeleteModal(true)
                                                    }} color='danger' pill>
                                                        Delete
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
            <Addcompany showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender} />
            {Company && <Editcompany showeditModal={showeditModal} setShoweditModal={setShoweditModal} Company={selectedCompany} render={render} setrender={setrender} />}
            {showdeleteModal && <DeleteModal id={selectedId} render={render} setrender={setrender} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} />}
        </>
    );
};

export default CompanyCreation;

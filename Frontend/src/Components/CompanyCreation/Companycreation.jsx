import React, { useState } from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Addcompany from '../../Modal/Addcompany';
import Editcompany from '../../Modal/Editcompany';



const CompanyCreation = () => {
    const [showModal, setShowModal] = useState(false)
    const [showeditModal, setShoweditModal] = useState(false);

    return (
        <>
            <div className='container-fluid p-5'>
                <div className='row  w-100'>
                    <div className='col-lg-8 col-md-10 col-sm-12'>
                        <div className='mb-3'>
                            <button onClick={() => setShowModal(true)} className='btn btn-primary'>
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
                                    <tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>John Doe</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>Software engineer</p>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>shahid vk</p>
                                        </td>
                                        <td>1111111111</td>
                                        <td>
                                            <MDBBadge onClick={() => setShoweditModal(true)} style={{cursor:'pointer'}}  color='primary' pill>
                                                Edit
                                            </MDBBadge>
                                        </td>
                                        <td>
                                            <MDBBadge color='danger' pill>
                                                Delete
                                            </MDBBadge>
                                        </td>
                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </div>
                </div>
            </div>
            <Addcompany showModal={showModal} setShowModal={setShowModal}/>
            <Editcompany showeditModal={showeditModal} setShoweditModal={setShoweditModal}/>
        </>
    );
};

export default CompanyCreation;

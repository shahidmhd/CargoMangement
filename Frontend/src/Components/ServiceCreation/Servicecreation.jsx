import React, { useState } from 'react'
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Addservice from '../../Modal/Addservice';
import EditService from '../../Modal/EditService';
import DeleteserviceModal from '../../Modal/DeleteServicemodal';

function Servicecreation({ Service, render, setrender }) {
  console.log(Service, "hhhhhhhhdddddddddddddd");
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
  return (
    <>
      <div className='container-fluid p-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='mb-3'>
              <button onClick={() => setShowModal(true)} className='btn btn-primary'>
                Add Service
              </button>
            </div>
            <div className='p-3' style={{ height: '400px', overflow: 'auto' }}>
              <MDBTable align='middle'>
                <MDBTableHead>
                  <tr>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      Service Name
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      HSNcode
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      Rate
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      GST
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      SGST
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      CGST
                    </th>
                    <th style={{ backgroundColor: 'lightblue' }} scope='col'>
                      UOM(kg)
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
                  {Service &&
                    Service.map((item) => (
                      <tr key={item._id} >
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='ms-3'>
                              <p className='fw-bold mb-1'>{item?.servicename}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item?.HSNCode}</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>₹ {item?.Rate}</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item?.GST}%</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item?.SGST}%</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item?.CGST}%</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item?.UOM}</p>
                        </td>
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

      <Addservice showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender} />
      {showeditModal && <EditService Service={selectedservice} showeditModal={showeditModal} setShoweditModal={setShoweditModal} render={render} setrender={setrender} />}
      {showdeleteModal && <DeleteserviceModal render={render} setrender={setrender} id={selectedId} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal}/>}
    </>
  )
}

export default Servicecreation

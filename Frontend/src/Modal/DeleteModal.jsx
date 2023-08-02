import React from 'react'
import { deletecompany } from '../apicalls/Company'

const DeleteModal = ({ showdeleteModal, setShowdeleteModal,id,render,setrender }) => {

    const handledelete=async()=>{
       await deletecompany(id)
       setShowdeleteModal(false)
       setrender(!render)
       
    }
    return (
        <>
            <div className='modal show' tabIndex='-1' style={{ display: 'block' }}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header' style={{ backgroundColor: 'lightblue' }}>
                            <h5 className='modal-title' id='staticBackdropLabel'>
                                Delete Company
                            </h5>
                            <button onClick={() => setShowdeleteModal(false)} type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' ></button>
                        </div>
                        <div className='modal-body'>
                            <p>Are you sure you want to delete this company?</p>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={() => setShowdeleteModal(false)} type='button' className='btn btn-secondary'>
                                Cancel
                            </button>
                            <button onClick={() =>handledelete()} type='button' className='btn btn-danger' >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal

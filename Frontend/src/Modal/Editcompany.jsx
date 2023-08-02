import React from 'react'

const Editcompany = ({ showeditModal, setShoweditModal }) => {
  return (
    <div className={`modal ${showeditModal ? 'show' : ''}`} tabIndex='-1' style={{ display: showeditModal ? 'block' : 'none' }}>
    <div className='modal-dialog'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h5 className='modal-title' id='staticBackdropLabel'>
                    Add New Company
                </h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => setShoweditModal(false)}></button>
            </div>
            <div className='modal-body'>

                {/*  */}
                <form>
                    <div className="form-outline mb-4">
                        <input type="text" id="form6Example3" className="form-control" placeholder='company name' />
                     
                    </div>


                    <div className="form-outline mb-4">
                        <input type="text" id="form6Example4" className="form-control" placeholder='Address' />
        
                    </div>


                    <div className="form-outline mb-4">
                        <input type="text" id="form6Example5" className="form-control" placeholder='person' />
                      
                    </div>


                    <div className="form-outline mb-4">
                        <input type="number" id="form6Example6" className="form-control" placeholder='contact No' />
                      
                    </div>
                    <div className=''>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Add company</button>
                    </div>
                  
                </form>
                {/*  */}
            </div>
        </div>
    </div>
</div>
  )
}

export default Editcompany

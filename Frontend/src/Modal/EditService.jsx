import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import service from '../../../Backend/models/Servicemodel';
import { editservice } from '../apicalls/Service';

const EditService = ({ showeditModal, setShoweditModal, Service,render,setrender }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue, // Add the setValue function from useForm
  } = useForm({
    defaultValues: Service,
  });

  // Function to update CGST and SGST based on GST
  const updateCGSTAndSGST = (gstValue) => {
    const gst = parseFloat(gstValue);
    const cgst = gst / 2;
    const sgst = gst / 2;
    setValue('CGST', cgst.toFixed(2)); // Set CGST value
    setValue('SGST', sgst.toFixed(2)); // Set SGST value
  };

  const onSubmit = async(data) => {
    console.log(data,"ser");
    // Your logic to handle the form data and update the service should go here.
    data.GST = parseFloat(data.GST);
    data.SGST = parseFloat(data.SGST);
    data.CGST = parseFloat(data.CGST);
    // data.UOM = parseInt(data.UOM, 10);
    data.Rate = parseFloat(data.Rate);
    const response = await editservice(data)
    if(response.success){
      setShoweditModal(false)
      setrender(!render)
    }
    
  };

  return (
    <>
      <div className={`modal ${showeditModal ? 'show' : ''}`} tabIndex='-1' style={{ display: showeditModal ? 'block' : 'none' }}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header' style={{ backgroundColor: 'lightblue' }}>
              <h5 className='modal-title' id='staticBackdropLabel'>
                Edit Service
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => setShoweditModal(false)}></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-outline mb-4'>
                  <Controller
                    name='servicename'
                    control={control}
                    rules={{ required: 'Service name is required' }}
                    render={({ field }) => (
                      <>
                        <input {...field} type='text' className={`form-control ${errors.servicename ? 'is-invalid' : ''}`} placeholder='Service Name' />
                        {errors.servicename && <div className='invalid-feedback'>{errors.servicename.message}</div>}
                      </>
                    )}
                  />
                </div>

                <div className='form-outline mb-4'>
                  <Controller
                    name='HSNCode'
                    control={control}
                    rules={{ required: 'HSN code is required' }}
                    render={({ field }) => (
                      <>
                        <input {...field} type='text' className={`form-control ${errors.HSNCode ? 'is-invalid' : ''}`} placeholder='HSN-Code' />
                        {errors.HSNCode && <div className='invalid-feedback'>{errors.HSNCode.message}</div>}
                      </>
                    )}
                  />
                </div>
                <div className='row mb-4'>
                  <div className='col'>
                    <div className='form-outline'>
                      <Controller
                        name='Rate'
                        control={control}
                        rules={{ required: 'Rate is required' }}
                        render={({ field }) => (
                          <>
                            <input {...field} type='text' className={`form-control ${errors.Rate ? 'is-invalid' : ''}`} placeholder='Rate' />
                            {errors.Rate && <div className='invalid-feedback'>{errors.Rate.message}</div>}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className='form-outline mb-4'>
                  <Controller
                    name='GST'
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type='text'
                          className={`form-control ${errors.GST ? 'is-invalid' : ''}`}
                          placeholder='GST%'
                          onChange={(e) => {
                            field.onChange(e); // Trigger the default onChange function
                            updateCGSTAndSGST(e.target.value); // Update CGST and SGST based on GST
                          }}
                        />
                        {errors.GST && <div className='invalid-feedback'>{errors.GST.message}</div>}
                      </>
                    )}
                  />
                </div>

                <div className='row mb-4'>
                  <div className='col'>
                    <div className='form-outline'>
                      <Controller
                        name='SGST'
                        control={control}
                        rules={{ required: 'SGST is required' }}
                        render={({ field }) => (
                          <>
                            <input {...field} type='text' className={`form-control ${errors.SGST ? 'is-invalid' : ''}`} placeholder='SGST%' />
                            {errors.SGST && <div className='invalid-feedback'>{errors.SGST.message}</div>}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-outline'>
                      <Controller
                        name='CGST'
                        control={control}
                        rules={{ required: 'CGST is required' }}
                        render={({ field }) => (
                          <>
                            <input {...field} type='text' className={`form-control ${errors.CGST ? 'is-invalid' : ''}`} placeholder='CGST%' />
                            {errors.CGST && <div className='invalid-feedback'>{errors.CGST.message}</div>}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className='row mb-4'>
                  <div className='col'>
                    <div className='form-outline'>
                      <Controller
                        name='UOM'
                        control={control}
                        rules={{ required: 'UOM name is required' }}
                        render={({ field }) => (
                          <>
                            <input {...field} type='text' className={`form-control ${errors.UOM ? 'is-invalid' : ''}`} placeholder='UOM(kg)' />
                            {errors.UOM && <div className='invalid-feedback'>{errors.UOM.message}</div>}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

               
                <div className=''>
                  <button type='submit' className='btn btn-primary btn-block mb-4'>
                    Edit service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditService;

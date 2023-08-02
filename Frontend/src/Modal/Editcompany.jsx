import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { editcompany } from '../apicalls/Company';

const Editcompany = ({ showeditModal, setShoweditModal, Company,render,setrender }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      companyname: Company?.companyname || '',
      location: Company?.location || '',
      person: Company?.person || '',
      contactNo: Company?.contactNo || '',
      _id:Company?._id || '',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const response=await editcompany(data)
    setShoweditModal(false)
    setrender(!render)
  
   
  };

  // Set form field values when the Company prop changes
  useEffect(() => {
    setValue('_id',Company?._id || '');
    setValue('companyname', Company?.companyname || '');
    setValue('location', Company?.location || '');
    setValue('person', Company?.person || '');
    setValue('contactNo', Company?.contactNo || '');
  }, [Company]);

  return (
    <div className={`modal ${showeditModal ? 'show' : ''}`} tabIndex='-1' style={{ display: showeditModal ? 'block' : 'none' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header' style={{ backgroundColor: 'lightblue' }}>
            <h5 className='modal-title' id='staticBackdropLabel'>
              Edit Company
            </h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => setShoweditModal(false)}></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-outline mb-4'>
                <Controller
                  name='companyname'
                  control={control}
                  rules={{ required: 'Company name is required' }}
                  render={({ field }) => (
                    <>
                      <input {...field} type='text' id='form6Example3' className={`form-control ${errors.companyname ? 'is-invalid' : ''}`} placeholder='Company name' />
                      {errors.companyname && <div className='invalid-feedback'>{errors.companyname.message}</div>}
                    </>
                  )}
                />
              </div>

              <div className='form-outline mb-4'>
                <Controller
                  name='location'
                  control={control}
                  rules={{ required: 'location is required' }}
                  render={({ field }) => (
                    <>
                      <input {...field} type='text' id='form6Example4' className={`form-control ${errors.location ? 'is-invalid' : ''}`} placeholder='location' />
                      {errors.location && <div className='invalid-feedback'>{errors.location.message}</div>}
                    </>
                  )}
                />
              </div>

              <div className='form-outline mb-4'>
                <Controller
                  name='person'
                  control={control}
                  rules={{ required: 'Person name is required' }}
                  render={({ field }) => (
                    <>
                      <input {...field} type='text' id='form6Example5' className={`form-control ${errors.person ? 'is-invalid' : ''}`} placeholder='Person' />
                      {errors.person && <div className='invalid-feedback'>{errors.person.message}</div>}
                    </>
                  )}
                />
              </div>

              <div className='form-outline mb-4'>
                <Controller
                  name='contactNo'
                  control={control}
                  rules={{
                    required: 'Contact No is required',
                    pattern: { value: /^[0-9]+$/, message: 'Invalid contact number' },
                  }}
                  render={({ field }) => (
                    <>
                      <input {...field} type='text' id='form6Example6' className={`form-control ${errors.contactNo ? 'is-invalid' : ''}`} placeholder='Contact No' />
                      {errors.contactNo && <div className='invalid-feedback'>{errors.contactNo.message}</div>}
                    </>
                  )}
                />
              </div>

              <div className=''>
                <button type='submit' className='btn btn-primary btn-block mb-4'>
                  Edit company
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editcompany;

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Addservicedata } from '../apicalls/Service';

const Addservice = ({ showModal, setShowModal,render,setrender }) => {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const [gstValue, setGstValue] = useState('');

    const onSubmit = async (data) => {
        // data.GST=gstValue
        // Convert numeric fields to numbers
        data.GST = parseFloat(gstValue);
        data.SGST = parseFloat(data.SGST);
        data.CGST = parseFloat(data.CGST);
        // data.UOM = parseInt(data.UOM, 10);
        data.Rate = parseFloat(data.Rate);
        const response = await Addservicedata(data)
        console.log(response,"oji");
        if(response.success){
            setShowModal(false)
            setrender(!render)
            
        }

    };

    // Update CGST and SGST values based on GST value
    const handleGSTChange = (event) => {
        const value = event.target.value;
        setGstValue(value);

        if (value === '') {
            // If GST value is empty, set CGST and SGST to 0
            setValue('CGST', '0.00');
            setValue('SGST', '0.00');
        } else {
            const gst = parseFloat(value);
            if (!isNaN(gst)) {
                const cgst = gst / 2;
                const sgst = gst / 2;
                setValue('CGST', cgst.toFixed(2));
                setValue('SGST', sgst.toFixed(2));
            }
        }
    };

    return (
        <>
            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex='-1' style={{ display: showModal ? 'block' : 'none' }}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header' style={{ backgroundColor: 'lightblue' }}>
                            <h5 className='modal-title' id='staticBackdropLabel'>
                                Add Service
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => setShowModal(false)}></button>
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
                                                <input {...field} type='text' id='form6Example3' className={`form-control ${errors.servicename ? 'is-invalid' : ''}`} placeholder='Service Name' />
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
                                                <input {...field} type='text' id='form6Example4' className={`form-control ${errors.HSNCode ? 'is-invalid' : ''}`} placeholder='HSN-Code' />
                                                {errors.HSNCode && <div className='invalid-feedback'>{errors.HSNCode.message}</div>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className='row mb-4'>
                                    <div className='col'>

                                        <div className='col'>
                                            <div className='form-outline'>
                                                <Controller
                                                    name='Rate'
                                                    control={control}
                                                    rules={{ required: 'Rate  is required' }}
                                                    render={({ field }) => (
                                                        <>
                                                            <input {...field} type='text' id='form6Example2' className={`form-control ${errors.Rate ? 'is-invalid' : ''}`} placeholder='Rate' />
                                                            {errors.Rate && <div className='invalid-feedback'>{errors.Rate.message}</div>}
                                                        </>
                                                    )}
                                                />
                                            </div>
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
                                                    id='form6Example5'
                                                    className={`form-control ${errors.GST ? 'is-invalid' : ''}`}
                                                    placeholder='GST%'
                                                    onChange={handleGSTChange}
                                                    value={gstValue}
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
                                                rules={{ required: 'SGST  is required' }}
                                                render={({ field }) => (
                                                    <>
                                                        <input {...field} type='text' id='form6Example1' className={`form-control ${errors.SGST ? 'is-invalid' : ''}`} placeholder='SGST%' />
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
                                                rules={{ required: 'CGST  is required' }}
                                                render={({ field }) => (
                                                    <>
                                                        <input {...field} type='text' id='form6Example2' className={`form-control ${errors.CGST ? 'is-invalid' : ''}`} placeholder='CGST%' />
                                                        {errors.CGST && <div className='invalid-feedback'>{errors.CGST.message}</div>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-4'>
                                    <div className='col'>

                                        <div className='col'>
                                            <div className='form-outline'>
                                                <Controller
                                                    name='UOM'
                                                    control={control}
                                                    rules={{ required: 'UOM name is required' }}
                                                    render={({ field }) => (
                                                        <>
                                                            <input {...field} type='text' id='form6Example2' className={`form-control ${errors.UOM ? 'is-invalid' : ''}`} placeholder='UOM(kg)' />
                                                            {errors.UOM && <div className='invalid-feedback'>{errors.UOM.message}</div>}
                                                        </>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className=''>
                                    <button type='submit' className='btn btn-primary btn-block mb-4'>
                                        Add service
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

export default Addservice;



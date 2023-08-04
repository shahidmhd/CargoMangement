import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginUser } from '../apicalls/User';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';



const Login = () => {
   
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data); // You can handle the form submission here
        try {
            const response = await LoginUser(data)
            console.log(response);
            localStorage.setItem('token',(response.data));
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    };

    // Custom validation function to check for empty or whitespace input
    const validateNotEmpty = (value) => {
        if (!value.trim()) {
            return 'This field is required';
        }
        return true;
    };
    const token =localStorage.getItem('token')
   
    if(token){
        return <Navigate to='/'/>
    }

    return (
        <section className="vh-100 gradient-custom" style={{ backgroundImage: `url('https://www.emotrans-global.com/wp-content/uploads/2023/01/01-cargo-vs-freight.jpg')`, backgroundSize: 'cover' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                placeholder='enter your email'
                                                type="email"
                                                id="typeEmailX"
                                                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                    validate: validateNotEmpty, // Custom validation
                                                })}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                placeholder='enter your password'
                                                type="password"
                                                id="typePasswordX"
                                                className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                                {...register('password', {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Password must have at least 6 characters',
                                                    },
                                                    validate: validateNotEmpty, // Custom validation
                                                })}
                                            />
                                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

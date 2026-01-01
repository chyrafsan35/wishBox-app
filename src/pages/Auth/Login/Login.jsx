import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import logo1 from '../../../assets/logo1.png';
import { Link, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading/Loading';

const Login = () => {
    const { signInUser, loading: authLoading } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const useAxios = useAxiosSecure();

    const { register, formState: { errors }, handleSubmit } = useForm();
    const handleLogin = async (data) => {
        setIsLoggingIn(true); 

        try {
            const result = await useAxios.get(`/users/username/${data.username}`);
            const userEmail = result.data.email;

            const authResult = await signInUser(userEmail, data.password);
            console.log(authResult)

            setIsLoggingIn(false);

            Swal.fire({
                title: "Logged in!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            navigate(location?.state || '/dashboard');

        } catch (error) {
            setIsLoggingIn(false);
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.response?.data?.message || "Invalid username or password!",
            });
        }
    };

    if (authLoading || isLoggingIn) {
        return <Loading />;
    }

    return (
        <div className='max-w-360 mx-auto '>
            <div className='pb-10 pt-30'>
                <img src={logo1} alt="" className='max-w-87.5 mx-auto' />
            </div>
            <div className='px-8'>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mb-20">
                    <h2 className="text-3xl text-center text-gray-500 pt-10">Login to profile</h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <fieldset className="fieldset">
                                <label className="label">Username</label>
                                <input type="name" {...register('username', { required: true })} className="input" placeholder=" Enter username " />
                                {errors.username?.type === 'required' && (<p className='text-red-600'> Username is required </p>)}

                                <label className="label">Enter Password</label>
                                <input type="password" {...register('password', { required: true })} className="input" placeholder="Password" />
                                {errors.password?.type === 'required' && (<p className='text-red-600'> Password is required </p>)}

                                <button className="btn btn-secondary text-text hover:bg-[#8B5CF6] mt-4">Enter</button>
                            </fieldset>
                            <p>Or, create a profile - <Link state={location.state} to={'/register'} className='text-secondary'>register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
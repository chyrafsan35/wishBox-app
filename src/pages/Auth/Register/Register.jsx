import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import logo1 from '../../../assets/logo1.png';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import Swal from 'sweetalert2';

const Register = () => {

    const userNameRegex = /^[a-z0-9_]{3,20}$/;
    const passwordRegex = /^.{6,}$/;
    const { registerUser, updateUser, loading: authLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const useAxios = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const generatedEmail = (username) => {
        return `${username.toLowerCase()}@wish.local`
    }

    const { register, formState: { errors }, handleSubmit } = useForm();
    const handleRegister = async (data) => {
        const email = generatedEmail(data.username);
        setIsSubmitting(true);

        try {
            const result = await registerUser(email, data.password);
            console.log(result)

            const userProfile = {
                userName: data.username,
                initialName: data.username,
                fullName: data.fullname,
                userEmail: email,
                userImg: data?.image || '',
                profileLink: `${window.location.origin}/${data.username}`,
                createdAt: new Date()
            };

            const dbResponse = await useAxios.post('/users', userProfile);

            if (dbResponse.data.insertedId) {
                const updateUserProfile = {
                    displayName: data.username,
                    photoURL: data?.image || '',
                };
                await updateUser(updateUserProfile);

                setIsSubmitting(false);

                await Swal.fire({
                    title: "Profile created!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });

                navigate(location?.state || '/dashboard');
            } else {
                throw new Error("Failed to save user in database");
            }
        } catch (error) {
            setIsSubmitting(false); 
            console.error("Registration Error:", error);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.response?.data?.message || error.message || "Something went wrong!",
            });
        }
    };

    const checkUserName = async (username) => {
        if (!username || username.length < 3) return;
        try {
            const res = await useAxios.get(`/users/check/${username}`);
            return !res.data.isTaken || 'Username already taken';
        } catch (err) {
            console.log(err)
            return true;
        }
    }

    if (authLoading || isSubmitting) {
        return <Loading />;
    }

    return (
        <div className='max-w-360 mx-auto '>
            <div className='pb-10 pt-30'>
                <img src={logo1} alt="" className='max-w-87.5 mx-auto' />
            </div>
            <div className='px-8'>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mb-20">
                    <h2 className="text-3xl text-center text-gray-500 pt-10">Welcome ! <br /> Create profile now</h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <fieldset className="fieldset">
                                <label className="label">Username</label>
                                <input type="name" {...register('username', { required: true, pattern: { value: userNameRegex }, validate: checkUserName })} className={`input ${errors.username ? 'border-red-500' : ''}`} placeholder="ex: chowdhury_35 " />
                                {errors.username?.type === 'required' && (<p className='text-red-600'> Username is required </p>)}
                                {errors.username?.type === 'pattern' && (<p className='text-red-600'> Only lowercase letters, numbers, and underscore allowed </p>)}
                                {errors.username && (
                                    <p className='text-red-600'>{errors.username.message}</p>
                                )}

                                <label className="label">Full Name</label>
                                <input type="name" {...register('fullname', { required: true })} className="input" placeholder="Enter your full name" />
                                {errors.fullname?.type === 'required' && (<p className='text-red-600'> Full name is required </p>)}

                                <label className="label">Set Password</label>
                                <input type="password" {...register('password', { required: true, pattern: { value: passwordRegex } })} className="input" placeholder="Password" />
                                {errors.password?.type === 'required' && (<p className='text-red-600'> Password is required </p>)}
                                {errors.password?.type === 'pattern' && (<p className='text-red-600'> Password should have at least 6 characters </p>)}

                                <button className="btn btn-secondary text-text hover:bg-[#8B5CF6] mt-4">Enter</button>
                            </fieldset>
                            <p>Already have a profile ? <Link state={location.state} to={'/login'} className='text-secondary'>login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const AddWishes = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const useAxios = useAxiosSecure();
    const { user } = useAuth();

    const { data: userInfo = {}, refetch } = useQuery({
        queryKey: ['uer_info', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await useAxios.get(`/users/${user.email}`)
            return res.data;
        }
    })

    const handleAddWish = (data) => {
        console.log(data)
        const wishDoc = {
            receiver_name: data.receiverName,
            sender_name: userInfo.userName,
            sender_fullName: userInfo.fullName,
            sender_email: userInfo.userEmail,
            wish: data.wish,
            createdAt: new Date()
        }

        useAxios.post('/wishes', wishDoc)
            .then(res => {
                reset();
                if (res.data.modifiedCount) {
                    Swal.fire("Wish Added!", "", "success");
                    refetch()

                }
            })
    }

    return (
        <div>
            <div className='p-4'>
                <div className=' py-10 px-5 rounded-xl text-center bg-white/60 backdrop-blur-lg shadow-xl my-5 mx-5'>
                    <p className='text-center font-semibold text-2xl mb-5'>Make wishes for the special ones</p>
                    <div className="card-body p-6 bg-white/50 rounded-lg shadow-md max-w-lg mx-auto">
                        <form onSubmit={handleSubmit(handleAddWish)}>
                            <fieldset className="space-y-5">

                                <div className="flex flex-col">
                                    <label className="label font-semibold mb-2">Name of the person</label>
                                    <input
                                        type="text"
                                        {...register('receiverName', { required: true, maxLength: 30 })}
                                        className="input input-bordered w-full rounded-md px-3 py-2 focus:outline-none bg-white/50 focus:ring-2 focus:ring-purple-400"
                                        placeholder="Enter receiver name"
                                    />
                                    {errors.receiverName?.type === 'required' && (
                                        <p className="text-red-600 mt-1 text-sm">Receiver name is required</p>
                                    )}
                                    {errors.receiverName?.type === 'maxLength' && (
                                        <p className="text-red-600 mt-1 text-sm">Receiver name cannot exceed 30 characters</p>
                                    )}
                                </div>

                                {/* Wish Textarea */}
                                <div className="flex flex-col">
                                    <label className="label font-semibold mb-2">Write your wish <p className="inline-block font-normal text-sm text-gray-500 ">{watch('wish')?.length || 0}/250 characters</p></label>
                                    
                                    <textarea
                                        {...register('wish', { required: true, maxLength: 250 })}
                                        className="textarea textarea-bordered w-full rounded-md px-3 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        rows={5}
                                        placeholder="Write your wish here..."
                                    ></textarea>
                                    {errors.wish?.type === 'required' && (
                                        <p className="text-red-600 mt-1 text-sm">Wish cannot be empty</p>
                                    )}
                                    {errors.receiverName?.type === 'maxLength' && (
                                        <p className="text-red-600 mt-1 text-sm">Wish cannot exceed 250 characters</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn btn-secondary w-full mt-4 py-2 text-white hover:bg-[#8B5CF6] rounded-md"
                                >
                                    Add Wish
                                </button>
                            </fieldset>
                            <div className='pt-5 text-secondary'>
                                <span>You can generate a card for this wish from 'My Wishes' section</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddWishes;
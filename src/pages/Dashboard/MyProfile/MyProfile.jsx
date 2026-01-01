import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyProfile = () => {
    const useAxios = useAxiosSecure();
    const { user, logOut } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const editModalRef = useRef();
    const userNameRegex = /^[a-z0-9_]{3,20}$/;

    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ['user_profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await useAxios.get(`/users/${user.email}`)
            return res.data;
        }
    })

    const [copied, setCopied] = useState(false)
    const [updating, setUpdating] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/${userData?.initialName}`
        )
        setCopied(true)

        setTimeout(() => setCopied(false), 2000)
    }

    const handleEditProfile = () => {
        editModalRef.current.showModal();
    }

    const handleEdit = async (data) => {
        let imageURL = userData?.userImg || 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png';

        if (data.photo && data.photo.length > 0) {
            const formData = new FormData();
            formData.append('image', data.photo[0]);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`;
            const imgRes = await axios.post(image_API_URL, formData);
            imageURL = imgRes.data.data.url;
        }

        const profileInfo = {
            userName: data?.username || userData.userName,
            userBio: data?.bio || userData.userBio,
            userImg: imageURL,
        }

        useAxios.patch(`/users/${user.email}`, profileInfo)
            .then(res => {
                setUpdating(true)
                editModalRef.current.close();
                if (res.data.modifiedCount) {
                    Swal.fire("Profile Updated!", "", "success");
                    setUpdating(false)
                    refetch()
                }
            })
    }

    const handleLogOut = () => {
        logOut();
    }

    return (
        <div>
            <div className='p-4'>
                {
                    isLoading ?
                        <Loading></Loading> :
                        <div className="flex flex-col md:flex-row items-center gap-6 bg-white/30 backdrop-blur-xl rounded-2xl p-6 my-20 shadow-xl
                                        max-w-3xl mx-auto">

                            {/* Avatar */}
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-4">
                                    <img
                                        src={
                                            userData?.userImg ||
                                            'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png'
                                        }
                                        alt="profile"
                                    />
                                </div>
                            </div>

                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    @{userData?.userName}
                                </h2>

                                <p className="text-sm text-gray-800 mt-1">
                                    { userData.userBio}
                                </p>

                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Profile link:
                                    </p>
                                    <div className='flex gap-5 items-center'>
                                        <p className="text-white font-medium break-all block">
                                            {userData?.profileLink}
                                        </p> <button onClick={handleCopyLink} className='btn btn-secondary btn-sm text-white inline-block'>
                                            {
                                                copied ? 'Copied' : 'Copy LInk'
                                            }
                                        </button>
                                    </div>

                                    <p className=' text-gray-700'>Share the profile link for anonymous messages</p>

                                </div>
                                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                    <button onClick={handleEditProfile} className="btn btn-secondary btn-sm text-white">
                                        Edit Profile
                                    </button>
                                    <button onClick={handleLogOut} className="btn btn-secondary btn-sm text-white">
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>

                }

                <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-5xl p-0">
                        <div className="px-6 py-4 border-b bg-base-100 sticky top-0 z-10">
                            <h2 className="text-2xl font-bold text-primary">
                                Edit Profile
                            </h2>
                            <p className="text-sm text-gray-500">
                                Update profile information carefully
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleEdit)} className='p-6 space-y-6'>
                            <div>
                                <div className="bg-base-200 rounded-xl p-4 shadow-sm">
                                    <img
                                        src={
                                            userData?.userImg ||
                                            'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png'
                                        }
                                        alt="product" className="rounded-lg mb-4 object-contain max-h-48 w-full bg-white"
                                    />

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Profile Image
                                        </span>
                                    </label>

                                    <input
                                        type="file"
                                        {...register("photo")}
                                        className="file-input file-input-bordered file-input-secondary w-full"
                                    />

                                    <p className="text-xs text-gray-500 mt-2">
                                        Leave empty to keep existing image
                                    </p>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Username
                                        </span>
                                    </label>
                                    <input
                                        type="name"
                                        {...register("username", { pattern: { value: userNameRegex } })}
                                        defaultValue={userData.userName}
                                        className="input input-bordered w-full"
                                        placeholder="Edit Username"
                                    />
                                    {errors.username?.type === 'pattern' && (<p className='text-red-600'> Only lowercase letters, numbers, and underscore allowed </p>)}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Edit bio
                                        </span>
                                    </label>
                                    <textarea
                                        {...register("bio")}
                                        defaultValue={userData.userBio}
                                        className="textarea textarea-bordered w-full"
                                        rows={4}
                                        placeholder="Edit bio"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t">
                                <button type="button" onClick={() => editModalRef.current.close()} className="btn btn-ghost">
                                    Cancel
                                </button>

                                <button type="submit" className="btn bg-secondary hover:bg-[#8B5CF6] text-white px-8">
                                    {updating ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyProfile;
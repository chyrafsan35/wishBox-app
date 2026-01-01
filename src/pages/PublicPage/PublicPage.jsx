import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Loading from '../../components/Loading/Loading';
import { Link, useParams } from 'react-router';
import Swal from 'sweetalert2';

const PublicPage = () => {
    const { username } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const useAxios = useAxiosSecure();
    const { data: userEmail = {}, isLoading } = useQuery({
        queryKey: ['user-email', username],
        enabled: !!username,
        queryFn: async () => {
            const res = await useAxios.get(`/users/initial-username/${username}`)
            return res.data;
        }
    })
    
    const { data: userInfo = {} } = useQuery({
        queryKey: ['message-user', userEmail.email],
        enabled: !!userEmail.email,
        queryFn: async () => {
            const res = await useAxios.get(`/users/${userEmail.email}`)
            return res.data;
        }
    })

    const handleSentWish = async (data) => {
        const wishDoc = {
            receiverName: userInfo.userName,
            receiverEmail: userInfo.userEmail,
            senderName: data?.username || '',
            senderEmail: data?.email || '',
            isAnonymous: !data.username ? 'true' : 'false',
            timestamp: new Date(),
            messageText: data?.anonymousWish || '',
            isRead: 'false'
        }

        await useAxios.post('/messages', wishDoc)
            .then(res => {
                console.log('Added in database', res)
                Swal.fire("Message Sent!", "", "success");
                reset()
            })
    }

    return (
        <div className='bg-linear-to-r from-secondary to-primary'>
            <div className='max-w-[1440 px]'>
                {
                    isLoading ? <Loading></Loading> :
                        <div className='max-w-125 mx-auto py-12'>
                            <div className=' py-10 px-5 rounded-xl text-center bg-white/60 backdrop-blur-lg shadow-xl my-5 mx-5'>
                                <div className='avatar'>
                                    <div className="w-42 rounded-full ring ring-white ring-offset-base-100 ring-offset-4 mb-5">
                                        <img src={userInfo.userImg} alt="" />
                                    </div>
                                </div>
                                <p className='mb-5'>@{userInfo.userName}</p>
                                <p className='mb-5 text-gray-600'>"{userInfo.userBio}"</p>
                                <p className='text-xl font-semibold'>Send Message Anonymously</p>

                                <div className="card-body">
                                    <form onSubmit={handleSubmit(handleSentWish)}>
                                        <fieldset className="fieldset">
                                            <textarea {...register('anonymousWish')} className="textarea textarea-bordered w-full rounded-2xl" placeholder='Write your message' rows={3}></textarea>
                                            <button className="btn btn-secondary text-text hover:bg-[#8B5CF6] mt-4">Send</button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                            <p className='py-3 px-5 text-center text-xl text-white text-shadow-lg'>Want to get yours ? <Link to={'/dashboard/my-profile'} className='text-secondary'>Click</Link> here  </p>
                        </div>
                }
            </div>
        </div>
    );
};

export default PublicPage;
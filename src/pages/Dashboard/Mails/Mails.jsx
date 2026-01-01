import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import InboxWish from '../../../components/InboxWish/InboxWish';

const Mails = () => {
    const useAxios = useAxiosSecure();
    const { user } = useAuth();
    const { data: messages = [], isLoading } = useQuery({
        queryKey: ['users-message', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await useAxios.get(`/messages/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <div className='p-4'>
                {
                    isLoading ? <Loading></Loading> :
                        <div className="p-6 max-w-6xl mx-auto">

                            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                                My Inbox 💌
                            </h1>

                            {messages.length === 0 ? (
                                <div className="text-center text-gray-600 mt-20">
                                    <p className="text-lg">No mails yet 😔</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-1">
                                    {messages.map(mail => (
                                        <InboxWish key={mail._id} mail={mail}></InboxWish>
                                    ))}
                                </div>
                            )}
                        </div>
                }
            </div>
        </div>
    );
};

export default Mails;
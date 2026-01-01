import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const DashboardHome = () => {
    const useAxios = useAxiosSecure();
    const { user } = useAuth();
    const { data: userData = {} } = useQuery({
        queryKey: ['user'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await useAxios.get(`/users/${user.email}`)
            console.log(userData.userName)
            return res.data;
        }
    })

    return (
        <div>
            <div className='p-4'>
                <div className=' py-10 px-5 rounded-xl bg-white/60 backdrop-blur-lg shadow-xl my-5 mx-5'>
                    <p>Hi {userData.initialName}, </p>
                    <p>I hope everything is going well for you.
                        Life doesn’t always move the way we expect, yet choosing to stay kind, hopeful, and happy through it all is a truly beautiful strength.
                        <br />
                        <br />
                        As this new year approaches, I hope it brings you peace in your heart, clarity in your mind, and countless moments that make you smile — even on ordinary days.

                        Keep believing in yourself. You’re doing better than you think.
                        <br />
                        <br />
                        — Admin, WishBOX 💜</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
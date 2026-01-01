import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import WishCard from '../../../components/WishCard/WishCard';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading/Loading';

const MyWishes = () => {
    const useAxios = useAxiosSecure();
    const { user } = useAuth();

    const { data: myWishes = [], isLoading } = useQuery({
        queryKey: ['my-wishes', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await useAxios.get(`/wishes/${user.email}`);
            return result.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                My Wishes 💌
            </h1>

            {myWishes.length === 0 ? (
                <div className="text-center text-gray-600 mt-20">
                    <p className="text-lg">No wishes yet 😔</p>
                    <p className="text-sm mt-1">Create your first wish!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myWishes.map(wish => (
                        <WishCard key={wish._id} wish={wish} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyWishes;

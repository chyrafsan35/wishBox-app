import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const WishCard = ({ wish }) => {
    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-5 shadow-lg
                    transition hover:scale-[1.02] hover:shadow-xl mb-5 mx-5 ">

            <div className="flex items-center gap-2 mb-3 text-secondary">
                <FaHeart />
                <h2 className="font-semibold text-lg">
                    {wish.receiver_name}
                </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-3">
                {wish.wish}
            </p>

            <Link to={`${wish._id}`}><button className='btn btn-secondary hover:bg-[#8B5CF6]'>Generate Card</button></Link>

            {/* Optional future use */}
            {wish.createdAt && (
                <p className="text-xs text-gray-500 mt-4">
                    {new Date(wish.createdAt).toLocaleDateString()}
                </p>
            )}
        </div>
    );
};

export default WishCard;

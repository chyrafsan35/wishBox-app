import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const InboxWish = ({ mail }) => {
    return (
        <div className='p-1'>
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-5 shadow-lg
                    transition hover:scale-[1.02] hover:shadow-xl mb-5 mx-5 ">

                <div className="flex items-center gap-2 mb-3 text-secondary">
                    <FaHeart />
                    <h2 className="font-semibold text-lg">
                        {
                            mail.isAnonymous !== 'true' ?
                                mail.senderName :
                                'Anonymous'
                        }
                    </h2>
                </div>

                <p className="text-gray-800 leading-relaxed mb-3">
                    {mail.messageText}
                </p>

                {/* Optional future use */}
                <div className='flex flex-col md:flex-row justify-between gap-5'>
                    {mail.timestamp && (
                        <p className="text-xs text-gray-500 mt-4">
                            {new Date(mail.timestamp).toLocaleDateString()}
                        </p>
                    )}
                    <div className='flex flex-col md:flex-row gap-3'>
                        <Link to={`/dashboard/replyMails/${mail._id}`}><button className='btn btn-sm btn-secondary text-white'>Reply</button></Link>
                        <Link to={`/dashboard/mails/${mail._id}`}><button className='btn btn-sm btn-secondary text-white'>Share to story</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxWish;
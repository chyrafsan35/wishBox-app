import React from 'react';
import { WiStars } from 'react-icons/wi';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const { user } = useAuth();
    return (
        <div className='bg-linear-to-r from-secondary to-primary'>
            <div className='max-w-[1440 px]'>
                <div className='max-w-125 mx-auto py-12'>
                    <div className=' py-10 px-5 rounded-xl text-center bg-white/60 backdrop-blur-lg shadow-xl my-5 mx-5'>
                        <div className='mb-3'>
                            <p className='text-gray-500'> <span className='font-semibold text-black'>Create wishes : </span> Write wishes for yourself or someone special and save them securely to your profile — private, meaningful, and always yours. </p>
                        </div>
                        <div className='mb-3'>
                            <p className='text-gray-500'> <span className='font-semibold text-black'>Generate wish card : </span> Turn your words into beautiful wish cards. Download or share them with your loved ones in just one click.</p>
                        </div>
                        <div className='mb-3'>
                            <p className='text-gray-500'> <span className='font-semibold text-black'>Send Anonymously : </span> Want to stay anonymous? Send wishes to users without revealing your identity — pure emotions, no pressure.</p>
                        </div>
                        <div className='mb-3'>
                            <p className='text-secondary'> <WiStars className='text-secondary inline-block' />New feature coming on 1st January, 2026</p>
                        </div>
                        {
                            user ?
                                <></>
                                :
                                <div className='mb-3'>
                                    <Link to={'/register'} className='btn btn-secondary text-white mb-3'>Create Profile</Link> <br />
                                    <span className='text-gray-500 text-center'>Or, <Link to={'/login'} className='text-secondary'>login</Link> if you have one </span>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
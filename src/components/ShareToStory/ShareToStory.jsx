import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import { downloadCard } from '../../../downloadCard';
import ShareCard from '../ShareCard/ShareCard';

const ShareToStory = () => {
    const { id } = useParams();
    const useAxios = useAxiosSecure();
    const [theme, setTheme] = useState('happy');

    const { data: shareMsg = {}, isLoading } = useQuery({
        queryKey: ['share-msg'],
        queryFn: async () => {
            const res = await useAxios.get(`/messages/unique/${id}`)
            return res.data
        }
    })
    return (
        <div className='p-4'>
            {
                isLoading ? <Loading></Loading> :
                    <div className="min-h-screen flex flex-col justify-center items-center gap-6 bg-transparent">
                        <ThemeSelector selected={theme} setSelected={setTheme} />

                        <div className=" rounded-xl">
                            <ShareCard share={shareMsg} theme={theme}/>
                        </div>

                        <button onClick={downloadCard} className='btn btn-secondary mt-4'>
                            Download Card
                        </button>

                    </div>
            }
        </div>
    );
};

export default ShareToStory;
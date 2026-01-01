import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import CardPreview from '../CardPreview/CardPreview';
import { downloadCard } from '../../../downloadCard';

const GenerateCard = () => {
    const { id } = useParams();
    const useAxios = useAxiosSecure();
    const [theme, setTheme] = useState('happy');

    const { data: singleWish = {}, isLoading } = useQuery({
        queryKey: ['single-wish', id],
        enabled: !!id,
        queryFn: async () => {
            const result = await useAxios.get(`/wishes/single/${id}`)
            return result.data
        }
    })

    return (
        <div>
            <div className='p-4'>
                {
                    isLoading ? <Loading></Loading> :
                        <div className="min-h-screen flex flex-col justify-center items-center gap-6 bg-transparent">
                            <ThemeSelector selected={theme} setSelected={setTheme} />

                            <div className=" rounded-xl">
                                <CardPreview wish={singleWish} theme={theme} />
                            </div>

                            <button onClick={downloadCard} className='btn btn-secondary mt-4'>
                                Download Card
                            </button>

                        </div>
                }
            </div>
        </div>
    );
};

export default GenerateCard;
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toPng } from 'html-to-image';

const Reply = () => {
    const { id } = useParams();
    const useAxios = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const cardRef = useRef(null);
    const [selectedReply, setSelectedReply] = useState();
    const [isGenerating, setIsGenerating] = useState(false);
    const { data: uniqueMsg = {}, isLoading } = useQuery({
        queryKey: ['replies'],
        queryFn: async () => {
            const res = await useAxios.get(`/messages/unique/${id}`)
            return res.data
        }
    })

    const handleReply = async (data) => {
        console.log(data)
        const replyDoc = {
            receiverId: uniqueMsg._id,
            receiverName: uniqueMsg.receiverName,
            receiverEmail: uniqueMsg.receiverEmail,
            repliedText: data.repliedMessage,
            repliedAt: new Date(),
            senderName: uniqueMsg.senderName,
            senderEmail: uniqueMsg.senderEmail
        }
        await useAxios.post('/replies', replyDoc)
            .then(res => {
                console.log('Reply added', res)
                reset();
                refetchReply();
                Swal.fire('Reply Added', '', 'success')
            })
    }

    const { data: singleReply = [], refetch: refetchReply } = useQuery({
        queryKey: ['multiple-replies', uniqueMsg?._id],
        enabled: !!uniqueMsg?._id,
        queryFn: async () => {
            const res = useAxios.get(`/replies/unique/${uniqueMsg._id}`)
            return (await res).data;
        }
    })

    const handleShareReply = async (replyText) => {
        setSelectedReply(replyText);
        setIsGenerating(true)
        setTimeout(async () => {
            if (!cardRef.current) {
                setIsGenerating(false)
                return;
            }
            try {
                const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
                const link = document.createElement('a');
                link.download = `reply-share.png`;
                link.href = dataUrl;
                link.click();
                Swal.fire('Success', 'Image downloaded for story!', 'success');
            } catch (err) {
                console.error(err);
            }
        }, 500);
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-4'>
            {isGenerating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Loading />
                    <p className="text-white ml-3 font-bold">Generating Image...</p>
                </div>
            )}

            {
                isLoading ? <Loading></Loading> :
                    <div>
                        <div className='border-b-2 border-dashed border-b-white'>
                            <div className=' w-75 py-5 px-5 rounded-xl text-center bg-white/60 backdrop-blur-lg shadow-xl my-5 mx-auto'>
                                <p className='mb-3'>{uniqueMsg.messageText}</p>
                                <form onSubmit={handleSubmit(handleReply)}>
                                    <textarea {...register('repliedMessage')} placeholder='Enter reply' className="textarea rounded-xl textarea-bordered w-full" rows={2} ></textarea>
                                    <button type='submit' className='btn btn-secondary text-white mt-3'>Reply</button>
                                </form>
                            </div>
                        </div>
                        <div>
                            <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6'>
                                {
                                    singleReply.map(single =>
                                        <div key={single} className=' w-70 py-5 px-5 rounded-xl text-center bg-white/60 backdrop-blur-lg shadow-xl my-3 mx-auto'>
                                            <p className='mb-3'>{single.repliedText}</p>
                                            <button
                                                onClick={() => handleShareReply(single.repliedText)}
                                                className='btn btn-md btn-outline btn-secondary mt-2'
                                            >
                                                Share this reply
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
            }

            {/* hidden card */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <div
                    ref={cardRef}
                    style={{
                        width: '400px',
                        minHeight: '600px',
                        background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                        padding: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0px'
                    }}
                >
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center w-full">
                        <p className="text-xl font-semibold mb-6 text-gray-800 italic"
                            style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                whiteSpace: 'normal',
                                width: '100%'
                            }}>
                            "{uniqueMsg.messageText}"
                        </p>

                        <div className="w-full h-1 bg-gray-200 mb-6"></div>

                        <p className="text-gray-500 text-sm mb-2 font-bold uppercase tracking-widest">My Reply:</p>
                        <p className="text-2xl font-bold text-secondary"
                            style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                whiteSpace: 'normal',
                                width: '100%'
                            }}>
                            {selectedReply ? selectedReply : "Thinking of a reply :) ..."}
                        </p>

                        <p className="mt-10 text-xs text-gray-400 font-mono">Sent via Anonymous</p>
                    </div>

                    {/*link design */}
                    <div style={{
                        marginTop: '30px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropBlur: '10px',
                        padding: '12px 20px',
                        borderRadius: '50px',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>
                            Create your own at:
                        </span>
                        <span style={{
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            textDecoration: 'underline'
                        }}>
                            wishbox17.netlify.app
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reply;
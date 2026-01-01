import React from 'react';

const Loading = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
            <span className="loading loading-ring loading-xl text-secondary"></span>
        </div>
    );
};

export default Loading;
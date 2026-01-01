import React from 'react';

const ThemeSelector = ( {selected, setSelected} ) => {
    return (
        <div className="flex flex-col md:flex-row gap-3 justify-center mb-6 items-center">
            <h2 className='text-xl'>Select theme - </h2>
            {
                ['happy', 'shy', 'minimal', 'peace'].map(theme=>(
                    <button className={`px-4 py-2 rounded-full capitalize ${selected === theme ? 'bg-secondary text-white':'bg-gray-200'}`}
                    key={theme} onClick={()=>setSelected(theme)}
                    >
                        {theme}
                    </button>
                ))
            }
        </div>
    );
};

export default ThemeSelector;
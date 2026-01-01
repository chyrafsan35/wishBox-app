import React from 'react';
import logoLight from '../../assets/logo1.png';
import logoSwap from '../../assets/logo2.png';

const Logo = ({ theme }) => {
    return (
        <img
            src={theme === 'swap' ? logoSwap : logoLight}
            alt="Logo"
            className="max-w-48.5"
        />
    );
};

export default Logo;

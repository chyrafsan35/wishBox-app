import React from 'react';
import Logo from '../../components/Logo/Logo';
import { FaGithub } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { useTheme } from '../../context & provider/ThemeContext';
import { Link } from 'react-router';

const Footer = () => {
    const { theme } = useTheme();
    return (
        <div>
            <footer className="footer footer-horizontal footer-center bg-secondary/20 p-10">
                <aside>
                    <Logo theme={theme}></Logo>
                    <p className="font-semibold">
                        💌 Write. Save. Share your wishes
                        <br />
                        🎉 New Year edition
                        <br />
                        🛡 No spam. No ads
                    </p>
                    <p>© {new Date().getFullYear()} WishBox</p>
                    <p>Developed by <span className='text-secondary font-semibold'><a href='https://github.com/chyrafsan35' target='_blank'>!!isRAFSAN</a></span></p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://github.com/chyrafsan35' target='_blank'>
                            <FaGithub size={32} className='text-secondary' />
                        </a>
                        <a href='mailto:chowdhury3517@gmail.com' target='_blank'>
                            <IoMail size={32} className='text-secondary' />
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
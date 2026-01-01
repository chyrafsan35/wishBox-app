import React from 'react';
import { Link } from 'react-router';
import Logo from '../../components/Logo/Logo';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context & provider/ThemeContext';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut();
    }

    const { theme, setTheme } = useTheme();

    const links = <>
        <li><Link to={'/'}>Home</Link></li>
        {
            !user ?
                <>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/register'}>Register</Link></li>
                </>
                :
                <>
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><button className='btn btn-sm btn-secondary hover:bg-[#8B5CF6] text-white' onClick={handleLogOut}>Log Out</button></li>
                </>
        }
    </>

    return (
        <div className='max-w-360 mx-auto'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Logo theme={theme}></Logo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={theme === 'swap'}
                        onChange={(e) =>
                            setTheme(e.target.checked ? 'swap' : 'light')
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
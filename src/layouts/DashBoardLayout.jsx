import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import Logo from '../components/Logo/Logo';
import { Link, Outlet } from 'react-router';
import { CgProfile } from 'react-icons/cg';
import { IoIosAddCircle, IoMdMail } from 'react-icons/io';
import { FaGift } from 'react-icons/fa';
import { useTheme } from '../context & provider/ThemeContext';

const DashBoardLayout = () => {
    const { loading } = useAuth()
    const { theme } = useTheme();
    return (
        <div className='min-h-screen'>
            {
                loading ?
                    <Loading></Loading> :
                    <div className="drawer lg:drawer-open min-h-screen">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col min-h-screen">
                            {/* Navbar */}
                            <nav className="navbar w-full bg-base-300">
                                <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    {/* Sidebar toggle icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                                </label>
                                <div className=""><Logo theme={theme}></Logo></div>
                            </nav>
                            {/* Page content here */}
                            <div className="bg-linear-to-r from-secondary to-primary flex-1">
                                <Outlet></Outlet>
                            </div>
                        </div>

                        <div className="drawer-side is-drawer-close:overflow-visible">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                            <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                                {/* Sidebar content here */}
                                <ul className="menu w-full grow">
                                    {/* List item */}
                                    <li>
                                        {/*Home icon */}
                                        <Link to="/" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                            <span className="is-drawer-close:hidden">Homepage</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="add-wishes" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Wishes">
                                            <IoIosAddCircle className="size-5"/>
                                            <span className="is-drawer-close:hidden">Add Wishes</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="my-wishes" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Wishes">
                                            <FaGift className="size-5"/>
                                            <span className="is-drawer-close:hidden">My Wishes</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="mails" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Inbox">
                                            <IoMdMail className="size-5"/>
                                            <span className="is-drawer-close:hidden">Inbox</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="my-profile" className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                            <CgProfile className="size-5" />
                                            <span className="is-drawer-close:hidden">My Profile</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default DashBoardLayout;
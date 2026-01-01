import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../shared/NavBar/NavBar';
import Footer from '../shared/Footer/Footer';
import { ThemeProvider } from '../context & provider/ThemeContext';

const RouteLayout = () => {
    return (
        <div>
            <ThemeProvider>
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Footer></Footer>
            </ThemeProvider>
        </div>
    );
};

export default RouteLayout;
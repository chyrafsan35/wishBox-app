import React from 'react';
import { createBrowserRouter } from "react-router";
import RouteLayout from '../../layouts/RouteLayout';
import Home from '../../pages/Home/Home';
import AuthLayout from '../../layouts/AuthLayout';
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/register';
import DashBoardLayout from '../../layouts/DashBoardLayout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import DashboardHome from '../../pages/Dashboard/DashboardHome/DashboardHome';
import MyProfile from '../../pages/Dashboard/MyProfile/MyProfile';
import AddWishes from '../../pages/Dashboard/AddWishes/AddWishes';
import MyWishes from '../../pages/Dashboard/MyWishes/MyWishes';
import GenerateCard from '../../components/GenerateCard/GenerateCard';
import Mails from '../../pages/Dashboard/Mails/Mails';
import PublicPage from '../../pages/PublicPage/PublicPage';
import ShareToStory from '../../components/ShareToStory/ShareToStory';
import Reply from '../../components/Reply/Reply';


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RouteLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: ':username',
                Component: PublicPage
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'my-profile',
                Component: MyProfile
            },
            {
                path: 'add-wishes',
                Component: AddWishes
            },
            {
                path: 'my-wishes',
                Component: MyWishes
            },
            {
                path: 'my-wishes/:id',
                Component: GenerateCard
            },
            {
                path: 'mails',
                Component: Mails
            },
            {
                path: 'mails/:id',
                Component: ShareToStory
            },
            {
                path: 'replyMails/:id',
                Component: Reply
            },
        ]
    }
]);
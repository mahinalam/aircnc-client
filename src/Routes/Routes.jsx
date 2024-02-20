import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Room from '../pages/Room/Room';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layout/DashboardLayout';
import AddRoom from '../pages/Dashboard/AddRoom/AddRoom';
import MyListings from '../pages/Dashboard/MyListings/MyListings';
import MyBookings from '../pages/Dashboard/MyBookings/MyBookings';
import ManageBookings from '../pages/Dashboard/ManageBookings/ManageBookings';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/room/:id',
                element: <PrivateRoute><Room></Room></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/rooms/${params.id}`)
            }

        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <Signup></Signup>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path: '/dashboard/add-room',
                element: <AddRoom></AddRoom>
            },
            {
                path: '/dashboard/my-listings',
                element: <MyListings></MyListings>
            },
            {
                path:'/dashboard/my-bookings',
                element: <MyBookings></MyBookings>
            },
            {
                path:'/dashboard/manage-bookings',
                element: <ManageBookings></ManageBookings>
            }
        ]
    }
]);

export default router;
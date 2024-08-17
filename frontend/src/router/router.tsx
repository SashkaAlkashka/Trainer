import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";

export const router = createBrowserRouter ([
    {
        path: '/', 
        element: <Layout/>,
        errorElement: <ErrorPage/>, 
        children: [
            {
                index: true, 
                element: <Home/>, 
            }, 
            {
                path: 'auth',
                element: <Auth/>
            }
        ]
    }
])
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import NotFound from "./components/NotFound";
import Home from "./pages/home";
import ShopPage from "./pages/shop";
import DetailProduct from "./pages/detail-product";
import CartPage from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountAction } from "./redux/account/accountSlice";
import { callFetchAccount } from "./services/api";

export default function useRouteElements() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.account.isLoading);
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const getAccount = async () => {
        const getAccess = localStorage.getItem('access_token');
        if (!getAccess &&
            window.location.pathname === '/login' ||
            window.location.pathname === '/register'
        )
            return;
        const res = await callFetchAccount();
        if (res && res.data) {
            dispatch(getAccountAction(res.data));
            return;
        }
    };
    useEffect(() => {
        getAccount();
    }, []);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Home /> },
                { path: 'shop', element: <ShopPage />, },
                { path: '/:id', element: <DetailProduct />, },
                { path: 'cart', element: <CartPage />, }

            ],
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
    ]);
    return router
}


import { useRoutes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import NotFound from "./components/NotFound";
import Home from "./pages/home";
import ShopPage from "./pages/shop";
import DetailProduct from "./pages/detail-product";
import CartPage from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction, getAccountAction } from "./redux/account/accountSlice";
import { callFetchAccount } from "./services/api";
import AdminLayout from './layout/AdminLayout';
import { ProtectedRoute, RoleRoute } from "./components/guardRouter";
import Checkout from "./pages/checkout";
import WishList from "./pages/wish";
import AccountUser from "./pages/user";
import Dashboard from "./admin/page/Dashboard";
import ListProductAdmin from "./admin/page/Product";
import ListCategoryAdmin from "./admin/page/Category";
import ListOrderAdmin from "./admin/page/Orders";
import ListCommentAdmin from "./admin/page/Comment";
import CreateProduct from "./admin/page/Product/createProduct";
import PolicyPage from "./pages/policy";
import ListUserAdmin from "./admin/page/User";



export default function useRouteElements() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.account.isLoading);
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

    const getAccount = async () => {
        if (isAuthenticated) {
            const res = await callFetchAccount();
            if (res && res.success) {
                dispatch(getAccountAction(res));
                return;
            }
        }
    };

    useEffect(() => {
        getAccount();
    }, []);

    const router = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Home />, key: '/' },
                { path: 'shop', element: <ShopPage />, key: '/shop', cap: 'Trang của hàng' },
                { path: 'book/:id', element: <DetailProduct />, key: '/book', cap: 'Chi Tiết Sản Phẩm' },
                { path: 'cart', element: <CartPage />, key: '/cart', cap: ' Giỏ hàng' },
                { path: 'wish', element: <WishList />, key: '/wish', cap: 'Danh sách yêu thích' },
                { path: 'checkout', key: '/checkout', element: <ProtectedRoute> <Checkout /></ProtectedRoute>, cap: 'Thanh toán' },
                { path: 'user/*', key: '/user', cap: 'Tài khoản', element: <ProtectedRoute> <AccountUser /> </ProtectedRoute> },
                { path: 'policy', key: '/policy', cap: 'Chính sách', element: <PolicyPage /> },
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

        {
            path: '/admin',
            element: <RoleRoute> <AdminLayout /> </RoleRoute>,
            children: [
                { index: true, element: <Dashboard />, key: '/' },
                { path: 'product', element: <ListProductAdmin /> },
                { path: 'create-product', element: <CreateProduct /> },
                { path: 'category', element: <ListCategoryAdmin /> },
                { path: 'order', element: <ListOrderAdmin /> },
                { path: 'comment', element: <ListCommentAdmin /> },
                { path: 'user', element: <ListUserAdmin /> },
            ],
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);
    return router;
}

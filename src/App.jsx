

import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import Home from './pages/home'
import NotFound from './components/NotFound';
import ShopPage from './pages/shop';
function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'shop', element: <ShopPage />, },
      ],
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

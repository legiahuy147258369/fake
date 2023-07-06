

import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useRouteElements from './useRoter';

function App() {
  const dispatch = useDispatch();
  const router = useRouteElements()
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

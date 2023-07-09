

import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import useRouteElements from './useRoter';
import ScrollToTop from './components/onscrollTop';


function App() {
  const router = useRouteElements();

  return (
    <div>
      <ScrollToTop>{router}</ScrollToTop>

    </div>
  )
}

export default App

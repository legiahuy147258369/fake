

import './App.scss';
import useRouteElements from './useRoter';
import ScrollToTop from './components/scroll';


function App() {
  const router = useRouteElements();

  return (
    <div>
      <ScrollToTop>{router}</ScrollToTop>
    </div>
  )
}

export default App

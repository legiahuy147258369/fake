import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})
const initialOptions = {
  "client-id": import.meta.env.VITE_CLIENT_ID,
  currency: "USD",
  // intent: "capture",
  'disable-funding': 'credit,card',
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PayPalScriptProvider options={initialOptions}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </PayPalScriptProvider>
  </BrowserRouter>
)

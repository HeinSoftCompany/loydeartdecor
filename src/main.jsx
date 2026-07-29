import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './app/router.jsx';
import { CartProvider } from '../src/context/CartContext.jsx';
import './styles/main.scss';

ReactDOM.createRoot(
  document.getElementById('root'),
).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);
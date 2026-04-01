import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import HomePage from '../pages/Home/HomePage.jsx';
import GroupPage from '../pages/Group/GroupPage.jsx';
import SubcategoryPage from '../pages/Subcategory/SubcategoryPage.jsx';
import ProductPage from '../pages/Product/ProductPage.jsx';
import NotFoundPage from '../pages/NotFound/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'produto/:productSlug', element: <ProductPage /> },
      { path: 'nao-encontrado', element: <NotFoundPage /> },
      { path: ':groupSlug/:subcategorySlug', element: <SubcategoryPage /> },
      { path: ':groupSlug', element: <GroupPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;

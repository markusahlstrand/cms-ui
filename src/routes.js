import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ModelsPage from './pages/ModelsPage';
import ModelsCreatePage from './pages/ModelsCreatePage';
import ModelsEditPage from './pages/ModelsEditPage';
import BlocksPage from './pages/BlocksPage';
import BlocksCreatePage from './pages/BlocksCreatePage';
import BlocksEditPage from './pages/BlocksEditPage';
import FieldsCreatePage from './pages/FieldsCreatePage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'models', element: <ModelsPage /> },
        { path: 'models-create', element: <ModelsCreatePage /> },
        { path: 'models/:id', element: <ModelsEditPage /> },
        { path: 'blocks', element: <BlocksPage /> },
        { path: 'blocks-create', element: <BlocksCreatePage /> },
        { path: 'blocks/:id', element: <BlocksEditPage /> },
        { path: 'fields-create', element: <FieldsCreatePage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

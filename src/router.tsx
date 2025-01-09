import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Dashboard } from '@/pages/dashboard';
import { Landing } from '@/pages/landing';
import { About } from '@/pages/about';
import { Product } from '@/pages/product';
import { NotFound } from '@/pages/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'about', element: <About /> },
      { path: 'product', element: <Product /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
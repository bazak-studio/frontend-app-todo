import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { AuthGuard } from '@/components/auth-guard';
import { Dashboard } from '@/pages/dashboard';
import { Landing } from '@/pages/landing';
import { About } from '@/pages/about';
import { Product } from '@/pages/product';
import { NotFound } from '@/pages/not-found';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        ),
      },
      { path: 'about', element: <About /> },
      { path: 'product', element: <Product /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
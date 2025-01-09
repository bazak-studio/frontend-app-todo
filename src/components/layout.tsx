import { Outlet } from 'react-router-dom';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
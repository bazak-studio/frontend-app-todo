import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <CheckSquare className="h-6 w-6" />
          <span className="font-bold text-xl">TaskMaster</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/product" className="text-muted-foreground hover:text-foreground hidden md:inline-block">
            Product
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground hidden md:inline-block">
            About
          </Link>
          <ThemeToggle />
          <Button asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t mt-32">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <CheckSquare className="h-6 w-6" />
              <span className="font-bold text-xl">TaskMaster</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Organize your life with TaskMaster, the most intuitive todo app.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/product" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-sm text-muted-foreground hover:text-foreground">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  Team
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TaskMaster. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
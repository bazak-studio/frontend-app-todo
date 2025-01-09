import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
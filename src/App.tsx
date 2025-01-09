import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Router } from '@/router';
import { TooltipProvider } from '@/components/ui/tooltip';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="todo-theme">
      <TooltipProvider>
        <Router />
        <Toaster position="bottom-right" />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
# TaskMaster

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-brightgreen.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

TaskMaster is a modern, intuitive todo application built with React, TypeScript, and Vite. It features a beautiful UI powered by shadcn/ui, drag-and-drop task management, and a dark/light theme switcher.

![TaskMaster Screenshot](screenshot.png)

## Features

- 📝 Intuitive task management
- 🎨 Beautiful UI with shadcn/ui components
- 🌓 Dark/light theme support
- 🎯 Task prioritization
- 📅 Due date tracking
- 🏷️ Task categorization
- ⌨️ Keyboard shortcuts
- 📱 Responsive design

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskmaster.git
cd taskmaster
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url_here
```

## Usage

### Creating a Task

```typescript
import { useTodoStore } from '@/stores/todo-store';

const { addTodo } = useTodoStore();

// Add a new task
addTodo({
  title: 'New Task',
  description: 'Task description',
  priority: 1,
  status: 'pending',
  dueDate: '2024-03-20T00:00:00Z',
  categories: ['Work']
});
```

### Managing Tasks

```typescript
const { toggleTodo, updateTodo, deleteTodo } = useTodoStore();

// Toggle task completion
toggleTodo('task-id');

// Update task
updateTodo('task-id', { title: 'Updated Title' });

// Delete task
deleteTodo('task-id');
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and API clients
├── pages/         # Application pages/routes
├── stores/        # State management (Zustand)
└── types/         # TypeScript type definitions
```

## Testing

Run the test suite:

```bash
npm run test
```

## Building for Production

Build the application:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Known Limitations

- Local storage only (no backend integration yet)
- Limited to personal use (no team collaboration features)
- No offline support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Maintainer: [Your Name](mailto:your.email@example.com)

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [dnd-kit](https://dndkit.com/) for drag and drop functionality
- [Lucide](https://lucide.dev/) for icons
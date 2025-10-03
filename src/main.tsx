// src/main.tsx
// application entry point w/ React StrictMode

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ProjectsPage from './pages/ProjectsPage.tsx';

const normalizePathname = (pathname: string): string => {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/$/, '') || '/';
};

const currentPath = normalizePathname(window.location.pathname);

const CurrentView = currentPath === '/projects' ? ProjectsPage : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentView />
  </StrictMode>
);

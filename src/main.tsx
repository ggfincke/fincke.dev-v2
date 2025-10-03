// src/main.tsx
// application entry point w/ React StrictMode & routing

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '~/index.css';
import App from '~/App';
import { ProjectsPage } from '~/pages/ProjectsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

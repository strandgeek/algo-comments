import { ApolloProvider } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { client } from './client';
import { CreateProjectPage } from './routes/CreateProjectPage';

// Routes
import { Home } from './routes/Home';
import { ProjectsPage } from './routes/ProjectsPage';
import { ViewProjectPage } from './routes/ViewProjectPage';
import { ActivateProjectPage } from './routes/ActivateProjectPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/app/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/app/projects/create',
    element: <CreateProjectPage />,
  },
  {
    path: '/app/projects/:projectId',
    element: <ViewProjectPage />,
  },
  {
    path: '/app/projects/:projectId/activate',
    element: <ActivateProjectPage />,
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <ToastContainer />
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;

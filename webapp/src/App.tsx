import { ApolloProvider } from '@apollo/client';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { client } from './client';
import { CreateProjectPage } from './routes/CreateProjectPage';

// Routes
import { Home } from './routes/Home';
import { ProjectsPage } from './routes/ProjectsPage';

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
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;

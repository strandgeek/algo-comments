import { ApolloProvider } from '@apollo/client';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { client } from './client';

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
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;

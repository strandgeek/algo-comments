import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Routes
import { Home } from './routes/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

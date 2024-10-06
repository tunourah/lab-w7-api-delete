import React from 'react';
import Add from '../Pages/Add';
import App from '../App';
import { createBrowserRouter } from "react-router-dom";
import Home from '../Pages/Home';
import Landingpage from '../Pages/Landingpage';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path:'/landingpage',
    element: <Landingpage />
  }

]);

export default Router;

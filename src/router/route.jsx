import { createBrowserRouter } from "react-router-dom";
import Layout from "../container/Layout";
import Dashboard from "../container/Dashboard/Dashboard";
import Projects from "../container/Projects/Projects";
import Estimation from "../container/Estimation/Estimation";
import Signin from "../container/Auth/Signin";
import ProtectedRoutes from "./ProtectedRoutes";
import Signup from "../container/Auth/SignUp";
import AddProject from "../container/Projects/AddProject";
import AddEstimation from "../container/Estimation/AddEstimation";
import ForgotPassword from "../container/Auth/Forgotpassword";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/projects",
        element: (
          <ProtectedRoutes>
            <Projects />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/projects/add",
        element: (
          <ProtectedRoutes>
            <AddProject />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/projects/edit/:id",
        element: (
          <ProtectedRoutes>
            <AddProject />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/estimation",
        element: (
          <ProtectedRoutes>
            <Estimation />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/estimation/add",
        element: (
          <ProtectedRoutes>
            <AddEstimation />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/estimation/edit/:id",
        element: (
          <ProtectedRoutes>
            <AddEstimation />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

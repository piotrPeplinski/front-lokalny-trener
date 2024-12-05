import { RouteObject } from "react-router-dom";
import HomePage from "./modules/HomePage/HomePage";
import Register from "./modules/Auth/Register";
import AppLayout from "./App.layout";

const RouterBuilder = () => {
  // components specified in general routers will have navbar and footer (components specified in App.layout.tsx)
  const generalRouters: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  const routers: RouteObject[] = [
    {
      element: <AppLayout />,
      children: generalRouters,
    },
  ];

  return routers;
};

export default RouterBuilder;

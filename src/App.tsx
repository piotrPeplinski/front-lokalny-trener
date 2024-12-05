import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouterBuilder from "./RouterBuilder";
import "./assets/css/font-faces.css";
import "./assets/css/main.css";

const App = () => {
  const routes = useMemo(() => RouterBuilder(), []);

  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default App;

import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouterBuilder from "./RouterBuilder";
import "./assets/css/font-faces.css";
import "./assets/css/main.css";
import { AuthProvider } from "./modules/Auth/context/auth-context";

const App = () => {
  const routes = useMemo(() => RouterBuilder(), []);

  return (
    <AuthProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </AuthProvider>
  );
};

export default App;

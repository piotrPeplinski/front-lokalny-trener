import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouterBuilder from "./RouterBuilder";
import "./assets/css/font-faces.css";
import "./assets/css/main.css";

// Define the router outside the component if static
const router = createBrowserRouter(RouterBuilder());

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

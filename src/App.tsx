import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouterBuilder from "./RouterBuilder";
import "./assets/css/font-faces.css";
import "./assets/css/main.css";
import "./assets/css/mainQueries.css";
import DefaultHelmet from "./DefaultHelmet";

// Define the router outside the component if static
const router = createBrowserRouter(RouterBuilder());

const App = () => {
  return (
    <>
      <DefaultHelmet />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;

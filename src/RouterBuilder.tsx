import { RouteObject } from "react-router-dom";
import HomePage from "./modules/HomePage/HomePage";
import RegisterScreen from "./modules/Auth/RegisterScreen";
import AppLayout from "./App.layout";
import LoginScreen from "./modules/Auth/LoginScreen";
import ProfileScreen from "./modules/Profile/ProfileScreen";
import { ProfileProvider } from "./modules/Profile/context/profile-context";
import AddAdScreen from "./modules/Ads/AddAdScreen";
import AdDetail from "./modules/Ads/AdDetailScreen";
import AdDetailScreen from "./modules/Ads/AdDetailScreen";

const RouterBuilder = () => {
  // components specified in general routers will have navbar and footer (components specified in App.layout.tsx)
  const generalRouters: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/register",
      element: <RegisterScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/profile",
      element: (
        <ProfileProvider>
          <ProfileScreen />
        </ProfileProvider>
      ),
    },
    {
      path: "/add",
      element: (
        <ProfileProvider>
          <AddAdScreen />
        </ProfileProvider>
      ),
    },
    {
      path: "/ads/:adId",
      element: (
        <ProfileProvider>
          <AdDetailScreen />
        </ProfileProvider>
      ),
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

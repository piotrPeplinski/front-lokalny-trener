import { RouteObject } from "react-router-dom";
import HomePage from "./modules/HomePage/HomePage";
import RegisterScreen from "./modules/Auth/RegisterScreen";
import AppLayout from "./App.layout";
import LoginScreen from "./modules/Auth/LoginScreen";
import ProfileScreen from "./modules/Profile/ProfileScreen";
import { ProfileProvider } from "./modules/Profile/context/profile-context";
import AddAdScreen from "./modules/Ads/AddAdScreen";
import AdDetailScreen from "./modules/Ads/AdDetailScreen";
import AdsScreen from "./modules/Ads/AdsScreen";
import ProtectedRoute from "./api/ProtectedRoute";

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
        <ProtectedRoute>
          <ProfileProvider>
            <ProfileScreen />
          </ProfileProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/add",
      element: (
        <ProtectedRoute>
          <ProfileProvider>
            <AddAdScreen />
          </ProfileProvider>
        </ProtectedRoute>
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
    {
      path: "/search/:subcategoryId/:location",
      element: (
        <ProfileProvider>
          <AdsScreen />
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

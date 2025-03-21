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
import ClientAdDetailScreen from "./modules/Ads/ClientAdDetailScreen";
import VerifyEmailScreen from "./modules/Auth/VerifyEmailScreen";
import RequestPasswordResetScreen from "./modules/Auth/RequestPasswordResetScreen";
import ResetPasswordScreen from "./modules/Auth/ResetPasswordScreen";
import PricingScreen from "./modules/Payments/PricingScreen";
import SuccessScreen from "./modules/Payments/SuccessScreen";
import FailScreen from "./modules/Payments/FailScreen";
import SubscriptionScreen from "./modules/Payments/SubscriptionScreen";
import AboutScreen from "./modules/HomePage/AboutScreen";
import Policy from "./modules/Formal/policy";
import Statute from "./modules/Formal/statute";
import RegisterSuccess from "./modules/Auth/RegisterSuccess";

const RouterBuilder = () => {
  // components specified in general routers will have navbar and footer (components specified in App.layout.tsx)
  const generalRouters: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutScreen />,
    },
    //AUTH
    {
      path: "/register",
      element: <RegisterScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/verify-email",
      element: <VerifyEmailScreen />,
    },
    {
      path: "/request-password-reset",
      element: <RequestPasswordResetScreen />,
    },
    {
      path: "/password-reset",
      element: <ResetPasswordScreen />,
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
      path: "/client-ads/:adId",
      element: (
        <ProfileProvider>
          <ClientAdDetailScreen />
        </ProfileProvider>
      ),
    },
    {
      path: "/search/:subcategoryId/:location/:trainer_ads",
      element: (
        <ProfileProvider>
          <AdsScreen />
        </ProfileProvider>
      ),
    },
    //PAYMENTS
    {
      path: "/pricing",
      element: (
        <ProfileProvider>
          <PricingScreen />
        </ProfileProvider>
      ),
    },
    {
      path: "/payment-success",
      element: (
        <ProfileProvider>
          <SuccessScreen />
        </ProfileProvider>
      ),
    },
    {
      path: "/register-success",
      element: <RegisterSuccess />,
    },
    {
      path: "/payment-fail",
      element: (
        <ProfileProvider>
          <FailScreen />
        </ProfileProvider>
      ),
    },
    {
      path: "/subscription",
      element: (
        <ProtectedRoute>
          <SubscriptionScreen />
        </ProtectedRoute>
      ),
    },
    {
      path: "/policy",
      element: <Policy />,
    },
    {
      path: "/statute",
      element: <Statute />,
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

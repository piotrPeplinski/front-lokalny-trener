import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./modules/HomePage/components/NavBar";
import Footer from "./modules/HomePage/components/Footer";

const AppLayout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <Outlet />
      <Footer />
    </Suspense>
  );
};

export default React.memo(AppLayout);

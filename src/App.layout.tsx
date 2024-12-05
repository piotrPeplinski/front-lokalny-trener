import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./modules/HomePage/components/NavBar";

const AppLayout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <Outlet />
    </Suspense>
  );
};

export default React.memo(AppLayout);

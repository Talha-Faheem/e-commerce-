import React, { useEffect } from "react";
import Header from "../component/header";
import { Outlet } from "react-router-dom";

function Homepage() {



  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Homepage;
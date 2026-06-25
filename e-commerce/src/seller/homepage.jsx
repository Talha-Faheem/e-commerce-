import { Outlet } from "react-router-dom";
import Header from "../customer/header";

function Homepage() {



  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Homepage;
import React, { useEffect } from "react";
import Header from "../component/header";
import { Outlet } from "react-router-dom";

function Homepage() {

  useEffect(() => {

    const getBooks = async () => {
      try {

        const res = await fetch("http://localhost:3000/data", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        console.log(data);

        if (!data.success) {
          alert("Failed to fetch books");
        }

      } catch (error) {

        console.log(error);
        alert("Server error");

      }
    };

    getBooks();

  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Homepage;
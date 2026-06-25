
import { Route, Routes } from "react-router-dom";

import Login from "./login/login";

import Homepage from "./seller/homepage";
import Inventory from "./seller/inventory";
import Seller from "./seller/seller";

import Checkout from "./customer/checkout";
import Mainpages from "./customer/mainpages";
import Order from "./customer/order";
import Productdetial from "./customer/productdetial";
import Productpage from "./customer/productpage";

import RoleProtectedRoute from "./protectedroute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/customer"
        element={
          <RoleProtectedRoute allowedRole={3}>
            <Homepage />
          </RoleProtectedRoute>
        }
      >
        <Route
          index
          element={<Mainpages />}
        />

        <Route
          path="allproduct"
          element={<Productpage />}
        />

        <Route
          path="product/:id"
          element={<Productdetial />}
        />

        <Route
          path="checkout"
          element={<Checkout />}
        />

        <Route
          path="orderhistory"
          element={<Order />}
        />
      </Route>

      <Route
        path="/seller"
        element={
          <RoleProtectedRoute allowedRole={2}>
            <Seller />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <RoleProtectedRoute allowedRole={2}>
            <Inventory />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <h1 className="text-center mt-20 text-2xl">
            404 Page Not Found
          </h1>
        }
      />
    </Routes>
  );
}

export default App;

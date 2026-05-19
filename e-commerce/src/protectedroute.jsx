import { Navigate, Outlet } from "react-router-dom";
import {useauth} from "./utilities/authprodiver"
export default function ProtectedRoute() {

  const {user,loading}=useauth()
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/" />;
  }
  

  return <Outlet />;
}
import { Navigate } from "react-router-dom";
import { useauth } from "./utilities/authprovider";

export default function RoleProtectedRoute({
  children,
  allowedRole,
}) {
  const { user, loading } = useauth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role_id !== allowedRole) {
    return (
      <Navigate
        to={
          user.role_id === 2
            ? "/seller"
            : "/customer"
        }
      />
    );
  }

  return children;
}
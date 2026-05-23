import { Navigate } from "react-router-dom";

function RoleProtectedRoute({
  children,

  allowedRoles,
}) {
  // GET USER

  const user = JSON.parse(localStorage.getItem("user"));

  // NOT LOGGED IN

  if (!user) {
    return <Navigate to="/" />;
  }

  // ROLE LOWERCASE

  const userRole = user.role?.toLowerCase();

  // ACCESS CHECK

  const hasAccess = allowedRoles.includes(userRole);

  // NO ACCESS

  if (!hasAccess) {
    // REDIRECT BASED ON ROLE

    if (userRole === "member") {
      return <Navigate to="/books" />;
    }

    if (userRole === "librarian") {
      return <Navigate to="/inventory" />;
    }

    return <Navigate to="/dashboard" />;
  }

  // ALLOW ACCESS

  return children;
}

export default RoleProtectedRoute;

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // GET TOKEN

  const token = localStorage.getItem("token");

  // IF TOKEN NOT EXISTS

  if (!token) {
    return <Navigate to="/" />;
  }

  // ALLOW ACCESS

  return children;
}

export default ProtectedRoute;

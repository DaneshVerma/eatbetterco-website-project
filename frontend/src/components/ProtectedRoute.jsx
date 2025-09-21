import { isLoggedIn } from "../utils/auth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authed = isLoggedIn();
  console.log(authed);
  const location = useLocation();
  if (!authed) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;

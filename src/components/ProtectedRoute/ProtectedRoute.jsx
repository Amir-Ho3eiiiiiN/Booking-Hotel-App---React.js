import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const naviagate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated)
      naviagate("/login", {
        replace: true,
        state: { from: location, redirectUrl: window.location.href },
      }); //AUTHENTICATON
  }, [isAuthenticated, naviagate]);

  return isAuthenticated ? children : null;
}
export default ProtectedRoute;

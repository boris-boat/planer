import { Navigate } from "react-router-dom";
import { useStateContext } from "./StateContext";

const ProtectedRoute = ({ children }) => {
  const { fullUserInfo } = useStateContext();

  //component that checks for user object

  if (!fullUserInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

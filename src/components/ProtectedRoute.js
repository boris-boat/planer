import {Navigate } from 'react-router-dom';


const ProtectedRoute = ({children }) => {
  //component that checks for user object
  let user = localStorage.getItem("user")

    if (!user) {
      return <Navigate to="/nouser" replace />;
    }
    
    return children;
  };

  export default ProtectedRoute;
import {Navigate } from 'react-router-dom';


const ProtectedRoute = ({children }) => {
    let user = localStorage.getItem("user")?.split(" ")[0];
    if (!user) {
      return <Navigate to="/nouser" replace />;
    }
    
    return children;
  };

  export default ProtectedRoute;
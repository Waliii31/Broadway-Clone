import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token"); // Retrieve JWT from localStorage

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

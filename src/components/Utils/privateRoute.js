import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { toast } from "react-toastify";

function PrivateRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated && location.pathname !== "/ingreso") {
            let user = localStorage.getItem("idMember");
            if (user) {
                navigate("/welcome");
            } else {
                navigate("/ingreso");
                toast.error("Debes iniciar sesión para acceder a esta página");
            }
        }
    }, []);

    if (!isAuthenticated) {
        return null;
    }

    return children;
}

export default PrivateRoute;
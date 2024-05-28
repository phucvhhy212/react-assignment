import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export default function RequiredAuth(props) {
    const {children} = props;
    const {isAuthenticated} = useAuthContext()

    return isAuthenticated ? children : <Navigate to="/login"/>
}
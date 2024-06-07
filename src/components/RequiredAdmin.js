import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function RequiredRole(props) {
    console.log(props.role);
    console.log(jwtDecode(localStorage.getItem("token")).role == props.role);
    return jwtDecode(localStorage.getItem("token")).role == props.role ? props.children : <Navigate to="/login"/>
}
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/authContext";

export default function Login() {
    const navigate = useNavigate();
    const {setIsAuthenticated,setUser} = useAuthContext()
    const login = () =>{
        //call api
        setIsAuthenticated(true);
        setUser({name: 'abc', id: 123})
        localStorage.setItem("token", "212313")
        navigate("/posts")
    }
    return <div>Login Page</div>
}
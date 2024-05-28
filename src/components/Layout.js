import { Link } from "react-router-dom";
import AppRoutes from "../route/AppRoutes";

export default function Layout() {
    return (
        <>
            <div>
                <nav>
                    <Link to="/books" style={{ padding: "10px" }}>Books</Link>
                    <Link to="/profile" style={{ padding: "10px" }}>Profile</Link>
                    <Link to="/login" style={{ padding: "10px" }}>Login</Link>
                    <Link to="/book/:id" style={{ padding: "10px" }}>Book Detail</Link>
                </nav>
            </div>
            <div>
                <AppRoutes></AppRoutes>
            </div>
        </>
    )
}
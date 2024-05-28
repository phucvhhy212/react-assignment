import { useRoutes } from "react-router-dom";
import Book from "../components/Book";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Books from "../pages/Books";
import BookDetail from "../pages/BookDetail";
import NotFound from "../components/NotFound";
import RequiredAuth from "../components/RequiredAuth";

export default function AppRoutes() {
    const elements = useRoutes(
        [
            {
                path: '/books', element: <Books/>
            },
            {
                path: '/login', element: <Login/>
            },
            {
                path: '/profile', element: <RequiredAuth><Profile/></RequiredAuth>
            },
            {
                path: '/book/:id', element: <BookDetail/>
            },
            {
                path: '*',
                element: <NotFound></NotFound>
            }
        ]
    )
    return elements
}
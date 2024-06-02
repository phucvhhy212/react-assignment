import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

import BookDetail from "../pages/BookDetail";
import NotFound from "../pages/NotFound";
import RequiredAuth from "../components/RequiredAuth";
import Book from "../pages/Book";
import Home from "../pages/Home";

export default function AppRoutes() {
    const elements = useRoutes(
        [
            {
                path: '/books', element: <Book/>
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
                path: '', element: <Home/>
            },
            {
                path: '*',
                element: <NotFound></NotFound>
            }
        ]
    )
    return elements
}
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import BookDetail from "../pages/BookDetail";
import NotFound from "../pages/NotFound";
import RequiredAuth from "../components/RequiredAuth";
import Book from "../pages/Book";
import Home from "../pages/Home";
import BorrowingRequest from "../pages/BorrowingRequest";
import HistoryRequest from "../pages/HistoryRequest";
import { Book as AdminBook } from "../pages/admin/Book";
import { Category as AdminCategory } from "../pages/admin/Category";
import { BorrowingRequest as AdminBorrowingRequest } from "../pages/admin/BorrowingRequest";
import { BookDetail as AdminBookDetail } from "../pages/admin/BookDetail";
import { CategoryDetail as AdminCategoryDetail } from "../pages/admin/CategoryDetail";
import CreateBook from "../pages/admin/CreateBook";
import EditBook from "../pages/admin/EditBook";

import EditCategory from "../pages/admin/EditCategory";
import CreateCategory from "../pages/admin/CreateCategory";
import BorrowingRequestDetail from "../pages/admin/BorrowingRequestDetail";
import RequiredRole from "../components/RequiredAdmin";
import Signup from "../pages/Signup";




export default function AppRoutes() {
    const elements = useRoutes(
        [
            {
                path: '/books', element: <Book />
            },
            {
                path: '/login', element: <Login />
            },
            {
                path: '/signup', element: <Signup />
            },
            {
                path: '/book/:id', element: <BookDetail />
            },
            {
                path: '/borrowing', element: <RequiredAuth><RequiredRole role="User"><BorrowingRequest /></RequiredRole></RequiredAuth>
            },
            {
                path: '/history', element: <RequiredAuth><RequiredRole role="User"><HistoryRequest /></RequiredRole></RequiredAuth>
            },
            {
                path: '', element: <Home />
            },
            {
                path: '/admin/books', element: <RequiredAuth><RequiredRole role="Admin"><AdminBook></AdminBook></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/categories', element: <RequiredAuth><RequiredRole role="Admin"><AdminCategory role="Admin"></AdminCategory></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/borrowingrequests', element: <RequiredAuth><RequiredRole role= "Admin"><AdminBorrowingRequest></AdminBorrowingRequest></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/books/create', element: <RequiredAuth><RequiredRole role= "Admin"><CreateBook></CreateBook></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/categories/create', element: <RequiredAuth><RequiredRole role= "Admin"><CreateCategory></CreateCategory></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/books/:id', element: <RequiredAuth><RequiredRole role= "Admin"><AdminBookDetail></AdminBookDetail></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/categories/:id', element: <RequiredAuth><RequiredRole role= "Admin"><AdminCategoryDetail></AdminCategoryDetail></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/borrowingRequests/:id', element: <RequiredAuth><RequiredRole role= "Admin"><BorrowingRequestDetail></BorrowingRequestDetail></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/books/edit/:id', element: <RequiredAuth><RequiredRole role= "Admin"><EditBook></EditBook></RequiredRole></RequiredAuth>
            },
            {
                path: '/admin/categories/edit/:id', element: <RequiredAuth><RequiredRole role= "Admin"><EditCategory></EditCategory></RequiredRole></RequiredAuth>
            },
            {
                path: '*',
                element: <NotFound></NotFound>
            }
        ]
    )
    return elements
}
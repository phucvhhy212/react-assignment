import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import AuthProvider from "./context/authContext";
import AppRoutes from "./route/AppRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BookFilterProvider } from "./context/bookFilterContext";
import { CountBookInRequestProvider } from "./context/countBookInRequestContext";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <BookFilterProvider>
          <CountBookInRequestProvider>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="colored" newestOnTop />
            <AppRoutes></AppRoutes>
          </CountBookInRequestProvider>
        </BookFilterProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;

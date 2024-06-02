import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import AuthProvider from "./context/authContext";
import AppRoutes from "./route/AppRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="colored" newestOnTop/>
        <AppRoutes></AppRoutes>
      </AuthProvider>
    </>
  );
}

export default App;

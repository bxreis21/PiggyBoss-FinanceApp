import { Routes, Route } from 'react-router-dom';
import Login from "./pages/LoginPage/Login.js";
import Register from "./pages/RegisterPage/Register.js";

export default function AccountRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

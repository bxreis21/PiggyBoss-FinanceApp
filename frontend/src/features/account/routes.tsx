import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";

export default function AccountRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

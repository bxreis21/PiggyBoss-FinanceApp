import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage/Dashboard.js';

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    );
}
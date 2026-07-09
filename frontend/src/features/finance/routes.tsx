import { Routes, Route } from 'react-router-dom';
import Finance from './pages/Finance/Finance.js';
import Balance from './pages/Balance/Balance.js';

export default function FinanceRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Finance />} />
            <Route path="/balance" element={<Balance />} />
        </Routes>
    );
}

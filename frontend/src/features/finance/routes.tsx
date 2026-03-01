import { Routes, Route } from 'react-router-dom';
import Finance from './pages/FinancePage/Finance.js';
import Balance from './pages/BalancePage/BalancePage.js';

export default function FinanceRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Finance />} />
            <Route path="/balance" element={<Balance />} />
        </Routes>
    );
}

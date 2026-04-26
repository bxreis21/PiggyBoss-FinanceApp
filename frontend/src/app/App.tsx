import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider.jsx';


import NavBar from '../features/navbar/NavBar.js'

import Home from '../features/home/Home.js';
import AccountRoutes from '../features/account/routes.js';
import FinanceRoutes from '../features/finance/routes.js';
import DashboardRoutes from '../features/dashboard/routes.js';
// import CardsAndBanks from './pages/finance/CardsAndBanks.jsx';
// import ForgotPassword from "./pages/account/ForgotPassword";
// import Transactions from './pages/finance/Transactions.jsx';
// import Budgets from './pages/planning/Budgets.jsx';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/*" element={<AccountRoutes />} />
          <Route path="/finance/*" element={<FinanceRoutes />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


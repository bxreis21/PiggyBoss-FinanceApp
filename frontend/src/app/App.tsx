import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider.jsx';


import NavBar from '../features/navbar/NavBar.js'

import Home from '../features/home/pages/Home.js';
import AccountRoutes from '../features/account/routes.js';
import FinanceRoutes from '../features/finance/routes.js';
import DashboardRoutes from '../features/dashboard/routes.js';
import ProtectedRoute from './components/ProtectedRoute.js';
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
          <Route
            path="/finance/*"
            element={
              <ProtectedRoute>
                <FinanceRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


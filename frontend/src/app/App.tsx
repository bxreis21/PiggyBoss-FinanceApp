import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider.jsx';
import { Login } from '../features/account/pages/LoginPage/Login.js';
// import Register from './pages/account/Register.jsx';
// import NavBar from '../components/app/NavBar.jsx';
// import Dashboard from './pages/dashboard/Dashboard.jsx';
// import CardsAndBanks from './pages/finance/CardsAndBanks.jsx';
// import ForgotPassword from "./pages/account/ForgotPassword";
// import Transactions from './pages/finance/Transactions.jsx';
// import Budgets from './pages/planning/Budgets.jsx';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cardsandbanks" element={<CardsAndBanks />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budgets" element={<Budgets />} /> */}
      </Routes>
      </AuthProvider>
    </Router>
  );
}


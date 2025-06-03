import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Repair from './Repair';
import Payment from './Payment';
import BillDetail from './BillDetail';
import Register from './Register';
import Status from './Status';
import Dashboard from './Dashboard';
import Machanic from './Machanic';
import Machanicstatus from './machanicstatus';
import MachanicCase from './machaniccase';
import MenuPage from './MenuPage';
import Meet from './Meet'; 
import FinancePage from './FinancePage';
import PaymentMethod from './PaymentMethod';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/my-bills" element={<Payment />} />
        <Route path="/bill-detail/:id" element={<BillDetail />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/status" element={<Status />} />
        <Route path="/payment-method/:id" element={<PaymentMethod />} />

        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/machaniccase" element={<MachanicCase />} />
        <Route path="/machanicstatus" element={<Machanicstatus />} />
        <Route path="/machanic/:userId/:taskId" element={<Machanic />} />

        <Route path="/MenuPage" element={<MenuPage />}>
          <Route path="meet" element={<Meet />} />
          <Route path="finance" element={<FinancePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

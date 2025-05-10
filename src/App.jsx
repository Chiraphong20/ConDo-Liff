import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Repair from './Repair';
import Payment from './Payment';
import BillDetail from './BillDetail';
import Register from './Register';
import Meet from './meet';
import Status from './Status';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/my-bills" element={<Payment />} />
        <Route path="/bill-detail" element={<BillDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meet" element={<Meet />} />
        <Route path="/status" element={<Status />} />


      </Routes>
    </Router>
  );
}

export default App;

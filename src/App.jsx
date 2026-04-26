import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import EconomyNews from './pages/EconomyNews';
import SendMoney from './pages/SendMoney';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/news" element={<EconomyNews />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
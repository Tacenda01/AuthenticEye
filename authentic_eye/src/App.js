import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import Contact from "./Components/Contact/contact";
import FAQs from './Components/Faqs/faqs';
import Home from './Components/Home/home';
import './App.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/faqs' element={<FAQs />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
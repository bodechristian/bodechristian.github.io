import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import WordleSolver from './pages/WordleSolver';
import ConnectionsComponent from './pages/Connections';
import Video from './pages/Video';
import Recordings from './pages/Recordings';
import Chess from './pages/Chess';
import KZTourney from './pages/KZTourney';
import KZCC from './pages/KZCC'
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navbar>

        </Navbar>

        <div className="content container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wordle" element={<WordleSolver />} />
            <Route path="/connections" element={<ConnectionsComponent />} />
            <Route path="/video" element={<Video />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/chess" element={<Chess />} />
            <Route path="/kztourney" element={<KZTourney />} />
            <Route path="/kzCC" element={<KZCC />} />
          </Routes>
        </div>

        <Footer>

        </Footer>
      </div>
    </Router>
  );
}

export default App;

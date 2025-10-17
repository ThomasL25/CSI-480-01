import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ThomasPage from './pages/ThomasPage';
import JustinPage from './pages/JustinPage';
import ZackPage from './pages/ZackPage';

function App() {
    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <div className="nav-container">
                        <Link to="/" className="nav-logo">My Project</Link>
                        <ul className="nav-menu">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/thomas" className="nav-link">Thomas</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/justin" className="nav-link">Justin</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/zack" className="nav-link">Zack</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/thomas" element={<ThomasPage />} />
                        <Route path="/justin" element={<JustinPage />} />
                        <Route path="/zack" element={<ZackPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
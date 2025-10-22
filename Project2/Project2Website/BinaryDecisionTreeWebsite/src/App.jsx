import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import VisualizationPage from './pages/VisualizationPage';

function App() {
    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <div className="nav-container">
                        <Link to="/" className="nav-logo">Binary Decision Tree</Link>
                        <ul className="nav-menu">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/visualization" className="nav-link">Visualization</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/visualization" element={<VisualizationPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

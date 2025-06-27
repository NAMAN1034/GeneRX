import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Welcome from './pages/Welcome';
import Upload from './pages/Upload';
import Report from './pages/Report';
import CrashCourse from './pages/CrashCourse';
import FunFacts from './pages/FunFacts';
import AboutUs from './pages/AboutUs';
import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/report" element={<Report />} />
            <Route path="/crash-course" element={<CrashCourse />} />
            <Route path="/fun-facts" element={<FunFacts />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
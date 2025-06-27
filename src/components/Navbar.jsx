import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-blue-600 dark:bg-blue-800 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/GeneRXLogo.png" alt="GeneRX Logo" className="h-10 mr-2" />
          <span className="text-2xl font-bold">GeneRX</span>
        </div>
        <div className="space-x-4 hidden md:flex">
          <NavLink to="/" className="hover:underline">Welcome</NavLink>
          <NavLink to="/upload" className="hover:underline">Upload</NavLink>
          <NavLink to="/report" className="hover:underline">Report</NavLink>
          <NavLink to="/crash-course" className="hover:underline">Crash Course</NavLink>
          <NavLink to="/fun-facts" className="hover:underline">Fun Facts</NavLink>
          <NavLink to="/about-us" className="hover:underline">About Us</NavLink>
        </div>
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
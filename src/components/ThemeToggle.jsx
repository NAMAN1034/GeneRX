import { motion } from 'framer-motion';

function ThemeToggle({ toggleTheme, theme }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 bg-blue-600 dark:bg-blue-800 text-white rounded-full"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </motion.button>
  );
}

export default ThemeToggle;
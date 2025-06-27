import { motion } from 'framer-motion';

function Welcome() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to GeneRX</h1>
      <img src="/GeneRXLogo.png" alt="GeneRX Logo" className="mx-auto h-32 mb-4" />
      <p className="text-lg mb-4">
        Unlock personalized health insights with GeneRX. Upload your SNP data to discover how your genetics influence drug responses and lifestyle choices.
      </p>
      <a href="/upload" className="bg-blue-600 dark:bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700">
        Get Started
      </a>
    </motion.div>
  );
}

export default Welcome;
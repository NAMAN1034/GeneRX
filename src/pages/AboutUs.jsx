import { motion } from 'framer-motion';

function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">About GeneRX</h2>
      <p className="mb-4">
        GeneRX is a student-developed application for the Congressional App Challenge, aimed at making pharmacogenomics accessible to everyone.
      </p>
      <p>
        Our mission is to empower individuals with personalized health insights through cutting-edge genetic analysis.
      </p>
    </motion.div>
  );
}

export default AboutUs;
import { motion } from 'framer-motion';

function FunFacts() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">Fun Facts About Pharmacogenomics</h2>
      <ul className="list-disc pl-6">
        <li>Over 90% of people have at least one actionable pharmacogenomic variant!</li>
        <li>Caffeine metabolism is influenced by the CYP1A2 gene.</li>
        <li>Warfarin dosing can vary 10-fold based on genetics.</li>
      </ul>
    </motion.div>
  );
}

export default FunFacts;
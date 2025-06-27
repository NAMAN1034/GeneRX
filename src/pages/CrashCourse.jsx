import { motion } from 'framer-motion';

function CrashCourse() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">Pharmacogenomics Crash Course</h2>
      <img src="/crash-course-image.jpg" alt="Pharmacogenomics Diagram" className="w-full h-64 object-cover mb-4 rounded" />
      <p className="mb-4">
        Pharmacogenomics studies how genes affect a person’s response to drugs. Single Nucleotide Polymorphisms (SNPs) are variations in DNA that can influence drug metabolism.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>CYP2C9</strong>: Affects metabolism of drugs like warfarin.</li>
        <li><strong>CYP2D6</strong>: Influences response to antidepressants.</li>
        <li><strong>Lifestyle SNPs</strong>: Impact diet, exercise, and more.</li>
      </ul>
      <p>
        Learn more at <a href="https://www.pharmgkb.org" className="text-blue-600 hover:underline">PharmGKB</a>.
      </p>
    </motion.div>
  );
}

export default CrashCourse;
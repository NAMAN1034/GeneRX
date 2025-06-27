import { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a .csv file.');
      return;
    }

    Papa.parse(file, {
      complete: async (result) => {
        const data = result.data;
        if (!data[0] || !data[0].rsid || !data[0].chromosome || !data[0].position || !data[0].genotype) {
          setError('Invalid .csv format. Required columns: rsid, chromosome, position, genotype.');
          return;
        }

        try {
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post('http://localhost:5000/api/upload', formData);
          setSuccess('File uploaded and processed successfully! Redirecting to report...');
          localStorage.setItem('reportData', JSON.stringify(response.data));
          setTimeout(() => navigate('/report'), 2000);
        } catch (err) {
          setError('Error processing file. Please try again.');
        }
      },
      header: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Upload SNP Data</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 dark:bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </motion.div>
  );
}

export default Upload;
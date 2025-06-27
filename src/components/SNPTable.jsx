function SNPTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded">
        <thead>
          <tr className="bg-blue-600 dark:bg-blue-800 text-white">
            <th className="py-2 px-4">RSID</th>
            <th className="py-2 px-4">Chromosome</th>
            <th className="py-2 px-4">Position</th>
            <th className="py-2 px-4">Genotype</th>
            <th className="py-2 px-4">Phenotype</th>
            <th className="py-2 px-4">Gene</th>
            <th className="py-2 px-4">Drug</th>
            <th className="py-2 px-4">Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t dark:border-gray-700">
              <td className="py-2 px-4">{row.rsid}</td>
              <td className="py-2 px-4">{row.chromosome}</td>
              <td className="py-2 px-4">{row.position}</td>
              <td className="py-2 px-4">{row.genotype}</td>
              <td className="py-2 px-4">{row.phenotype || 'N/A'}</td>
              <td className="py-2 px-4">{row.gene || 'N/A'}</td>
              <td className="py-2 px-4">{row.drug || 'N/A'}</td>
              <td className="py-2 px-4">{row.recommendation || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SNPTable;
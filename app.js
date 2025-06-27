document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainApp = document.getElementById('main-app');
  const nextButton = document.getElementById('next-button');
  const fileUpload = document.getElementById('file-upload');
  const lifestyleForm = document.getElementById('lifestyle-form');
  const smokingInput = document.getElementById('smoking');
  const alcoholInput = document.getElementById('alcohol');
  const dietInput = document.getElementById('diet');
  const chartSection = document.getElementById('chart-section');
  const suggestionsSection = document.getElementById('suggestions-section');
  const suggestionsList = document.getElementById('suggestions-list');
  const reportSection = document.getElementById('report-section');
  const reportPlaceholder = document.getElementById('report-placeholder');
  const disclaimer = document.getElementById('disclaimer');
  const reportList = document.getElementById('report-list');

  // State
  let results = [];
  let lifestyle = { smoking: false, alcohol: 'None', diet: 'Standard' };
  let chartInstance = null;

  // Show main app on "Next" click
  nextButton.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
  });

  // Handle file upload
  fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').slice(1); // Skip header
      results = [];

      // Cross-reference 23andMe data with pharmacogeneDB
      lines.forEach((line) => {
        const [rsID, , , genotype] = line.split(','); // Ignore chromosome, position
        if (pharmacogeneDB[rsID] && pharmacogeneDB[rsID].genotypes[genotype]) {
          results.push({
            gene: pharmacogeneDB[rsID].gene,
            genotype,
            medication: pharmacogeneDB[rsID].medication,
            effect: pharmacogeneDB[rsID].genotypes[genotype].effect,
            metabolizer: pharmacogeneDB[rsID].genotypes[genotype].metabolizer,
            recommendation: pharmacogeneDB[rsID].genotypes[genotype].recommendation
          });
        }
      });

      // Update UI
      updateReport();
      updateSuggestions();
      updateChart();
    };
    reader.readAsText(file);
  });

  // Handle lifestyle form submission
  lifestyleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    lifestyle = {
      smoking: smokingInput.checked,
      alcohol: alcoholInput.value,
      diet: dietInput.value
    };
    updateReport(); // Re-render report with new lifestyle data
  });

  // Update report section
  function updateReport() {
    reportPlaceholder.classList.add('hidden');
    disclaimer.classList.remove('hidden');
    reportList.innerHTML = '';

    if (results.length === 0) {
      reportPlaceholder.classList.remove('hidden');
      disclaimer.classList.add('hidden');
      return;
    }

    results.forEach((result) => {
      const li = document.createElement('li');
      li.className = 'text-gray-700 mb-4';
      li.innerHTML = `
        <strong>Gene:</strong> ${result.gene}, <strong>Genotype:</strong> ${result.genotype}, 
        <strong>Medication:</strong> ${result.medication}, <strong>Effect:</strong> ${result.effect}
        <p><strong>CPIC Recommendation:</strong> ${result.recommendation}</p>
        ${lifestyle.smoking && lifestyleImpacts.smoking[result.medication] ? 
          `<p class="text-red-600 mt-1"><strong>Smoking Warning:</strong> ${lifestyleImpacts.smoking[result.medication]}</p>` : ''}
        ${lifestyle.alcohol !== 'None' && lifestyleImpacts.alcohol[result.medication] ? 
          `<p class="text-red-600 mt-1"><strong>Alcohol Warning:</strong> ${lifestyleImpacts.alcohol[result.medication]}</p>` : ''}
        ${lifestyle.diet !== 'Standard' && lifestyleImpacts.diet[result.medication]?.[lifestyle.diet] ? 
          `<p class="text-red-600 mt-1"><strong>Diet Warning:</strong> ${lifestyleImpacts.diet[result.medication][lifestyle.diet]}</p>` : ''}
      `;
      reportList.appendChild(li);
    });
  }

  // Update AI-driven suggestions
  function updateSuggestions() {
    suggestionsList.innerHTML = '';
    const suggestions = results
      .filter((result) => result.recommendation.includes('alternative'))
      .map((result) => ({
        medication: result.medication,
        recommendation: result.recommendation,
        effect: result.effect
      }));

    if (suggestions.length === 0) {
      suggestionsSection.classList.add('hidden');
      return;
    }

    suggestionsSection.classList.remove('hidden');
    suggestions.forEach((suggestion) => {
      const li = document.createElement('li');
      li.className = 'text-gray-700 mb-2';
      li.innerHTML = `
        <strong>${suggestion.medication}</strong> (${suggestion.effect}) → 
        <strong>Recommendation:</strong> ${suggestion.recommendation}
      `;
      suggestionsList.appendChild(li);
    });
  }

  // Update medication chart
  function updateChart() {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const metabolizerCounts = results.reduce((acc, result) => {
      const metabolizer = result.metabolizer || 'Unknown';
      acc[metabolizer] = (acc[metabolizer] || 0) + 1;
      return acc;
    }, {});

    const chartData = {
      labels: Object.keys(metabolizerCounts),
      datasets: [{
        label: 'Medications by Metabolizer Status',
        data: Object.values(metabolizerCounts),
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
        borderColor: ['#388E3C', '#D32F2F', '#1976D2'],
        borderWidth: 1
      }]
    };

    const ctx = document.getElementById('medication-chart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Number of Medications' } },
          x: { title: { display: true, text: 'Metabolizer Status' } }
        }
      }
    });
  }
});
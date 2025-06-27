// Simplified pharmacogene database derived from PharmGKB's variants.tsv and clinical_annotations.tsv
// Contains SNPs compatible with 23andMe raw data (e.g., rs4149056, rs12248560, rs4986893, rs4244285, rs1057910, rs9923231, rs1799853, rs2297595, rs28399504, rs1045642, rs1805123, rs12720461)
// Data extracted manually for genes SLCO1B1, CYP2C19, CYP2C9, VKORC1, DPYD, ABCB1, TPMT
// Each entry includes rsID, gene, genotypes (with effects and CPIC recommendations), and medication
const pharmacogeneDB = {
  'rs4149056': {
    gene: 'SLCO1B1',
    genotypes: {
      'CC': { effect: 'Normal metabolizer: Standard Simvastatin dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'CT': { effect: 'Increased risk of myopathy with Simvastatin.', metabolizer: 'Intermediate', recommendation: 'Consider lower dose or alternative statin (e.g., Rosuvastatin).' },
      'TT': { effect: 'High risk of myopathy with Simvastatin.', metabolizer: 'Poor', recommendation: 'Use alternative statin (e.g., Rosuvastatin).' }
    },
    medication: 'Simvastatin'
  },
  'rs12248560': {
    gene: 'CYP2C19',
    genotypes: {
      'CC': { effect: 'Poor metabolizer: Reduced Clopidogrel efficacy.', metabolizer: 'Poor', recommendation: 'Consider alternative antiplatelet (e.g., Prasugrel).' },
      'CT': { effect: 'Intermediate metabolizer: May have reduced Clopidogrel efficacy.', metabolizer: 'Intermediate', recommendation: 'Monitor or consider alternative.' },
      'TT': { effect: 'Normal metabolizer: Standard Clopidogrel dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' }
    },
    medication: 'Clopidogrel'
  },
  'rs4986893': {
    gene: 'CYP2C19',
    genotypes: {
      'GG': { effect: 'Normal metabolizer: Standard Voriconazole dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'GA': { effect: 'Intermediate metabolizer: May require Voriconazole dose adjustment.', metabolizer: 'Intermediate', recommendation: 'Adjust dose based on monitoring.' },
      'AA': { effect: 'Poor metabolizer: Reduced Voriconazole efficacy.', metabolizer: 'Poor', recommendation: 'Consider alternative antifungal (e.g., Posaconazole).' }
    },
    medication: 'Voriconazole'
  },
  'rs4244285': {
    gene: 'CYP2C19',
    genotypes: {
      'GG': { effect: 'Normal metabolizer: Standard Omeprazole dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'GA': { effect: 'Intermediate metabolizer: May require Omeprazole dose adjustment.', metabolizer: 'Intermediate', recommendation: 'Monitor or adjust dose.' },
      'AA': { effect: 'Poor metabolizer: Reduced Omeprazole efficacy.', metabolizer: 'Poor', recommendation: 'Consider alternative (e.g., Pantoprazole).' }
    },
    medication: 'Omeprazole'
  },
  'rs1057910': {
    gene: 'CYP2C9',
    genotypes: {
      'AA': { effect: 'Normal metabolizer: Standard Warfarin dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose per CPIC algorithm.' },
      'AC': { effect: 'Intermediate metabolizer: Reduced Warfarin metabolism.', metabolizer: 'Intermediate', recommendation: 'Use lower dose per CPIC algorithm.' },
      'CC': { effect: 'Poor metabolizer: Significantly reduced Warfarin metabolism.', metabolizer: 'Poor', recommendation: 'Use significantly lower dose or alternative (e.g., Apixaban).' }
    },
    medication: 'Warfarin'
  },
  'rs9923231': {
    gene: 'VKORC1',
    genotypes: {
      'GG': { effect: 'Normal sensitivity: Standard Warfarin dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose per CPIC algorithm.' },
      'GA': { effect: 'Increased sensitivity: Higher Warfarin response.', metabolizer: 'Intermediate', recommendation: 'Use lower dose per CPIC algorithm.' },
      'AA': { effect: 'High sensitivity: Significantly higher Warfarin response.', metabolizer: 'Poor', recommendation: 'Use significantly lower dose or alternative (e.g., Apixaban).' }
    },
    medication: 'Warfarin'
  },
  'rs1799853': {
    gene: 'CYP2C9',
    genotypes: {
      'CC': { effect: 'Normal metabolizer: Standard Phenytoin dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'CT': { effect: 'Intermediate metabolizer: Reduced Phenytoin metabolism.', metabolizer: 'Intermediate', recommendation: 'Adjust dose based on monitoring.' },
      'TT': { effect: 'Poor metabolizer: Significantly reduced Phenytoin metabolism.', metabolizer: 'Poor', recommendation: 'Consider alternative (e.g., Levetiracetam).' }
    },
    medication: 'Phenytoin'
  },
  'rs2297595': {
    gene: 'DPYD',
    genotypes: {
      'AA': { effect: 'Normal metabolizer: Standard Fluorouracil dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'AG': { effect: 'Intermediate metabolizer: Increased Fluorouracil toxicity risk.', metabolizer: 'Intermediate', recommendation: 'Reduce dose by 25–50% per CPIC guideline.' },
      'GG': { effect: 'Poor metabolizer: High Fluorouracil toxicity risk.', metabolizer: 'Poor', recommendation: 'Consider alternative (e.g., Capecitabine with caution) or avoid.' }
    },
    medication: 'Fluorouracil'
  },
  'rs28399504': {
    gene: 'CYP2C19',
    genotypes: {
      'AA': { effect: 'Normal metabolizer: Standard Citalopram dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'AG': { effect: 'Intermediate metabolizer: May have increased Citalopram side effects.', metabolizer: 'Intermediate', recommendation: 'Monitor or consider dose adjustment.' },
      'GG': { effect: 'Poor metabolizer: High risk of Citalopram side effects.', metabolizer: 'Poor', recommendation: 'Consider alternative (e.g., Sertraline) or reduce dose.' }
    },
    medication: 'Citalopram'
  },
  'rs1045642': {
    gene: 'ABCB1',
    genotypes: {
      'AA': { effect: 'Normal transporter: Standard Methadone dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'AG': { effect: 'Intermediate transporter: May have altered Methadone transport.', metabolizer: 'Intermediate', recommendation: 'Monitor for efficacy or adjust dose.' },
      'GG': { effect: 'Poor transporter: Reduced Methadone transport efficacy.', metabolizer: 'Poor', recommendation: 'Consider alternative (e.g., Buprenorphine) or adjust dose.' }
    },
    medication: 'Methadone'
  },
  'rs1805123': {
    gene: 'TPMT',
    genotypes: {
      'GG': { effect: 'Normal metabolizer: Standard Mercaptopurine dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'GA': { effect: 'Intermediate metabolizer: Increased Mercaptopurine toxicity risk.', metabolizer: 'Intermediate', recommendation: 'Reduce dose by 30–70% per CPIC guideline.' },
      'AA': { effect: 'Poor metabolizer: High Mercaptopurine toxicity risk.', metabolizer: 'Poor', recommendation: 'Use alternative (e.g., Thioguanine) or significantly reduce dose.' }
    },
    medication: 'Mercaptopurine'
  },
  'rs12720461': {
    gene: 'CYP2C19',
    genotypes: {
      'AA': { effect: 'Normal metabolizer: Standard Escitalopram dose effective.', metabolizer: 'Normal', recommendation: 'Use standard dose.' },
      'AG': { effect: 'Intermediate metabolizer: May have increased Escitalopram side effects.', metabolizer: 'Intermediate', recommendation: 'Monitor or consider dose adjustment.' },
      'GG': { effect: 'Poor metabolizer: High risk of Escitalopram side effects.', metabolizer: 'Poor', recommendation: 'Consider alternative (e.g., Fluoxetine) or reduce dose.' }
    },
    medication: 'Escitalopram'
  }
};

// Lifestyle impacts on drug metabolism (complements PharmGKB genetic data)
const lifestyleImpacts = {
  smoking: {
    'Clopidogrel': 'Smoking may reduce Clopidogrel efficacy due to enzyme induction.',
    'Simvastatin': 'Smoking may increase cardiovascular risk, monitor closely.',
    'Voriconazole': 'Smoking may affect Voriconazole metabolism.',
    'Omeprazole': 'Smoking may reduce Omeprazole efficacy due to enzyme induction.',
    'Warfarin': 'Smoking may increase Warfarin metabolism, potentially requiring higher doses.',
    'Phenytoin': 'Smoking may increase Phenytoin metabolism, potentially requiring higher doses.',
    'Fluorouracil': 'Smoking may increase chemotherapy-related toxicity risks.',
    'Citalopram': 'Smoking may reduce Citalopram efficacy due to enzyme induction.',
    'Methadone': 'Smoking may increase Methadone metabolism, potentially requiring dose adjustment.',
    'Mercaptopurine': 'Smoking may increase Mercaptopurine toxicity risks.',
    'Escitalopram': 'Smoking may reduce Escitalopram efficacy due to enzyme induction.'
  },
  alcohol: {
    'Simvastatin': 'Heavy alcohol use may increase liver toxicity risk with Simvastatin.',
    'Clopidogrel': 'Moderate to heavy alcohol use may affect Clopidogrel metabolism.',
    'Voriconazole': 'Heavy alcohol use may increase Voriconazole toxicity.',
    'Omeprazole': 'Heavy alcohol use may affect Omeprazole metabolism.',
    'Warfarin': 'Heavy alcohol use may increase bleeding risk with Warfarin.',
    'Phenytoin': 'Heavy alcohol use may increase Phenytoin toxicity.',
    'Fluorouracil': 'Heavy alcohol use may exacerbate Fluorouracil-related liver toxicity.',
    'Citalopram': 'Heavy alcohol use may increase Citalopram side effects.',
    'Methadone': 'Heavy alcohol use may increase Methadone-related sedation risks.',
    'Mercaptopurine': 'Heavy alcohol use may increase Mercaptopurine liver toxicity.',
    'Escitalopram': 'Heavy alcohol use may increase Escitalopram side effects.'
  },
  diet: {
    'Simvastatin': {
      'High-Protein': 'High-protein diet may affect lipid metabolism, monitor cholesterol levels.',
      'Vegetarian': 'Vegetarian diet may enhance Simvastatin efficacy due to lower cholesterol intake.'
    },
    'Voriconazole': {
      'High-Protein': 'High-protein diet may affect Voriconazole absorption.',
      'Vegetarian': 'Vegetarian diet may enhance Voriconazole bioavailability.'
    },
    'Omeprazole': {
      'High-Protein': 'High-protein diet may affect Omeprazole absorption.',
      'Vegetarian': 'Vegetarian diet may enhance Omeprazole bioavailability.'
    },
    'Warfarin': {
      'High-Protein': 'High-protein diet may affect Warfarin metabolism due to vitamin K content.',
      'Vegetarian': 'Vegetarian diet may increase Warfarin sensitivity due to high vitamin K intake.'
    },
    'Phenytoin': {
      'High-Protein': 'High-protein diet may affect Phenytoin metabolism.',
      'Vegetarian': 'Vegetarian diet may alter Phenytoin bioavailability.'
    },
    'Fluorouracil': {
      'High-Protein': 'High-protein diet may affect Fluorouracil metabolism.',
      'Vegetarian': 'Vegetarian diet may influence Fluorouracil tolerability.'
    },
    'Citalopram': {
      'High-Protein': 'High-protein diet may affect Citalopram absorption.',
      'Vegetarian': 'Vegetarian diet may enhance Citalopram bioavailability.'
    },
    'Methadone': {
      'High-Protein': 'High-protein diet may affect Methadone metabolism.',
      'Vegetarian': 'Vegetarian diet may alter Methadone bioavailability.'
    },
    'Mercaptopurine': {
      'High-Protein': 'High-protein diet may affect Mercaptopurine metabolism.',
      'Vegetarian': 'Vegetarian diet may influence Mercaptopurine tolerability.'
    },
    'Escitalopram': {
      'High-Protein': 'High-protein diet may affect Escitalopram absorption.',
      'Vegetarian': 'Vegetarian diet may enhance Escitalopram bioavailability.'
    }
  }
};
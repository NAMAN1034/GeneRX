const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const Papa = require('papaparse');
const axios = require('axios');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

const PHARMGKB_API_BASE = 'https://api.pharmgkb.org/v1/data';
const API_KEY = process.env.PHARMGKB_API_KEY;

// Mock data as fallback
const mockData = {
  pharmacogenes: [
    {
      rsid: 'rs4244285',
      gene: 'CYP2C19',
      genotypes: {
        GG: 'Extensive metabolizer',
        GA: 'Intermediate metabolizer',
        AA: 'Poor metabolizer'
      },
      drug: 'Clopidogrel',
      recommendation: 'Consider alternative antiplatelet therapy for poor metabolizers.'
    },
    {
      rsid: 'rs1799853',
      gene: 'CYP2C9',
      genotypes: {
        CC: 'Extensive metabolizer',
        CT: 'Intermediate metabolizer',
        TT: 'Poor metabolizer'
      },
      drug: 'Warfarin',
      recommendation: 'Adjust dosing for poor metabolizers.'
    },
    {
      rsid: 'rs1057910',
      gene: 'CYP2C9',
      genotypes: {
        AA: 'Extensive metabolizer',
        AC: 'Intermediate metabolizer',
        CC: 'Poor metabolizer'
      },
      drug: 'Phenytoin',
      recommendation: 'Reduce dose for poor metabolizers to avoid toxicity.'
    },
    {
      rsid: 'rs9923231',
      gene: 'VKORC1',
      genotypes: {
        CC: 'Normal sensitivity',
        CT: 'Moderate sensitivity',
        TT: 'High sensitivity'
      },
      drug: 'Warfarin',
      recommendation: 'Lower dose for high sensitivity to prevent bleeding.'
    },
    {
      rsid: 'rs4149056',
      gene: 'SLCO1B1',
      genotypes: {
        TT: 'Normal function',
        TC: 'Reduced function',
        CC: 'Poor function'
      },
      drug: 'Simvastatin',
      recommendation: 'Consider alternative statins for poor function to reduce myopathy risk.'
    },
    {
      rsid: 'rs1801133',
      gene: 'MTHFR',
      genotypes: {
        CC: 'Normal activity',
        CT: 'Reduced activity',
        TT: 'Low activity'
      },
      drug: 'Methotrexate',
      recommendation: 'Monitor folate levels for low activity genotypes.'
    },
    {
      rsid: 'rs3892097',
      gene: 'CYP2D6',
      genotypes: {
        CC: 'Extensive metabolizer',
        CT: 'Intermediate metabolizer',
        TT: 'Poor metabolizer'
      },
      drug: 'Tamoxifen',
      recommendation: 'Consider alternative therapies for poor metabolizers.'
    },
    {
      rsid: 'rs1065852',
      gene: 'CYP2D6',
      genotypes: {
        GG: 'Extensive metabolizer',
        GA: 'Intermediate metabolizer',
        AA: 'Poor metabolizer'
      },
      drug: 'Codeine',
      recommendation: 'Avoid codeine in poor metabolizers due to lack of efficacy.'
    },
    {
      rsid: 'rs1801280',
      gene: 'TPMT',
      genotypes: {
        CC: 'Normal activity',
        CT: 'Intermediate activity',
        TT: 'Low activity'
      },
      drug: 'Azathioprine',
      recommendation: 'Reduce dose for low activity to prevent toxicity.'
    },
    {
      rsid: 'rs12248560',
      gene: 'CYP2C19',
      genotypes: {
        CC: 'Normal metabolizer',
        CT: 'Rapid metabolizer',
        TT: 'Ultra-rapid metabolizer'
      },
      drug: 'Omeprazole',
      recommendation: 'Increase dose for ultra-rapid metabolizers.'
    }
  ],
  lifestyleSNPs: [
    {
      rsid: 'rs762551',
      gene: 'CYP1A2',
      genotypes: {
        AA: 'Fast caffeine metabolizer',
        AC: 'Moderate caffeine metabolizer',
        CC: 'Slow caffeine metabolizer'
      },
      recommendation: 'Limit caffeine intake for slow metabolizers to avoid jitteriness.'
    },
    {
      rsid: 'rs4680',
      gene: 'COMT',
      genotypes: {
        GG: 'High dopamine activity',
        GA: 'Moderate dopamine activity',
        AA: 'Low dopamine activity'
      },
      recommendation: 'High dopamine activity may benefit from stress-reducing exercises like yoga.'
    },
    {
      rsid: 'rs1800497',
      gene: 'DRD2',
      genotypes: {
        GG: 'Normal reward sensitivity',
        GA: 'Moderate reward sensitivity',
        AA: 'Low reward sensitivity'
      },
      recommendation: 'Low reward sensitivity may benefit from structured exercise routines.'
    },
    {
      rsid: 'rs9939609',
      gene: 'FTO',
      genotypes: {
        TT: 'Low obesity risk',
        TA: 'Moderate obesity risk',
        AA: 'High obesity risk'
      },
      recommendation: 'High obesity risk may require a low-carb diet and regular exercise.'
    },
    {
      rsid: 'rs662799',
      gene: 'APOA5',
      genotypes: {
        AA: 'Normal triglyceride levels',
        AG: 'Elevated triglyceride levels',
        GG: 'High triglyceride levels'
      },
      recommendation: 'High triglyceride levels benefit from a low-fat diet.'
    },
    {
      rsid: 'rs429358',
      gene: 'APOE',
      genotypes: {
        TT: 'Normal cholesterol metabolism',
        TC: 'Moderate risk',
        CC: 'High risk for dyslipidemia'
      },
      recommendation: 'High risk individuals should avoid saturated fats.'
    },
    {
      rsid: 'rs16969968',
      gene: 'CHRNA5',
      genotypes: {
        GG: 'Low nicotine dependence',
        GA: 'Moderate nicotine dependence',
        AA: 'High nicotine dependence'
      },
      recommendation: 'High nicotine dependence may require smoking cessation support.'
    },
    {
      rsid: 'rs1799971',
      gene: 'OPRM1',
      genotypes: {
        AA: 'Normal opioid sensitivity',
        AG: 'Increased opioid sensitivity',
        GG: 'High opioid sensitivity'
      },
      recommendation: 'High opioid sensitivity may influence alcohol response; limit intake.'
    }
  ]
};

// Cache for API responses
const cache = new Map();

async function fetchVariantAnnotations(rsid) {
  if (!API_KEY) return null;

  const cacheKey = `variant_${rsid}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await axios.get(`${PHARMGKB_API_BASE}/variantAnnotations`, {
      params: { 'variant.name': rsid },
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const data = response.data.data || [];
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching PharmGKB data for ${rsid}:`, error.message);
    return [];
  }
}

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileContent = fs.readFileSync(req.file.path, 'utf-8');
  Papa.parse(fileContent, {
    complete: async (result) => {
      const snpData = result.data;
      const snpResults = [];
      const lifestyleResults = [];

      for (const row of snpData) {
        const { rsid, genotype } = row;
        if (!rsid || !genotype) continue;

        // Try API first
        let annotations = await fetchVariantAnnotations(rsid);
        if (annotations && annotations.length > 0) {
          for (const annotation of annotations) {
            const { chemicals, genes, phenotypeCategories } = annotation;
            if (!chemicals || !genes) continue;

            const drug = chemicals[0]?.name || 'Unknown';
            const gene = genes[0]?.symbol || 'Unknown';
            const phenotype = phenotypeCategories
              ?.map((cat) => {
                if (cat.name === 'Efficacy' || cat.name === 'Metabolism/PK') {
                  return `${genotype}: ${cat.description || 'Unknown'}`;
                }
                return null;
              })
              .filter(Boolean)[0] || 'Unknown';

            if (phenotype !== 'Unknown') {
              snpResults.push({
                ...row,
                phenotype,
                gene,
                drug,
                recommendation: `Consult provider for ${drug} dosing based on ${gene} genotype.`,
              });
            }

            const lifestylePhenotype = phenotypeCategories
              ?.map((cat) => {
                if (cat.name.includes('Diet') || cat.name.includes('Lifestyle')) {
                  return `${genotype}: ${cat.description || 'Unknown'}`;
                }
                return null;
              })
              .filter(Boolean)[0];

            if (lifestylePhenotype) {
              lifestyleResults.push({
                ...row,
                phenotype: lifestylePhenotype,
                gene,
                recommendation: `Adjust lifestyle based on ${gene} genotype.`,
              });
            }
          }
        } else {
          // Fallback to mock data
          const match = mockData.pharmacogenes.find((gene) => gene.rsid === rsid);
          if (match) {
            const phenotype = match.genotypes[genotype] || 'Unknown';
            snpResults.push({
              ...row,
              phenotype,
              gene: match.gene,
              drug: match.drug,
              recommendation: match.recommendation,
            });
          }

          const lifestyleMatch = mockData.lifestyleSNPs.find((snp) => snp.rsid === rsid);
          if (lifestyleMatch) {
            const phenotype = lifestyleMatch.genotypes[genotype] || 'Unknown';
            lifestyleResults.push({
              ...row,
              phenotype,
              gene: lifestyleMatch.gene,
              recommendation: lifestyleMatch.recommendation,
            });
          }
        }
      }

      fs.unlinkSync(req.file.path);
      res.json({ snpResults, lifestyleResults });
    },
    header: true,
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
const Disease = require('../models/Disease');
const mockDiseases = require('../data/mockData');

let usesMockData = false;

// Check disease by symptoms
exports.checkDiseaseBySymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    console.log('Received symptoms:', symptoms);

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ message: 'Please provide symptoms array' });
    }

    let matchingDiseases = [];

    try {
      // Try to use MongoDB
      matchingDiseases = await Disease.find({
        symptoms: { $in: symptoms }
      });
      console.log('Found diseases from MongoDB:', matchingDiseases.length);
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data due to DB error:', dbError.message);
      matchingDiseases = mockDiseases.filter(disease =>
        disease.symptoms.some(symptom => symptoms.includes(symptom.toLowerCase()))
      );
      console.log('Found diseases from mock data:', matchingDiseases.length);
    }

    // Calculate match percentage for each disease
    const rankedDiseases = matchingDiseases.map(disease => {
      const symptomList = Array.isArray(disease.symptoms) ? disease.symptoms : [];
      const matchedSymptoms = symptomList.filter(s => 
        symptoms.includes(s.toLowerCase())
      );
      const matchPercentage = symptomList.length > 0 
        ? (matchedSymptoms.length / symptomList.length) * 100 
        : 0;
      
      return {
        ...(disease.toObject ? disease.toObject() : disease),
        matchPercentage: Math.round(matchPercentage),
        matchedSymptoms
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 5);

    console.log('Returning ranked diseases:', rankedDiseases.length);

    res.status(200).json({
      message: 'Disease check completed',
      inputSymptoms: symptoms,
      possibleDiseases: rankedDiseases
    });
  } catch (error) {
    console.error('Disease check error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Get disease details
exports.getDiseaseDetails = async (req, res) => {
  try {
    let disease = null;

    try {
      disease = await Disease.findById(req.params.diseaseId);
    } catch (dbError) {
      // Fall back to mock data
      disease = mockDiseases.find(d => d._id === req.params.diseaseId);
    }

    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }

    res.status(200).json(disease.toObject ? disease.toObject() : disease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all diseases
exports.getAllDiseases = async (req, res) => {
  try {
    let diseases = [];

    try {
      diseases = await Disease.find();
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data for getAllDiseases');
      diseases = mockDiseases;
    }

    res.status(200).json(
      Array.isArray(diseases) 
        ? diseases.map(d => d.toObject ? d.toObject() : d)
        : []
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search diseases
exports.searchDiseases = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Please provide search query' });
    }

    let diseases = [];

    try {
      diseases = await Disease.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { symptoms: { $regex: query, $options: 'i' } }
        ]
      });
    } catch (dbError) {
      // Fall back to mock data
      diseases = mockDiseases.filter(disease => 
        disease.name.toLowerCase().includes(query.toLowerCase()) ||
        disease.description.toLowerCase().includes(query.toLowerCase()) ||
        disease.symptoms.some(s => s.toLowerCase().includes(query.toLowerCase()))
      );
    }

    res.status(200).json(
      Array.isArray(diseases)
        ? diseases.map(d => d.toObject ? d.toObject() : d)
        : []
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all unique symptoms
exports.getAllSymptoms = async (req, res) => {
  try {
    let diseases = [];

    try {
      diseases = await Disease.find();
      console.log('Loaded diseases from MongoDB:', diseases.length);
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data for getAllSymptoms:', dbError.message);
      diseases = mockDiseases;
    }

    const uniqueSymptoms = new Set();

    diseases.forEach(disease => {
      if (disease.symptoms && Array.isArray(disease.symptoms)) {
        disease.symptoms.forEach(symptom => {
          uniqueSymptoms.add(symptom.toLowerCase().trim());
        });
      }
    });

    const sortedSymptoms = Array.from(uniqueSymptoms).sort();
    console.log('Total unique symptoms:', sortedSymptoms.length);
    
    res.status(200).json({
      message: 'All symptoms retrieved successfully',
      total: sortedSymptoms.length,
      symptoms: sortedSymptoms
    });
  } catch (error) {
    console.error('getAllSymptoms error:', error);
    res.status(500).json({ message: error.message || 'Failed to retrieve symptoms' });
  }
};

// Mock disease data for when MongoDB is not available
const mockDiseases = [
  {
    _id: '1',
    name: 'Common Cold',
    description: 'A viral infection that affects the upper respiratory tract',
    symptoms: ['runny nose', 'cough', 'sore throat', 'fatigue', 'headache', 'fever'],
    medicines: ['Paracetamol', 'Cough syrup', 'Antihistamine'],
    diet: 'Drink warm fluids, eat nutritious food rich in vitamin C',
    precautions: ['Wash hands frequently', 'Avoid close contact with infected people', 'Use tissues when sneezing'],
    severity: 'Mild',
    category: 'Viral Infection'
  },
  {
    _id: '2',
    name: 'Flu (Influenza)',
    description: 'A contagious respiratory illness caused by influenza viruses',
    symptoms: ['fever', 'fatigue', 'muscle pain', 'headache', 'cough', 'sore throat', 'chills'],
    medicines: ['Oseltamivir', 'Paracetamol', 'Rest'],
    diet: 'Protein-rich foods, warm liquids, and immune-boosting foods',
    precautions: ['Get vaccinated', 'Avoid sharing items', 'Stay home when sick', 'Maintain good hygiene'],
    severity: 'Moderate',
    category: 'Viral Infection'
  },
  {
    _id: '3',
    name: 'Gastroenteritis',
    description: 'Inflammation of the stomach and intestines, often called stomach flu',
    symptoms: ['diarrhea', 'vomiting', 'abdominal pain', 'nausea', 'fever', 'loss of appetite'],
    medicines: ['ORS (Oral Rehydration Solution)', 'Antiemetics', 'Antidiarrheals'],
    diet: 'Light foods, plenty of fluids, clear broths',
    precautions: ['Wash hands properly', 'Maintain hygiene', 'Avoid contaminated food/water'],
    severity: 'Moderate',
    category: 'Digestive Disorder'
  },
  {
    _id: '4',
    name: 'Migraine',
    description: 'A neurological condition characterized by intense headaches',
    symptoms: ['headache', 'nausea', 'vomiting', 'sensitivity to light', 'visual disturbances', 'fatigue'],
    medicines: ['Sumatriptan', 'Ibuprofen', 'Aspirin'],
    diet: 'Avoid trigger foods, stay hydrated',
    precautions: ['Get adequate sleep', 'Manage stress', 'Avoid triggers', 'Regular exercise'],
    severity: 'Moderate',
    category: 'Neurological'
  },
  {
    _id: '5',
    name: 'Allergic Rhinitis',
    description: 'Inflammation of nasal passages due to allergen exposure',
    symptoms: ['runny nose', 'congestion', 'sneezing', 'itching', 'watery eyes', 'sore throat'],
    medicines: ['Antihistamines', 'Nasal sprays', 'Decongestants'],
    diet: 'Avoid allergen-containing foods',
    precautions: ['Avoid allergens', 'Keep environment clean', 'Use air filters'],
    severity: 'Mild',
    category: 'Allergic Disorder'
  },
  {
    _id: '6',
    name: 'Hypertension',
    description: 'Persistently elevated blood pressure',
    symptoms: ['blood pressure high', 'headache', 'dizziness', 'chest pain', 'fatigue'],
    medicines: ['ACE inhibitors', 'Beta blockers', 'Calcium channel blockers'],
    diet: 'Low sodium diet, reduce caffeine and alcohol',
    precautions: ['Regular exercise', 'Stress management', 'Weight management', 'Monitor BP regularly'],
    severity: 'Moderate',
    category: 'Cardiovascular'
  },
  {
    _id: '7',
    name: 'Diabetes',
    description: 'A metabolic disorder affecting blood glucose levels',
    symptoms: ['fatigue', 'weight loss', 'increased thirst', 'frequent urination', 'blurred vision'],
    medicines: ['Metformin', 'Insulin', 'Sulfonylureas'],
    diet: 'Low glycemic index foods, controlled carbohydrate intake',
    precautions: ['Regular monitoring', 'Exercise daily', 'Maintain healthy weight', 'Routine checkups'],
    severity: 'Moderate',
    category: 'Metabolic Disorder'
  },
  {
    _id: '8',
    name: 'Asthma',
    description: 'Chronic inflammatory disease of the airways',
    symptoms: ['difficulty breathing', 'shortness of breath', 'chest pain', 'cough', 'wheezing'],
    medicines: ['Inhalers', 'Bronchodilators', 'Corticosteroids'],
    diet: 'Avoid food allergies and triggers',
    precautions: ['Avoid triggers', 'Keep inhalers handy', 'Regular monitoring', 'Clean environment'],
    severity: 'Moderate',
    category: 'Respiratory'
  },
  {
    _id: '9',
    name: 'Bronchitis',
    description: 'Inflammation of the bronchial tubes that carry air to the lungs',
    symptoms: ['cough', 'fatigue', 'difficulty breathing', 'chest pain', 'wheezing', 'fever'],
    medicines: ['Expectorants', 'Pain relievers', 'Antibiotics'],
    diet: 'Warm fluids, soup, and nutritious meals',
    precautions: ['Avoid smoking', 'Use humidifier', 'Stay hydrated', 'Rest adequately'],
    severity: 'Moderate',
    category: 'Respiratory'
  },
  {
    _id: '10',
    name: 'Anxiety Disorder',
    description: 'Persistent and excessive worry affecting daily life',
    symptoms: ['anxiety', 'tremor', 'insomnia', 'muscle tension', 'difficulty concentrating', 'chest pain'],
    medicines: ['SSRIs', 'Benzodiazepines', 'Beta blockers'],
    diet: 'Limit caffeine, maintain balanced nutrition',
    precautions: ['Exercise regularly', 'Meditation and yoga', 'Counseling', 'Stress management'],
    severity: 'Mild',
    category: 'Mental Health'
  },
  {
    _id: '11',
    name: 'Depression',
    description: 'A mood disorder characterized by persistent sadness',
    symptoms: ['depression', 'loss of appetite', 'insomnia', 'fatigue', 'lack of motivation', 'anxiety'],
    medicines: ['Antidepressants', 'SSRIs', 'Psychotherapy'],
    diet: 'Omega-3 rich foods, healthy balanced diet',
    precautions: ['Therapy sessions', 'Regular exercise', 'Social support', 'Sleep routine'],
    severity: 'Moderate',
    category: 'Mental Health'
  },
  {
    _id: '12',
    name: 'Eczema',
    description: 'Inflammatory skin condition causing itching and irritation',
    symptoms: ['skin rash', 'itching', 'redness', 'swelling', 'dryness'],
    medicines: ['Corticosteroid creams', 'Moisturizers', 'Antihistamines'],
    diet: 'Avoid trigger foods, stay hydrated',
    precautions: ['Use gentle soaps', 'Moisturize regularly', 'Avoid irritants', 'Manage stress'],
    severity: 'Mild',
    category: 'Skin Disorder'
  },
  {
    _id: '13',
    name: 'Psoriasis',
    description: 'Autoimmune disease causing rapid skin cell growth',
    symptoms: ['skin rash', 'itching', 'red patches', 'scaling', 'swelling'],
    medicines: ['Topical treatments', 'Phototherapy', 'Immunosuppressants'],
    diet: 'Anti-inflammatory diet, avoid triggers',
    precautions: ['Avoid stress', 'Protect skin', 'Regular dermatology visits'],
    severity: 'Mild',
    category: 'Skin Disorder'
  },
  {
    _id: '14',
    name: 'Acne',
    description: 'Skin condition characterized by pimples and inflammation',
    symptoms: ['skin rash', 'redness', 'itching', 'oily skin'],
    medicines: ['Benzoyl peroxide', 'Retinoids', 'Antibiotics'],
    diet: 'Limit sugar and dairy, eat antioxidant-rich foods',
    precautions: ['Keep face clean', 'Avoid touching face', 'Use non-comedogenic products'],
    severity: 'Mild',
    category: 'Skin Disorder'
  },
  {
    _id: '15',
    name: 'Arthritis',
    description: 'Inflammatory disease affecting joints',
    symptoms: ['joint pain', 'muscle pain', 'swelling', 'stiffness', 'weakness'],
    medicines: ['NSAIDs', 'Corticosteroids', 'DMARDs'],
    diet: 'Anti-inflammatory foods, omega-3 rich diet',
    precautions: ['Regular exercise', 'Weight management', 'Physical therapy', 'Hot/cold therapy'],
    severity: 'Moderate',
    category: 'Orthopedic'
  },
  {
    _id: '16',
    name: 'Back Pain',
    description: 'Pain in the back region, often due to strain or injury',
    symptoms: ['back pain', 'muscle pain', 'weakness', 'numbness'],
    medicines: ['Muscle relaxants', 'NSAIDs', 'Pain relief'],
    diet: 'Calcium and vitamin D rich foods',
    precautions: ['Good posture', 'Regular exercise', 'Proper lifting technique', 'Stretching'],
    severity: 'Mild',
    category: 'Orthopedic'
  },
  {
    _id: '17',
    name: 'Urinary Tract Infection',
    description: 'Infection in the urinary system',
    symptoms: ['frequent urination', 'burning sensation', 'abdominal pain', 'fever'],
    medicines: ['Antibiotics', 'Antiinflammatories', 'Pain relievers'],
    diet: 'Drink plenty of water, cranberry juice',
    precautions: ['Drink water regularly', 'Proper hygiene', 'Avoid irritants'],
    severity: 'Mild',
    category: 'Urinary Disorder'
  },
  {
    _id: '18',
    name: 'Thyroid Disorder',
    description: 'Dysfunction of the thyroid gland',
    symptoms: ['fatigue', 'weight loss', 'temperature sensitivity', 'anxiety', 'muscle weakness'],
    medicines: ['Thyroid hormones', 'Beta blockers', 'Antithyroid drugs'],
    diet: 'Adequate iodine, selenium rich foods',
    precautions: ['Regular thyroid tests', 'Medication compliance', 'Healthy diet', 'Stress management'],
    severity: 'Moderate',
    category: 'Endocrine'
  }
];

module.exports = mockDiseases;

// Sample diseases to add to MongoDB for testing
const sampleDiseases = [
  {
    name: "Common Cold",
    description: "A viral infection of the upper respiratory tract",
    symptoms: ["runny nose", "sneezing", "sore throat", "mild cough"],
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500mg twice daily",
        duration: "3-5 days",
        sideEffects: "None significant"
      }
    ],
    diet: {
      foodsToEat: ["warm soups", "honey", "citrus fruits", "vegetables"],
      foodsToAvoid: ["cold drinks", "dairy"],
      otherGuidance: "Stay hydrated and rest"
    },
    precautions: [
      "Wash hands frequently",
      "Use tissues when sneezing",
      "Rest for 3-5 days",
      "Avoid crowds"
    ],
    severity: "mild",
    category: "infectious",
    doctorConsultation: false
  },
  {
    name: "Influenza",
    description: "Seasonal flu caused by influenza virus",
    symptoms: ["high fever", "cough", "fatigue", "sore throat", "chills"],
    medicines: [
      {
        name: "Oseltamivir",
        dosage: "75mg twice daily",
        duration: "5 days",
        sideEffects: "Nausea, headache"
      },
      {
        name: "Ibuprofen",
        dosage: "400mg three times daily",
        duration: "5 days",
        sideEffects: "Stomach pain"
      }
    ],
    diet: {
      foodsToEat: ["hot soups", "honey", "ginger tea", "vitamin C fruits"],
      foodsToAvoid: ["spicy food", "cold items", "heavy meals"],
      otherGuidance: "Light diet with plenty of fluids"
    },
    precautions: [
      "Rest for 7-10 days",
      "Stay hydrated",
      "Use humidifier",
      "Isolate from others",
      "Avoid strenuous activities"
    ],
    severity: "moderate",
    category: "infectious",
    doctorConsultation: true
  },
  {
    name: "Diabetes Type 2",
    description: "Chronic condition affecting blood sugar levels",
    symptoms: ["excessive thirst", "frequent urination", "fatigue", "blurred vision"],
    medicines: [
      {
        name: "Metformin",
        dosage: "500mg twice daily",
        duration: "Long-term",
        sideEffects: "Stomach upset, diarrhea"
      }
    ],
    diet: {
      foodsToEat: ["whole grains", "vegetables", "lean proteins", "low-sugar fruits"],
      foodsToAvoid: ["sugary drinks", "processed foods", "white bread"],
      otherGuidance: "Monitor carbohydrate intake, eat at regular intervals"
    },
    precautions: [
      "Monitor blood sugar levels",
      "Exercise regularly",
      "Maintain healthy weight",
      "Regular check-ups",
      "Avoid stress"
    ],
    severity: "moderate",
    category: "metabolic",
    doctorConsultation: true
  },
  {
    name: "Hypertension",
    description: "High blood pressure condition",
    symptoms: ["frequent headaches", "shortness of breath", "chest pain", "fatigue"],
    medicines: [
      {
        name: "Lisinopril",
        dosage: "10mg daily",
        duration: "Long-term",
        sideEffects: "Dizziness, dry cough"
      }
    ],
    diet: {
      foodsToEat: ["low-sodium foods", "potassium-rich fruits", "vegetables", "whole grains"],
      foodsToAvoid: ["salty foods", "processed meat", "canned foods", "high-fat items"],
      otherGuidance: "Limit sodium intake to less than 2300mg per day"
    },
    precautions: [
      "Monitor blood pressure regularly",
      "Exercise 30 minutes daily",
      "Reduce stress",
      "Limit alcohol",
      "Maintain healthy weight"
    ],
    severity: "moderate",
    category: "chronic",
    doctorConsultation: true
  },
  {
    name: "Asthma",
    description: "Chronic respiratory condition causing airway inflammation",
    symptoms: ["shortness of breath", "wheezing", "chest tightness", "chronic cough"],
    medicines: [
      {
        name: "Albuterol",
        dosage: "2 puffs as needed",
        duration: "As required",
        sideEffects: "Tremors, increased heart rate"
      },
      {
        name: "Inhaled Corticosteroid",
        dosage: "2 puffs daily",
        duration: "Long-term",
        sideEffects: "Oral thrush"
      }
    ],
    diet: {
      foodsToEat: ["omega-3 rich fish", "antioxidant foods", "ginger", "honey"],
      foodsToAvoid: ["trigger foods", "cold drinks", "allergens"],
      otherGuidance: "Identify and avoid personal triggers"
    },
    precautions: [
      "Always carry inhaler",
      "Avoid allergens",
      "Exercise regularly",
      "Manage stress",
      "Regular doctor visits"
    ],
    severity: "moderate",
    category: "chronic",
    doctorConsultation: true
  },
  {
    name: "Migraine",
    description: "Intense headache with neurological symptoms",
    symptoms: ["severe headache", "nausea", "light sensitivity", "visual disturbances"],
    medicines: [
      {
        name: "Sumatriptan",
        dosage: "50mg-100mg as needed",
        duration: "For acute attack",
        sideEffects: "Dizziness, warm sensation"
      }
    ],
    diet: {
      foodsToEat: ["magnesium-rich foods", "water", "ginger tea"],
      foodsToAvoid: ["caffeine", "aged cheese", "chocolate", "processed meats"],
      otherGuidance: "Stay hydrated, identify trigger foods"
    },
    precautions: [
      "Keep migraine diary",
      "Avoid triggers",
      "Get adequate sleep",
      "Manage stress",
      "Take preventive medication if needed"
    ],
    severity: "moderate",
    category: "chronic",
    doctorConsultation: true
  },
  {
    name: "Gastroenteritis",
    description: "Inflammation of stomach and intestines",
    symptoms: ["nausea", "vomiting", "diarrhea", "abdominal pain", "fever"],
    medicines: [
      {
        name: "Ondansetron",
        dosage: "4mg-8mg three times daily",
        duration: "2-3 days",
        sideEffects: "Constipation, headache"
      }
    ],
    diet: {
      foodsToEat: ["rice", "banana", "toast", "broth", "electrolyte drinks"],
      foodsToAvoid: ["spicy food", "dairy", "fatty foods", "high-fiber"],
      otherGuidance: "Rehydration is critical, eat light foods gradually"
    },
    precautions: [
      "Stay hydrated",
      "Rest for 24-48 hours",
      "Wash hands frequently",
      "Avoid solid foods initially",
      "Consult if symptoms persist"
    ],
    severity: "mild",
    category: "infectious",
    doctorConsultation: false
  },
  {
    name: "Anxiety Disorder",
    description: "Persistent anxiety affecting daily activities",
    symptoms: ["excessive worry", "panic", "restlessness", "difficulty concentrating"],
    medicines: [
      {
        name: "Sertraline",
        dosage: "50mg-100mg daily",
        duration: "Long-term",
        sideEffects: "Sleep issues, sexual dysfunction"
      }
    ],
    diet: {
      foodsToEat: ["omega-3 foods", "whole grains", "dark chocolate", "green tea"],
      foodsToAvoid: ["excessive caffeine", "alcohol", "sugar"],
      otherGuidance: "Regular meals, avoid stimulants"
    },
    precautions: [
      "Practice meditation",
      "Exercise regularly",
      "Get 7-8 hours sleep",
      "Therapy/counseling",
      "Avoid stressors"
    ],
    severity: "moderate",
    category: "mental",
    doctorConsultation: true
  }
];

// Instructions for adding to MongoDB:
// 1. Start MongoDB
// 2. Connect to database: mongo mongodb://localhost:27017/medicare
// 3. Use the database: use medicare
// 4. Insert sample diseases:
//    db.diseases.insertMany(sampleDiseases)
// 5. Verify: db.diseases.find()

// Or via API using Postman/curl:
// POST http://localhost:5000/api/admin/diseases
// Authorization: Bearer [admin-token]
// Body: [each disease object]

module.exports = sampleDiseases;

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Get user from localStorage
function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Check if user is authenticated
function isAuthenticated() {
  return !!getToken();
}

// Set user in localStorage
function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../index.html';
}

// Update navbar based on authentication
function updateNavbar() {
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const dashboardLink = document.getElementById('dashboardLink');
  const logoutLink = document.getElementById('logoutLink');

  if (isAuthenticated()) {
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    if (dashboardLink) dashboardLink.style.display = 'block';
    if (logoutLink) logoutLink.style.display = 'block';
  } else {
    if (loginLink) loginLink.style.display = 'block';
    if (registerLink) registerLink.style.display = 'block';
    if (dashboardLink) dashboardLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'none';
  }
}

// API request helper
async function apiRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const token = getToken();
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Show alert message
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  const container = document.querySelector('main') || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Symptom dropdown system
let allSymptoms = [];
let selectedSymptoms = [];
const commonSymptoms = ['fever', 'cough', 'headache', 'fatigue', 'nausea', 'vomiting', 'shortness of breath', 'chest pain'];

async function initSymptomDropdown() {
  const searchInput = document.getElementById('symptomSearchInput');
  const dropdown = document.getElementById('symptomDropdown');
  const selectedContainer = document.getElementById('selectedSymptomsContainer');
  const selectedTags = document.getElementById('selectedSymptomsTags');
  const hiddenInput = document.getElementById('selectedSymptomsInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const commonList = document.getElementById('commonSymptomsList');

  if (!searchInput) return; // Not on dashboard

  // Fetch all symptoms
  try {
    const response = await apiRequest('/diseases/symptoms/all');
    allSymptoms = response.symptoms || [];
  } catch (error) {
    console.log('Could not fetch symptoms, using default list');
    allSymptoms = commonSymptoms;
  }

  // Populate common symptoms sidebar
  if (commonList) {
    commonSymptoms.forEach(symptom => {
      const div = document.createElement('div');
      div.style.cssText = `background: rgba(236, 72, 153, 0.08); padding: 10px 12px; border-radius: 8px; color: #ec4899; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s ease; text-align: left;`;
      div.textContent = '+ ' + symptom.charAt(0).toUpperCase() + symptom.slice(1);
      div.onmouseover = () => div.style.background = 'rgba(236, 72, 153, 0.15)';
      div.onmouseout = () => div.style.background = 'rgba(236, 72, 153, 0.08)';
      div.onclick = () => addSymptom(symptom);
      commonList.appendChild(div);
    });
  }

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
      dropdown.style.display = 'none';
      return;
    }

    const filtered = allSymptoms.filter(symptom => 
      symptom.toLowerCase().includes(query) && !selectedSymptoms.includes(symptom)
    );

    dropdown.innerHTML = '';
    if (filtered.length === 0) {
      dropdown.innerHTML = '<div style="padding: 16px; text-align: center; color: #999;">No symptoms found</div>';
    } else {
      filtered.slice(0, 15).forEach(symptom => {
        const item = document.createElement('div');
        item.style.cssText = `padding: 12px 16px; cursor: pointer; transition: all 0.2s ease; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 10px;`;
        item.innerHTML = `<i class="fas fa-plus" style="color: #ec4899; font-size: 12px;"></i><span>${symptom}</span>`;
        item.onmouseover = () => item.style.background = 'rgba(236, 72, 153, 0.08)';
        item.onmouseout = () => item.style.background = 'transparent';
        item.onclick = () => {
          addSymptom(symptom);
          searchInput.value = '';
          dropdown.style.display = 'none';
          searchInput.focus();
        };
        dropdown.appendChild(item);
      });
    }
    dropdown.style.display = 'block';
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value) dropdown.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (e.target !== searchInput && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  // Form submission
  const form = document.getElementById('quickDiseaseForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (selectedSymptoms.length === 0) {
        showAlert('Please select at least one symptom', 'danger');
        return;
      }
      await checkDisease(selectedSymptoms);
    });
  }

  function addSymptom(symptom) {
    if (!selectedSymptoms.includes(symptom)) {
      selectedSymptoms.push(symptom);
      updateSelectedDisplay();
    }
  }

  function removeSymptom(symptom) {
    selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    updateSelectedDisplay();
  }

  function updateSelectedDisplay() {
    if (selectedSymptoms.length === 0) {
      selectedContainer.style.display = 'none';
      analyzeBtn.disabled = true;
      hiddenInput.value = '';
    } else {
      selectedContainer.style.display = 'block';
      analyzeBtn.disabled = false;
      hiddenInput.value = selectedSymptoms.join(', ');
      
      selectedTags.innerHTML = selectedSymptoms.map(symptom => `
        <div style="background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); color: white; padding: 8px 14px; border-radius: 16px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
          <span>${symptom}</span>
          <button type="button" onclick="removeSymptomFromDashboard('${symptom}')" style="background: rgba(255, 255, 255, 0.3); border: none; color: white; cursor: pointer; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; transition: all 0.2s ease; padding: 0;">×</button>
        </div>
      `).join('');
    }
  }

  window.removeSymptomFromDashboard = (symptom) => {
    removeSymptom(symptom);
  };
}

async function checkDisease(symptoms) {
  if (symptoms.length === 0) {
    showAlert('Please select at least one symptom', 'danger');
    return;
  }

  const resultsDiv = document.getElementById('quickResults');
  resultsDiv.innerHTML = '<div style="text-align: center; padding: 40px;"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p style="margin-top: 16px; color: #666;">Analyzing your symptoms...</p></div>';

  try {
    const response = await apiRequest('/diseases/check', 'POST', { symptoms });
    // store last results for diet plan selection
    window.__lastDiseaseResults = Array.isArray(response.possibleDiseases) ? response.possibleDiseases : [];
    
    if (!response.possibleDiseases || response.possibleDiseases.length === 0) {
      resultsDiv.innerHTML = '<div style="padding: 40px; text-align: center; background: rgba(59, 130, 246, 0.1); border-radius: 12px;"><i class="fas fa-info-circle" style="color: #3b82f6; font-size: 32px; margin-bottom: 12px;"></i><p style="color: #666; margin: 12px 0;">No matching diseases found. Please try different symptoms.</p></div>';
      return;
    }

    resultsDiv.innerHTML = '<h5 style="margin-bottom: 24px; color: #0f172a; font-weight: 700;">Possible Conditions:</h5>';
    
    response.possibleDiseases.forEach((disease, index) => {
      const matchPercentage = disease.matchPercentage || 0;
      const healthColor = matchPercentage >= 80 ? '#ef4444' : matchPercentage >= 60 ? '#f59e0b' : '#f59e0b';
      const dietHtml = (() => {
        if (!disease.diet) return '';
        if (typeof disease.diet === 'string') {
          return `
            <div style="margin-top: 16px;">
              <p style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px;">🥗 Diet Recommendations:</p>
              <p style="color: #555; font-size: 13px; margin: 4px 0;">${disease.diet}</p>
            </div>
          `;
        }
        return `
            <div style="margin-top: 16px;">
              <p style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px;">🥗 Diet Recommendations:</p>
              <p style="color: #555; font-size: 13px; margin: 4px 0;"><strong>Eat:</strong> ${disease.diet.foodsToEat?.join(', ') || 'N/A'}</p>
              <p style="color: #555; font-size: 13px; margin: 4px 0;"><strong>Avoid:</strong> ${disease.diet.foodsToAvoid?.join(', ') || 'N/A'}</p>
            </div>
        `;
      })();
      
      const diseaseHTML = `
        <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%); border-left: 4px solid #ec4899; padding: 24px; margin-bottom: 16px; border-radius: 12px; box-shadow: 0 8px 24px rgba(236, 72, 153, 0.08);">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px; gap: 12px;">
            <div>
              <h5 style="color: #0f172a; font-weight: 700; margin: 0; font-size: 16px;">${disease.name}</h5>
            </div>
            <span style="background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); color: white; padding: 6px 14px; border-radius: 16px; font-weight: 700; font-size: 13px; white-space: nowrap;">${matchPercentage}% Match</span>
          </div>
          <p style="color: #666; margin: 12px 0; line-height: 1.5; font-size: 14px;">${disease.description}</p>
          
          ${disease.severity ? `<p style="margin: 12px 0; color: #64748b; font-size: 13px;"><strong>Severity:</strong> <span style="text-transform: capitalize;">${disease.severity}</span></p>` : ''}
          
          ${disease.medicines && disease.medicines.length > 0 ? `
            <div style="margin-top: 16px;">
              <p style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px;">💊 Medicines:</p>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${disease.medicines.map(med => `<li style="padding: 6px 0; color: #555; font-size: 13px;">• <strong>${med.name}</strong> - ${med.dosage}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${dietHtml}
          
          ${disease.precautions && disease.precautions.length > 0 ? `
            <div style="margin-top: 16px;">
              <p style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px;">⚠️ Precautions:</p>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${disease.precautions.map(prec => `<li style="padding: 4px 0; color: #555; font-size: 13px;">• ${prec}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div style="margin-top: 12px; display: flex; gap: 8px;">
            <button type="button" class="btn btn-sm btn-outline-primary" onclick="selectDietFromResults(${index})">
              <i class="fas fa-utensils"></i> Use for Diet Plan
            </button>
          </div>
        </div>
      `;
      resultsDiv.innerHTML += diseaseHTML;
    });
  } catch (error) {
    resultsDiv.innerHTML = `<div style="padding: 24px; background: #fee2e2; border-left: 4px solid #ef4444; border-radius: 8px; color: #991b1b;"><strong>Error:</strong> ${error.message}</div>`;
  }
}

function initAnimations() {
  if (window.AOS && typeof window.AOS.init === 'function') {
    window.AOS.init({
      once: true,
      duration: 700,
      easing: 'ease-out-cubic',
      offset: 90
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  initAnimations();
  initSymptomDropdown();
  renderDietPlan();
});

// Diet Plan selection and rendering
function saveSelectedDiseaseForDietPlan(disease) {
  if (!disease || typeof disease !== 'object') return;
  const minimal = {
    name: disease.name || 'Selected Condition',
    description: disease.description || '',
    severity: disease.severity || '',
    diet: disease.diet || { foodsToEat: [], foodsToAvoid: [] },
    precautions: Array.isArray(disease.precautions) ? disease.precautions : []
  };
  localStorage.setItem('dietSelectedDisease', JSON.stringify(minimal));
  showAlert('Diet plan updated for ' + minimal.name, 'success');
}

function getSelectedDiseaseForDietPlan() {
  try {
    const raw = localStorage.getItem('dietSelectedDisease');
    return raw ? JSON.parse(raw) : null;
  } catch (_) { return null; }
}

function generateDietPlanHtml(disease) {
  const eat = Array.isArray(disease?.diet?.foodsToEat) ? disease.diet.foodsToEat : [];
  const avoid = Array.isArray(disease?.diet?.foodsToAvoid) ? disease.diet.foodsToAvoid : [];
  const precautions = Array.isArray(disease?.precautions) ? disease.precautions : [];
  const dietText = typeof disease?.diet === 'string' ? disease.diet : '';

  const pick = (arr, n) => arr.slice(0, Math.max(0, n));
  const breakfast = pick(eat, 3).join(', ') || 'Oatmeal with fruits, yogurt, herbal tea';
  const lunch = pick(eat.slice(3), 3).join(', ') || 'Grilled lean protein, mixed veggies, brown rice';
  const dinner = pick(eat.slice(6), 3).join(', ') || 'Light soup, whole grains, steamed vegetables';

  return `
    <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom: 12px;">
      <div>
        <h4 style="margin:0; font-weight:800; color:#0f172a;">Personalized Diet Plan</h4>
        <div style="color:#64748b;">Based on condition: <strong>${disease?.name || 'Condition'}</strong>${disease?.severity ? ` · Severity: ${disease.severity}` : ''}</div>
      </div>
      <button class="btn btn-sm btn-outline-secondary" onclick="localStorage.removeItem('dietSelectedDisease'); renderDietPlan();">Clear</button>
    </div>

    <div class="row g-3">
      <div class="col-md-6">
        <div class="p-3" style="border:1px solid rgba(15,23,42,0.08); border-radius:12px;">
          <h6 style="font-weight:800; color:#0f172a;">Daily Meals</h6>
          <ul style="margin:0; padding-left:16px; color:#475569;">
            <li><strong>Breakfast:</strong> ${breakfast}</li>
            <li><strong>Lunch:</strong> ${lunch}</li>
            <li><strong>Dinner:</strong> ${dinner}</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="p-3" style="border:1px solid rgba(15,23,42,0.08); border-radius:12px;">
          <h6 style="font-weight:800; color:#0f172a;">Foods To Avoid</h6>
          <p style="margin:0; color:#475569;">${avoid.length ? avoid.join(', ') : 'Ultra-processed foods, excessive sugar, deep-fried items, alcohol'}</p>
        </div>
      </div>
    </div>

    ${dietText ? `<div class="mt-3 p-3" style="border:1px solid rgba(15,23,42,0.08); border-radius:12px;"><h6 style=\"font-weight:800; color:#0f172a;\">Diet Notes</h6><p style=\"margin:0; color:#475569;\">${dietText}</p></div>` : ''}

    ${precautions.length ? `
      <div class="mt-3 p-3" style="border:1px solid rgba(15,23,42,0.08); border-radius:12px;">
        <h6 style="font-weight:800; color:#0f172a;">Precautions</h6>
        <ul style="margin:0; padding-left:16px; color:#475569;">${precautions.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>` : ''}
  `;
}

function renderDietPlan() {
  const container = document.getElementById('dietPlanContainer');
  if (!container) return;
  const disease = getSelectedDiseaseForDietPlan();
  if (!disease) {
    container.innerHTML = `
      <div style="padding: 40px 20px; text-align: center; color: #999;">
        <i class="fas fa-apple-alt" style="font-size: 50px; color: #f59e0b; margin-bottom: 15px; opacity: 0.3;"></i>
        <p style="color: #999; font-size: 16px;">No disease selected</p>
        <p class="small" style="color: #bbb;">Run a Disease Check and choose \"Use for Diet Plan\"</p>
        <a href="#disease-check" class="btn btn-sm btn-primary mt-2" onclick="document.querySelector('.nav-link[data-section=\\'disease-check\\']')?.click(); return false;">Go to Disease Check</a>
      </div>`;
    return;
  }
  container.innerHTML = generateDietPlanHtml(disease);
}

function selectDietFromResults(index) {
  const list = Array.isArray(window.__lastDiseaseResults) ? window.__lastDiseaseResults : [];
  const disease = list[index];
  if (!disease) return;
  saveSelectedDiseaseForDietPlan(disease);
  const link = document.querySelector(".nav-link[data-section='diet-plan']");
  if (link) link.click(); else window.location.hash = '#diet-plan';
  renderDietPlan();
}


// Form submission handler
document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    predictPrice();
});

// Scroll to predictor section
function scrollToPredictor() {
    document.getElementById('predictor').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Price prediction function
async function predictPrice() {
    const form = document.getElementById('predictionForm');
    const formData = new FormData(form);
    
    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'flex';
    
    // Simulate API call delay (replace with actual backend API)
    setTimeout(() => {
        // Get form values
        const propertySize = parseInt(formData.get('property_size_sqft'));
        const lotSize = parseInt(formData.get('lot_size_sqft'));
        const bedrooms = parseInt(formData.get('bedrooms'));
        const bathrooms = parseInt(formData.get('bathrooms'));
        const yearBuilt = parseInt(formData.get('year_built'));
        const garageSize = parseInt(formData.get('garage_size'));
        const distanceToCity = parseFloat(formData.get('distance_to_city_center'));
        const schoolRating = parseFloat(formData.get('school_rating'));
        const hasPool = document.getElementById('has_pool').checked ? 1 : 0;
        const hasBasement = document.getElementById('has_basement').checked ? 1 : 0;
        const condition = parseInt(formData.get('condition'));
        const crimeRate = parseFloat(formData.get('crime_rate'));
        
        // Calculate price using similar logic to Python backend
        const predictedPrice = calculatePrice({
            property_size_sqft: propertySize,
            lot_size_sqft: lotSize,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            year_built: yearBuilt,
            garage_size: garageSize,
            distance_to_city_center: distanceToCity,
            school_rating: schoolRating,
            has_pool: hasPool,
            has_basement: hasBasement,
            condition: condition,
            crime_rate: crimeRate
        });
        
        // Update UI with results
        updateResults(predictedPrice);
        
        // Hide loading spinner
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 2000);
}

// Price calculation (simplified version matching Python logic)
function calculatePrice(features) {
    // Base price calculation (simplified coefficients)
    let price = (
        features.property_size_sqft * 150 +
        features.lot_size_sqft * 5 +
        features.bedrooms * 25000 +
        features.bathrooms * 30000 +
        (features.year_built - 1950) * 500 +
        features.garage_size * 15000 +
        features.has_pool * 50000 +
        features.has_basement * 25000 +
        features.condition * 30000 -
        features.distance_to_city_center * 5000 +
        features.school_rating * 15000 -
        features.crime_rate * 10000
    );
    
    // Add some random variation to simulate real prediction
    const variation = price * 0.1 * (Math.random() - 0.5);
    price += variation;
    
    return Math.max(100000, Math.round(price));
}

// Update results display
function updateResults(price) {
    const priceDisplay = document.getElementById('priceDisplay');
    const confidenceValue = document.getElementById('confidenceValue');
    const confidenceFill = document.getElementById('confidenceFill');
    const priceBreakdown = document.getElementById('priceBreakdown');
    
    // Format price with commas
    const formattedPrice = '$' + price.toLocaleString();
    priceDisplay.textContent = formattedPrice;
    
    // Generate random confidence (85-95%)
    const confidence = 85 + Math.random() * 10;
    confidenceValue.textContent = Math.round(confidence) + '%';
    confidenceFill.style.width = confidence + '%';
    
    // Create price breakdown
    const breakdownItems = [
        { label: 'Base Property Value', value: Math.round(price * 0.6) },
        { label: 'Location Premium', value: Math.round(price * 0.2) },
        { label: 'Amenities Value', value: Math.round(price * 0.15) },
        { label: 'Market Factors', value: Math.round(price * 0.05) }
    ];
    
    priceBreakdown.innerHTML = '<h4>Value Breakdown</h4>';
    breakdownItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'breakdown-item';
        itemElement.innerHTML = `
            <span>${item.label}</span>
            <span>$${item.value.toLocaleString()}</span>
        `;
        priceBreakdown.appendChild(itemElement);
    });
    
    // Add animation
    priceDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
        priceDisplay.style.transform = 'scale(1)';
    }, 300);
}

// Form validation and real-time updates
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', function() {
        // Real-time form validation could be added here
        validateField(this);
    });
});

function validateField(field) {
    // Add field-specific validation logic here
    if (field.value === '') {
        field.style.borderColor = '#e53e3e';
    } else {
        field.style.borderColor = '#38a169';
    }
}

// Initialize form with some default values for demo
document.addEventListener('DOMContentLoaded', function() {
    // Set current year as default for year built
    document.getElementById('year_built').value = 2015;
    document.getElementById('property_size_sqft').value = 2000;
    document.getElementById('lot_size_sqft').value = 10000;
    document.getElementById('bedrooms').value = '3';
    document.getElementById('bathrooms').value = '2';
    document.getElementById('garage_size').value = '2';
    document.getElementById('distance_to_city_center').value = '5';
    document.getElementById('school_rating').value = '7';
    document.getElementById('condition').value = '3';
    document.getElementById('crime_rate').value = '2';
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
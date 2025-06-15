// Global variables
let educationCount = 1;
let experienceCount = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeFormListeners();
    updateProgress();
    
    // Add initial animation delay
    setTimeout(() => {
        document.querySelector('.form-section').style.opacity = '1';
        document.querySelector('.preview-section').style.opacity = '1';
    }, 300);
});

// Initialize all form event listeners
function initializeFormListeners() {
    // Personal information listeners
    const personalInputs = ['fullName', 'email', 'phone', 'location', 'linkedin'];
    personalInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updatePersonalInfo);
            element.addEventListener('input', updateProgress);
        }
    });

    // Summary listener
    const summaryElement = document.getElementById('summary');
    if (summaryElement) {
        summaryElement.addEventListener('input', updateSummary);
        summaryElement.addEventListener('input', updateProgress);
    }

    // Skills listener
    const skillsElement = document.getElementById('skills');
    if (skillsElement) {
        skillsElement.addEventListener('input', updateSkills);
        skillsElement.addEventListener('input', updateProgress);
    }

    // Education and experience listeners
    addEducationListeners();
    addExperienceListeners();

    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }

    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', validatePhone);
    }
}

// Update personal information in preview
function updatePersonalInfo() {
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const linkedin = document.getElementById('linkedin').value;

    // Update name with animation
    const nameElement = document.getElementById('previewName');
    if (nameElement.textContent !== fullName) {
        nameElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            nameElement.textContent = fullName;
            nameElement.style.transform = 'scale(1)';
        }, 150);
    }

    // Update contact information
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewPhone').textContent = phone;
    document.getElementById('previewLocation').textContent = location;
    
    const linkedinElement = document.getElementById('previewLinkedin');
    if (linkedin) {
        linkedinElement.innerHTML = `<a href="${linkedin}" target="_blank" style="color: #3B82F6; text-decoration: none;">LinkedIn Profile</a>`;
    } else {
        linkedinElement.textContent = '';
    }

    // Show/hide contact items based on content
    updateContactVisibility();
}

// Update contact section visibility
function updateContactVisibility() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        if (item.textContent.trim() === '' && !item.querySelector('a')) {
            item.style.display =  'none';
        } else {
            item.style.display = 'inline';
        }
    });
}

// Update professional summary
function updateSummary() {
    const summary = document.getElementById('summary').value;
    const previewSummary = document.getElementById('previewSummary');
    const summarySection = document.getElementById('previewSummarySection');
    
    if (summary.trim()) {
        previewSummary.textContent = summary;
        summarySection.style.display = 'block';
        summarySection.style.animation = 'fadeInUp 0.5s ease-out';
    } else {
        summarySection.style.display = 'none';
    }
}

// Update skills section
function updateSkills() {
    const skills = document.getElementById('skills').value;
    const previewSkills = document.getElementById('previewSkills');
    const skillsSection = document.getElementById('previewSkillsSection');
    
    if (skills.trim()) {
        const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        previewSkills.innerHTML = '';
        
        skillsArray.forEach((skill, index) => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillTag.style.animationDelay = `${index * 0.1}s`;
            previewSkills.appendChild(skillTag);
        });
        
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
}

// Add education entry
function addEducation() {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <div class="input-row">
            <div class="input-group">
                <label>Degree</label>
                <input type="text" name="degree" placeholder="Bachelor of Science">
            </div>
            <div class="input-group">
                <label>Field of Study</label>
                <input type="text" name="field" placeholder="Computer Science">
            </div>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Institution</label>
                <input type="text" name="institution" placeholder="University Name">
            </div>
            <div class="input-group">
                <label>Graduation Year</label>
                <input type="number" name="gradYear" min="1950" max="2030" placeholder="2024">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeEducation(this)">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    
    container.appendChild(newEntry);
    addEducationListeners(newEntry);
    updateEducation();
    updateProgress();
    
    // Animate new entry
    newEntry.style.opacity = '0';
    newEntry.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newEntry.style.transition = 'all 0.3s ease';
        newEntry.style.opacity = '1';
        newEntry.style.transform = 'translateY(0)';
    }, 50);
}

// Remove education entry
function removeEducation(button) {
    const entry = button.parentElement;
    entry.style.transition = 'all 0.3s ease';
    entry.style.opacity = '0';
    entry.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
        entry.remove();
        educationCount--;
        updateEducation();
        updateProgress();
    }, 300);
}

// Add experience entry
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry';
    newEntry.innerHTML = `
        <div class="input-row">
            <div class="input-group">
                <label>Job Title</label>
                <input type="text" name="jobTitle" placeholder="Software Engineer">
            </div>
            <div class="input-group">
                <label>Company</label>
                <input type="text" name="company" placeholder="Tech Company Inc.">
            </div>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Start Date</label>
                <input type="month" name="startDate">
            </div>
            <div class="input-group">
                <label>End Date</label>
                <input type="month" name="endDate">
                <label class="checkbox-label">
                    <input type="checkbox" name="current"> Currently working here
                </label>
            </div>
        </div>
        <div class="input-group">
            <label>Job Description</label>
            <textarea name="jobDescription" rows="3" placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Improved application performance by 30% through code optimization"></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeExperience(this)">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    
    container.appendChild(newEntry);
    addExperienceListeners(newEntry);
    updateExperience();
    updateProgress();
    
    // Handle current job checkbox
    const currentCheckbox = newEntry.querySelector('input[name="current"]');
    const endDateInput = newEntry.querySelector('input[name="endDate"]');
    
    currentCheckbox.addEventListener('change', function() {
        if (this.checked) {
            endDateInput.disabled = true;
            endDateInput.style.opacity = '0.5';
            endDateInput.value = '';
        } else {
            endDateInput.disabled = false;
            endDateInput.style.opacity = '1';
        }
        updateExperience();
    });
    
    // Animate new entry
    newEntry.style.opacity = '0';
    newEntry.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newEntry.style.transition = 'all 0.3s ease';
        newEntry.style.opacity = '1';
        newEntry.style.transform = 'translateY(0)';
    }, 50);
}

// Remove experience entry
function removeExperience(button) {
    const entry = button.parentElement;
    entry.style.transition = 'all 0.3s ease';
    entry.style.opacity = '0';
    entry.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
        entry.remove();
        experienceCount--;
        updateExperience();
        updateProgress();
    }, 300);
}

// Add event listeners to education entries
function addEducationListeners(container = document) {
    const educationInputs = container.querySelectorAll('#educationContainer input');
    educationInputs.forEach(input => {
        input.addEventListener('input', updateEducation);
        input.addEventListener('input', updateProgress);
    });
}

// Add event listeners to experience entries
function addExperienceListeners(container = document) {
    const experienceInputs = container.querySelectorAll('#experienceContainer input, #experienceContainer textarea');
    experienceInputs.forEach(input => {
        input.addEventListener('input', updateExperience);
        input.addEventListener('input', updateProgress);
    });
}

// Update education preview
function updateEducation() {
    const educationEntries = document.querySelectorAll('.education-entry');
    const previewContainer = document.getElementById('previewEducation');
    const educationSection = document.getElementById('previewEducationSection');
    
    previewContainer.innerHTML = '';
    let hasEducation = false;
    
    educationEntries.forEach((entry, index) => {
        const degree = entry.querySelector('input[name="degree"]').value;
        const field = entry.querySelector('input[name="field"]').value;
        const institution = entry.querySelector('input[name="institution"]').value;
        const gradYear = entry.querySelector('input[name="gradYear"]').value;
        
        if (degree || field || institution || gradYear) {
            hasEducation = true;
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            educationItem.style.animationDelay = `${index * 0.1}s`;
            
            educationItem.innerHTML = `
                <div class="education-header">
                    <div>
                        <div class="degree-title">${degree}${field ? ` in ${field}` : ''}</div>
                        <div class="institution-name">${institution}</div>
                    </div>
                    <div class="date-range">${gradYear || ''}</div>
                </div>
            `;
            
            previewContainer.appendChild(educationItem);
        }
    });
    
    educationSection.style.display = hasEducation ? 'block' : 'none';
}

// Update experience preview
function updateExperience() {
    const experienceEntries = document.querySelectorAll('.experience-entry');
    const previewContainer = document.getElementById('previewExperience');
    const experienceSection = document.getElementById('previewExperienceSection');
    
    previewContainer.innerHTML = '';
    let hasExperience = false;
    
    experienceEntries.forEach((entry, index) => {
        const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
        const company = entry.querySelector('input[name="company"]').value;
        const startDate = entry.querySelector('input[name="startDate"]').value;
        const endDate = entry.querySelector('input[name="endDate"]').value;
        const current = entry.querySelector('input[name="current"]').checked;
        const jobDescription = entry.querySelector('textarea[name="jobDescription"]').value;
        
        if (jobTitle || company || startDate || jobDescription) {
            hasExperience = true;
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            experienceItem.style.animationDelay = `${index * 0.1}s`;
            
            // Format dates
            let dateRange = '';
            if (startDate) {
                const startFormatted = formatDate(startDate);
                const endFormatted = current ? 'Present' : (endDate ? formatDate(endDate) : '');
                dateRange = endFormatted ? `${startFormatted} - ${endFormatted}` : startFormatted;
            }
            
            experienceItem.innerHTML = `
                <div class="experience-header">
                    <div>
                        <div class="job-title">${jobTitle}</div>
                        <div class="company-name">${company}</div>
                    </div>
                    <div class="date-range">${dateRange}</div>
                </div>
                ${jobDescription ? `<div class="job-description">${jobDescription}</div>` : ''}
            `;
            
            previewContainer.appendChild(experienceItem);
        }
    });
    
    experienceSection.style.display = hasExperience ? 'block' : 'none';
}

// Format date from YYYY-MM to Month YYYY
function formatDate(dateString) {
    const [year, month] = dateString.split('-');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

// Update progress bar
function updateProgress() {
    const requiredFields = [
        'fullName', 'email'
    ];
    
    const optionalFields = [
        'phone', 'location', 'linkedin', 'summary', 'skills'
    ];
    
    let filledRequired = 0;
    let filledOptional = 0;
    
    // Check required fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.value.trim()) {
            filledRequired++;
        }
    });
    
    // Check optional fields
    optionalFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.value.trim()) {
            filledOptional++;
        }
    });
    
    // Check education entries
    let hasEducation = false;
    document.querySelectorAll('.education-entry').forEach(entry => {
        const inputs = entry.querySelectorAll('input');
        const hasData = Array.from(inputs).some(input => input.value.trim());
        if (hasData) hasEducation = true;
    });
    
    // Check experience entries
    let hasExperience = false;
    document.querySelectorAll('.experience-entry').forEach(entry => {
        const inputs = entry.querySelectorAll('input, textarea');
        const hasData = Array.from(inputs).some(input => input.value.trim());
        if (hasData) hasExperience = true;
    });
    
    // Calculate progress (weighted)
    let progress = 0;
    progress += (filledRequired / requiredFields.length) * 40; // 40% for required fields
    progress += (filledOptional / optionalFields.length) * 30; // 30% for optional fields
    progress += hasEducation ? 15 : 0; // 15% for education
    progress += hasExperience ? 15 : 0; // 15% for experience
    
    progress = Math.round(progress);
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-bar::after') || document.querySelector('.progress-bar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        document.documentElement.style.setProperty('--progress-width', `${progress}%`);
        const style = document.createElement('style');
        style.textContent = `.progress-bar::after { width: ${progress}% !important; }`;
        document.head.appendChild(style);
    }
    
    if (progressText) {
        progressText.textContent = `${progress}% Complete`;
    }
}

// Email validation
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    
    if (emailValue && !isValidEmail(emailValue)) {
        emailInput.style.borderColor = '#EF4444';
        showTooltip(emailInput, 'Please enter a valid email address');
    } else {
        emailInput.style.borderColor = '#10B981';
        hideTooltip(emailInput);
    }
}

// Phone validation
function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    
    if (phoneValue && !isValidPhone(phoneValue)) {
        phoneInput.style.borderColor = '#EF4444';
        showTooltip(phoneInput, 'Please enter a valid phone number');
    } else {
        phoneInput.style.borderColor = '#10B981';
        hideTooltip(phoneInput);
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\s\-\(\)]*([0-9][\s\-\(\)]*){10,}$/;
    return phoneRegex.test(phone);
}

// Show validation tooltip
function showTooltip(element, message) {
    hideTooltip(element); // Remove existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'validation-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        background: #EF4444;
        color: white;
        padding: 5px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    element.parentElement.style.position = 'relative';
    element.parentElement.appendChild(tooltip);
}

// Hide validation tooltip
function hideTooltip(element) {
    const tooltip = element.parentElement.querySelector('.validation-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Clear form function
function clearForm() {
    if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
        // Clear all inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
            input.style.borderColor = '#e5e7eb';
        });
        
        // Reset to single education and experience entries
        const educationContainer = document.getElementById('educationContainer');
        const experienceContainer = document.getElementById('experienceContainer');
        
        // Keep only first entry of each
        const educationEntries = educationContainer.querySelectorAll('.education-entry');
        const experienceEntries = experienceContainer.querySelectorAll('.experience-entry');
        
        for (let i = 1; i < educationEntries.length; i++) {
            educationEntries[i].remove();
        }
        
        for (let i = 1; i < experienceEntries.length; i++) {
            experienceEntries[i].remove();
        }
        
        educationCount = 1;
        experienceCount = 1;
        
        // Update preview
        updatePersonalInfo();
        updateSummary();
        updateSkills();
        updateEducation();
        updateExperience();
        updateProgress();
        
        // Hide tooltips
        document.querySelectorAll('.validation-tooltip').forEach(tooltip => tooltip.remove());
        
        // Show success message
        showNotification('Form cleared successfully!', 'success');
    }
}

// Download PDF function
function downloadPDF() {
    const element = document.getElementById('resumePreview');
    const name = document.getElementById('fullName').value || 'Resume';
    
    // Show loading state
    const downloadBtn = document.querySelector('.download-btn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;
    
    const opt = {
        margin: 0.5,
        filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'in', 
            format: 'letter', 
            orientation: 'portrait' 
        }
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
        // Reset button
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        showNotification('PDF downloaded successfully!', 'success');
    }).catch((error) => {
        console.error('PDF generation failed:', error);
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        showNotification('Failed to generate PDF. Please try again.', 'error');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#10B981';
    } else if (type === 'error') {
        notification.style.background = '#EF4444';
    } else {
        notification.style.background = '#3B82F6';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add slide animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Add smooth scrolling for form sections
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to download PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadPDF();
    }
    
    // Ctrl/Cmd + R to clear form (with confirmation)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        clearForm();
    }
});

// Auto-save to localStorage (optional feature)
function autoSave() {
    const formData = {};
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else {
            formData[input.name] = input.value;
        }
    });
    
    localStorage.setItem('resumeBuilderData', JSON.stringify(formData));
}

// Load from localStorage on page load
function loadSavedData() {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            Object.keys(formData).forEach(key => {
                const input = document.querySelector(`[name="${key}"]`);
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = formData[key];
                    } else {
                        input.value = formData[key];
                    }
                }
            });
            
            // Update preview after loading
            updatePersonalInfo();
            updateSummary();
            updateSkills();
            updateEducation();
            updateExperience();
            updateProgress();
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Auto-save every 30 seconds
setInterval(autoSave, 30000);

// Initialize saved data on load
document.addEventListener('DOMContentLoaded', loadSavedData);

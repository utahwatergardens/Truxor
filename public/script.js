/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Validate if constants exist */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home__title, .popular__container, .features__img, .featured__card`)
sr.reveal(`.home__subtitle`, {delay: 500})
sr.reveal(`.home__elec`, {delay: 600})
sr.reveal(`.home__img`, {delay: 700})
sr.reveal(`.home__car-data`, {delay: 900, interval: 100, origin: 'bottom'})
sr.reveal(`.home__button`, {delay: 1000, origin: 'bottom'})
sr.reveal(`.about__group, .offer__data`, {origin: 'left'})
sr.reveal(`.about__data, .offer__img`, {origin: 'right'})
sr.reveal(`.features__map`, {delay: 200, origin: 'bottom'})
sr.reveal(`.features__card`, {interval: 300})
sr.reveal(`.features__card-2`, {delay: 400})
sr.reveal(`.features__card-3`, {delay: 500})
sr.reveal(`.features__card-4`, {delay: 600})
sr.reveal(`.features__card-5`, {delay: 700})
sr.reveal(`.features__card-6`, {delay: 800})
sr.reveal(`.logos__content, .footer__content`, {interval: 100})

/*=============== CONTACT FORM HANDLING ===============*/
const contactForm = document.querySelector('.contact__form')

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault()
        
        // Get form data
        const formData = new FormData(this)
        const data = Object.fromEntries(formData)
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.service) {
            showNotification('Please fill in all required fields.', 'error')
            return
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error')
            return
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
            showNotification('Please enter a valid phone number.', 'error')
            return
        }
        
        // Simulate form submission
        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success')
        
        // Reset form
        this.reset()
        
        // Here you would typically send the data to your server
        console.log('Form data:', data)
    })
}

/*=============== NOTIFICATION SYSTEM ===============*/
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification')
    existingNotifications.forEach(notification => notification.remove())
    
    // Create notification element
    const notification = document.createElement('div')
    notification.className = `notification notification--${type}`
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `
    
    // Add to page
    document.body.appendChild(notification)
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)'
    }, 100)
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close')
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => notification.remove(), 300)
    })
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)'
            setTimeout(() => notification.remove(), 300)
        }
    }, 5000)
}

/*=============== SMOOTH SCROLLING FOR ANCHOR LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight
            const targetPosition = target.offsetTop - headerHeight
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            })
        }
    })
})

/*=============== LAZY LOADING FOR IMAGES ===============*/
const images = document.querySelectorAll('img[data-src]')

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
        }
    })
})

images.forEach(img => imageObserver.observe(img))

/*=============== COUNTER ANIMATION ===============*/
function animateCounters() {
    const counters = document.querySelectorAll('.home__stat h3')
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''))
        const increment = target / 100
        let current = 0
        
        const updateCounter = () => {
            if (current < target) {
                current += increment
                counter.textContent = Math.ceil(current) + '+'
                requestAnimationFrame(updateCounter)
            } else {
                counter.textContent = target + '+'
            }
        }
        
        updateCounter()
    })
}

// Trigger counter animation when home section is visible
const homeSection = document.querySelector('.home')
if (homeSection) {
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters()
                homeObserver.unobserve(entry.target)
            }
        })
    })
    
    homeObserver.observe(homeSection)
}

/*=============== EQUIPMENT FEATURES HIGHLIGHT ===============*/
const equipmentFeatures = document.querySelectorAll('.equipment__feature')

equipmentFeatures.forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)'
        this.style.color = 'var(--primary-color)'
    })
    
    feature.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)'
        this.style.color = 'var(--dark-gray)'
    })
})

/*=============== SERVICES CARDS INTERACTION ===============*/
const serviceCards = document.querySelectorAll('.services__card')

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)'
    })
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)'
    })
})

/*=============== HEADER SCROLL EFFECT ===============*/
let lastScrollTop = 0
const header = document.querySelector('.header')

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)'
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)'
    }
    
    lastScrollTop = scrollTop
})

/*=============== FORM INPUT FOCUS EFFECTS ===============*/
const formInputs = document.querySelectorAll('.contact__form-input')

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)'
    })
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)'
    })
})

/*=============== PAGE LOAD ANIMATION ===============*/
window.addEventListener('load', () => {
    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.5s ease'
    
    setTimeout(() => {
        document.body.style.opacity = '1'
    }, 100)
})

/*=============== SEO ENHANCEMENTS ===============*/
// Add structured data for better SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pond Cleanup Pro",
    "description": "Professional pond cleanup and lake weed removal services using Truxor T50 equipment",
    "url": "https://pondcleanup.com",
    "telephone": "+1-801-555-0123",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Utah",
        "addressRegion": "UT",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.7608",
        "longitude": "-111.8910"
    },
    "serviceArea": {
        "@type": "State",
        "name": "Utah"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pond and Lake Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Pond Cleanup"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Lake Weed Removal"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Aquatic Vegetation Control"
                }
            }
        ]
    }
}

// Add structured data to page
const script = document.createElement('script')
script.type = 'application/ld+json'
script.textContent = JSON.stringify(structuredData)
document.head.appendChild(script)

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Preload critical resources
const criticalResources = [
    'images/hero-pond-cleanup.jpg',
    'images/truxor-t50.jpg'
]

criticalResources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = resource
    document.head.appendChild(link)
})

/*=============== ACCESSIBILITY ENHANCEMENTS ===============*/
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu')
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu')
        }
    }
})

// Add focus indicators for better accessibility
const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')

focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)'
        this.style.outlineOffset = '2px'
    })
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none'
    })
})

console.log('Pond Cleanup website loaded successfully! 🚀')

/*=============== ENHANCED CONTACT FORM FUNCTIONALITY ===============*/

// Enhanced Contact Form Variables
let currentStep = 1
const totalSteps = 3

// Initialize enhanced form if it exists
document.addEventListener('DOMContentLoaded', function() {
    const enhancedForm = document.getElementById('contact-form')
    if (enhancedForm) {
        initializeEnhancedForm()
    }
})

function initializeEnhancedForm() {
    // Initialize textarea counter
    const messageTextarea = document.getElementById('message')
    const messageCounter = document.getElementById('message-counter')
    
    if (messageTextarea && messageCounter) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length
            messageCounter.textContent = length
            
            if (length > 450) {
                messageCounter.style.color = '#ef4444'
            } else if (length > 400) {
                messageCounter.style.color = '#f59e0b'
            } else {
                messageCounter.style.color = 'var(--gray-color)'
            }
        })
    }
    
    // Initialize form submission
    const form = document.getElementById('contact-form')
    form.addEventListener('submit', handleFormSubmission)
    
    // Initialize input validation
    initializeFormValidation()
}

// Multi-step navigation
function nextStep(step) {
    if (validateStep(step)) {
        currentStep = step + 1
        updateFormDisplay()
        updateProgressIndicator()
        
        // Scroll to top of form
        const formContainer = document.querySelector('.contact-form__container')
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

function prevStep(step) {
    currentStep = step - 1
    updateFormDisplay()
    updateProgressIndicator()
    
    // Scroll to top of form
    const formContainer = document.querySelector('.contact-form__container')
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function updateFormDisplay() {
    // Hide all steps
    const steps = document.querySelectorAll('.form-step')
    steps.forEach(step => {
        step.classList.remove('active')
    })
    
    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`)
    if (currentStepElement) {
        currentStepElement.classList.add('active')
    }
    
    // Update review section if on step 3
    if (currentStep === 3) {
        updateReviewSection()
    }
}

function updateProgressIndicator() {
    const progressSteps = document.querySelectorAll('.form-progress__step')
    
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1
        step.classList.remove('active', 'completed')
        
        if (stepNumber === currentStep) {
            step.classList.add('active')
        } else if (stepNumber < currentStep) {
            step.classList.add('completed')
        }
    })
}

// Form validation
function validateStep(step) {
    let isValid = true
    const errors = {}
    
    switch (step) {
        case 1:
            // Validate contact information
            const name = document.getElementById('name').value.trim()
            const email = document.getElementById('email').value.trim()
            const phone = document.getElementById('phone').value.trim()
            const address = document.getElementById('address').value.trim()
            
            if (!name) {
                errors.name = 'Full name is required'
                isValid = false
            } else if (name.length < 2) {
                errors.name = 'Name must be at least 2 characters'
                isValid = false
            }
            
            if (!email) {
                errors.email = 'Email is required'
                isValid = false
            } else if (!isValidEmail(email)) {
                errors.email = 'Please enter a valid email address'
                isValid = false
            }
            
            if (!phone) {
                errors.phone = 'Phone number is required'
                isValid = false
            } else if (!isValidPhone(phone)) {
                errors.phone = 'Please enter a valid phone number'
                isValid = false
            }
            
            if (!address) {
                errors.address = 'Property address is required'
                isValid = false
            }
            break
            
        case 2:
            // Validate project details
            const service = document.getElementById('service').value
            const waterBodySize = document.getElementById('water-body-size').value
            const urgency = document.querySelector('input[name="urgency"]:checked')
            const message = document.getElementById('message').value.trim()
            
            if (!service) {
                errors.service = 'Please select a service'
                isValid = false
            }
            
            if (!waterBodySize) {
                errors['water-body-size'] = 'Please select water body size'
                isValid = false
            }
            
            if (!urgency) {
                errors.urgency = 'Please select urgency level'
                isValid = false
            }
            
            if (!message) {
                errors.message = 'Project description is required'
                isValid = false
            } else if (message.length < 10) {
                errors.message = 'Description must be at least 10 characters'
                isValid = false
            }
            break
    }
    
    // Display errors
    displayErrors(errors)
    
    return isValid
}

function displayErrors(errors) {
    // Clear all previous errors
    const errorElements = document.querySelectorAll('.error-message')
    errorElements.forEach(element => {
        element.textContent = ''
    })
    
    const inputElements = document.querySelectorAll('.contact__input')
    inputElements.forEach(input => {
        input.classList.remove('error', 'success')
    })
    
    // Display new errors
    Object.keys(errors).forEach(fieldName => {
        const errorElement = document.getElementById(`${fieldName}-error`)
        const inputElement = document.getElementById(fieldName)
        
        if (errorElement) {
            errorElement.textContent = errors[fieldName]
        }
        
        if (inputElement) {
            inputElement.classList.add('error')
        }
    })
}

function initializeFormValidation() {
    const inputs = document.querySelectorAll('.contact__input')
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this)
        })
        
        input.addEventListener('input', function() {
            // Remove error styling on input
            this.classList.remove('error')
            const errorElement = document.getElementById(`${this.id}-error`)
            if (errorElement) {
                errorElement.textContent = ''
            }
        })
    })
}

function validateField(field) {
    const value = field.value.trim()
    const fieldName = field.id
    let isValid = true
    let errorMessage = ''
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'Full name is required'
                isValid = false
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters'
                isValid = false
            }
            break
            
        case 'email':
            if (!value) {
                errorMessage = 'Email is required'
                isValid = false
            } else if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address'
                isValid = false
            }
            break
            
        case 'phone':
            if (!value) {
                errorMessage = 'Phone number is required'
                isValid = false
            } else if (!isValidPhone(value)) {
                errorMessage = 'Please enter a valid phone number'
                isValid = false
            }
            break
            
        case 'address':
            if (!value) {
                errorMessage = 'Property address is required'
                isValid = false
            }
            break
            
        case 'message':
            if (!value) {
                errorMessage = 'Project description is required'
                isValid = false
            } else if (value.length < 10) {
                errorMessage = 'Description must be at least 10 characters'
                isValid = false
            }
            break
    }
    
    // Update field styling and error message
    const errorElement = document.getElementById(`${fieldName}-error`)
    
    if (isValid) {
        field.classList.remove('error')
        field.classList.add('success')
        if (errorElement) {
            errorElement.textContent = ''
        }
    } else {
        field.classList.remove('success')
        field.classList.add('error')
        if (errorElement) {
            errorElement.textContent = errorMessage
        }
    }
}

// Validation helpers
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
}

// Update review section
function updateReviewSection() {
    const reviewFields = {
        'review-name': document.getElementById('name').value,
        'review-email': document.getElementById('email').value,
        'review-phone': document.getElementById('phone').value,
        'review-address': document.getElementById('address').value,
        'review-service': getServiceDisplayName(document.getElementById('service').value),
        'review-size': getSizeDisplayName(document.getElementById('water-body-size').value),
        'review-urgency': getUrgencyDisplayName(document.querySelector('input[name="urgency"]:checked')?.value),
        'review-message': document.getElementById('message').value
    }
    
    Object.keys(reviewFields).forEach(fieldId => {
        const element = document.getElementById(fieldId)
        if (element) {
            element.textContent = reviewFields[fieldId] || 'Not provided'
        }
    })
}

function getServiceDisplayName(value) {
    const serviceMap = {
        'pond-cleanup': 'Pond Cleanup',
        'lake-weed-removal': 'Lake Weed Removal',
        'aquatic-vegetation-control': 'Aquatic Vegetation Control',
        'pond-maintenance': 'Pond Maintenance',
        'chemical-treatment': 'Chemical Treatment',
        'biological-treatment': 'Biological Treatment',
        'aeration-services': 'Aeration Services',
        'emergency-service': 'Emergency Service',
        'consultation': 'Consultation Only',
        'other': 'Other'
    }
    return serviceMap[value] || value
}

function getSizeDisplayName(value) {
    const sizeMap = {
        'small': 'Small (under 1 acre)',
        'medium': 'Medium (1-5 acres)',
        'large': 'Large (5-20 acres)',
        'very-large': 'Very Large (20+ acres)',
        'unknown': 'Not sure'
    }
    return sizeMap[value] || value
}

function getUrgencyDisplayName(value) {
    const urgencyMap = {
        'emergency': 'Emergency - Need immediate attention',
        'urgent': 'Urgent - Within 1-2 weeks',
        'standard': 'Standard - Within 1-2 months',
        'flexible': 'Flexible - No specific timeline'
    }
    return urgencyMap[value] || value
}

// Form submission handling
function handleFormSubmission(e) {
    e.preventDefault()
    
    // Validate final step
    if (!validateStep(2)) {
        return
    }
    
    // Check agreement checkbox
    const agreement = document.getElementById('agreement')
    if (!agreement.checked) {
        const errorElement = document.getElementById('agreement-error')
        if (errorElement) {
            errorElement.textContent = 'Please agree to the terms and conditions'
        }
        return
    }
    
    // Get form data
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    
    // Show loading state
    const submitButton = e.target.querySelector('.button--submit')
    const originalText = submitButton.innerHTML
    submitButton.innerHTML = '<i class="ri-loader-4-line"></i> Submitting...'
    submitButton.disabled = true
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showSuccessMessage()
        
        // Reset button
        submitButton.innerHTML = originalText
        submitButton.disabled = false
    }, 2000)
}

function showSuccessMessage() {
    const form = document.getElementById('contact-form')
    const successMessage = document.getElementById('form-success')
    
    if (form && successMessage) {
        form.style.display = 'none'
        successMessage.style.display = 'block'
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

function resetForm() {
    const form = document.getElementById('contact-form')
    const successMessage = document.getElementById('form-success')
    
    if (form && successMessage) {
        // Reset form
        form.reset()
        
        // Reset to first step
        currentStep = 1
        updateFormDisplay()
        updateProgressIndicator()
        
        // Clear all errors and styling
        const errorElements = document.querySelectorAll('.error-message')
        errorElements.forEach(element => {
            element.textContent = ''
        })
        
        const inputElements = document.querySelectorAll('.contact__input')
        inputElements.forEach(input => {
            input.classList.remove('error', 'success')
        })
        
        // Reset textarea counter
        const messageCounter = document.getElementById('message-counter')
        if (messageCounter) {
            messageCounter.textContent = '0'
            messageCounter.style.color = 'var(--gray-color)'
        }
        
        // Show form, hide success message
        form.style.display = 'block'
        successMessage.style.display = 'none'
        
        // Scroll to top of form
        const formContainer = document.querySelector('.contact-form__container')
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

// Make functions globally available
window.nextStep = nextStep
window.prevStep = prevStep
window.resetForm = resetForm

console.log('Enhanced contact form functionality loaded! 🚀')

/*=============== HERO IMAGE OPTIMIZATION ===============*/

// Preload hero images for better performance
const heroImages = [
    'images/image004.jpg',    // Home page hero
    'images/image003.jpg',    // Services page hero
    'images/image006.jpg',    // Equipment page hero
    'images/image004.jpg',    // Treatment page hero
    'images/image004.jpg',    // About page hero
    'images/image002.jpg',    // Contact page hero
    'images/image001.png'     // Partners page hero
]

// Preload hero images
function preloadHeroImages() {
    heroImages.forEach(imageSrc => {
        const img = new Image()
        img.src = imageSrc
        img.onload = function() {
            console.log(`Hero image loaded: ${imageSrc}`)
        }
        img.onerror = function() {
            console.warn(`Failed to load hero image: ${imageSrc}`)
        }
    })
}

// Optimize hero image loading
function optimizeHeroImages() {
    const pageHeaders = document.querySelectorAll('.page-header')
    
    pageHeaders.forEach(header => {
        // Add loading class initially
        header.classList.add('loading')
        
        // Remove loading class after image is loaded
        const backgroundImage = getComputedStyle(header).backgroundImage
        if (backgroundImage && backgroundImage !== 'none') {
            const img = new Image()
            img.onload = function() {
                header.classList.remove('loading')
            }
            img.onerror = function() {
                header.classList.remove('loading')
            }
            
            // Extract image URL from background-image
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)
            if (urlMatch) {
                img.src = urlMatch[1]
            }
        }
    })
}

// Initialize hero image optimization
document.addEventListener('DOMContentLoaded', function() {
    preloadHeroImages()
    optimizeHeroImages()
})

// Optimize home page hero image
const homeImg = document.querySelector('.home__img')
if (homeImg) {
    homeImg.addEventListener('load', function() {
        this.style.opacity = '1'
        this.style.transform = 'scale(1)'
    })
    
    // Add loading animation
    homeImg.style.opacity = '0'
    homeImg.style.transform = 'scale(0.95)'
    homeImg.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
}

console.log('Hero image optimization loaded! 🖼️')

/*=============== FAQ FUNCTIONALITY ===============*/

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq__item')
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question')
        const answer = item.querySelector('.faq__answer')
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active')
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active')
                }
            })
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active')
            } else {
                item.classList.add('active')
            }
        })
    })
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ()
})

console.log('FAQ functionality loaded! ❓')

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

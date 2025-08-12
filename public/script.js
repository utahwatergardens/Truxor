/*=============== ANIMATION SYSTEM ===============*/
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Trigger counter animations
            if (entry.target.classList.contains('counter')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-animation, .text-reveal');
    animatedElements.forEach(el => observer.observe(el));
    
    // Handle stagger animations
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    // Handle text reveal animations
    const textRevealElements = document.querySelectorAll('.text-reveal');
    textRevealElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });
    });
});

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Parallax effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
    });
});

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*=============== TYPING ANIMATION ===============*/
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text') || element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing when element comes into view
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    typingObserver.unobserve(entry.target);
                }
            });
        });
        typingObserver.observe(element);
    });
}

/*=============== FAQ ACCORDION ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faqs__item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faqs__header');
        const content = item.querySelector('.faqs__content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });
});

/*=============== FORM FOCUS EFFECTS ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.contact__input, .contact__textarea, .contact__select');
    const contactContent = document.querySelector('.contact__content');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            contactContent?.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!Array.from(formInputs).some(inp => inp === document.activeElement)) {
                contactContent?.classList.remove('focused');
            }
        });
    });
});

/*=============== RIPPLE EFFECT ===============*/
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

/*=============== NAVIGATION SCROLL EFFECTS ===============*/
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > 100) {
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > 200) {
        nav?.classList.add('nav-hidden');
    } else {
        nav?.classList.remove('nav-hidden');
    }
    
    lastScrollTop = currentScrollTop;
});

/*=============== MOBILE MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu?.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu?.classList.remove('show-menu');
    });
}

// Close menu when clicking on links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('show-menu');
    });
});

/*=============== PAGE LOAD ANIMATIONS ===============*/
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial hero animations
    const heroElements = document.querySelectorAll('.hero__title, .hero__description, .hero__buttons, .hero__image');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 200);
    });
});

/*=============== DYNAMIC CLASS ASSIGNMENT ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Add hover classes to cards
    const cards = document.querySelectorAll('.services__card, .equipment__card, .partners__card');
    cards.forEach(card => {
        card.classList.add('card-hover');
    });
    
    // Add image hover classes
    const images = document.querySelectorAll('.services__image img, .equipment__img img, .treatment__img img, .about__image img');
    images.forEach(img => {
        const wrapper = img.parentElement;
        if (wrapper) {
            wrapper.classList.add('image-hover');
        }
    });
    
    // Add animation classes to various elements
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.classList.add('animate-on-scroll');
    });
    
    const logos = document.querySelectorAll('.nav__logo-img');
    logos.forEach(logo => {
        logo.classList.add('animate-float');
    });
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('animate-on-scroll');
    });
    
    const socialLinks = document.querySelectorAll('.footer__social-link');
    socialLinks.forEach(link => {
        link.classList.add('animate-pulse');
    });
});

/*=============== UTILITY FUNCTIONS ===============*/
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any layout-dependent animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        if (el.classList.contains('animated')) {
            el.classList.remove('animated');
            setTimeout(() => {
                observer.observe(el);
            }, 100);
        }
    });
}, 250));

/*=============== PRELOAD CRITICAL ASSETS ===============*/
function preloadImages() {
    const criticalImages = [
        '/images/hero-pond-cleanup.jpg',
        '/images/truxor-t50.jpg',
        '/images/about-pond-cleanup.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images when DOM is ready
document.addEventListener('DOMContentLoaded', preloadImages);

/*=============== CONTACT FORM HANDLING ===============*/
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.service) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
            showNotification('Please enter a valid phone number.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
        
        // Reset form
        this.reset();
        
        // Here you would typically send the data to your server
        console.log('Form data:', data);
    });
}

/*=============== NOTIFICATION SYSTEM ===============*/
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
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
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

/*=============== INITIALIZE ALL ANIMATIONS ===============*/
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    
    // Add loading spinner to body initially
    if (!document.body.classList.contains('loaded')) {
        document.body.style.overflow = 'hidden';
    }
});

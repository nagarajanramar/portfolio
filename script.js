// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSkillBars();
    initContactForm();
    initScrollEffects();
    initIntersectionObserver();
    initSectionNavigation();
    initProfileImage();
});

// Profile Image Handling
function initProfileImage() {
    const profileImage = document.getElementById('profileImage');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    if (profileImage && profilePlaceholder) {
        // Check if image loads successfully
        profileImage.onload = function() {
            profileImage.classList.add('loaded');
            profilePlaceholder.classList.add('hidden');
        };
        
        // Handle image load error
        profileImage.onerror = function() {
            profileImage.style.display = 'none';
            profilePlaceholder.classList.remove('hidden');
            console.log('Profile image failed to load, showing placeholder');
        };
        
        // Try to load the image
        profileImage.src = profileImage.src;
    }
}

// Section Navigation System
function initSectionNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navTriggers = document.querySelectorAll('.nav-trigger');

    // Function to show specific section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });

        // Scroll to top of the section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // Handle nav trigger buttons (like Learn More, View Projects)
    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // Set initial active section (Home)
    showSection('home');
}

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth && isElementInViewport(bar)) {
                bar.style.width = targetWidth + '%';
            }
        });
    }

    // Animate skill bars when skills section is shown
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('active')) {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 300);
                }
            });
        });
        observer.observe(skillsSection);
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! Thank you for reaching out.', 'success');
        contactForm.reset();
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', { name, email, subject, message });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarStyle() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', throttle(updateNavbarStyle, 10));
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('active')) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bar animation if it's a skill section
                if (entry.target.id === 'skills') {
                    setTimeout(() => {
                        const skillBars = entry.target.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            const targetWidth = bar.getAttribute('data-width');
                            if (targetWidth) {
                                bar.style.width = targetWidth + '%';
                            }
                        });
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards for stagger animation
    document.querySelectorAll('.project-card, .education-item, .timeline-item').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Utility Functions
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

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

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '6px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add smooth reveal animations for active sections
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.section.active .hero-content > *, .section.active .section-title, .section.active .about-subsection, .section.active .project-card, .section.active .skills-category, .section.active .contact-content > *');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe elements
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        revealObserver.observe(element);
    });
}

// Initialize reveal animations when sections change
document.addEventListener('DOMContentLoaded', function() {
    // Watch for section changes to reinitialize animations
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('active')) {
                    setTimeout(() => {
                        initRevealAnimations();
                    }, 100);
                }
            }
        });
    });

    // Observe all sections for class changes
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section, { attributes: true });
    });
});

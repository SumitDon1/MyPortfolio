// JavaScript will go here
// Add event listeners for the form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just log it
        console.log({name, email, message});
        
        // Show success animation
        const btn = contactForm.querySelector('.btn');
        btn.innerHTML = 'Message Sent!';
        btn.classList.add('success');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = 'Send Message';
            btn.classList.remove('success');
        }, 3000);
    });
    
    // Scroll Animation using Intersection Observer API
    // Add animation classes to elements
    const elementsToAnimate = [
        { selector: '.hero-content', animation: 'fade-in' },
        { selector: '.about-card .profile-image', animation: 'slide-in-left' },
        { selector: '.about-card .about-content', animation: 'slide-in-right' },
        { selector: '.skill-category', animation: 'scale-in' },
        { selector: '.coming-soon', animation: 'fade-in' },
        { selector: '.contact-info', animation: 'slide-in-left' },
        { selector: '.contact-form', animation: 'slide-in-right' }
    ];
    
    elementsToAnimate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(el => {
            el.classList.add(item.animation);
        });
    });
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust the trigger point (negative value triggers later)
    });
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
    
    // Automatically trigger animation for hero section
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('active');
    }, 300);
    
    // Add scroll direction detection and animation
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const isScrollingDown = scrollTop > lastScrollTop;
        
        // Determine which elements to animate based on scroll direction
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;
            
            // Add different animation class based on scroll direction
            if (isVisible) {
                if (isScrollingDown) {
                    el.classList.add('active');
                    el.classList.remove('active-up');
                } else {
                    el.classList.add('active-up');
                }
            } else {
                el.classList.remove('active', 'active-up');
            }
        });
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // Add cyberpunk visual elements
    // Update all headings to have cyberpunk styling
    document.querySelectorAll('h1, h2.section-title').forEach(el => {
        // Store original text for data attribute
        const originalText = el.textContent;
        el.setAttribute('data-glitch', originalText);
        el.classList.add('cyberpunk-title');
    });
    
    // Add cyberpunk styling to cards
    document.querySelectorAll('.about-card, .contact-info, .contact-form, .skill-category, .coming-soon').forEach(el => {
        el.classList.add('card-cyberpunk');
    });
    
    // Add random glitching text effect
    setInterval(() => {
        // Select a random text element to glitch
        const allTextElements = document.querySelectorAll('h3, .stat .number, .btn, nav a');
        const randomElement = allTextElements[Math.floor(Math.random() * allTextElements.length)];
        
        if (randomElement) {
            randomElement.classList.add('text-glitch');
            setTimeout(() => {
                randomElement.classList.remove('text-glitch');
            }, 200);
        }
    }, 3000);
    
    // Add multiple scanning lines
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.classList.add('glow-line');
        line.style.animationDelay = (i * 5) + 's';
        document.body.appendChild(line);
    }
    
    // Add dividers between sections
    document.querySelectorAll('section').forEach(section => {
        if (section.nextElementSibling && section.nextElementSibling.tagName === 'SECTION') {
            const divider = document.createElement('div');
            divider.classList.add('cyberpunk-divider');
            section.parentNode.insertBefore(divider, section.nextElementSibling);
        }
    });
});

// Add mouse cursor effects
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Create cursor trail
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    // Animate and remove trail
    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => {
            trail.remove();
        }, 500);
    }, 100);
});

// Add skills hover animation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.tech-icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.tech-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Parallax effect for sections with ::before background
    document.querySelectorAll('.hero, .about, .skills, .projects, .contact').forEach(section => {
        const speed = 0.1;
        if (section.querySelector('::before')) {
            section.style.backgroundPositionY = scrollPosition * speed + 'px';
        }
    });
    
    // Header shadow on scroll
    const header = document.querySelector('header');
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Header and Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Light mode toggle (placeholder for future implementation)
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            // Light mode functionality will be implemented later
            this.classList.toggle('active');
            console.log('Light mode toggle clicked - currently:', this.classList.contains('active') ? 'Light Mode' : 'Dark Mode');
        });
    }

    // Sticky header on scroll
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('mobile-open');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mainNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('mobile-open');
            });
        });
    }
}); 

// Skill cards animation
function animateSkillCards() {
    const categories = document.querySelectorAll('.skills-category');
    
    categories.forEach(category => {
        const cards = category.querySelectorAll('.skill-card');
        let delay = 200; // Initial delay for first card in each category
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, delay);
            delay += 200; // Add delay for next card in the same category
        });
    });
}

// Intersection Observer for skills section
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillCards();
            skillsObserver.unobserve(entry.target); // Only animate once
        }
    });
}, { threshold: 0.2 }); // Trigger when 20% of the section is visible

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Also trigger animation if skills section is already visible on page load
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection && window.scrollY + window.innerHeight > skillsSection.offsetTop) {
        animateSkillCards();
    }
}); 
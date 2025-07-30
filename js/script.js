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

    // Dark mode toggle implementation
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        darkModeToggle.classList.add('active');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Get current theme
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Set new theme
            document.body.setAttribute('data-theme', newTheme);
            
            // Save preference to localStorage
            localStorage.setItem('theme', newTheme);
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

// Projects functionality
let currentProjectImages = [];
let currentImageIndex = 0;

// Read More/Less functionality
function toggleReadMore(button) {
    const card = button.closest('.project-card');
    const fullDescription = card.querySelector('.project-full-description');
    
    if (fullDescription.classList.contains('show')) {
        fullDescription.classList.remove('show');
        button.textContent = 'Read More';
    } else {
        fullDescription.classList.add('show');
        button.textContent = 'Read Less';
    }
}

// Image Gallery Modal functionality
function openImageGallery(images, startIndex = 0) {
    currentProjectImages = images;
    currentImageIndex = startIndex;
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const imageCounter = document.getElementById('imageCounter');
    
    modalImage.src = currentProjectImages[currentImageIndex];
    updateImageCounter();
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Loop around if at the end or beginning
    if (currentImageIndex >= currentProjectImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentProjectImages.length - 1;
    }
    
    const modalImage = document.getElementById('modalImage');
    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = currentProjectImages[currentImageIndex];
        modalImage.style.opacity = '1';
        updateImageCounter();
    }, 150);
}

function updateImageCounter() {
    const imageCounter = document.getElementById('imageCounter');
    imageCounter.textContent = `${currentImageIndex + 1} / ${currentProjectImages.length}`;
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }
    
    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeImageModal();
                    break;
                case 'ArrowLeft':
                    changeImage(-1);
                    break;
                case 'ArrowRight':
                    changeImage(1);
                    break;
            }
        }
    });
});

// Helper function to add a project card (for when you add projects)
function addProjectCard(project) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    // Generate skills HTML
    const skillsHTML = project.skills ? project.skills.map(skill => 
        `<div class="skill-tag">
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
        </div>`
    ).join('') : '';
    
    projectCard.innerHTML = `
        <div class="project-image-container">
            <img src="${project.coverImage}" alt="${project.title}" class="project-cover-image">
            <button class="photo-album-btn" onclick="openImageGallery(['${project.images.join("', '")}'])">
                <i class="fas fa-images"></i> Album
            </button>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-short-description">${project.shortDescription}</p>
            <div class="project-full-description">
                ${project.fullDescription}
            </div>
            ${skillsHTML ? `<div class="project-skills">${skillsHTML}</div>` : ''}
            <button class="read-more-btn" onclick="toggleReadMore(this)">Read More</button>
        </div>
    `;
    
    projectsGrid.appendChild(projectCard);
} 
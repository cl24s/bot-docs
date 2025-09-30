// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close sidebar on mobile after clicking a link
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        }
    });
});

// Highlight active section in sidebar based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// Mobile sidebar functionality
function createMobileMenuButton() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    
    if (!header || !logo) return;
    
    // Create menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Toggle menu');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // Insert button before logo
    header.insertBefore(menuButton, logo);
    
    // Toggle sidebar
    menuButton.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeSidebar);
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize mobile menu on small screens
function initMobileMenu() {
    if (window.innerWidth <= 768) {
        // Remove existing button if any
        const existingBtn = document.querySelector('.mobile-menu-btn');
        if (!existingBtn) {
            createMobileMenuButton();
        }
    }
}

// Run on load
window.addEventListener('load', initMobileMenu);

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close sidebar when resizing to desktop
        if (window.innerWidth > 768) {
            closeSidebar();
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.remove();
            }
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (menuBtn) {
                menuBtn.remove();
            }
        } else {
            initMobileMenu();
        }
    }, 250);
});

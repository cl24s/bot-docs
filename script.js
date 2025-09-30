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
        }
    });
});

// Highlight active section in sidebar based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.md-nav__link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('md-nav__link--active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('md-nav__link--active');
        }
    });
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// Mobile sidebar toggle (for responsive design)
function toggleSidebar() {
    const sidebar = document.querySelector('.md-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Add mobile menu button if needed
if (window.innerWidth <= 768) {
    const header = document.querySelector('.md-header__inner');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = 'background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; margin-right: 1rem;';
    menuButton.onclick = toggleSidebar;
    header.insertBefore(menuButton, header.firstChild);
}

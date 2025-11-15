// Navigation Menu Data
const menuData = {
    home: {
        title: "home",
        items: []
    },
    university: {
        title: "about university",
        items: [
            { text: "ABOUT DSU", link: "#about-dsu" },
            { text: "LEADERSHIP", link: "#leadership" },
            { text: "ADMINISTRATION", link: "#administration" },
            { text: "UGC INFORMATION", link: "#ugc" },
            { text: "AICTE RECOGNITION", link: "#aicte" },
            { text: "AICTE MANDATORY DISCLOSURE", link: "#aicte-disclosure" },
            { text: "NIRF", link: "#nirf" },
            { text: "IQAC", link: "#iqac" },
            { text: "ANNUAL REPORTS", link: "#annual-reports" },
            { text: "CARBON NEUTRAL CAMPUS", link: "#carbon-neutral" },
            { text: "ETHICS COMMITTEE", link: "#ethics" },
            { text: "CAPABILITY ENHANCEMENT AND DEVELOPMENT CENTRES", link: "#cedc" },
            { text: "CONTACTS FOR COMPLAINTS", link: "#complaints" },
            { text: "ANTI RAGGING CELL", link: "#anti-ragging" },
            { text: "IT POLICY", link: "#it-policy" }
        ]
    },
    academics: {
        title: "ACADEMICS",
        items: [
            { text: "SCHOOLS", link: "#schools" },
            { text: "UNDERGRADUATE PROGRAMMES", link: "#undergraduate" },
            { text: "POSTGRADUATE PROGRAMMES", link: "#postgraduate" },
            { text: "EXECUTIVE EDUCATION", link: "#executive" },
            { text: "ONLINE EDUCATION", link: "#online" }
        ]
    },
    admissions: {
        title: "admissions",
        items: [
            { text: "ADMISSIONS DETAILS", link: "#admissions-details" },
            { text: "DSAT ADMISSIONS", link: "#dsat" },
            { text: "DIRECT ADMISSIONS", link: "#direct" },
            { text: "COURSE ELIGIBILITY & FEE STRUCTURE", link: "#fees" },
            { text: "NRI / FOREIGN ADMISSIONS", link: "#nri" }
        ]
    },
    international: {
        title: "international",
        items: [
            { text: "INTERNATIONAL ADMISSIONS", link: "#intl-admissions" },
            { text: "EXCHANGE PROGRAMS", link: "#exchange" },
            { text: "GLOBAL PARTNERSHIPS", link: "#partnerships" }
        ]
    },
    research: {
        title: "research",
        items: [
            { text: "RESEARCH CENTERS", link: "#research-centers" },
            { text: "PUBLICATIONS", link: "#publications" },
            { text: "RESEARCH PROJECTS", link: "#projects" }
        ]
    },
    innovation: {
        title: "innovation",
        items: [
            { text: "INNOVATION LABS", link: "#innovation-labs" },
            { text: "STARTUPS", link: "#startups" },
            { text: "INCUBATION", link: "#incubation" }
        ]
    },
    placement: {
        title: "placement",
        items: [
            { text: "PLACEMENT STATISTICS", link: "#placement-stats" },
            { text: "RECRUITERS", link: "#recruiters" },
            { text: "CAREER SERVICES", link: "#career-services" }
        ]
    },
    naac: {
        title: "naac",
        items: [
            { text: "NAAC ACCREDITATION", link: "#naac-accreditation" },
            { text: "NAAC REPORTS", link: "#naac-reports" }
        ]
    },
    library: {
        title: "library",
        items: [
            { text: "LIBRARY RESOURCES", link: "#library-resources" },
            { text: "DIGITAL LIBRARY", link: "#digital-library" }
        ]
    },
    hostel: {
        title: "hostel",
        items: [
            { text: "HOSTEL FACILITIES", link: "#hostel-facilities" },
            { text: "HOSTEL HANDBOOK", link: "#hostel-handbook" }
        ]
    },
    disclosure: {
        title: "public self-disclosure",
        items: [
            { text: "RTI ACT", link: "#rti" },
            { text: "DISCLOSURES", link: "#disclosures" }
        ]
    },
    contact: {
        title: "contact",
        items: []
    }
};

// Sidebar Navigation Functionality
const sidebarNav = document.getElementById('sidebarNav');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarTitle = document.getElementById('sidebarTitle');
const sidebarMenu = document.getElementById('sidebarMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mainContent = document.getElementById('mainContent');

// Open sidebar function
function openSidebar(menuKey) {
    const menu = menuData[menuKey];
    if (!menu || menu.items.length === 0) {
        // If no submenu, just highlight the nav item
        setActiveNav(menuKey);
        return;
    }

    sidebarTitle.textContent = menu.title;
    sidebarMenu.innerHTML = '';
    
    menu.items.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.href = item.link;
        menuItem.className = 'sidebar-menu-item';
        menuItem.textContent = item.text;
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();
            closeSidebar();
            setActiveNav(menuKey);
            // Here you would navigate to the actual page
            console.log('Navigate to:', item.link);
        });
        sidebarMenu.appendChild(menuItem);
    });

    sidebarNav.classList.add('active');
    sidebarOverlay.classList.add('active');
    mainContent.classList.add('sidebar-open');
    document.body.style.overflow = 'hidden';
}

// Close sidebar function
function closeSidebar() {
    sidebarNav.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    mainContent.classList.remove('sidebar-open');
    document.body.style.overflow = '';
}

// Set active navigation link
function setActiveNav(menuKey) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.menu === menuKey) {
            link.classList.add('active');
        }
    });
}

// Initialize Dropdown Menus
function initDropdownMenus() {
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    
    dropdownMenus.forEach(dropdown => {
        const menuKey = dropdown.dataset.dropdown;
        const menu = menuData[menuKey];
        
        if (menu && menu.items.length > 0) {
            // Create dropdown header
            const header = document.createElement('div');
            header.className = 'dropdown-header';
            header.textContent = menu.title;
            dropdown.appendChild(header);
            
            // Create dropdown items
            menu.items.forEach(item => {
                const menuItem = document.createElement('a');
                menuItem.href = item.link;
                menuItem.className = 'dropdown-item';
                menuItem.textContent = item.text;
                menuItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    closeSidebar();
                    console.log('Navigate to:', item.link);
                });
                dropdown.appendChild(menuItem);
            });
        }
    });
}

// Initialize dropdowns on page load
initDropdownMenus();

// Event listeners for nav links
navLinks.forEach(link => {
    const navWrapper = link.closest('.nav-item-wrapper');
    
    // Click handler for opening sidebar (for mobile/click users)
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const menuKey = link.dataset.menu;
        
        // Handle HOME separately - no sidebar
        if (menuKey === 'home') {
            setActiveNav('home');
            closeSidebar();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // On mobile, open sidebar on click
        if (window.innerWidth <= 1024) {
            if (sidebarNav.classList.contains('active') && link.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar(menuKey);
                setActiveNav(menuKey);
            }
        }
    });
    
    // Hover handlers for dropdown menus
    if (navWrapper && navWrapper.classList.contains('has-dropdown')) {
        const dropdown = navWrapper.querySelector('.dropdown-menu');
        
        navWrapper.addEventListener('mouseenter', () => {
            if (dropdown && dropdown.children.length > 0) {
                dropdown.classList.add('active');
                link.classList.add('hover');
            }
        });
        
        navWrapper.addEventListener('mouseleave', () => {
            if (dropdown) {
                dropdown.classList.remove('active');
                link.classList.remove('hover');
            }
        });
    }
});

// Close sidebar on overlay click
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar on close button click
sidebarClose.addEventListener('click', closeSidebar);

// Close sidebar on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarNav.classList.contains('active')) {
        closeSidebar();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closeSidebar();
        }
    });
});

// Mobile menu toggle (if needed)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Carousel functionality for announcements
let currentAnnouncementIndex = 0;
const announcementCards = document.querySelectorAll('.announcement-card');
const carouselLeft = document.querySelector('.carousel-btn:first-of-type');
const carouselRight = document.querySelector('.carousel-btn:last-of-type');

if (carouselLeft && carouselRight && announcementCards.length > 0) {
    carouselLeft.addEventListener('click', () => {
        currentAnnouncementIndex = (currentAnnouncementIndex - 1 + announcementCards.length) % announcementCards.length;
        updateAnnouncementCarousel();
    });

    carouselRight.addEventListener('click', () => {
        currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcementCards.length;
        updateAnnouncementCarousel();
    });
}

function updateAnnouncementCarousel() {
    announcementCards.forEach((card, index) => {
        card.style.display = index === currentAnnouncementIndex ? 'block' : 'none';
    });
}

// Differentiator items toggle
const diffItems = document.querySelectorAll('.diff-item');
diffItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        diffItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
    });
});

// Leadership carousel dots
const leadershipDots = document.querySelectorAll('.leadership-column .dot');
leadershipDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        leadershipDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        // Here you would update the leadership content based on index
    });
});

// Scroll to top button visibility
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
}

// Awards scroll animation
const awardsContainer = document.querySelector('.awards-scroll-container');
if (awardsContainer) {
    let scrollPosition = 0;
    const scrollSpeed = 1;
    
    function autoScrollAwards() {
        scrollPosition += scrollSpeed;
        awardsContainer.scrollLeft = scrollPosition;
        
        if (scrollPosition >= awardsContainer.scrollWidth - awardsContainer.clientWidth) {
            scrollPosition = 0;
        }
    }
    
    // Uncomment to enable auto-scroll
    // setInterval(autoScrollAwards, 50);
}

// Form validation (if forms are added)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form validation logic here
        console.log('Form submitted');
    });
});

// Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Active navigation highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.main-nav a[href^="#"]');

if (sections.length > 0 && allNavLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Secondary Navigation Functionality
const secondaryNavLinks = document.querySelectorAll('.secondary-nav-link');

// Secondary navigation click handlers
secondaryNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        secondaryNavLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get the page identifier
        const pageId = link.dataset.page;
        
        // Update URL hash
        window.location.hash = link.getAttribute('href');
        
        // Handle different page actions
        handleSecondaryNavClick(pageId);
    });
});

// Function to handle secondary navigation clicks
function handleSecondaryNavClick(pageId) {
    console.log('Navigating to:', pageId);
    
    // Check if section exists on page
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        return;
    }
    
    // Handle specific pages
    switch(pageId) {
        case 'careers':
            showPageContent('Careers', 'Explore exciting career opportunities at DSU.');
            break;
        case 'virtual-tour':
            showPageContent('Virtual Tour', 'Take a virtual tour of our beautiful campus.');
            // Could integrate with 360° tour or video
            break;
        case 'examination':
            showPageContent('Examination', 'Information about examinations, schedules, and results.');
            break;
        case 'news-events':
            // Scroll to news section if it exists
            const newsSection = document.querySelector('.news-column') || document.querySelector('.announcements-section');
            if (newsSection) {
                newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                showPageContent('News & Events', 'Stay updated with the latest news and events at DSU.');
            }
            break;
        case 'newsletter':
            showNewsletterModal();
            break;
        case 'alumni':
            showPageContent('Alumni', 'Connect with our alumni network and share your success stories.');
            break;
        case 'blog':
            showPageContent('Blog', 'Read our latest blog posts and articles.');
            break;
        case 'erp-login':
            // Open ERP login - could be a modal or redirect
            showERPLoginModal();
            break;
        case 'e-brochure':
            // Open e-brochure - could be a PDF viewer or download
            showBrochureModal();
            break;
        default:
            console.log('Page:', pageId);
    }
}

// Function to show page content (placeholder for future pages)
function showPageContent(title, description) {
    // You can implement a modal or page content display here
    console.log(`Showing ${title}: ${description}`);
    // For now, you could create a modal or navigate to a section
}

// Newsletter Modal
function showNewsletterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Subscribe to Newsletter</h2>
            <p>Stay updated with the latest news and updates from DSU.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Enter your email" required>
                <button type="submit" class="subscribe-btn">Subscribe</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    modal.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
        document.body.removeChild(modal);
    });
}

// ERP Login Modal
function showERPLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>ERP Login</h2>
            <form class="login-form">
                <input type="text" placeholder="Username/Email" required>
                <input type="password" placeholder="Password" required>
                <button type="submit" class="login-btn">Login</button>
                <a href="#" class="forgot-password">Forgot Password?</a>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Brochure Modal
function showBrochureModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content brochure-modal">
            <button class="modal-close">&times;</button>
            <h2>e-Brochure</h2>
            <p>Download our comprehensive brochure to learn more about DSU.</p>
            <div class="brochure-links">
                <a href="#" class="brochure-btn">Main Campus Brochure</a>
                <a href="#" class="brochure-btn">City Innovation Campus Brochure</a>
                <a href="#" class="brochure-btn">Programs Brochure</a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Set active nav based on URL hash on page load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const activeLink = document.querySelector(`.secondary-nav-link[data-page="${hash}"]`);
        if (activeLink) {
            secondaryNavLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
            handleSecondaryNavClick(hash);
        }
    }
});

// Update active nav on hash change
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const activeLink = document.querySelector(`.secondary-nav-link[data-page="${hash}"]`);
        if (activeLink) {
            secondaryNavLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }
});

// Campus Gallery Animations and Interactions
const campusCards = document.querySelectorAll('.campus-card');

// Intersection Observer for scroll animations
if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeInScale 0.8s ease forwards`;
                    entry.target.style.opacity = '1';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    campusCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Parallax effect on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    campusCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const speed = 0.1 * (index % 2 === 0 ? 1 : -1);
            const yPos = -(scrollTop * speed);
            card.style.transform = `translateY(${yPos}px) scale(1)`;
        }
    });
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// 3D Tilt Effect on Mouse Move
campusCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Explore Button Click Handlers
document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardTitle = btn.closest('.overlay-content').querySelector('h3').textContent;
        console.log(`Exploring: ${cardTitle}`);
        // Add navigation logic here
    });
});

// Image Lazy Loading with Blur Effect
const campusImages = document.querySelectorAll('.campus-img');
campusImages.forEach(img => {
    img.addEventListener('load', function() {
        this.style.filter = 'brightness(0.7)';
        this.style.opacity = '1';
    });
    
    // Add blur effect while loading
    if (!img.complete) {
        img.style.filter = 'blur(10px) brightness(0.5)';
    }
});

console.log('DSU Website Clone - Script loaded successfully!');

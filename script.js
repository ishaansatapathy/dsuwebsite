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
            handleNavigation(item.link, item.text);
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
                    handleNavigation(item.link, item.text);
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
            showPageContent('Home', 'Welcome to Dayananda Sagar University');
            return;
        }
        
        // Handle CONTACT separately
        if (menuKey === 'contact') {
            setActiveNav('contact');
            closeSidebar();
            showContactPage();
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
        } else {
            // On desktop, show content directly
            setActiveNav(menuKey);
            if (menuKey !== 'home' && menuKey !== 'contact') {
                const menu = menuData[menuKey];
                if (menu && menu.items.length > 0) {
                    // Show first item or main page content
                    showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                } else {
                    showPageContent(menuKey.charAt(0).toUpperCase() + menuKey.slice(1), `Information about ${menuKey}`);
                }
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
        
        // Also handle click on desktop for dropdown items
        if (dropdown && dropdown.children.length > 0) {
            dropdown.addEventListener('click', (e) => {
                if (e.target.classList.contains('dropdown-item')) {
                    e.stopPropagation();
                    const link = e.target.getAttribute('href');
                    const text = e.target.textContent;
                    handleNavigation(link, text);
                    dropdown.classList.remove('active');
                }
            });
        }
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
        // Show 3 cards at a time
        if (index >= currentAnnouncementIndex && index < currentAnnouncementIndex + 3) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Ensure we don't go beyond available cards
    if (currentAnnouncementIndex >= announcementCards.length - 2) {
        currentAnnouncementIndex = 0;
    }
    if (currentAnnouncementIndex < 0) {
        currentAnnouncementIndex = Math.max(0, announcementCards.length - 3);
    }
}

// Differentiator items toggle
const diffItems = document.querySelectorAll('.diff-item');
diffItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        diffItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Scroll to item for better visibility
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

// News items click functionality
const newsItems = document.querySelectorAll('.news-list li');
newsItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
        const newsText = item.textContent.trim();
        showNewsDetails(newsText);
    });
});

function showNewsDetails(newsText) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <button class="modal-close">&times;</button>
            <h2>News & Events</h2>
            <div style="margin-top: 24px;">
                <h3 style="color: var(--white); font-size: 22px; margin-bottom: 16px;">${newsText}</h3>
                <div style="color: var(--gray-light); line-height: 1.8; margin-bottom: 24px;">
                    <p>This is detailed information about the news item. In a real implementation, this would contain the full article, images, and related content.</p>
                    <p style="margin-top: 16px;">The news item covers important updates, events, or announcements from Dayananda Sagar University. Students, faculty, and staff are encouraged to stay updated with the latest news and events.</p>
                </div>
                <div style="display: flex; gap: 12px; margin-top: 24px;">
                    <button class="erp-action-btn" onclick="this.closest('.modal-overlay').remove()">Close</button>
                    <button class="erp-action-btn" style="background: var(--gray-dark);" onclick="shareNews('${newsText}')">Share</button>
                </div>
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

function shareNews(newsText) {
    if (navigator.share) {
        navigator.share({
            title: 'DSU News',
            text: newsText,
            url: window.location.href
        }).catch(err => console.log('Error sharing', err));
    } else {
        // Fallback: copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(newsText).then(() => {
                alert('News item copied to clipboard!');
            }).catch(() => {
                alert('News: ' + newsText);
            });
        } else {
            alert('News: ' + newsText);
        }
    }
}

// Make shareNews available globally
window.shareNews = shareNews;

// Leadership carousel dots - will be initialized after DOM loads

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
            // Redirect to ERP login page
            window.location.href = 'erp-login.html';
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
    // Create or show content section
    let contentSection = document.getElementById('dynamic-content');
    
    if (!contentSection) {
        contentSection = document.createElement('section');
        contentSection.id = 'dynamic-content';
        contentSection.className = 'dynamic-content-section';
        contentSection.style.cssText = 'padding: 80px 0; background: var(--primary-black); min-height: 60vh;';
        
        // Insert after hero section or at the beginning of main content
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && heroSection.nextSibling) {
            heroSection.parentNode.insertBefore(contentSection, heroSection.nextSibling);
        } else {
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.appendChild(contentSection);
            }
        }
    }
    
    // Scroll to content
    contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Update content based on title
    const contentData = getPageContent(title);
    contentSection.innerHTML = `
        <div class="container">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 48px; font-weight: 900; color: var(--white); margin-bottom: 16px; background: linear-gradient(135deg, var(--white) 0%, var(--primary-orange) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    ${contentData.title}
                </h2>
                <p style="font-size: 18px; color: var(--gray-light); max-width: 600px; margin: 0 auto;">
                    ${contentData.description}
                </p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 40px;">
                ${contentData.items.map(item => `
                    <div class="content-card" style="background: var(--gray-dark); padding: 32px; border-radius: 16px; border: 1px solid var(--gray-medium); transition: all 0.3s ease; cursor: pointer;" onclick="handleContentClick('${item.title}')">
                        <div style="font-size: 32px; color: var(--primary-orange); margin-bottom: 16px;">
                            <i class="${item.icon}"></i>
                        </div>
                        <h3 style="color: var(--white); font-size: 20px; font-weight: 700; margin-bottom: 12px;">${item.title}</h3>
                        <p style="color: var(--gray-light); font-size: 14px; line-height: 1.6; margin: 0;">${item.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Get page content data
function getPageContent(pageTitle) {
    const contentMap = {
        'Home': {
            title: 'Welcome to DSU',
            description: 'Empowering students with world-class education and opportunities',
            items: [
                { title: 'About Us', description: 'Learn about our history, mission, and vision', icon: 'fas fa-university' },
                { title: 'Programs', description: 'Explore our wide range of academic programs', icon: 'fas fa-graduation-cap' },
                { title: 'Admissions', description: 'Start your journey with us today', icon: 'fas fa-user-plus' }
            ]
        },
        'About DSU': {
            title: 'About Dayananda Sagar University',
            description: 'A premier institution committed to excellence in education',
            items: [
                { title: 'History', description: 'Our journey since establishment', icon: 'fas fa-history' },
                { title: 'Mission & Vision', description: 'Our goals and aspirations', icon: 'fas fa-bullseye' },
                { title: 'Leadership', description: 'Meet our leadership team', icon: 'fas fa-users' },
                { title: 'Accreditations', description: 'Recognitions and accreditations', icon: 'fas fa-award' }
            ]
        },
        'Academics': {
            title: 'Academics',
            description: 'Comprehensive academic programs designed for success',
            items: [
                { title: 'Schools', description: 'Explore our various schools and departments', icon: 'fas fa-school' },
                { title: 'Undergraduate', description: 'Bachelor degree programs', icon: 'fas fa-book' },
                { title: 'Postgraduate', description: 'Master degree programs', icon: 'fas fa-graduation-cap' },
                { title: 'Research', description: 'Research opportunities and programs', icon: 'fas fa-microscope' }
            ]
        },
        'Admissions': {
            title: 'Admissions',
            description: 'Begin your academic journey with us',
            items: [
                { title: 'Admission Process', description: 'Step-by-step admission guide', icon: 'fas fa-list-ol' },
                { title: 'Eligibility', description: 'Check eligibility criteria', icon: 'fas fa-check-circle' },
                { title: 'Fee Structure', description: 'View fee details and payment options', icon: 'fas fa-money-bill-wave' },
                { title: 'Scholarships', description: 'Available scholarships and financial aid', icon: 'fas fa-gift' }
            ]
        },
        'International': {
            title: 'International Programs',
            description: 'Global opportunities for students',
            items: [
                { title: 'Exchange Programs', description: 'Study abroad opportunities', icon: 'fas fa-globe' },
                { title: 'International Admissions', description: 'Admission for international students', icon: 'fas fa-passport' },
                { title: 'Partnerships', description: 'Global university partnerships', icon: 'fas fa-handshake' }
            ]
        },
        'Research': {
            title: 'Research',
            description: 'Advancing knowledge through innovative research',
            items: [
                { title: 'Research Centers', description: 'Our research facilities and centers', icon: 'fas fa-flask' },
                { title: 'Publications', description: 'Research publications and papers', icon: 'fas fa-file-alt' },
                { title: 'Projects', description: 'Ongoing research projects', icon: 'fas fa-project-diagram' }
            ]
        },
        'Innovation': {
            title: 'Innovation',
            description: 'Fostering innovation and entrepreneurship',
            items: [
                { title: 'Innovation Labs', description: 'State-of-the-art innovation facilities', icon: 'fas fa-lightbulb' },
                { title: 'Startups', description: 'Student and alumni startups', icon: 'fas fa-rocket' },
                { title: 'Incubation', description: 'Startup incubation program', icon: 'fas fa-seedling' }
            ]
        },
        'Placement': {
            title: 'Placements',
            description: 'Connecting students with top employers',
            items: [
                { title: 'Placement Statistics', description: 'View our placement records', icon: 'fas fa-chart-bar' },
                { title: 'Recruiters', description: 'Our recruiting partners', icon: 'fas fa-building' },
                { title: 'Career Services', description: 'Career guidance and support', icon: 'fas fa-briefcase' }
            ]
        },
        'NAAC': {
            title: 'NAAC Accreditation',
            description: 'A+ Grade Accredited Institution',
            items: [
                { title: 'NAAC Reports', description: 'View accreditation reports', icon: 'fas fa-file-pdf' },
                { title: 'Accreditation Details', description: 'Learn about our accreditation', icon: 'fas fa-certificate' }
            ]
        },
        'Library': {
            title: 'Library',
            description: 'Extensive collection of resources',
            items: [
                { title: 'Library Resources', description: 'Books, journals, and digital resources', icon: 'fas fa-book' },
                { title: 'Digital Library', description: 'Access digital resources online', icon: 'fas fa-laptop' },
                { title: 'Library Services', description: 'Services and facilities', icon: 'fas fa-concierge-bell' }
            ]
        },
        'Hostel': {
            title: 'Hostel @ Harohalli',
            description: 'Comfortable accommodation for students',
            items: [
                { title: 'Hostel Facilities', description: 'Amenities and facilities', icon: 'fas fa-bed' },
                { title: 'Hostel Handbook', description: 'Rules and guidelines', icon: 'fas fa-book-open' },
                { title: 'Apply for Hostel', description: 'Hostel admission process', icon: 'fas fa-key' }
            ]
        },
        'Disclosure': {
            title: 'Public Self-Disclosure',
            description: 'Transparency and accountability',
            items: [
                { title: 'RTI Act', description: 'Right to Information', icon: 'fas fa-info-circle' },
                { title: 'Disclosures', description: 'Public disclosures and reports', icon: 'fas fa-file-invoice' }
            ]
        }
    };
    
    return contentMap[pageTitle] || {
        title: pageTitle,
        description: 'Explore this section',
        items: [
            { title: 'Information', description: 'Details coming soon', icon: 'fas fa-info' }
        ]
    };
}

// Handle content card clicks
function handleContentClick(title) {
    alert(`You clicked on: ${title}\n\nThis would navigate to detailed information about ${title} in a full implementation.`);
}

// Handle navigation links
function handleNavigation(link, text) {
    // Check if it's a hash link
    if (link.startsWith('#')) {
        const targetId = link.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
    }
    
    // Show page content based on text
    showPageContent(text, `Information about ${text}`);
}

// Contact page function
function showContactPage() {
    let contactSection = document.getElementById('contact-section');
    
    if (!contactSection) {
        contactSection = document.createElement('section');
        contactSection.id = 'contact-section';
        contactSection.className = 'contact-section';
        contactSection.style.cssText = 'padding: 80px 0; background: var(--primary-black); min-height: 60vh;';
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.appendChild(contactSection);
        }
    }
    
    contactSection.innerHTML = `
        <div class="container">
            <div style="text-align: center; margin-bottom: 60px;">
                <h2 style="font-size: 48px; font-weight: 900; color: var(--white); margin-bottom: 16px; background: linear-gradient(135deg, var(--white) 0%, var(--primary-orange) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Contact Us
                </h2>
                <p style="font-size: 18px; color: var(--gray-light); max-width: 600px; margin: 0 auto;">
                    Get in touch with us. We're here to help!
                </p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
                <div style="background: var(--gray-dark); padding: 40px; border-radius: 16px; text-align: center; border: 1px solid var(--gray-medium);">
                    <div style="font-size: 48px; color: var(--primary-orange); margin-bottom: 24px;">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <h3 style="color: var(--white); font-size: 22px; font-weight: 700; margin-bottom: 16px;">Address</h3>
                    <p style="color: var(--gray-light); line-height: 1.8;">
                        Dayananda Sagar University<br>
                        Shavige Malleshwara Hills,<br>
                        Kumaraswamy Layout,<br>
                        Bangalore - 560078, Karnataka, India
                    </p>
                </div>
                <div style="background: var(--gray-dark); padding: 40px; border-radius: 16px; text-align: center; border: 1px solid var(--gray-medium);">
                    <div style="font-size: 48px; color: var(--primary-orange); margin-bottom: 24px;">
                        <i class="fas fa-phone"></i>
                    </div>
                    <h3 style="color: var(--white); font-size: 22px; font-weight: 700; margin-bottom: 16px;">Phone</h3>
                    <p style="color: var(--gray-light); line-height: 1.8;">
                        +91 80 4646 1800<br>
                        +91 80 4646 1801<br>
                        <span style="color: var(--primary-orange);">24/7 Helpline</span>
                    </p>
                </div>
                <div style="background: var(--gray-dark); padding: 40px; border-radius: 16px; text-align: center; border: 1px solid var(--gray-medium);">
                    <div style="font-size: 48px; color: var(--primary-orange); margin-bottom: 24px;">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <h3 style="color: var(--white); font-size: 22px; font-weight: 700; margin-bottom: 16px;">Email</h3>
                    <p style="color: var(--gray-light); line-height: 1.8;">
                        info@dsu.edu.in<br>
                        admissions@dsu.edu.in<br>
                        <span style="color: var(--primary-orange);">Quick Response</span>
                    </p>
                </div>
            </div>
            <div style="margin-top: 60px; background: var(--gray-dark); padding: 40px; border-radius: 16px; border: 1px solid var(--gray-medium);">
                <h3 style="color: var(--white); font-size: 24px; font-weight: 700; margin-bottom: 24px; text-align: center;">Send us a Message</h3>
                <form onsubmit="handleContactForm(event)" style="max-width: 600px; margin: 0 auto;">
                    <div style="margin-bottom: 20px;">
                        <input type="text" placeholder="Your Name" required style="width: 100%; padding: 14px; border: 1px solid var(--gray-medium); border-radius: 10px; background: var(--black-light); color: var(--white); font-size: 15px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <input type="email" placeholder="Your Email" required style="width: 100%; padding: 14px; border: 1px solid var(--gray-medium); border-radius: 10px; background: var(--black-light); color: var(--white); font-size: 15px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <textarea rows="5" placeholder="Your Message" required style="width: 100%; padding: 14px; border: 1px solid var(--gray-medium); border-radius: 10px; background: var(--black-light); color: var(--white); font-size: 15px; resize: vertical;"></textarea>
                    </div>
                    <button type="submit" class="apply-btn-large" style="width: 100%;">Send Message</button>
                </form>
            </div>
        </div>
    `;
    
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Academic Details Function
function showAcademicDetails(schoolName) {
    const academicData = {
        'Engineering': {
            programs: ['B.Tech Computer Science', 'B.Tech Electronics & Communication', 'B.Tech Mechanical', 'B.Tech Civil', 'B.Tech Electrical', 'M.Tech CSE', 'M.Tech ECE', 'M.Tech Mechanical'],
            description: 'State-of-the-art engineering programs with industry partnerships and research opportunities.',
            facilities: 'Advanced Labs, Research Centers, Industry Collaborations',
            placement: '95% Placement Rate'
        },
        'Computer Applications': {
            programs: ['BCA', 'MCA', 'BCA (Hons)', 'MCA (Specialization in AI/ML)'],
            description: 'Comprehensive computer applications programs focusing on software development and emerging technologies.',
            facilities: 'Computer Labs, Software Development Centers, Hackathons',
            placement: '92% Placement Rate'
        },
        'Law': {
            programs: ['BA LLB (5 Years)', 'BBA LLB (5 Years)', 'LLM', 'LLM (Corporate Law)', 'LLM (Constitutional Law)'],
            description: 'Rigorous legal education with moot court practice and internship opportunities.',
            facilities: 'Moot Court, Legal Aid Clinic, Law Library',
            placement: '88% Placement Rate'
        },
        'Applied Sciences': {
            programs: ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Biotechnology', 'M.Sc Programs'],
            description: 'Strong foundation in sciences with research-oriented curriculum and modern laboratories.',
            facilities: 'Research Labs, Science Centers, Industry Projects',
            placement: '85% Placement Rate'
        },
        'Commerce & Management': {
            programs: ['B.Com', 'M.Com', 'BBA', 'MBA', 'MBA (Finance)', 'MBA (Marketing)', 'MBA (HR)'],
            description: 'Business education with case-based learning and industry internships.',
            facilities: 'Business Labs, Case Study Rooms, Industry Visits',
            placement: '90% Placement Rate'
        },
        'Executive Education': {
            programs: ['Executive MBA', 'PG Certificate in Management', 'Executive Development Programs'],
            description: 'Flexible programs designed for working professionals with weekend classes.',
            facilities: 'Executive Classrooms, Online Learning Platform, Industry Mentors',
            placement: 'Career Advancement Support'
        },
        'Arts, Design and Humanities': {
            programs: ['BA English', 'BA Psychology', 'BA Sociology', 'BA History', 'MA Programs'],
            description: 'Liberal arts education fostering critical thinking and cultural awareness.',
            facilities: 'Language Labs, Psychology Labs, Cultural Centers',
            placement: '82% Placement Rate'
        },
        'Design & Digital Transmedia': {
            programs: ['B.Des Graphic Design', 'B.Des Animation', 'B.Des Digital Media', 'M.Des Programs'],
            description: 'Creative design programs with industry-standard tools and portfolio development.',
            facilities: 'Design Studios, Animation Labs, Digital Media Centers',
            placement: '87% Placement Rate'
        },
        'Health Sciences': {
            programs: ['B.Pharm', 'M.Pharm', 'B.Sc Nursing', 'BPT (Physiotherapy)', 'M.Sc Nursing'],
            description: 'Healthcare education with clinical training and hospital partnerships.',
            facilities: 'Pharmacy Labs, Nursing Labs, Clinical Training Centers',
            placement: '94% Placement Rate'
        },
        'MBBS': {
            programs: ['MBBS (5.5 Years)'],
            description: 'Medical education with comprehensive clinical training and hospital rotations.',
            facilities: 'Anatomy Labs, Pathology Labs, Hospital Attachments',
            placement: '100% Internship Placement'
        }
    };
    
    const data = academicData[schoolName] || academicData['Engineering'];
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px; max-height: 80vh; overflow-y: auto;">
            <button class="modal-close">&times;</button>
            <h2>${schoolName}</h2>
            <p style="margin-bottom: 24px; color: var(--gray-light);">${data.description}</p>
            
            <div style="margin-bottom: 24px;">
                <h3 style="color: var(--white); font-size: 20px; margin-bottom: 16px;">Programs Offered</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px;">
                    ${data.programs.map(prog => `
                        <div style="padding: 12px; background: var(--gray-dark); border-radius: 8px; border-left: 3px solid var(--primary-orange);">
                            <p style="margin: 0; color: var(--white); font-size: 14px;">${prog}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="color: var(--white); font-size: 20px; margin-bottom: 16px;">Facilities</h3>
                <p style="color: var(--gray-light);">${data.facilities}</p>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="color: var(--white); font-size: 20px; margin-bottom: 16px;">Placement Statistics</h3>
                <p style="color: var(--primary-orange); font-size: 18px; font-weight: 700;">${data.placement}</p>
            </div>
            
            <button class="apply-btn-large" style="width: 100%;" onclick="showApplicationModal(); this.closest('.modal-overlay').remove();">Apply Now</button>
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

// Leadership Carousel Functionality
const leadershipData = [
    {
        name: 'LATE SHRI R DAYANANDA SAGAR',
        title: 'Founding Father',
        description: 'Our founding father, late Sri R Dayananda Sagar, was a graduate in Arts & Commerce from India & a barrister-at-law from England. He established the institution with a vision to provide quality education to all.',
        image: 'images/founding-father.jpg'
    },
    {
        name: 'DR. PREMCHANDRAN',
        title: 'Vice Chancellor',
        description: 'Dr. Premchandran brings over 30 years of academic and administrative experience. He has been instrumental in establishing international collaborations and research initiatives.',
        image: 'images/vc.jpg'
    },
    {
        name: 'DR. SURESH NAGARAJU',
        title: 'Pro Vice Chancellor',
        description: 'Dr. Suresh Nagaraju is a renowned academician with expertise in engineering education. He has published extensively and led several research projects.',
        image: 'images/pro-vc.jpg'
    }
];

let currentLeaderIndex = 0;

function updateLeaderDisplay(index) {
    const leader = leadershipData[index];
    const leaderName = document.getElementById('leaderName');
    const leaderTitle = document.getElementById('leaderTitle');
    const leaderDescription = document.getElementById('leaderDescription');
    const leaderImage = document.getElementById('leaderImage');
    
    if (leaderName) leaderName.textContent = leader.name;
    if (leaderTitle) leaderTitle.textContent = leader.title;
    if (leaderDescription) leaderDescription.textContent = leader.description;
    if (leaderImage) {
        leaderImage.src = leader.image;
        leaderImage.alt = leader.name;
        leaderImage.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Ccircle cx=\'60\' cy=\'60\' r=\'55\' fill=\'%23e0f2fe\'/%3E%3Ctext x=\'60\' y=\'70\' font-size=\'20\' fill=\'%23003366\' text-anchor=\'middle\'%3EL%3C/text%3E%3C/svg%3E';
        };
    }
}

// Initialize leadership carousel when DOM is ready
function initLeadershipCarousel() {
    const leaderDots = document.querySelectorAll('.leadership-column .dot');
    if (leaderDots.length > 0) {
        leaderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                leaderDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                currentLeaderIndex = index;
                updateLeaderDisplay(index);
            });
        });
        
        // Auto-rotate leaders every 5 seconds
        setInterval(() => {
            currentLeaderIndex = (currentLeaderIndex + 1) % leadershipData.length;
            leaderDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentLeaderIndex);
            });
            updateLeaderDisplay(currentLeaderIndex);
        }, 5000);
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeadershipCarousel);
} else {
    initLeadershipCarousel();
}

// Video Play Functionality
function playVideo(videoTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; padding: 0; background: #000;">
            <button class="modal-close" style="top: 16px; right: 16px; z-index: 1001;">&times;</button>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--gray-dark);">
                    <div style="text-align: center; color: var(--white);">
                        <i class="fas fa-play-circle" style="font-size: 64px; color: var(--primary-orange); margin-bottom: 16px;"></i>
                        <h3 style="margin: 0;">${videoTitle}</h3>
                        <p style="margin-top: 8px; color: var(--gray-light);">Video would play here in a real implementation</p>
                        <p style="margin-top: 16px; font-size: 12px; color: var(--gray-light);">In a production environment, this would embed a YouTube or Vimeo player</p>
                    </div>
                </div>
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

// Make functions available globally
window.handleContentClick = handleContentClick;
window.handleContactForm = handleContactForm;
window.showAcademicDetails = showAcademicDetails;
window.playVideo = playVideo;

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

// ERP Login - Redirects to ERP login page
function showERPLoginModal() {
    window.location.href = 'erp-login.html';
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
        e.preventDefault();
        const overlayContent = btn.closest('.overlay-content');
        if (overlayContent) {
            const cardTitle = overlayContent.querySelector('h3')?.textContent || 'Campus';
            // Show alert or navigate to campus details page
            showCampusDetailsModal(cardTitle);
        }
    });
});

// Function to show campus details modal
function showCampusDetailsModal(campusName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${campusName}</h2>
            <p>Explore our beautiful ${campusName} campus. Learn more about facilities, programs, and campus life.</p>
            <div style="margin-top: 24px;">
                <button class="apply-btn-large" onclick="showApplicationModal(); this.closest('.modal-overlay').remove();">Apply Now</button>
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

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Get saved theme from localStorage or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme on page load
if (currentTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
} else {
    body.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Update NAAC logo SVG on page load if needed
setTimeout(() => {
    const naacImg = document.getElementById('naacLogoImg');
    if (naacImg && naacImg.complete && naacImg.naturalHeight === 0) {
        updateNAACLogoSVG();
    }
}, 100);

// Toggle theme function
// Function to update NAAC logo SVG fallback based on theme
function updateNAACLogoSVG() {
    const naacImg = document.getElementById('naacLogoImg');
    if (!naacImg) return;
    
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    const fillColor = currentTheme === 'light' ? '%2360A5FA' : '%23FF6600';
    const svgData = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60'%3E%3Ctext x='50' y='35' font-size='16' font-weight='bold' fill='${fillColor}' text-anchor='middle'%3ENAAC%3C/text%3E%3C/svg%3E`;
    naacImg.src = svgData;
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
    
    // Update NAAC logo SVG if it's using the fallback
    updateNAACLogoSVG();
}

// Add click event listener to theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Search Button Functionality
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            performSearch(searchTerm);
        } else {
            alert('Please enter a search term');
            searchInput.focus();
        }
    });
    
    // Allow Enter key to trigger search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchBtn.click();
        }
    });
}

function performSearch(term) {
    // Search functionality - can be enhanced with actual search API
    console.log('Searching for:', term);
    alert(`Search results for: "${term}"\n\nThis would show search results in a real implementation.`);
    // In a real implementation, you would:
    // 1. Make an API call to search endpoint
    // 2. Display results in a modal or results page
    // 3. Highlight matching content
}

// Apply Now Button Functionality
function showApplicationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <button class="modal-close">&times;</button>
            <h2>B.Tech Admissions 2026-27</h2>
            <p style="margin-bottom: 24px;">Fill out the form below to apply for admission.</p>
            <form class="application-form" onsubmit="handleApplicationSubmit(event)">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Full Name *</label>
                    <input type="text" name="name" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Email Address *</label>
                    <input type="email" name="email" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Phone Number *</label>
                    <input type="tel" name="phone" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Course Interested In *</label>
                    <select name="course" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                        <option value="">Select Course</option>
                        <option value="btech-cse">B.Tech Computer Science</option>
                        <option value="btech-ece">B.Tech Electronics & Communication</option>
                        <option value="btech-mech">B.Tech Mechanical</option>
                        <option value="btech-civil">B.Tech Civil</option>
                        <option value="btech-ece">B.Tech Electrical</option>
                    </select>
                </div>
                <div style="margin-bottom: 24px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">JEE Score (if available)</label>
                    <input type="number" name="jee_score" min="0" max="360" style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                </div>
                <button type="submit" class="apply-btn-large" style="width: 100%;">Submit Application</button>
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

function handleApplicationSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Application submitted:', data);
    alert('Thank you for your application! We will contact you shortly.');
    
    // Close modal
    const modal = event.target.closest('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
    
    // In a real implementation, you would:
    // 1. Send data to server via API
    // 2. Show success message
    // 3. Send confirmation email
}

// Apply Now Buttons Event Listeners
document.querySelectorAll('.apply-btn-large, .announcement-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showApplicationModal();
    });
});

// NRI/FOREIGN ADMISSIONS Button
const nriBtn = document.querySelector('.nri-btn');
if (nriBtn) {
    nriBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNRIModal();
    });
}

function showNRIModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <button class="modal-close">&times;</button>
            <h2>NRI / Foreign Admissions</h2>
            <p style="margin-bottom: 24px;">Apply for admission as an NRI or International student.</p>
            <form class="nri-form" onsubmit="handleNRISubmit(event)">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Full Name *</label>
                    <input type="text" name="name" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Email Address *</label>
                    <input type="email" name="email" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Country *</label>
                    <input type="text" name="country" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Phone Number *</label>
                    <input type="tel" name="phone" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Student Type *</label>
                    <select name="student_type" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; font-size: 14px;">
                        <option value="">Select Type</option>
                        <option value="nri">NRI</option>
                        <option value="foreign">Foreign National</option>
                        <option value="pio">PIO/OCI</option>
                    </select>
                </div>
                <button type="submit" class="apply-btn-large" style="width: 100%;">Submit Application</button>
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

function handleNRISubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('NRI Application submitted:', data);
    alert('Thank you for your NRI/Foreign application! Our international admissions team will contact you shortly.');
    
    const modal = event.target.closest('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Carousel buttons are already handled above, no need to duplicate

console.log('DSU Website Clone - Script loaded successfully!');

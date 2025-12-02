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
            { text: "SCHOOLS", link: "#engineering-section" },
            { text: "ENGINEERING", link: "#engineering-section" },
            { text: "UNDERGRADUATE PROGRAMMES", link: "#engineering-section" },
            { text: "POSTGRADUATE PROGRAMMES", link: "#engineering-section" },
            { text: "EXECUTIVE EDUCATION", link: "#executive" },
            { text: "ONLINE EDUCATION", link: "#online" }
        ]
    },
    admissions: {
        title: "admissions",
        items: [
            { text: "ADMISSIONS DETAILS", link: "#admissions-section" },
            { text: "DSAT ADMISSIONS", link: "#admissions-section" },
            { text: "DIRECT ADMISSIONS", link: "#admissions-section" },
            { text: "COURSE ELIGIBILITY & FEE STRUCTURE", link: "#admissions-section" },
            { text: "NRI / FOREIGN ADMISSIONS", link: "#admissions-section" }
        ]
    },
    international: {
        title: "international",
        items: [
            { text: "INTERNATIONAL ADMISSIONS", link: "#international-section" },
            { text: "EXCHANGE PROGRAMS", link: "#international-section" },
            { text: "GLOBAL PARTNERSHIPS", link: "#international-section" }
        ]
    },
    research: {
        title: "research",
        items: [
            { text: "RESEARCH CENTERS", link: "#research-section" },
            { text: "PUBLICATIONS", link: "#research-section" },
            { text: "RESEARCH PROJECTS", link: "#research-section" }
        ]
    },
    innovation: {
        title: "innovation",
        items: [
            { text: "INNOVATION LABS", link: "#innovation-section" },
            { text: "STARTUPS", link: "#innovation-section" },
            { text: "INCUBATION", link: "#innovation-section" }
        ]
    },
    placement: {
        title: "placement",
        items: [
            { text: "PLACEMENT STATISTICS", link: "#placement-section" },
            { text: "RECRUITERS", link: "#placement-section" },
            { text: "CAREER SERVICES", link: "#placement-section" }
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
            { text: "LIBRARY RESOURCES", link: "#library-section" },
            { text: "DIGITAL LIBRARY", link: "#library-section" }
        ]
    },
    hostel: {
        title: "hostel",
        items: [
            { text: "HOSTEL FACILITIES", link: "#hostel-section" },
            { text: "HOSTEL HANDBOOK", link: "#hostel-section" }
        ]
    },
    disclosure: {
        title: "public self-disclosure",
        items: [
            { text: "RTI ACT", link: "#disclosure-section" },
            { text: "DISCLOSURES", link: "#disclosure-section" }
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
            
            // Check if it's an external URL
            if (item.link.startsWith('http://') || item.link.startsWith('https://')) {
                window.location.href = item.link;
            } else {
                handleNavigation(item.link, item.text);
            }
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

        // Handle LIBRARY separately - scroll to library section
        if (menuKey === 'library') {
            setActiveNav('library');
            closeSidebar();
            const librarySection = document.getElementById('library-section');
            if (librarySection) {
                librarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.location.href = 'https://dsu.edu.in/library';
            }
            return;
        }

        // Handle UNIVERSITY separately - scroll to About DSU section
        if (menuKey === 'university') {
            setActiveNav('university');
            closeSidebar();
            const aboutSection = document.getElementById('about-dsu-section');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('university');
                } else {
                    const menu = menuData['university'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
            return;
        }

        // Handle ACADEMICS separately - scroll to Engineering section
        if (menuKey === 'academics') {
            setActiveNav('academics');
            closeSidebar();
            const engineeringSection = document.getElementById('engineering-section');
            if (engineeringSection) {
                engineeringSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('academics');
                } else {
                    const menu = menuData['academics'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
            return;
        }

        // Handle ADMISSIONS separately - scroll to Admissions section
        if (menuKey === 'admissions') {
            setActiveNav('admissions');
            closeSidebar();
            const admissionsSection = document.getElementById('admissions-section');
            if (admissionsSection) {
                admissionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('admissions');
                } else {
                    const menu = menuData['admissions'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
            return;
        }

        // Handle INTERNATIONAL separately - scroll to International section
        if (menuKey === 'international') {
            setActiveNav('international');
            closeSidebar();
            const internationalSection = document.getElementById('international-section');
            if (internationalSection) {
                internationalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('international');
                } else {
                    const menu = menuData['international'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
            return;
        }

        // Handle RESEARCH separately - scroll to Research section
        if (menuKey === 'research') {
            setActiveNav('research');
            closeSidebar();
            const researchSection = document.getElementById('research-section');
            if (researchSection) {
                researchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('research');
                } else {
                    const menu = menuData['research'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
            return;
        }

        // Handle INNOVATION separately - scroll to Innovation section
        if (menuKey === 'innovation') {
            setActiveNav('innovation');
            closeSidebar();
            const innovationSection = document.getElementById('innovation-section');
            if (innovationSection) {
                innovationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('innovation');
                } else {
                    const menu = menuData['innovation'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
            return;
        }

        // Handle PLACEMENT separately - scroll to Placement section
        if (menuKey === 'placement') {
            setActiveNav('placement');
            closeSidebar();
            const placementSection = document.getElementById('placement-section');
            if (placementSection) {
                placementSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('placement');
                } else {
                    const menu = menuData['placement'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
            return;
        }

        // Handle HOSTEL separately - scroll to Hostel section
        if (menuKey === 'hostel') {
            setActiveNav('hostel');
            closeSidebar();
            const hostelSection = document.getElementById('hostel-section');
            if (hostelSection) {
                hostelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('hostel');
                } else {
                    const menu = menuData['hostel'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
            return;
        }

        // Handle DISCLOSURE separately - scroll to Disclosure section
        if (menuKey === 'disclosure') {
            setActiveNav('disclosure');
            closeSidebar();
            const disclosureSection = document.getElementById('disclosure-section');
            if (disclosureSection) {
                disclosureSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If section doesn't exist, show sidebar with menu items
                if (window.innerWidth <= 1024) {
                    openSidebar('disclosure');
                } else {
                    const menu = menuData['disclosure'];
                    if (menu && menu.items.length > 0) {
                        showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                    }
                }
            }
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
                if (menuKey === 'university') {
                    // Scroll to About DSU section
                    const aboutSection = document.getElementById('about-dsu-section');
                    if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey === 'academics') {
                    // Scroll to Engineering section
                    const engineeringSection = document.getElementById('engineering-section');
                    if (engineeringSection) {
                        engineeringSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey === 'admissions') {
                    // Scroll to Admissions section
                    const admissionsSection = document.getElementById('admissions-section');
                    if (admissionsSection) {
                        admissionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey === 'international') {
                    // Scroll to International section
                    const internationalSection = document.getElementById('international-section');
                    if (internationalSection) {
                        internationalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey === 'research') {
                    // Scroll to Research section
                    const researchSection = document.getElementById('research-section');
                    if (researchSection) {
                        researchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey === 'innovation') {
                    // Scroll to Innovation section
                    const innovationSection = document.getElementById('innovation-section');
                    if (innovationSection) {
                        innovationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey === 'placement') {
                    // Scroll to Placement section
                    const placementSection = document.getElementById('placement-section');
                    if (placementSection) {
                        placementSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey === 'hostel') {
                    // Scroll to Hostel section
                    const hostelSection = document.getElementById('hostel-section');
                    if (hostelSection) {
                        hostelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey === 'disclosure') {
                    // Scroll to Disclosure section
                    const disclosureSection = document.getElementById('disclosure-section');
                    if (disclosureSection) {
                        disclosureSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        const menu = menuData[menuKey];
                        if (menu && menu.items.length > 0) {
                            showPageContent(menu.items[0]?.text || menu.title, `Information about ${menu.title}`);
                        }
                    }
                } else if (menuKey !== 'home' && menuKey !== 'contact' && menuKey !== 'library') {
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
    switch (pageId) {
        case 'careers':
            showPageContent('Careers', 'Explore exciting career opportunities at DSU.');
            break;
        case 'virtual-tour':
            // Redirect to DSU virtual tour page
            window.location.href = 'https://dsu.edu.in/virtual-tour/';
            break;
        case 'examination':
            // Redirect to DSU examination page
            window.location.href = 'https://dsu.edu.in/examination';
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
        
        // Handle about-dsu link
        if (targetId === 'about-dsu') {
            const aboutSection = document.getElementById('about-dsu-section');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
        // Handle engineering-section link
        if (targetId === 'engineering-section') {
            const engineeringSection = document.getElementById('engineering-section');
            if (engineeringSection) {
                engineeringSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
        // Handle admissions-section link
        if (targetId === 'admissions-section') {
            const admissionsSection = document.getElementById('admissions-section');
            if (admissionsSection) {
                admissionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
        // Handle international-section link
        if (targetId === 'international-section') {
            const internationalSection = document.getElementById('international-section');
            if (internationalSection) {
                internationalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
        // Handle research-section link
        if (targetId === 'research-section') {
            const researchSection = document.getElementById('research-section');
            if (researchSection) {
                researchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
        // Handle innovation-section link
        if (targetId === 'innovation-section') {
            const innovationSection = document.getElementById('innovation-section');
            if (innovationSection) {
                innovationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
        // Handle placement-section link
        if (targetId === 'placement-section') {
            const placementSection = document.getElementById('placement-section');
            if (placementSection) {
                placementSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
        // Handle hostel-section link
        if (targetId === 'hostel-section') {
            const hostelSection = document.getElementById('hostel-section');
            if (hostelSection) {
                hostelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
        // Handle disclosure-section link
        if (targetId === 'disclosure-section') {
            const disclosureSection = document.getElementById('disclosure-section');
            if (disclosureSection) {
                disclosureSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }
        
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
    // If Engineering is clicked, scroll to engineering section
    if (schoolName === 'Engineering') {
        const engineeringSection = document.getElementById('engineering-section');
        if (engineeringSection) {
            engineeringSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
    }
    
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
        leaderImage.onerror = function () {
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
    img.addEventListener('load', function () {
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

// Apply Now Buttons Event Listeners - Using Event Delegation
function initApplyNowButtons() {
    // Use event delegation on document
    document.addEventListener('click', function(e) {
        const target = e.target.closest('.apply-btn-large, .announcement-btn');
        if (target && !target.closest('.modal-overlay')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Apply Now button clicked');
            if (typeof showApplicationModal === 'function') {
                showApplicationModal();
            } else {
                console.error('showApplicationModal is not defined');
                alert('Application form will open shortly. Please refresh the page if this issue persists.');
            }
        }
    });
}

// Exam Items Click Functionality
let examItemsInitialized = false;

function initExamItems() {
    if (examItemsInitialized) {
        console.log('Exam items already initialized, skipping...');
        return;
    }
    
    console.log('Initializing exam items...');
    
    // Try direct event listeners first
    function attachExamListeners() {
        const examItems = document.querySelectorAll('.exam-item');
        console.log('Found', examItems.length, 'exam items to attach listeners');
        
        examItems.forEach((item, index) => {
            // Remove any existing listeners
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            newItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Exam item clicked directly:', this.querySelector('span')?.textContent);
                
                // Remove clicked class from all items
                document.querySelectorAll('.exam-item').forEach(exam => exam.classList.remove('clicked'));
                
                // Add clicked class to current item
                this.classList.add('clicked');
                
                // Get exam name
                const examName = this.querySelector('span')?.textContent || 'Exam';
                
                // Show exam details modal
                if (typeof showExamDetailsModal === 'function') {
                    showExamDetailsModal(examName);
                } else {
                    console.error('showExamDetailsModal is not defined');
                    alert(`${examName} - This exam is accepted for B.Tech Admissions 2026-27. Click Apply Now to proceed.`);
                }
                
                // Remove clicked class after animation
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 500);
            });
            
            // Also add mousedown for better feedback
            newItem.addEventListener('mousedown', function() {
                this.style.transform = 'translateX(8px) scale(0.98)';
            });
            
            newItem.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Try immediately
    attachExamListeners();
    
    // Also use event delegation as backup
    document.addEventListener('click', function examItemClickHandler(e) {
        const target = e.target.closest('.exam-item');
        if (target) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Exam item clicked via delegation:', target.querySelector('span')?.textContent);
            
            // Remove clicked class from all items
            document.querySelectorAll('.exam-item').forEach(exam => exam.classList.remove('clicked'));
            
            // Add clicked class to current item
            target.classList.add('clicked');
            
            // Get exam name
            const examName = target.querySelector('span')?.textContent || 'Exam';
            
            // Show exam details modal
            if (typeof showExamDetailsModal === 'function') {
                showExamDetailsModal(examName);
            } else {
                alert(`${examName} - This exam is accepted for B.Tech Admissions 2026-27.`);
            }
            
            // Remove clicked class after animation
            setTimeout(() => {
                target.classList.remove('clicked');
            }, 500);
        }
    });
    
    examItemsInitialized = true;
}

// Show Exam Details Modal
function showExamDetailsModal(examName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close">&times;</button>
            <h2>${examName} - Admission Details</h2>
            <div style="margin-top: 24px;">
                <p><strong>Exam:</strong> ${examName}</p>
                <p><strong>Status:</strong> Accepted for B.Tech Admissions 2026-27</p>
                <p style="margin-top: 16px;">Your ${examName} scores will be considered for admission to our B.Tech programs.</p>
                <p style="margin-top: 12px;">For more information about admission requirements and eligibility, please contact our admissions office.</p>
            </div>
            <button class="apply-btn-large" style="width: 100%; margin-top: 24px;" onclick="showApplicationModal(); this.closest('.modal-overlay').remove();">Apply Now</button>
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

// Initialize immediately - event delegation works even before DOM is ready
initApplyNowButtons();

// Initialize exam items when DOM is ready
function initExamItemsWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initExamItems, 100);
        });
    } else {
        setTimeout(initExamItems, 100);
    }
}

initExamItemsWhenReady();

// Also try after a delay to ensure elements exist
setTimeout(initExamItems, 500);
setTimeout(initExamItems, 1000);

// Initialize hero carousel when DOM is ready
function initHeroSectionInteractions() {
    console.log('Initializing hero section interactions...');
    
    // Initialize hero carousel
    if (typeof initHeroCarousel === 'function') {
        initHeroCarousel();
    }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM Content Loaded - initializing carousel');
        initHeroSectionInteractions();
    });
} else {
    // DOM is already ready
    console.log('DOM already ready - initializing carousel');
    initHeroSectionInteractions();
}

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

// Hero Background Image Carousel
function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) {
        console.log('Hero carousel: No slides found');
        return;
    }

    console.log('Hero carousel: Initializing with', slides.length, 'slides');

    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideInterval = 4000; // 4 seconds between slides

    function showNextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');

        // Move to next slide
        currentSlide = (currentSlide + 1) % totalSlides;

        // Remove prev class and add active class to new slide
        slides.forEach(slide => {
            slide.classList.remove('prev');
            slide.style.transform = 'translateX(100%)';
            slide.style.opacity = '0';
        });

        // Set new slide to come from right
        slides[currentSlide].style.transform = 'translateX(100%)';
        slides[currentSlide].style.opacity = '0';

        // Trigger reflow
        void slides[currentSlide].offsetWidth;

        // Animate new slide in from right
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.transform = 'translateX(0)';
        slides[currentSlide].style.opacity = '0.5';

        // Animate old slide out to left
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        slides[prevIndex].style.transform = 'translateX(-100%)';
        slides[prevIndex].style.opacity = '0';
    }

    // Initialize first slide
    slides[0].classList.add('active');
    slides[0].style.opacity = '0.5';
    slides[0].style.transform = 'translateX(0)';

    // Start carousel
    setInterval(showNextSlide, slideInterval);
}

// Carousel initialization is handled in initHeroSectionInteractions()

// Library Functions
function showLibraryContact() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <button class="modal-close">&times;</button>
            <h2>Library Contact Information</h2>
            <div style="margin-top: 24px;">
                <div style="margin-bottom: 20px;">
                    <h3 style="color: var(--primary-orange); margin-bottom: 12px;">DSU Main Campus Library</h3>
                    <p><strong>Location:</strong> Devarakaggalahalli, Harohalli, Kanakapura Road, Ramanagara Dt., Bengaluru – 562 112</p>
                    <p><strong>Seating Capacity:</strong> 560 students</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <h3 style="color: var(--primary-orange); margin-bottom: 12px;">Library Services</h3>
                    <p>Library is accessible to all Undergraduates, Postgraduates, Research Scholars & faculty members.</p>
                    <p>Professional library staff members are always available to help users.</p>
                </div>
                <div>
                    <h3 style="color: var(--primary-orange); margin-bottom: 12px;">E-Resources Access</h3>
                    <p>Access E-books from your desktop inside the campus:</p>
                    <a href="https://dsuunivopac.ltsinformatics.com/" target="_blank" style="color: var(--primary-orange); text-decoration: underline;">https://dsuunivopac.ltsinformatics.com/</a>
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

function showLibraryRules() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px; max-height: 80vh; overflow-y: auto;">
            <button class="modal-close">&times;</button>
            <h2>Library Rules & Regulations</h2>
            <div style="margin-top: 24px;">
                <div style="margin-bottom: 24px;">
                    <h3 style="color: var(--primary-orange); margin-bottom: 12px;">General Rules</h3>
                    <ul style="line-height: 1.8; color: var(--gray-light);">
                        <li>Library is accessible to all Undergraduates, Postgraduates, Research Scholars & faculty members</li>
                        <li>Maintain silence in the library premises</li>
                        <li>No food or drinks allowed inside the library</li>
                        <li>Mobile phones should be kept in silent mode</li>
                        <li>Books should be handled with care</li>
                    </ul>
                </div>
                <div style="margin-bottom: 24px;">
                    <h3 style="color: var(--primary-orange); margin-bottom: 12px;">Borrowing Rules</h3>
                    <ul style="line-height: 1.8; color: var(--gray-light);">
                        <li>Present your ID card for borrowing books</li>
                        <li>Books must be returned on or before the due date</li>
                        <li>Late returns may incur fines</li>
                        <li>Books can be renewed if not reserved by others</li>
                    </ul>
                </div>
                <div style="margin-bottom: 24px;">
                    <h3 style="color: var(--primary-orange); margin-bottom: 12px;">Digital Resources</h3>
                    <ul style="line-height: 1.8; color: var(--gray-light);">
                        <li>E-resources are available for on-campus access</li>
                        <li>Use OPAC system to search for books and resources</li>
                        <li>Follow copyright guidelines when using digital materials</li>
                    </ul>
                </div>
                <div>
                    <h3 style="color: var(--primary-orange); margin-bottom: 12px;">Contact</h3>
                    <p style="color: var(--gray-light);">For detailed rules and regulations, please contact the library staff or visit the library office.</p>
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

// Make functions globally available
window.showLibraryContact = showLibraryContact;
window.showLibraryRules = showLibraryRules;

// AI Chatbot Section Functionality
(function() {
    // Main Chatbot Section - Get elements
    let chatbotContainerMain, chatbotMinimizeMain, chatbotBodyMain, chatbotMessagesMain;
    let chatbotInputMain, chatbotSendBtnMain, chatbotMicBtnMain, quickActionBtnsMain;

    // Floating Chatbot Widget
    let chatbotWidget, chatbotToggle, chatbotClose, chatbotMinimize;
    let chatbotContainer, chatbotBody, chatbotMessages;
    let chatbotInput, chatbotSendBtn, chatbotMicBtn;
    let quickActionBtns;

    let isRecording = false;
    let recognition = null;

    // Check if speech recognition is available
    const speechRecognitionAvailable = ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    
    // Log browser compatibility
    if (!speechRecognitionAvailable) {
        console.warn('Speech recognition not available in this browser. Please use Chrome, Edge, or Safari.');
    } else {
        console.log('Speech recognition is available');
    }
    
    // Create a new recognition instance (some browsers require a new instance each time)
    function createRecognitionInstance(source) {
        if (!speechRecognitionAvailable) {
            return null;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const newRecognition = new SpeechRecognition();
        newRecognition.continuous = false;
        newRecognition.interimResults = true;
        newRecognition.lang = 'en-US';
        newRecognition.maxAlternatives = 1;

        newRecognition.onstart = function() {
            console.log('Speech recognition started successfully for source:', source);
            isRecording = true;
            if (source === 'main' && chatbotMicBtnMain) {
                chatbotMicBtnMain.classList.add('recording');
            } else if (source === 'widget' && chatbotMicBtn) {
                chatbotMicBtn.classList.add('recording');
            }
        };

        newRecognition.onresult = function(event) {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            // Update input field with interim results as user speaks
            if (interimTranscript) {
                if (source === 'widget' && chatbotInput) {
                    chatbotInput.value = interimTranscript;
                } else if (source === 'main' && chatbotInputMain) {
                    chatbotInputMain.value = interimTranscript;
                }
            }

            // When final transcript is ready, put it in the input field (don't auto-send)
            if (finalTranscript) {
                const transcript = finalTranscript.trim();
                console.log('Speech recognized:', transcript);
                
                // Put the final transcript in the input field
                if (source === 'widget' && chatbotInput) {
                    chatbotInput.value = transcript;
                    // Focus the input field so user can edit if needed
                    chatbotInput.focus();
                    // Move cursor to end
                    chatbotInput.setSelectionRange(transcript.length, transcript.length);
                } else if (source === 'main' && chatbotInputMain) {
                    chatbotInputMain.value = transcript;
                    // Focus the input field so user can edit if needed
                    chatbotInputMain.focus();
                    // Move cursor to end
                    chatbotInputMain.setSelectionRange(transcript.length, transcript.length);
                }
                
                // Show a message that text is ready to send
                const readyMsg = '✅ Text ready! Review and click send when ready.';
                if (source === 'widget') {
                    addBotMessage(readyMsg);
                } else if (source === 'main') {
                    addBotMessageMain(readyMsg);
                }
            }
        };

        newRecognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            isRecording = false;
            
            let errorMessage = 'Sorry, I couldn\'t understand that. ';
            
            switch(event.error) {
                case 'no-speech':
                    // Don't show error for no-speech if it just ended naturally
                    // Only show if it's a real error
                    console.log('No speech detected - this is normal if you didn\'t speak');
                    // Don't show error message for no-speech, just log it
                    return; // Exit early without showing error
                case 'audio-capture':
                    errorMessage = 'Microphone not found. Please check your microphone connection and try again.';
                    break;
                case 'not-allowed':
                    errorMessage = 'Microphone permission denied. Please allow microphone access in your browser settings and refresh the page.';
                    break;
                case 'network':
                    errorMessage = 'Network error. Please check your internet connection. Speech recognition requires an internet connection.';
                    break;
                case 'aborted':
                    // Don't show error for aborted, it's usually intentional
                    console.log('Recognition aborted');
                    break;
                case 'service-not-allowed':
                    errorMessage = 'Speech recognition service not allowed. Please check your browser settings.';
                    break;
                default:
                    errorMessage = `An error occurred (${event.error}). Please try again or type your message.`;
            }
            
            if (event.error !== 'aborted') {
                if (source === 'main' && chatbotMessagesMain) {
                    addBotMessageMain(errorMessage);
                } else if (source === 'widget' && chatbotMessages) {
                    addBotMessage(errorMessage);
                }
            }
            
            if (source === 'main' && chatbotMicBtnMain) {
                chatbotMicBtnMain.classList.remove('recording');
            } else if (source === 'widget' && chatbotMicBtn) {
                chatbotMicBtn.classList.remove('recording');
            }
        };

        newRecognition.onend = function() {
            console.log('Speech recognition ended');
            isRecording = false;
            if (source === 'main' && chatbotMicBtnMain) {
                chatbotMicBtnMain.classList.remove('recording');
            } else if (source === 'widget' && chatbotMicBtn) {
                chatbotMicBtn.classList.remove('recording');
            }
        };

        return newRecognition;
    }


    // Helper function to start voice recognition with permission check
    async function startVoiceRecognition(source) {
        if (!speechRecognitionAvailable) {
            const errorMsg = 'Voice input is not supported in your browser. Please use Chrome, Edge, or another browser that supports speech recognition.';
            if (source === 'main') {
                addBotMessageMain(errorMsg);
            } else {
                addBotMessage(errorMsg);
            }
            return false;
        }

        // Stop any existing recognition
        if (isRecording && recognition) {
            try {
                recognition.stop();
                recognition = null;
            } catch (e) {
                console.error('Error stopping recognition:', e);
            }
            // Wait a bit before starting new recognition
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Create a new recognition instance
        recognition = createRecognitionInstance(source);
        if (!recognition) {
            const errorMsg = 'Could not initialize speech recognition. Please try again.';
            if (source === 'main') {
                addBotMessageMain(errorMsg);
            } else {
                addBotMessage(errorMsg);
            }
            return false;
        }

        // Try to start recognition directly (Speech Recognition API will request permission)
        try {
            // Set recording state immediately for better UX
            isRecording = true;
            if (source === 'main' && chatbotMicBtnMain) {
                chatbotMicBtnMain.classList.add('recording');
            } else if (source === 'widget' && chatbotMicBtn) {
                chatbotMicBtn.classList.add('recording');
            }
            
            recognition.start();
            const listeningMsg = '🎤 Listening... Please speak now. Your words will appear in the text box, then you can review and send.';
            if (source === 'main') {
                addBotMessageMain(listeningMsg);
            } else {
                addBotMessage(listeningMsg);
            }
            console.log('Recognition start() called successfully');
            return true;
        } catch (e) {
            console.error('Error starting recognition:', e);
            isRecording = false;
            recognition = null;
            
            let errorMsg = '';
            if (e.name === 'InvalidStateError') {
                errorMsg = 'Please wait a moment and try again. The microphone might be in use.';
            } else if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
                // Try to request permission via getUserMedia as fallback
                errorMsg = 'Microphone permission required. Requesting permission...';
                if (source === 'main') {
                    addBotMessageMain(errorMsg);
                } else {
                    addBotMessage(errorMsg);
                }
                
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    stream.getTracks().forEach(track => track.stop());
                    
                    // Retry after getting permission
                    await new Promise(resolve => setTimeout(resolve, 500));
                    recognition = createRecognitionInstance(source);
                    if (recognition) {
                        isRecording = true;
                        if (source === 'main' && chatbotMicBtnMain) {
                            chatbotMicBtnMain.classList.add('recording');
                        } else if (chatbotMicBtn) {
                            chatbotMicBtn.classList.add('recording');
                        }
                        recognition.start();
                        const listeningMsg = '🎤 Listening... Please speak now. Your words will appear in the text box, then you can review and send.';
                        if (source === 'main') {
                            addBotMessageMain(listeningMsg);
                        } else {
                            addBotMessage(listeningMsg);
                        }
                        return true;
                    }
                } catch (permError) {
                    console.error('Permission request failed:', permError);
                    errorMsg = 'Microphone permission denied. Please allow microphone access in your browser settings and refresh the page.';
                }
            } else {
                errorMsg = 'Could not start voice recognition. Please check your microphone and try again.';
            }
            
            if (source === 'main') {
                addBotMessageMain(errorMsg);
                if (chatbotMicBtnMain) chatbotMicBtnMain.classList.remove('recording');
            } else {
                addBotMessage(errorMsg);
                if (chatbotMicBtn) chatbotMicBtn.classList.remove('recording');
            }
            return false;
        }
    }

    // Main Chatbot Section Functions
    function sendMessageMain() {
        if (!chatbotInputMain) return;
        const message = chatbotInputMain.value.trim();
        if (message) {
            handleUserMessageMain(message);
            chatbotInputMain.value = '';
        }
    }

    function handleUserMessageMain(message) {
        if (!chatbotMessagesMain) return;
        addUserMessageMain(message);
        
        setTimeout(() => {
            const response = generateBotResponse(message);
            addBotMessageMain(response);
        }, 500);
    }

    function handleQuickActionMain(action) {
        let message = '';
        switch(action) {
            case 'admissions':
                message = 'Tell me about admissions';
                break;
            case 'courses':
                message = 'What courses are available?';
                break;
            case 'facilities':
                message = 'What facilities are available?';
                break;
            case 'contact':
                message = 'How can I contact the university?';
                break;
            case 'placement':
                message = 'Tell me about placements';
                break;
            case 'hostel':
                message = 'Tell me about hostel facilities';
                break;
        }
        if (message && chatbotInputMain) {
            chatbotInputMain.value = message;
            handleUserMessageMain(message);
        }
    }

    function addUserMessageMain(message) {
        if (!chatbotMessagesMain) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message-main user-message-main';
        messageDiv.innerHTML = `
            <div class="message-avatar-main">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content-main">
                <p>${escapeHtml(message)}</p>
            </div>
        `;
        chatbotMessagesMain.appendChild(messageDiv);
        scrollToBottomMain();
    }

    function addBotMessageMain(message) {
        if (!chatbotMessagesMain) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message-main bot-message-main';
        
        // Format message for display
        const formattedMessage = formatMessageForDisplayMain(message);
        
        messageDiv.innerHTML = `
            <div class="message-avatar-main">
                <div class="chatbot-3d-face-tiny">
                    <div class="face-container-tiny">
                        <div class="face-sphere-tiny">
                            <div class="face-eyes-tiny">
                                <div class="face-eye-tiny left-eye-tiny">
                                    <div class="eye-pupil-tiny"></div>
                                </div>
                                <div class="face-eye-tiny right-eye-tiny">
                                    <div class="eye-pupil-tiny"></div>
                                </div>
                            </div>
                            <div class="face-mouth-tiny">
                                <div class="mouth-inner-tiny"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="message-content-main">
                ${formattedMessage}
            </div>
        `;
        chatbotMessagesMain.appendChild(messageDiv);
        scrollToBottomMain();
        
        // Speak the message (remove HTML for speech)
        if ('speechSynthesis' in window) {
            const textForSpeech = message.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
            const utterance = new SpeechSynthesisUtterance(textForSpeech);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    }

    // Format message for display (main section)
    function formatMessageForDisplayMain(text) {
        let formatted = text.replace(/\n/g, '<br>');
        if (!formatted.includes('<strong>') && !formatted.includes('<ul>')) {
            formatted = `<p>${formatted}</p>`;
        }
        return formatted;
    }

    function scrollToBottomMain() {
        if (chatbotMessagesMain) {
            chatbotMessagesMain.scrollTop = chatbotMessagesMain.scrollHeight;
        }
    }

    // Initialize chatbot event listeners
    function initChatbotListeners() {
        if (chatbotMinimizeMain && chatbotContainerMain) {
            chatbotMinimizeMain.addEventListener('click', function() {
                chatbotContainerMain.classList.toggle('minimized');
            });
        }

        if (chatbotSendBtnMain) {
            chatbotSendBtnMain.addEventListener('click', sendMessageMain);
        }

        if (chatbotInputMain) {
            chatbotInputMain.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessageMain();
                }
            });
        }

        if (chatbotMicBtnMain) {
            chatbotMicBtnMain.addEventListener('click', async function() {
                console.log('Mic button clicked, isRecording:', isRecording);
                if (isRecording && recognition) {
                    // Stop recording
                    try {
                        console.log('Stopping recognition...');
                        recognition.stop();
                        recognition = null;
                    } catch (e) {
                        console.error('Error stopping recognition:', e);
                    }
                    chatbotMicBtnMain.classList.remove('recording');
                    isRecording = false;
                    addBotMessageMain('Recording stopped.');
                } else {
                    // Start recording
                    console.log('Starting voice recognition...');
                    await startVoiceRecognition('main');
                }
            });
        }

        if (quickActionBtnsMain && quickActionBtnsMain.length > 0) {
            quickActionBtnsMain.forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.dataset.action;
                    handleQuickActionMain(action);
                });
            });
        }
    }


    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML.replace(/\n/g, '<br>');
    }

    // Comprehensive Knowledge Base
    const knowledgeBase = {
        engineering: {
            courses: {
                undergraduate: [
                    'B.Tech Computer Science & Engineering',
                    'B.Tech Computer Science & Engineering (Data Sciences)',
                    'B.Tech Computer Science & Engineering (Cyber Security)',
                    'B.Tech Computer Science & Engineering (Artificial Intelligence and Machine Learning)',
                    'B.Tech Robotics & AI',
                    'B.Tech Electronics & Communication Engineering',
                    'B.Tech Mechanical Engineering',
                    'B.Tech Computer Science & Technology',
                    'B.Tech Aerospace Engineering',
                    'B.Tech Computer Science & Engineering (AI & Data Science)',
                    'B.Tech Computer Science & Engineering and Medical Engineering',
                    'B Voc Mechatronics',
                    'B Voc CSE (Data Analytics)',
                    'B Voc Tool Engineering',
                    'B Voc Pharmaceutical Manufacturing technologies',
                    'B Voc CSE (Computer Engineering and IT Infrastructure)',
                    'BCA - Bachelor of Computer Applications'
                ],
                postgraduate: [
                    'M.Tech Computer Science & Engineering',
                    'M.Tech Embedded System',
                    'M.Tech Design Engineering',
                    'MCA - Master of Computer Applications'
                ]
            },
            description: 'The School of Engineering at DSU offers cutting-edge programs in Computer Science, Electronics, Mechanical, Aerospace, and emerging technologies like AI, ML, Data Science, and Cyber Security. Our programs are designed with industry partnerships and provide hands-on experience through state-of-the-art labs and innovation centers.'
        },
        hostel: {
            name: 'S\' Residences',
            location: 'Harohalli, Bangalore',
            facilities: [
                '24/7 Assistance and Security',
                '24/7 Handyman and Resident Manager',
                '24/7 Concierge Service',
                'Monitored Student Entry/Exit',
                'Face-recognition & Biometrics',
                'CCTV Monitoring',
                'Wi-Fi and Internet',
                'RO Drinking Water',
                'Vending Machines',
                'Semi Furnished Spacious Rooms',
                'Well Furnished Mess Halls',
                'Activity Studios',
                'Business Center',
                'Resident Warden',
                'Break-out Zones',
                'Visitor\'s Lounge',
                'Quiet Study Zones',
                'Discussion Rooms',
                'F&B Partners',
                'Indian & Continental Food',
                'Retail Cafeteria',
                'Hot Water',
                'Laundry Service',
                'Parcel Service',
                'Gym Room',
                'Yoga Room',
                'Meditation Room',
                'Music Room',
                'Movie Screening Theatre',
                'TV Lounge',
                'Video Game Room',
                'Indoor Game Rooms',
                'Outdoor Sports Facilities',
                'Access to Health Clinic & Counsellors',
                'Men\'s Salon',
                'Parking'
            ],
            dining: {
                kitchenettes: [
                    'N Kitchenette - North Indian Vegetarian Cuisine',
                    'S Kitchenette - South Indian Vegetarian Cuisine',
                    'E Kitchenette - Non-Vegetarian Cuisine',
                    'W Kitchenette - International Cuisine'
                ],
                cafeterias: [
                    'SSquare Mess Halls - Indian vegetarian and non-vegetarian cuisine',
                    'Grains & Gossip - International fast food cafeteria'
                ]
            },
            contact: {
                phone: '+91-96063 06540',
                email_registration: 'admission@poshtell.com',
                email_support: 'support@poshtell.com',
                address: '#515/528, Devarakaggalahalli Village, Kanakapura Taluk, Harohalli Hobli, Ramanagara Distt. – 562112'
            }
        },
        admissions: {
            methods: [
                'DSAT (Dayananda Sagar Admission Test)',
                'Comed-K (Code: E182)',
                'Uni-Guage (Code: Uni-010)',
                'CET (Code: DSU-E240)',
                'Direct Admissions - 2026 (Non DSAT)',
                'PGCET (M.Tech: T970, MBA: B365MB, MCA: C520MC)'
            ],
            contact: {
                phone_main: '080 46461800',
                phone_helpline: '+91 6366885507',
                email: 'admissions@dsu.edu.in',
                nri_phone: '+91 9606022152 / +91 9606022150 / +91 9606022149'
            },
            campuses: {
                main: {
                    location: 'Devarakaggalahalli, Harohalli, Kanakapura Road, Bengaluru South Dt. – 562 112',
                    email: 'admissions@dsu.edu.in'
                },
                city_innovation: {
                    location: 'Administrative & Main Admission office, Kudlu Gate, Hosur Road, Bengaluru - 560 114',
                    phone: '080 46461800 / 080 49092800 / +91 7760964277 / 8296316737 / 6366885507',
                    email: 'admissions@dsu.edu.in | dsat@dsu.edu.in'
                },
                city_admissions: {
                    location: 'Gate 2, 6th Floor, University Building, Dental Block, Kumaraswamy Layout, Bengaluru - 560111',
                    phone: '080 46461800 / 080 49092800',
                    email: 'enquiry@dsu.edu.in / admissions@dsu.edu.in'
                }
            }
        },
        facilities: {
            innovation_labs: [
                'ETAS: Automotive System Labs',
                'Autodesk: Design & Innovation Centre',
                'Vmware IT Academy',
                'BOSCH Rexroth: Automation Technologies',
                'IBM Software Lab for Emerging Technologies',
                'NVIDIA: Boston Innovation Lab',
                'GE Advanced Healthcare Lab',
                'Dassault Systems - AE Lab (Aerospace Engineering)',
                'IBM Centre of Excellence'
            ],
            infrastructure: [
                '25,000+ sq.ft Innovation Labs',
                'Modern Lecture Theatres',
                'State-of-the-art Laboratories',
                'Excellent Library with Digital Resources',
                'Computer Networking Facilities',
                'Sports Complexes',
                'Hostel Facilities',
                'Cafeteria and Dining Halls'
            ]
        },
        library: {
            capacity: '560 students seating capacity',
            resources: [
                'Huge collection of books',
                'CDs and DVDs',
                'Latest periodicals',
                'Online resources through Digital Library',
                'E-books access from desktop',
                'Access to advanced anti-plagiarism tools'
            ],
            access: 'Available to all Undergraduates, Postgraduates, Research Scholars & faculty members'
        },
        placements: {
            organizations: '500+ reputed organizations',
            programs: 'Campus interviews for BE/B.Tech/M.Tech/B.Sc/M.Sc/MBA/BCA/MCA/BAJMC students',
            focus: 'Improving quality of placements in terms of job opportunities, companies of relevance, highest and average salaries',
            mission: 'Enable and empower every student to acquire necessary skills, knowledge, and industry exposure to secure meaningful and successful careers'
        },
        research: {
            phd_programs: [
                'Faculty of Engineering (CSE, ECE, Mechanical, Aerospace, Mathematics, Chemistry, Physics)',
                'Faculty of Commerce & Management Studies',
                'Faculty of Basic & Applied Sciences (Life Sciences)',
                'Faculty of Health Sciences (Pharmaceutical Sciences, Physiotherapy, Nursing)',
                'Faculty of School of Law',
                'Faculty of School of Arts, Design and Humanities',
                'School Of Computer Applications',
                'Faculty of Journalism and Mass Communication'
            ],
            contact: {
                phone: '080 4909 2912',
                email: 'research@dsu.edu.in'
            }
        }
    };

    // Generate bot response function (shared)
    function generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Engineering Courses
        if (message.includes('engineering') && (message.includes('course') || message.includes('program') || message.includes('b.tech') || message.includes('m.tech'))) {
            let response = '🎓 <strong>School of Engineering - Programs Offered:</strong>\n\n';
            response += '<strong>Undergraduate Programs (B.Tech):</strong>\n';
            knowledgeBase.engineering.courses.undergraduate.forEach(course => {
                response += `• ${course}\n`;
            });
            response += '\n<strong>Postgraduate Programs (M.Tech):</strong>\n';
            knowledgeBase.engineering.courses.postgraduate.forEach(course => {
                response += `• ${course}\n`;
            });
            response += '\n' + knowledgeBase.engineering.description;
            response += '\n\nFor more details, visit our Engineering section or contact: 080 4909 2986 / 32 / 33';
            return response;
        }
        
        // Hostel Facilities
        if (message.includes('hostel') || message.includes('accommodation') || message.includes('residence') || message.includes('s\' residence')) {
            let response = '🏠 <strong>S\' Residences - Premium Student Accommodation</strong>\n\n';
            response += '<strong>Location:</strong> ' + knowledgeBase.hostel.location + '\n\n';
            response += '<strong>Complete Facilities (38+ amenities):</strong>\n';
            knowledgeBase.hostel.facilities.forEach(facility => {
                response += `✓ ${facility}\n`;
            });
            response += '\n<strong>Dining Options:</strong>\n';
            response += '<strong>Kitchenettes:</strong>\n';
            knowledgeBase.hostel.dining.kitchenettes.forEach(kitchen => {
                response += `• ${kitchen}\n`;
            });
            response += '\n<strong>Cafeterias:</strong>\n';
            knowledgeBase.hostel.dining.cafeterias.forEach(cafe => {
                response += `• ${cafe}\n`;
            });
            response += '\n<strong>Contact:</strong>\n';
            response += `Phone: ${knowledgeBase.hostel.contact.phone}\n`;
            response += `Registration: ${knowledgeBase.hostel.contact.email_registration}\n`;
            response += `Support: ${knowledgeBase.hostel.contact.email_support}\n`;
            response += `Address: ${knowledgeBase.hostel.contact.address}`;
            return response;
        }
        
        // Admissions
        if (message.includes('admission') || message.includes('admit') || message.includes('apply') || message.includes('dsat') || message.includes('comed-k')) {
            let response = '📝 <strong>DSU Admissions Information</strong>\n\n';
            response += '<strong>Admission Methods:</strong>\n';
            knowledgeBase.admissions.methods.forEach(method => {
                response += `• ${method}\n`;
            });
            response += '\n<strong>Contact Information:</strong>\n';
            response += `Main Helpline: ${knowledgeBase.admissions.contact.phone_main} / ${knowledgeBase.admissions.contact.phone_helpline}\n`;
            response += `Email: ${knowledgeBase.admissions.contact.email}\n`;
            response += `NRI/Foreign: ${knowledgeBase.admissions.contact.nri_phone}\n\n`;
            response += '<strong>Campus Locations:</strong>\n';
            response += `Main Campus: ${knowledgeBase.admissions.campuses.main.location}\n`;
            response += `City Innovation Campus: ${knowledgeBase.admissions.campuses.city_innovation.location}\n`;
            response += `City Admissions Office: ${knowledgeBase.admissions.campuses.city_admissions.location}`;
            return response;
        }
        
        // Facilities
        if (message.includes('facilit') || message.includes('infrastructure') || message.includes('lab') || message.includes('innovation')) {
            let response = '🏢 <strong>DSU Facilities & Infrastructure</strong>\n\n';
            response += '<strong>Innovation Labs (9 Industry Partnerships):</strong>\n';
            knowledgeBase.facilities.innovation_labs.forEach(lab => {
                response += `• ${lab}\n`;
            });
            response += '\n<strong>Infrastructure:</strong>\n';
            knowledgeBase.facilities.infrastructure.forEach(infra => {
                response += `• ${infra}\n`;
            });
            response += '\nOur innovation labs span over 25,000 sq.ft with industry-quality facilities.';
            return response;
        }
        
        // Library
        if (message.includes('library') || message.includes('book') || message.includes('resource')) {
            let response = '📚 <strong>DSU Library</strong>\n\n';
            response += `Seating Capacity: ${knowledgeBase.library.capacity}\n\n`;
            response += '<strong>Resources Available:</strong>\n';
            knowledgeBase.library.resources.forEach(resource => {
                response += `• ${resource}\n`;
            });
            response += `\n${knowledgeBase.library.access}`;
            return response;
        }
        
        // Placements
        if (message.includes('placement') || message.includes('job') || message.includes('career') || message.includes('recruiter')) {
            let response = '💼 <strong>Training and Placement Cell</strong>\n\n';
            response += `<strong>Organizations:</strong> ${knowledgeBase.placements.organizations} visit our campus\n\n`;
            response += `<strong>Programs Covered:</strong> ${knowledgeBase.placements.programs}\n\n`;
            response += `<strong>Focus:</strong> ${knowledgeBase.placements.focus}\n\n`;
            response += `<strong>Mission:</strong> ${knowledgeBase.placements.mission}`;
            return response;
        }
        
        // Research
        if (message.includes('research') || message.includes('phd') || message.includes('ph.d')) {
            let response = '🔬 <strong>Research at DSU</strong>\n\n';
            response += '<strong>Ph.D Programs Available:</strong>\n';
            knowledgeBase.research.phd_programs.forEach(program => {
                response += `• ${program}\n`;
            });
            response += `\n<strong>Research Cell Contact:</strong>\n`;
            response += `Phone: ${knowledgeBase.research.contact.phone}\n`;
            response += `Email: ${knowledgeBase.research.contact.email}`;
            return response;
        }
        
        // Contact
        if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address')) {
            let response = '📞 <strong>Contact Information</strong>\n\n';
            response += '<strong>Admissions:</strong>\n';
            response += `Phone: ${knowledgeBase.admissions.contact.phone_main} / ${knowledgeBase.admissions.contact.phone_helpline}\n`;
            response += `Email: ${knowledgeBase.admissions.contact.email}\n\n`;
            response += '<strong>Main Campus:</strong>\n';
            response += `${knowledgeBase.admissions.campuses.main.location}\n`;
            response += `Email: ${knowledgeBase.admissions.campuses.main.email}\n\n`;
            response += '<strong>City Innovation Campus:</strong>\n';
            response += `${knowledgeBase.admissions.campuses.city_innovation.location}\n`;
            response += `Phone: ${knowledgeBase.admissions.campuses.city_innovation.phone}\n`;
            response += `Email: ${knowledgeBase.admissions.campuses.city_innovation.email}`;
            return response;
        }
        
        // Fee
        if (message.includes('fee') || message.includes('cost') || message.includes('price') || message.includes('tuition')) {
            return '💰 <strong>Fee Structure</strong>\n\nFee structure varies by program. For detailed fee information:\n• Visit our Admissions section\n• Contact admissions office at 080 46461800\n• Email: admissions@dsu.edu.in\n\nFee details are also available for:\n• Hostel accommodation\n• Mess facilities\n• Various programs (B.Tech, M.Tech, MBA, etc.)';
        }
        
        // Courses (General)
        if (message.includes('course') || message.includes('program')) {
            return '🎓 <strong>Programs at DSU</strong>\n\n<strong>Engineering:</strong> B.Tech (11+ programs), M.Tech (3 programs)\n<strong>Computer Applications:</strong> BCA, MCA\n<strong>Management:</strong> BBA, MBA\n<strong>Law:</strong> BA LLB, BBA LLB, LLB, LLM\n<strong>Sciences:</strong> B.Sc, M.Sc (Biological Sciences, Data Science)\n<strong>Health Sciences:</strong> B.Pharm, M.Pharm, B.Sc Nursing, M.Sc Nursing, BPT, MPT\n<strong>Design:</strong> B.Design\n<strong>Commerce:</strong> B.Com, M.Com\n\nFor specific program details, ask about "engineering courses", "law programs", etc.';
        }
        
        // Greetings
        if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
            return '👋 Hello! I\'m DSU AI Assistant, your intelligent guide to Dayananda Sagar University. I can help you with detailed information about:\n\n• Engineering courses and programs\n• Hostel facilities and accommodation\n• Admissions process and requirements\n• Campus facilities and infrastructure\n• Library resources\n• Placement opportunities\n• Research programs\n• Contact information\n\nWhat would you like to know?';
        }
        
        // Default response
        return 'Thank you for your question! I can provide detailed information about:\n\n• Engineering courses (B.Tech, M.Tech programs)\n• Hostel facilities (S\' Residences with 38+ amenities)\n• Admissions (DSAT, Comed-K, CET, Direct)\n• Campus facilities and innovation labs\n• Library resources\n• Placement opportunities\n• Research programs\n\nPlease ask a specific question, for example: "engineering courses", "hostel facilities", "admissions process", etc.';
    }

    // Initialize floating chatbot widget
    function initFloatingChatbot() {
        chatbotWidget = document.getElementById('chatbotWidget');
        chatbotToggle = document.getElementById('chatbotToggle');
        chatbotClose = document.getElementById('chatbotClose');
        chatbotMinimize = document.getElementById('chatbotMinimize');
        chatbotContainer = document.getElementById('chatbotContainer');
        chatbotBody = document.getElementById('chatbotBody');
        chatbotMessages = document.getElementById('chatbotMessages');
        chatbotInput = document.getElementById('chatbotInput');
        chatbotSendBtn = document.getElementById('chatbotSendBtn');
        chatbotMicBtn = document.getElementById('chatbotMicBtn');
        quickActionBtns = document.querySelectorAll('.quick-action-btn');

        if (!chatbotWidget) {
            console.warn('Chatbot widget not found');
            return;
        }

        // Toggle chatbot
        if (chatbotToggle) {
            chatbotToggle.addEventListener('click', function() {
                chatbotWidget.classList.toggle('active');
                if (chatbotWidget.classList.contains('active') && chatbotInput) {
                    chatbotInput.focus();
                }
            });
        }

        // Close chatbot
        if (chatbotClose) {
            chatbotClose.addEventListener('click', function() {
                chatbotWidget.classList.remove('active');
                chatbotWidget.classList.remove('minimized');
            });
        }

        // Minimize chatbot
        if (chatbotMinimize) {
            chatbotMinimize.addEventListener('click', function() {
                chatbotWidget.classList.toggle('minimized');
            });
        }

        // Send message
        function sendMessage() {
            if (!chatbotInput) return;
            const message = chatbotInput.value.trim();
            if (message) {
                handleUserMessage(message);
                chatbotInput.value = '';
            }
        }

        if (chatbotSendBtn) {
            chatbotSendBtn.addEventListener('click', sendMessage);
        }

        if (chatbotInput) {
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        // Voice input
        if (chatbotMicBtn) {
            chatbotMicBtn.addEventListener('click', async function() {
                console.log('Mic button clicked (widget), isRecording:', isRecording);
                if (isRecording && recognition) {
                    // Stop recording
                    try {
                        console.log('Stopping recognition...');
                        recognition.stop();
                        recognition = null;
                    } catch (e) {
                        console.error('Error stopping recognition:', e);
                    }
                    chatbotMicBtn.classList.remove('recording');
                    isRecording = false;
                    addBotMessage('Recording stopped.');
                } else {
                    // Start recording
                    console.log('Starting voice recognition (widget)...');
                    await startVoiceRecognition('widget');
                }
            });
        }

        // Quick actions
        if (quickActionBtns && quickActionBtns.length > 0) {
            quickActionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.dataset.action;
                    handleQuickAction(action);
                });
            });
        }

        // Handle user message
        function handleUserMessage(message) {
            addUserMessage(message);
            
            setTimeout(() => {
                const response = generateBotResponse(message);
                addBotMessage(response);
            }, 500);
        }

        // Handle quick actions
        function handleQuickAction(action) {
            let message = '';
            switch(action) {
                case 'admissions':
                    message = 'Tell me about admissions';
                    break;
                case 'courses':
                    message = 'What courses are available?';
                    break;
                case 'facilities':
                    message = 'What facilities are available?';
                    break;
                case 'contact':
                    message = 'How can I contact the university?';
                    break;
            }
            if (message && chatbotInput) {
                chatbotInput.value = message;
                handleUserMessage(message);
            }
        }

        // Add user message
        function addUserMessage(message) {
            if (!chatbotMessages) return;
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chatbot-message user-message';
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <p>${escapeHtml(message)}</p>
                </div>
            `;
            chatbotMessages.appendChild(messageDiv);
            scrollToBottom();
        }

        // Add bot message with audio
        function addBotMessage(message) {
            if (!chatbotMessages) return;
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chatbot-message bot-message';
            
            // Convert newlines and format text for display
            const formattedMessage = formatMessageForDisplay(message);
            
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="chatbot-3d-face-tiny">
                        <div class="face-container-tiny">
                            <div class="face-sphere-tiny">
                                <div class="face-eyes-tiny">
                                    <div class="face-eye-tiny left-eye-tiny">
                                        <div class="eye-pupil-tiny"></div>
                                    </div>
                                    <div class="face-eye-tiny right-eye-tiny">
                                        <div class="eye-pupil-tiny"></div>
                                    </div>
                                </div>
                                <div class="face-mouth-tiny">
                                    <div class="mouth-inner-tiny"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message-content">
                    ${formattedMessage}
                </div>
            `;
            chatbotMessages.appendChild(messageDiv);
            scrollToBottom();
            
            // Speak the message with text-to-speech (remove HTML tags for speech)
            const textForSpeech = message.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
            speakMessage(textForSpeech);
        }

        // Format message for display (allows safe HTML)
        function formatMessageForDisplay(text) {
            // Convert newlines to <br>
            let formatted = text.replace(/\n/g, '<br>');
            // Wrap in paragraph if not already HTML
            if (!formatted.includes('<strong>') && !formatted.includes('<ul>')) {
                formatted = `<p>${formatted}</p>`;
            }
            return formatted;
        }

        // Text-to-Speech Function
        let currentUtterance = null;
        
        function speakMessage(text) {
            if ('speechSynthesis' in window) {
                // Stop any ongoing speech
                window.speechSynthesis.cancel();
                
                // Show stop button
                const stopBtn = document.getElementById('chatbotStopBtn');
                if (stopBtn) stopBtn.style.display = 'flex';
                
                // Animate 3D face while speaking
                const toggleFace = document.getElementById('chatbot3DFace');
                const headerFace = document.getElementById('chatbot3DFaceSmall');
                const avatar = document.querySelector('.chatbot-avatar');
                
                if (toggleFace) toggleFace.classList.add('speaking');
                if (headerFace && avatar) avatar.classList.add('speaking');
                
                currentUtterance = new SpeechSynthesisUtterance(text);
                currentUtterance.lang = 'en-US';
                currentUtterance.rate = 0.9;
                currentUtterance.pitch = 1;
                currentUtterance.volume = 0.8;
                
                currentUtterance.onstart = function() {
                    console.log('Speech started');
                };
                
                currentUtterance.onend = function() {
                    console.log('Speech ended');
                    // Stop animation when speech ends
                    if (toggleFace) toggleFace.classList.remove('speaking');
                    if (headerFace && avatar) avatar.classList.remove('speaking');
                    if (stopBtn) stopBtn.style.display = 'none';
                    currentUtterance = null;
                };
                
                currentUtterance.onerror = function(event) {
                    console.error('Speech error:', event);
                    if (toggleFace) toggleFace.classList.remove('speaking');
                    if (headerFace && avatar) avatar.classList.remove('speaking');
                    if (stopBtn) stopBtn.style.display = 'none';
                    currentUtterance = null;
                };
                
                window.speechSynthesis.speak(currentUtterance);
            } else {
                console.warn('Text-to-speech not supported in this browser');
            }
        }

        // Stop speech function
        function stopSpeech() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const toggleFace = document.getElementById('chatbot3DFace');
                const headerFace = document.getElementById('chatbot3DFaceSmall');
                const avatar = document.querySelector('.chatbot-avatar');
                const stopBtn = document.getElementById('chatbotStopBtn');
                
                if (toggleFace) toggleFace.classList.remove('speaking');
                if (headerFace && avatar) avatar.classList.remove('speaking');
                if (stopBtn) stopBtn.style.display = 'none';
                currentUtterance = null;
            }
        }

        // Stop speech button
        const chatbotStopBtn = document.getElementById('chatbotStopBtn');
        if (chatbotStopBtn) {
            chatbotStopBtn.addEventListener('click', stopSpeech);
        }

        // Scroll to bottom
        function scrollToBottom() {
            if (chatbotMessages) {
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        }

        // Speak initial welcome message
        setTimeout(() => {
            const welcomeMsg = "Hello! I'm DSU AI Assistant. I have comprehensive information about engineering courses, hostel facilities, admissions, and all aspects of Dayananda Sagar University. Just ask me anything!";
            speakMessage(welcomeMsg);
        }, 500);

        console.log('Floating Chatbot Widget initialized');
    }

    // Initialize chatbot on page load (for main section - but we removed it)
    function initChatbot() {
        // This function is kept for compatibility but the main section was removed
        console.log('Chatbot initialization skipped - using floating widget only');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initChatbot();
            initFloatingChatbot();
        });
    } else {
        // DOM already loaded
        setTimeout(function() {
            initChatbot();
            initFloatingChatbot();
        }, 100);
    }
})();

console.log('DSU Website Clone - Script loaded successfully!');

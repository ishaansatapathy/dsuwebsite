// ERP System JavaScript

// Theme Toggle for ERP Pages
const erpThemeToggle = document.getElementById('themeToggle');
const erpThemeIcon = document.getElementById('themeIcon');
const erpBody = document.body;

if (erpThemeToggle && erpThemeIcon) {
    // Get saved theme from localStorage or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply saved theme on page load
    if (currentTheme === 'light') {
        erpBody.setAttribute('data-theme', 'light');
        if (erpThemeIcon) {
            erpThemeIcon.classList.remove('fa-moon');
            erpThemeIcon.classList.add('fa-sun');
        }
    } else {
        erpBody.setAttribute('data-theme', 'dark');
        if (erpThemeIcon) {
            erpThemeIcon.classList.remove('fa-sun');
            erpThemeIcon.classList.add('fa-moon');
        }
    }

    // Toggle theme function
    function toggleERPTheme() {
        const currentTheme = erpBody.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            erpBody.setAttribute('data-theme', 'light');
            erpThemeIcon.classList.remove('fa-moon');
            erpThemeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            erpBody.setAttribute('data-theme', 'dark');
            erpThemeIcon.classList.remove('fa-sun');
            erpThemeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Add click event listener to theme toggle button
    erpThemeToggle.addEventListener('click', toggleERPTheme);
}

// ERP Login Page Functionality
const erpLoginForm = document.getElementById('erpLoginForm');
const passwordToggle = document.getElementById('passwordToggle');

if (passwordToggle) {
    passwordToggle.addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const icon = passwordToggle.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
}

if (erpLoginForm) {
    erpLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const submitBtn = erpLoginForm.querySelector('.erp-login-btn');
        const originalBtnContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        
        try {
            // API endpoint
            const API_URL = 'http://localhost:5000/api/login';
            
            // Send login request to backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Login successful
                console.log('Login successful:', data);
                
                // Store login state
                localStorage.setItem('erpLoggedIn', 'true');
                localStorage.setItem('erpUsername', data.user.fullName || username);
                localStorage.setItem('erpUserEmail', data.user.email);
                localStorage.setItem('erpUserId', data.user.id);
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                
                // Redirect to dashboard after short delay
                setTimeout(() => {
                    window.location.href = 'erp-dashboard.html';
                }, 500);
            } else {
                // Login failed
                console.warn('Login failed:', data.message);
                alert(data.message || 'Invalid credentials! Please check your username and password.');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        } catch (error) {
            // Network error or server unavailable
            console.error('Login error:', error);
            
            // Fallback: Check for demo credentials if server is unavailable
            if (username === 'student123' && password === 'demo123') {
                localStorage.setItem('erpLoggedIn', 'true');
                localStorage.setItem('erpUsername', username);
                window.location.href = 'erp-dashboard.html';
            } else {
                alert('Unable to connect to server. Please check your connection or try again later.\n\nFor demo access, use:\nUsername: student123\nPassword: demo123');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        }
    });
}

// ERP Dashboard Functionality
const erpNavItems = document.querySelectorAll('.erp-nav-item');
const erpSections = document.querySelectorAll('.erp-section');
const currentSectionTitle = document.getElementById('currentSectionTitle');

// Navigation functionality
erpNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items
        erpNavItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Get section to show
        const sectionId = item.getAttribute('data-section');
        const targetSection = document.getElementById(`${sectionId}-section`);
        
        // Hide all sections
        erpSections.forEach(section => section.classList.remove('active'));
        
        // Show target section
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update section title
        if (currentSectionTitle) {
            const titles = {
                'dashboard': 'Dashboard',
                'marks': 'Marks & Grades',
                'attendance': 'Attendance',
                'courses': 'My Courses',
                'assignments': 'Assignments',
                'exams': 'Exams',
                'fees': 'Fee Payment',
                'library': 'Library',
                'profile': 'Profile'
            };
            currentSectionTitle.textContent = titles[sectionId] || 'Dashboard';
        }
    });
});

// Check if user is logged in
if (window.location.pathname.includes('erp-dashboard.html')) {
    const isLoggedIn = localStorage.getItem('erpLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'erp-login.html';
    } else {
        // Set student name from localStorage
        const username = localStorage.getItem('erpUsername');
        const studentName = document.getElementById('studentName');
        if (studentName && username) {
            // Use the stored username (full name from registration)
            studentName.textContent = username;
        }
    }
}

// Assignment filter tabs
const assignmentTabs = document.querySelectorAll('.erp-tab-btn');
const assignmentItems = document.querySelectorAll('.erp-assignment-item');

if (assignmentTabs.length > 0) {
    assignmentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            assignmentTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get filter value
            const filter = tab.getAttribute('data-filter');
            
            // Filter assignments
            assignmentItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'flex';
                } else if (filter === 'pending' && item.classList.contains('pending')) {
                    item.style.display = 'flex';
                } else if (filter === 'submitted' && item.classList.contains('submitted')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Notification button
const notificationBtn = document.getElementById('notificationBtn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        showNotificationsModal();
    });
}

// Show notifications modal
function showNotificationsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close">&times;</button>
            <h2>Notifications</h2>
            <div class="erp-notifications-list" style="max-height: 400px; overflow-y: auto;">
                <div class="erp-notification-item" style="padding: 16px; border-bottom: 1px solid var(--gray-dark);">
                    <div style="display: flex; align-items: start; gap: 12px;">
                        <i class="fas fa-file-alt" style="color: var(--primary-orange); font-size: 20px;"></i>
                        <div>
                            <p style="margin: 0 0 4px 0; font-weight: 600; color: var(--white);">New Assignment Posted</p>
                            <p style="margin: 0; font-size: 13px; color: var(--gray-light);">Database Management - Assignment 3</p>
                            <span style="font-size: 12px; color: var(--gray-light);">2 hours ago</span>
                        </div>
                    </div>
                </div>
                <div class="erp-notification-item" style="padding: 16px; border-bottom: 1px solid var(--gray-dark);">
                    <div style="display: flex; align-items: start; gap: 12px;">
                        <i class="fas fa-calendar" style="color: var(--primary-orange); font-size: 20px;"></i>
                        <div>
                            <p style="margin: 0 0 4px 0; font-weight: 600; color: var(--white);">Exam Schedule Updated</p>
                            <p style="margin: 0; font-size: 13px; color: var(--gray-light);">Mid Semester Exams - Dec 15</p>
                            <span style="font-size: 12px; color: var(--gray-light);">1 day ago</span>
                        </div>
                    </div>
                </div>
                <div class="erp-notification-item" style="padding: 16px; border-bottom: 1px solid var(--gray-dark);">
                    <div style="display: flex; align-items: start; gap: 12px;">
                        <i class="fas fa-money-bill-wave" style="color: var(--primary-orange); font-size: 20px;"></i>
                        <div>
                            <p style="margin: 0 0 4px 0; font-weight: 600; color: var(--white);">Fee Payment Reminder</p>
                            <p style="margin: 0; font-size: 13px; color: var(--gray-light);">Tuition Fee due on Dec 30, 2024</p>
                            <span style="font-size: 12px; color: var(--gray-light);">2 days ago</span>
                        </div>
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

// Logout functionality
const logoutBtn = document.querySelector('.erp-logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('erpLoggedIn');
            localStorage.removeItem('erpUsername');
            window.location.href = 'erp-login.html';
        }
    });
}

// Update ERP login modal to redirect to ERP page
function showERPLoginModal() {
    // Instead of showing modal, redirect to ERP login page
    window.location.href = 'erp-login.html';
}

// Make function available globally
window.showERPLoginModal = showERPLoginModal;

// Assignment Submit Functionality
document.querySelectorAll('.erp-assignment-item .erp-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const assignmentItem = e.target.closest('.erp-assignment-item');
        const assignmentTitle = assignmentItem.querySelector('h4').textContent;
        
        if (btn.textContent === 'Submit') {
            showAssignmentSubmitModal(assignmentTitle);
        } else if (btn.textContent === 'View') {
            showAssignmentViewModal(assignmentTitle);
        }
    });
});

function showAssignmentSubmitModal(assignmentTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <button class="modal-close">&times;</button>
            <h2>Submit Assignment</h2>
            <p style="margin-bottom: 24px;">${assignmentTitle}</p>
            <form onsubmit="handleAssignmentSubmit(event, '${assignmentTitle}')">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--white);">Upload File</label>
                    <input type="file" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; background: var(--gray-dark); color: var(--white);">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--white);">Comments (Optional)</label>
                    <textarea rows="4" style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; background: var(--gray-dark); color: var(--white); resize: vertical;"></textarea>
                </div>
                <button type="submit" class="erp-action-btn" style="width: 100%;">Submit Assignment</button>
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

function handleAssignmentSubmit(event, assignmentTitle) {
    event.preventDefault();
    alert(`Assignment "${assignmentTitle}" submitted successfully!`);
    
    // Update the assignment status
    const assignmentItems = document.querySelectorAll('.erp-assignment-item');
    assignmentItems.forEach(item => {
        const title = item.querySelector('h4').textContent;
        if (title === assignmentTitle) {
            item.classList.remove('pending');
            item.classList.add('submitted');
            const statusBadge = item.querySelector('.erp-status-badge');
            statusBadge.textContent = 'Submitted';
            statusBadge.classList.remove('warning');
            statusBadge.classList.add('success');
            const btn = item.querySelector('.erp-action-btn');
            btn.textContent = 'View';
        }
    });
    
    // Close modal
    const modal = event.target.closest('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function showAssignmentViewModal(assignmentTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <button class="modal-close">&times;</button>
            <h2>Assignment Details</h2>
            <div style="margin-top: 24px;">
                <p><strong>Assignment:</strong> ${assignmentTitle}</p>
                <p><strong>Status:</strong> <span style="color: #10B981;">Submitted</span></p>
                <p><strong>Submitted On:</strong> Dec 10, 2024</p>
                <p><strong>File:</strong> assignment_file.pdf</p>
                <p style="margin-top: 16px;"><strong>Grade:</strong> <span style="color: var(--primary-orange);">Pending</span></p>
            </div>
            <button class="erp-action-btn" style="width: 100%; margin-top: 24px;" onclick="this.closest('.modal-overlay').remove()">Close</button>
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

// Fee Payment Functionality
document.querySelectorAll('.erp-pay-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const feeItem = e.target.closest('.erp-fee-item');
        const feeTitle = feeItem.querySelector('h4').textContent;
        const feeAmount = feeItem.querySelector('.erp-amount').textContent;
        showPaymentModal(feeTitle, feeAmount);
    });
});

function showPaymentModal(feeTitle, feeAmount) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close">&times;</button>
            <h2>Fee Payment</h2>
            <div style="margin: 24px 0;">
                <p><strong>Fee Type:</strong> ${feeTitle}</p>
                <p><strong>Amount:</strong> ${feeAmount}</p>
            </div>
            <form onsubmit="handlePaymentSubmit(event, '${feeTitle}', '${feeAmount}')">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--white);">Payment Method</label>
                    <select required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; background: var(--gray-dark); color: var(--white);">
                        <option value="">Select Payment Method</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="netbanking">Net Banking</option>
                        <option value="upi">UPI</option>
                        <option value="wallet">Wallet</option>
                    </select>
                </div>
                <button type="submit" class="erp-action-btn" style="width: 100%;">Proceed to Pay</button>
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

function handlePaymentSubmit(event, feeTitle, feeAmount) {
    event.preventDefault();
    const paymentMethod = event.target.querySelector('select').value;
    
    // Simulate payment processing
    alert(`Payment of ${feeAmount} for ${feeTitle} via ${paymentMethod} is being processed...\n\nIn a real system, this would redirect to payment gateway.`);
    
    // Update fee status
    const feeItems = document.querySelectorAll('.erp-fee-item');
    feeItems.forEach(item => {
        const title = item.querySelector('h4').textContent;
        if (title === feeTitle) {
            const statusBadge = item.querySelector('.erp-status-badge');
            statusBadge.textContent = 'Paid';
            statusBadge.classList.remove('warning');
            statusBadge.classList.add('success');
            const payBtn = item.querySelector('.erp-pay-btn');
            if (payBtn) {
                payBtn.style.display = 'none';
            }
            const feeDetails = item.querySelector('.erp-fee-details p');
            feeDetails.textContent = `Paid on: ${new Date().toLocaleDateString()}`;
        }
    });
    
    // Close modal
    const modal = event.target.closest('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Library Book Renew Functionality
document.querySelectorAll('.erp-book-item .erp-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const bookItem = e.target.closest('.erp-book-item');
        const bookTitle = bookItem.querySelector('h5').textContent;
        renewBook(bookTitle, bookItem);
    });
});

function renewBook(bookTitle, bookItem) {
    if (confirm(`Do you want to renew "${bookTitle}"?`)) {
        // Calculate new due date (30 days from now)
        const newDueDate = new Date();
        newDueDate.setDate(newDueDate.getDate() + 30);
        
        // Update the due date in the UI
        const dueDateSpan = bookItem.querySelector('.erp-book-details span');
        const currentText = dueDateSpan.textContent;
        const newText = currentText.replace(/Due: [^|]+/, `Due: ${newDueDate.toLocaleDateString()}`);
        dueDateSpan.textContent = newText;
        
        alert(`Book "${bookTitle}" renewed successfully!\nNew due date: ${newDueDate.toLocaleDateString()}`);
    }
}

// Profile Edit Functionality
const editProfileBtn = document.querySelector('#profile-section .erp-action-btn');
if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        showEditProfileModal();
    });
}

function showEditProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <button class="modal-close">&times;</button>
            <h2>Edit Profile</h2>
            <form onsubmit="handleProfileUpdate(event)">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--white);">Phone Number</label>
                    <input type="tel" value="+91 98765 43210" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; background: var(--gray-dark); color: var(--white);">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--white);">Address</label>
                    <textarea rows="3" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; background: var(--gray-dark); color: var(--white); resize: vertical;">123 Main Street, Bangalore, Karnataka</textarea>
                </div>
                <div style="margin-bottom: 24px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--white);">Emergency Contact</label>
                    <input type="text" value="+91 98765 43211" required style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; background: var(--gray-dark); color: var(--white);">
                </div>
                <button type="submit" class="erp-action-btn" style="width: 100%;">Update Profile</button>
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

function handleProfileUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    alert('Profile updated successfully!');
    
    // Update profile display
    const phoneInput = event.target.querySelector('input[type="tel"]');
    const addressTextarea = event.target.querySelector('textarea');
    
    const profileRows = document.querySelectorAll('.erp-profile-row');
    profileRows.forEach(row => {
        const label = row.querySelector('.erp-profile-label').textContent;
        if (label === 'Phone') {
            row.querySelector('.erp-profile-value').textContent = phoneInput.value;
        } else if (label === 'Address') {
            row.querySelector('.erp-profile-value').textContent = addressTextarea.value;
        }
    });
    
    // Close modal
    const modal = event.target.closest('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Semester Select Functionality
const semesterSelect = document.querySelector('.erp-semester-select');
if (semesterSelect) {
    semesterSelect.addEventListener('change', (e) => {
        const selectedSemester = e.target.value;
        updateMarksTable(selectedSemester);
    });
}

function updateMarksTable(semester) {
    // Demo data for different semesters
    const semesterData = {
        'Semester 1': [
            { code: 'CS101', name: 'Programming Fundamentals', credits: 4, internal: 42, external: 48, total: 90, grade: 'A' },
            { code: 'CS102', name: 'Mathematics I', credits: 3, internal: 40, external: 45, total: 85, grade: 'A' },
            { code: 'CS103', name: 'Physics', credits: 3, internal: 38, external: 42, total: 80, grade: 'B' }
        ],
        'Semester 2': [
            { code: 'CS201', name: 'Data Structures', credits: 4, internal: 44, external: 50, total: 94, grade: 'A' },
            { code: 'CS202', name: 'Mathematics II', credits: 3, internal: 41, external: 47, total: 88, grade: 'A' },
            { code: 'CS203', name: 'Digital Electronics', credits: 3, internal: 39, external: 44, total: 83, grade: 'B' }
        ],
        'Semester 3': [
            { code: 'CS301', name: 'Data Structures', credits: 4, internal: 45, external: 52, total: 97, grade: 'A' },
            { code: 'CS302', name: 'Database Management', credits: 4, internal: 42, external: 48, total: 90, grade: 'A' },
            { code: 'CS303', name: 'Computer Networks', credits: 3, internal: 38, external: 45, total: 83, grade: 'B' },
            { code: 'CS304', name: 'Software Engineering', credits: 3, internal: 40, external: 50, total: 90, grade: 'A' },
            { code: 'CS305', name: 'Web Development', credits: 3, internal: 44, external: 51, total: 95, grade: 'A' }
        ]
    };
    
    const data = semesterData[semester] || semesterData['Semester 3'];
    const tbody = document.querySelector('.erp-marks-table tbody');
    
    if (tbody) {
        tbody.innerHTML = data.map(subject => `
            <tr>
                <td>${subject.code}</td>
                <td>${subject.name}</td>
                <td>${subject.credits}</td>
                <td>${subject.internal}</td>
                <td>${subject.external}</td>
                <td>${subject.total}</td>
                <td><span class="erp-grade ${subject.grade}">${subject.grade}</span></td>
                <td><span class="erp-status passed">Pass</span></td>
            </tr>
        `).join('');
        
        // Update total credits and CGPA
        const totalCredits = data.reduce((sum, s) => sum + s.credits, 0);
        const tfoot = document.querySelector('.erp-marks-table tfoot');
        if (tfoot) {
            tfoot.innerHTML = `
                <tr>
                    <td colspan="2"><strong>Total Credits: ${totalCredits}</strong></td>
                    <td colspan="6"><strong>CGPA: 9.33</strong></td>
                </tr>
            `;
        }
    }
}

// Browse Books Functionality
const browseBooksBtn = document.querySelector('#library-section .erp-action-btn');
if (browseBooksBtn) {
    browseBooksBtn.addEventListener('click', () => {
        // Redirect to DSU library page
        window.open('https://dsu.edu.in/library', '_blank');
    });
}

function showBrowseBooksModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px; max-height: 80vh; overflow-y: auto;">
            <button class="modal-close">&times;</button>
            <h2>Browse Library Books</h2>
            <div style="margin-top: 24px;">
                <div style="margin-bottom: 16px;">
                    <input type="text" placeholder="Search books..." style="width: 100%; padding: 12px; border: 1px solid var(--gray-medium); border-radius: 8px; background: var(--gray-dark); color: var(--white);">
                </div>
                <div class="erp-books-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
                    <div class="erp-book-card" style="padding: 16px; background: var(--gray-dark); border-radius: 10px; cursor: pointer; transition: all 0.3s ease;" onclick="issueBook('Introduction to Algorithms', this)">
                        <div style="text-align: center; margin-bottom: 12px;">
                            <i class="fas fa-book" style="font-size: 32px; color: var(--primary-orange);"></i>
                        </div>
                        <h5 style="margin: 0 0 8px 0; color: var(--white); font-size: 14px;">Introduction to Algorithms</h5>
                        <p style="margin: 0; font-size: 12px; color: var(--gray-light);">Thomas H. Cormen</p>
                        <span class="erp-status-badge success" style="margin-top: 8px; display: inline-block;">Available</span>
                    </div>
                    <div class="erp-book-card" style="padding: 16px; background: var(--gray-dark); border-radius: 10px; cursor: pointer; transition: all 0.3s ease;" onclick="issueBook('Database System Concepts', this)">
                        <div style="text-align: center; margin-bottom: 12px;">
                            <i class="fas fa-book" style="font-size: 32px; color: var(--primary-orange);"></i>
                        </div>
                        <h5 style="margin: 0 0 8px 0; color: var(--white); font-size: 14px;">Database System Concepts</h5>
                        <p style="margin: 0; font-size: 12px; color: var(--gray-light);">Abraham Silberschatz</p>
                        <span class="erp-status-badge success" style="margin-top: 8px; display: inline-block;">Available</span>
                    </div>
                    <div class="erp-book-card" style="padding: 16px; background: var(--gray-dark); border-radius: 10px; cursor: pointer; transition: all 0.3s ease;" onclick="issueBook('Computer Networks', this)">
                        <div style="text-align: center; margin-bottom: 12px;">
                            <i class="fas fa-book" style="font-size: 32px; color: var(--primary-orange);"></i>
                        </div>
                        <h5 style="margin: 0 0 8px 0; color: var(--white); font-size: 14px;">Computer Networks</h5>
                        <p style="margin: 0; font-size: 12px; color: var(--gray-light);">Andrew S. Tanenbaum</p>
                        <span class="erp-status-badge success" style="margin-top: 8px; display: inline-block;">Available</span>
                    </div>
                    <div class="erp-book-card" style="padding: 16px; background: var(--gray-dark); border-radius: 10px; cursor: pointer; transition: all 0.3s ease;" onclick="issueBook('Software Engineering', this)">
                        <div style="text-align: center; margin-bottom: 12px;">
                            <i class="fas fa-book" style="font-size: 32px; color: var(--primary-orange);"></i>
                        </div>
                        <h5 style="margin: 0 0 8px 0; color: var(--white); font-size: 14px;">Software Engineering</h5>
                        <p style="margin: 0; font-size: 12px; color: var(--gray-light);">Ian Sommerville</p>
                        <span class="erp-status-badge success" style="margin-top: 8px; display: inline-block;">Available</span>
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

function issueBook(bookTitle, bookCard) {
    if (confirm(`Do you want to issue "${bookTitle}"?`)) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        
        // Add to issued books list
        const booksList = document.querySelector('.erp-books-list');
        if (booksList) {
            const newBookItem = document.createElement('div');
            newBookItem.className = 'erp-book-item';
            newBookItem.innerHTML = `
                <div class="erp-book-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="erp-book-details">
                    <h5>${bookTitle}</h5>
                    <p>By Author</p>
                    <span>Issued: ${new Date().toLocaleDateString()} | Due: ${dueDate.toLocaleDateString()}</span>
                </div>
                <button class="erp-action-btn">Renew</button>
            `;
            booksList.appendChild(newBookItem);
            
            // Add renew functionality to new book
            newBookItem.querySelector('.erp-action-btn').addEventListener('click', () => {
                renewBook(bookTitle, newBookItem);
            });
        }
        
        // Update book card status
        const statusBadge = bookCard.querySelector('.erp-status-badge');
        statusBadge.textContent = 'Issued';
        statusBadge.classList.remove('success');
        statusBadge.classList.add('warning');
        bookCard.style.opacity = '0.6';
        bookCard.style.pointerEvents = 'none';
        
        alert(`Book "${bookTitle}" issued successfully!\nDue date: ${dueDate.toLocaleDateString()}`);
    }
}

// Make functions available globally
window.handleAssignmentSubmit = handleAssignmentSubmit;
window.handlePaymentSubmit = handlePaymentSubmit;
window.handleProfileUpdate = handleProfileUpdate;
window.issueBook = issueBook;
window.renewBook = renewBook;

console.log('ERP System Script loaded successfully with full functionality!');


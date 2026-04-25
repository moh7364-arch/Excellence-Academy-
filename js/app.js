/* ═══════════════════════════════════════════
   AcademiaHub - Main Application Logic
   ═══════════════════════════════════════════ */

// ── Global State ──
const AppState = {
    currentPage: 'home',
    currentUser: null,
    isSidebarCollapsed: false,
    isMobileMenuOpen: false
};

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// ── Initialize Application ──
function initApp() {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        if (loader) loader.classList.add('hidden');
    }, 1000);
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }
    
    // Initialize components
    initSidebar();
    initNavigation();
    initTopbar();
    initModals();
    initNotifications();
    
    // Load dynamic content
    loadDashboardContent();
    loadOrders();
    loadExperts();
    loadLibrary();
    loadForum();
    loadConversations();
    
    // Initialize service forms
    if (typeof initAllServiceForms === 'function') {
        initAllServiceForms();
    }
    
    // Handle logout
    initLogout();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize();
}

// ═══════════════════════════════════════════
//  Authentication Check
// ═══════════════════════════════════════════
function checkAuth() {
    const userData = localStorage.getItem('academiahub_user');
    if (!userData) {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
        return;
    }
    try {
        AppState.currentUser = JSON.parse(userData);
        if (!AppState.currentUser.isLoggedIn) {
            window.location.href = 'index.html';
        }
    } catch(e) {
        window.location.href = 'index.html';
    }
}

// ═══════════════════════════════════════════
//  Load User Data
// ═══════════════════════════════════════════
function loadUserData() {
    const user = AppState.currentUser;
    if (!user) return;
    
    // Update sidebar profile
    const profileName = document.getElementById('profileName');
    const profileRole = document.getElementById('profileRole');
    const profileInitials = document.getElementById('profileInitials');
    const userGreeting = document.getElementById('userGreeting');
    
    if (profileName) profileName.textContent = user.fullName || user.name || 'مستخدم';
    if (profileRole) {
        const roleMap = {
            'bachelor': 'طالب بكالوريوس',
            'master': 'طالب ماجستير',
            'phd': 'طالب دكتوراه',
            'researcher': 'باحث'
        };
        profileRole.textContent = roleMap[user.academicLevel] || user.role || 'باحث';
    }
    if (profileInitials && user.fullName) {
        const parts = user.fullName.split(' ');
        profileInitials.textContent = parts.map(p => p[0]).join('').substring(0, 2);
    }
    if (userGreeting) {
        userGreeting.textContent = user.firstName || user.fullName?.split(' ')[0] || 'باحث';
    }
    
    // Update topbar avatar
    const userAvatarSm = document.getElementById('userAvatarSm');
    if (userAvatarSm && user.fullName) {
        const parts = user.fullName.split(' ');
        userAvatarSm.querySelector('span').textContent = parts.map(p => p[0]).join('').substring(0, 2);
    }
}

// ═══════════════════════════════════════════
//  Sidebar Management
// ═══════════════════════════════════════════
function initSidebar() {
    const collapseBtn = document.getElementById('sidebarCollapseBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const mobileToggle = document.getElementById('mobileToggle');
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            AppState.isSidebarCollapsed = !AppState.isSidebarCollapsed;
            if (sidebar) sidebar.classList.toggle('collapsed', AppState.isSidebarCollapsed);
            if (mainContent) mainContent.classList.toggle('expanded', AppState.isSidebarCollapsed);
            
            // Update icon
            const icon = collapseBtn.querySelector('i');
            if (icon) {
                icon.className = AppState.isSidebarCollapsed 
                    ? 'fa-solid fa-angles-left' 
                    : 'fa-solid fa-angles-right';
            }
        });
    }
    
    // Mobile toggle
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
            sidebar.classList.toggle('mobile-open', AppState.isMobileMenuOpen);
        });
    }
    
    // Close mobile sidebar on outside click
    document.addEventListener('click', (e) => {
        if (AppState.isMobileMenuOpen && 
            sidebar && 
            !sidebar.contains(e.target) && 
            e.target !== mobileToggle &&
            !mobileToggle?.contains(e.target)) {
            AppState.isMobileMenuOpen = false;
            sidebar.classList.remove('mobile-open');
        }
    });
}

// ═══════════════════════════════════════════
//  Navigation
// ═══════════════════════════════════════════
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page) navigateTo(page);
            
            // Close mobile sidebar
            if (AppState.isMobileMenuOpen) {
                AppState.isMobileMenuOpen = false;
                document.getElementById('sidebar')?.classList.remove('mobile-open');
            }
        });
    });
}

function navigateTo(page) {
    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) link.classList.add('active');
    });
    
    // Update page content
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');
    
    // Update breadcrumb
    const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
    if (breadcrumbCurrent) {
        const pageNames = {
            'home': 'لوحة التحكم',
            'service-thesis': 'الرسائل الجامعية',
            'service-publication': 'النشر العلمي',
            'service-translation': 'الترجمة الأكاديمية',
            'service-statistics': 'التحليل الإحصائي',
            'service-plagiarism': 'فحص الاقتباس',
            'service-graduation': 'مشاريع التخرج',
            'myOrders': 'طلباتي',
            'messages': 'المراسلات',
            'experts': 'خبراؤنا',
            'library': 'مكتبة النماذج',
            'forum': 'المجتمع الأكاديمي'
        };
        breadcrumbCurrent.textContent = pageNames[page] || page;
    }
    
    // Scroll to top
    const pageContainer = document.getElementById('pageContainer');
    if (pageContainer) pageContainer.scrollTop = 0;
    
    AppState.currentPage = page;
    
    // Refresh dynamic content if needed
    if (page === 'myOrders') loadOrders();
    if (page === 'experts') loadExperts();
    if (page === 'library') loadLibrary();
    if (page === 'forum') loadForum();
    if (page === 'messages') loadConversations();
}

// ═══════════════════════════════════════════
//  Topbar Functions
// ═══════════════════════════════════════════
function initTopbar() {
    // Search functionality
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // Search across services
                    const pages = ['service-thesis', 'service-publication', 'service-translation', 
                                  'service-statistics', 'service-plagiarism', 'service-graduation'];
                    const found = pages.find(page => {
                        const el = document.getElementById(`page-${page}`);
                        return el && el.textContent.includes(query);
                    });
                    if (found) navigateTo(found);
                }
            }
        });
    }
    
    // Notification bell
    const notifBell = document.getElementById('notificationBell');
    const notifDropdown = document.getElementById('notificationDropdown');
    if (notifBell && notifDropdown) {
        notifBell.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('show');
        });
        document.addEventListener('click', () => {
            notifDropdown.classList.remove('show');
        });
        notifDropdown.addEventListener('click', (e) => e.stopPropagation());
    }
}

// ═══════════════════════════════════════════
//  Modals
// ═══════════════════════════════════════════
function initModals() {
    const ratingModal = document.getElementById('ratingModalWrapper');
    const closeBtn = document.getElementById('closeRatingModal');
    
    if (closeBtn && ratingModal) {
        closeBtn.addEventListener('click', closeRatingModal);
        ratingModal.querySelector('.modal-backdrop')?.addEventListener('click', closeRatingModal);
    }
}

function openRatingModal(expertId) {
    const modal = document.getElementById('ratingModalWrapper');
    const body = document.getElementById('ratingModalBody');
    
    if (!modal || !body) return;
    
    const expert = expertsDatabase.find(e => e.id === expertId);
    if (!expert) return;
    
    body.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--primary-bg); 
                 display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
                 font-size: 2rem; color: var(--primary);">
                <i class="fa-solid fa-user-tie"></i>
            </div>
            <h4>${expert.name}</h4>
            <p style="color: var(--gray-500); font-size: 0.85rem;">${expert.specialization}</p>
        </div>
        <div class="rating-criteria-list">
            <div class="rating-criteria-item">
                <span>جودة العمل العلمي</span>
                <div class="star-rating-input" data-criteria="quality">
                    <i class="fa-regular fa-star" data-value="5"></i>
                    <i class="fa-regular fa-star" data-value="4"></i>
                    <i class="fa-regular fa-star" data-value="3"></i>
                    <i class="fa-regular fa-star" data-value="2"></i>
                    <i class="fa-regular fa-star" data-value="1"></i>
                </div>
            </div>
            <div class="rating-criteria-item">
                <span>الالتزام بالمواعيد</span>
                <div class="star-rating-input" data-criteria="deadline">
                    <i class="fa-regular fa-star" data-value="5"></i>
                    <i class="fa-regular fa-star" data-value="4"></i>
                    <i class="fa-regular fa-star" data-value="3"></i>
                    <i class="fa-regular fa-star" data-value="2"></i>
                    <i class="fa-regular fa-star" data-value="1"></i>
                </div>
            </div>
            <div class="rating-criteria-item">
                <span>التواصل والاستجابة</span>
                <div class="star-rating-input" data-criteria="communication">
                    <i class="fa-regular fa-star" data-value="5"></i>
                    <i class="fa-regular fa-star" data-value="4"></i>
                    <i class="fa-regular fa-star" data-value="3"></i>
                    <i class="fa-regular fa-star" data-value="2"></i>
                    <i class="fa-regular fa-star" data-value="1"></i>
                </div>
            </div>
        </div>
        <div class="field-group" style="margin-top: 16px;">
            <label>تعليقك (اختياري)</label>
            <textarea rows="3" placeholder="اكتب تجربتك مع الخبير..."></textarea>
        </div>
        <button class="submit-service-btn" style="margin-top: 14px;" onclick="submitRating(${expertId})">
            <i class="fa-solid fa-star"></i> تقديم التقييم
        </button>
    `;
    
    // Initialize star ratings
    body.querySelectorAll('.star-rating-input').forEach(input => {
        input.querySelectorAll('i').forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                const allStars = this.parentElement.querySelectorAll('i');
                allStars.forEach((s, idx) => {
                    const reversedValue = 5 - idx;
                    if (reversedValue >= value) {
                        s.className = 'fa-solid fa-star selected';
                    } else {
                        s.className = 'fa-regular fa-star';
                    }
                });
            });
        });
    });
    
    modal.classList.add('show');
}

function closeRatingModal() {
    const modal = document.getElementById('ratingModalWrapper');
    if (modal) modal.classList.remove('show');
}

function submitRating(expertId) {
    alert('✅ تم تقديم تقييمك بنجاح! شكراً لمساهمتك في تحسين جودة الخدمة.');
    closeRatingModal();
}

// ═══════════════════════════════════════════
//  Notifications Content
// ═══════════════════════════════════════════
function initNotifications() {
    const notifList = document.querySelector('.notif-list');
    if (!notifList) return;
    
    notifList.innerHTML = sampleNotifications.map(notif => `
        <div class="notif-item ${notif.read ? '' : 'unread'}">
            <i class="fa-solid ${notif.icon}" style="color: ${notif.color};"></i>
            <div>
                <p>${notif.message}</p>
                <span>${notif.time}</span>
            </div>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════
//  Dashboard Content
// ═══════════════════════════════════════════
function loadDashboardContent() {
    // Load active orders
    const activeOrdersCards = document.getElementById('activeOrdersCards');
    if (!activeOrdersCards) return;
    
    const activeOrders = sampleOrders.filter(o => o.status !== 'completed').slice(0, 3);
    
    activeOrdersCards.innerHTML = activeOrders.map(order => `
        <div class="order-mini-card">
            <div class="omc-status ${order.status === 'in-progress' ? 'status-progress' : 'status-review'}">
                <i class="fa-solid fa-${order.status === 'in-progress' ? 'spinner' : 'eye'}"></i>
            </div>
            <div class="omc-info">
                <h5>${order.title}</h5>
                <p>${order.expert} • ${order.serviceType}</p>
            </div>
            <div class="omc-date">${order.date}</div>
            <button class="btn btn-sm btn-outline" onclick="navigateTo('myOrders')">
                تفاصيل
            </button>
        </div>
    `).join('');
    
    // Update badges
    const ordersBadge = document.getElementById('ordersBadge');
    if (ordersBadge) ordersBadge.textContent = activeOrders.length;
}

// ═══════════════════════════════════════════
//  Orders Page
// ═══════════════════════════════════════════
function loadOrders(filter = 'all') {
    const container = document.getElementById('ordersTableContainer');
    if (!container) return;
    
    let filteredOrders = sampleOrders;
    if (filter !== 'all') {
        filteredOrders = sampleOrders.filter(o => o.status === filter);
    }
    
    container.innerHTML = filteredOrders.map(order => `
        <div class="order-detailed-row">
            <span class="order-row-id">${order.id}</span>
            <div class="order-row-info">
                <h5>${order.title}</h5>
                <p>${order.expert} • ${order.serviceType}</p>
            </div>
            <span class="order-row-status status-tag-${order.status === 'in-progress' ? 'progress' : order.status === 'review' ? 'review' : 'completed'}">
                ${order.status === 'in-progress' ? 'قيد التنفيذ' : order.status === 'review' ? 'بانتظار المراجعة' : 'مكتمل'}
            </span>
            <span class="order-row-date">${order.date}</span>
            <span style="font-weight: 700; color: var(--gray-800);">${order.price}</span>
            <div class="order-row-actions">
                <button onclick="navigateTo('messages')" title="مراسلة">
                    <i class="fa-solid fa-comment"></i>
                </button>
                ${order.status === 'completed' ? `
                <button onclick="openRatingModal(${getExpertIdByName(order.expert)})" title="تقييم">
                    <i class="fa-solid fa-star"></i>
                </button>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    // Initialize filter buttons
    document.querySelectorAll('#page-myOrders .filter-tag').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadOrders(this.dataset.status);
        });
    });
}

function getExpertIdByName(name) {
    const expert = expertsDatabase.find(e => e.name === name);
    return expert ? expert.id : 1;
}

// ═══════════════════════════════════════════
//  Experts Page
// ═══════════════════════════════════════════
function loadExperts(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('expertsGridDetailed');
    if (!grid) return;
    
    let filtered = expertsDatabase;
    
    if (filter !== 'all') {
        filtered = filtered.filter(e => e.category === filter);
    }
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(e => 
            e.name.toLowerCase().includes(term) || 
            e.specialization.toLowerCase().includes(term)
        );
    }
    
    grid.innerHTML = filtered.map(expert => `
        <div class="expert-detailed-card">
            <span class="expert-card-badge badge-${expert.badge}">
                ${expert.badge === 'diamond' ? '💎 خبير ماسي' : expert.badge === 'gold' ? '🥇 ذهبي' : expert.badge === 'silver' ? '🥈 فضي' : '🥉 برونزي'}
            </span>
            <div class="expert-card-top">
                <div class="expert-card-avatar">
                    <i class="fa-solid fa-user-tie"></i>
                </div>
                <div class="expert-card-name">
                    <h4>${expert.title} ${expert.name}</h4>
                    <span class="expert-spec">${expert.specialization}</span>
                    <div class="expert-card-stars">
                        ${generateStarRating(expert.rating)}
                        <span>${expert.rating}</span>
                    </div>
                </div>
            </div>
            <div class="expert-card-stats-row">
                <div class="expert-stat-mini">
                    <span class="stat-val">${expert.completedProjects}</span>
                    <span class="stat-lbl">مشروع مكتمل</span>
                </div>
                <div class="expert-stat-mini">
                    <span class="stat-val">${expert.experience}</span>
                    <span class="stat-lbl">خبرة</span>
                </div>
                <div class="expert-stat-mini">
                    <span class="stat-val">${Math.round(expert.rating * 20)}%</span>
                    <span class="stat-lbl">رضا العملاء</span>
                </div>
            </div>
            <p style="font-size: 0.8rem; color: var(--gray-500); margin-bottom: 12px;">${expert.bio}</p>
            <div class="expert-card-actions">
                <button class="btn btn-primary btn-sm" onclick="navigateTo('service-thesis')">
                    <i class="fa-solid fa-paper-plane"></i> طلب خدمة
                </button>
                <button class="btn btn-outline btn-sm" onclick="openRatingModal(${expert.id})">
                    <i class="fa-solid fa-star"></i> تقييم
                </button>
            </div>
        </div>
    `).join('');
    
    // Search and filter
    const searchInput = document.getElementById('expertSearchInput');
    const filterSelect = document.getElementById('expertFilterSpec');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            loadExperts(filterSelect?.value || 'all', this.value);
        });
    }
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            loadExperts(this.value, searchInput?.value || '');
        });
    }
}

function generateStarRating(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += '<i class="fa-solid fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            html += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            html += '<i class="fa-regular fa-star"></i>';
        }
    }
    return html;
}

// ═══════════════════════════════════════════
//  Library Page
// ═══════════════════════════════════════════
function loadLibrary(filter = 'all') {
    const grid = document.getElementById('libraryGridExpanded');
    const filterBar = document.getElementById('libraryFilterBar');
    if (!grid) return;
    
    // Filter bar
    if (filterBar && filterBar.children.length === 0) {
        const categories = [
            { key: 'all', label: 'الكل' },
            { key: 'proposal', label: 'خطط البحث' },
            { key: 'thesis', label: 'رسائل جامعية' },
            { key: 'paper', label: 'أوراق علمية' },
            { key: 'cover', label: 'Cover Letters' },
            { key: 'presentation', label: 'عروض تقديمية' }
        ];
        filterBar.innerHTML = categories.map(cat => `
            <button class="library-filter-tag ${cat.key === filter ? 'active' : ''}" data-cat="${cat.key}">
                ${cat.label}
            </button>
        `).join('');
        
        filterBar.querySelectorAll('.library-filter-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                filterBar.querySelectorAll('.library-filter-tag').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                loadLibrary(this.dataset.cat);
            });
        });
    }
    
    let filtered = libraryTemplates;
    if (filter !== 'all') {
        filtered = libraryTemplates.filter(t => t.category === filter);
    }
    
    grid.innerHTML = filtered.map(template => `
        <div class="library-detailed-card">
            <div class="lib-card-icon lib-icon-${template.iconColor}">
                ${getLibraryIcon(template.format)}
            </div>
            <span class="lib-format-badge">${template.format}</span>
            <h5>${template.title}</h5>
            <p>${template.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button class="lib-download-btn" onclick="downloadTemplate('${template.title}')">
                    <i class="fa-solid fa-download"></i> تحميل
                </button>
                <span style="font-size: 0.75rem; color: var(--gray-400);">
                    <i class="fa-solid fa-download"></i> ${template.downloads.toLocaleString()}
                </span>
            </div>
        </div>
    `).join('');
}

function getLibraryIcon(format) {
    switch(format) {
        case 'Word': return '<i class="fa-solid fa-file-word"></i>';
        case 'LaTeX': return '<i class="fa-solid fa-file-code"></i>';
        case 'PowerPoint': return '<i class="fa-solid fa-file-powerpoint"></i>';
        default: return '<i class="fa-solid fa-file"></i>';
    }
}

function downloadTemplate(title) {
    alert(`📥 جارٍ تحميل: ${title}\n\nسيتم تحميل الملف مباشرة.`);
}

// ═══════════════════════════════════════════
//  Forum Page
// ═══════════════════════════════════════════
function loadForum() {
    const grid = document.getElementById('forumCategoriesGrid');
    if (!grid) return;
    
    grid.innerHTML = forumCategories.map(cat => `
        <div class="forum-category-card" onclick="alert('📂 ${cat.name}\\nسيتم فتح المنتدى في النسخة الكاملة.')">
            <div class="forum-cat-icon-circle" style="background: ${cat.color}20; color: ${cat.color};">
                <i class="fa-solid ${cat.icon}"></i>
            </div>
            <div class="forum-cat-info">
                <h4>${cat.name}</h4>
                <p>${cat.description}</p>
            </div>
            <div class="forum-cat-stats-group">
                <div class="forum-stat-mini">
                    <span class="fstat-num">${cat.topics}</span>
                    <span class="fstat-lbl">موضوع</span>
                </div>
                <div class="forum-stat-mini">
                    <span class="fstat-num">${cat.replies}</span>
                    <span class="fstat-lbl">رد</span>
                </div>
            </div>
            <i class="fa-solid fa-chevron-left" style="color: var(--gray-400);"></i>
        </div>
    `).join('');
    
    // New topic button
    const newTopicBtn = document.querySelector('.btn-new-topic');
    if (newTopicBtn) {
        newTopicBtn.addEventListener('click', () => {
            alert('📝 سيتم فتح نموذج إنشاء موضوع جديد في النسخة الكاملة.');
        });
    }
}

// ═══════════════════════════════════════════
//  Conversations / Messages Page
// ═══════════════════════════════════════════
function loadConversations() {
    const sidebar = document.getElementById('msgSidebar');
    if (!sidebar) return;
    
    sidebar.innerHTML = `
        <div class="msg-sidebar-header">
            <input type="text" placeholder="بحث في المحادثات...">
        </div>
        <div class="msg-conversations">
            ${sampleConversations.map(conv => `
                <div class="msg-conv-item ${conv.unread > 0 ? 'active' : ''}" onclick="openConversation(${conv.id})">
                    <div class="msg-conv-avatar">
                        <i class="fa-solid fa-user-tie"></i>
                    </div>
                    <div class="msg-conv-info">
                        <h5>${conv.name} <span style="font-size: 0.7rem; color: var(--primary);">${conv.orderId}</span></h5>
                        <span class="conv-last">${conv.lastMessage}</span>
                    </div>
                    <div class="msg-conv-meta">
                        <span class="conv-time">${conv.time}</span>
                        ${conv.unread > 0 ? `<span class="conv-unread">${conv.unread}</span>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function openConversation(convId) {
    const conv = sampleConversations.find(c => c.id === convId);
    if (!conv) return;
    
    const chatArea = document.getElementById('msgChatArea');
    if (!chatArea) return;
    
    // Update active state
    document.querySelectorAll('.msg-conv-item').forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`.msg-conv-item:nth-child(${convId})`);
    if (activeItem) activeItem.classList.add('active');
    
    chatArea.innerHTML = `
        <div style="padding: 30px; text-align: center;">
            <i class="fa-solid fa-comments" style="font-size: 3rem; color: var(--primary); margin-bottom: 14px;"></i>
            <h4>محادثة مع ${conv.name}</h4>
            <p style="color: var(--gray-500); margin-bottom: 6px;">${conv.orderId ? 'بخصوص الطلب: ' + conv.orderId : ''}</p>
            <p style="color: var(--gray-400); font-size: 0.85rem;">آخر رسالة: ${conv.lastMessage}</p>
            <p style="color: var(--gray-400); font-size: 0.8rem; margin-top: 16px;">سيتم عرض المراسلات الكاملة في النسخة المطورة.</p>
        </div>
    `;
}

// ═══════════════════════════════════════════
//  Logout
// ═══════════════════════════════════════════
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                localStorage.removeItem('academiahub_user');
                window.location.href = 'index.html';
            }
        });
    }
}

// ═══════════════════════════════════════════
//  Responsive Handler
// ═══════════════════════════════════════════
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (window.innerWidth <= 1024) {
        // Mobile mode
        if (sidebar && AppState.isSidebarCollapsed) {
            AppState.isSidebarCollapsed = false;
            sidebar.classList.remove('collapsed');
        }
        if (mainContent) mainContent.classList.remove('expanded');
        if (AppState.isMobileMenuOpen) {
            // Keep mobile menu state
        }
    }
}

// ═══════════════════════════════════════════
//  Service Card Click Handlers (Homepage)
// ═══════════════════════════════════════════
document.addEventListener('click', function(e) {
    const serviceCard = e.target.closest('.service-showcase-card');
    if (serviceCard) {
        const onclick = serviceCard.getAttribute('onclick');
        if (onclick) {
            // Extract function call - handled via inline onclick
        }
    }
});

// ═══════════════════════════════════════════
//  Keyboard Shortcuts
// ═══════════════════════════════════════════
document.addEventListener('keydown', function(e) {
    // Escape to close modals
    if (e.key === 'Escape') {
        closeRatingModal();
        const notifDropdown = document.getElementById('notificationDropdown');
        if (notifDropdown) notifDropdown.classList.remove('show');
    }
    
    // Ctrl+1-6 for service pages
    if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const services = ['service-thesis', 'service-publication', 'service-translation', 
                         'service-statistics', 'service-plagiarism', 'service-graduation'];
        navigateTo(services[parseInt(e.key) - 1]);
    }
    
    // Ctrl+H for home
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        navigateTo('home');
    }
});

// ── Make functions globally accessible ──
window.navigateTo = navigateTo;
window.openRatingModal = openRatingModal;
window.submitRating = submitRating;
window.downloadTemplate = downloadTemplate;
window.openConversation = openConversation;

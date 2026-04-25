/* ═══════════════════════════════════════════
   AcademiaHub - Main Application Logic
   تحديث: إزالة البيانات الوهمية للمستخدمين الجدد
   ═══════════════════════════════════════════ */

// ── Global State ──
const AppState = {
    currentPage: 'home',
    currentUser: null,
    isSidebarCollapsed: false,
    isMobileMenuOpen: false,
    userOrders: [],      // فارغة للمستخدم الجديد
    userNotifications: [] // فارغة للمستخدم الجديد
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
    
    // Load user orders from localStorage (فارغة للمستخدم الجديد)
    loadUserOrders();
    
    // Load user notifications (فارغة للمستخدم الجديد)
    loadUserNotifications();
    
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
    
    // تحديث الشارات لتكون فارغة
    updateAllBadges();
}

// ═══════════════════════════════════════════
//  Authentication Check
// ═══════════════════════════════════════════
function checkAuth() {
    const userData = localStorage.getItem('academiahub_user');
    if (!userData) {
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
    
    if (profileName) profileName.textContent = user.fullName || user.name || 'مستخدم جديد';
    if (profileRole) {
        const roleMap = {
            'bachelor': 'طالب بكالوريوس',
            'master': 'طالب ماجستير',
            'phd': 'طالب دكتوراه',
            'researcher': 'باحث'
        };
        profileRole.textContent = roleMap[user.academicLevel] || 'باحث';
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
        const span = userAvatarSm.querySelector('span');
        if (span) span.textContent = parts.map(p => p[0]).join('').substring(0, 2);
    }
}

// ═══════════════════════════════════════════
//  Load User Orders (من localStorage فقط)
// ═══════════════════════════════════════════
function loadUserOrders() {
    const savedOrders = localStorage.getItem('academiahub_orders');
    if (savedOrders) {
        try {
            AppState.userOrders = JSON.parse(savedOrders);
        } catch(e) {
            AppState.userOrders = [];
        }
    } else {
        AppState.userOrders = [];
    }
}

// ═══════════════════════════════════════════
//  Load User Notifications (تبدأ فارغة)
// ═══════════════════════════════════════════
function loadUserNotifications() {
    const savedNotifications = localStorage.getItem('academiahub_notifications');
    if (savedNotifications) {
        try {
            AppState.userNotifications = JSON.parse(savedNotifications);
        } catch(e) {
            AppState.userNotifications = [];
        }
    } else {
        AppState.userNotifications = [];
    }
}

// ═══════════════════════════════════════════
//  Add Notification (تضاف فقط عند الحاجة)
// ═══════════════════════════════════════════
function addNotification(type, message, icon, color) {
    const notification = {
        id: Date.now(),
        type: type,
        message: message,
        icon: icon || 'fa-bell',
        color: color || '#3B82F6',
        time: 'الآن',
        read: false
    };
    
    AppState.userNotifications.unshift(notification);
    
    // حفظ في localStorage
    localStorage.setItem('academiahub_notifications', JSON.stringify(AppState.userNotifications));
    
    // تحديث واجهة الإشعارات
    updateNotificationsUI();
    updateAllBadges();
}

// ═══════════════════════════════════════════
//  تحديث واجهة الإشعارات
// ═══════════════════════════════════════════
function updateNotificationsUI() {
    const notifList = document.querySelector('.notif-list');
    if (!notifList) return;
    
    if (AppState.userNotifications.length === 0) {
        notifList.innerHTML = `
            <div style="text-align: center; padding: 30px; color: var(--gray-400);">
                <i class="fa-solid fa-bell-slash" style="font-size: 2rem; display: block; margin-bottom: 10px;"></i>
                <p>لا توجد إشعارات حالياً</p>
                <p style="font-size: 0.8rem;">ستظهر الإشعارات هنا عند تحديث طلباتك</p>
            </div>
        `;
        return;
    }
    
    notifList.innerHTML = AppState.userNotifications.slice(0, 10).map(notif => `
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
//  تحديث جميع الشارات
// ═══════════════════════════════════════════
function updateAllBadges() {
    // تحديث شارة الطلبات
    const ordersBadge = document.getElementById('ordersBadge');
    if (ordersBadge) {
        const activeOrders = AppState.userOrders.filter(o => o.status !== 'completed').length;
        ordersBadge.textContent = activeOrders;
        ordersBadge.style.display = activeOrders > 0 ? 'inline' : 'none';
    }
    
    // تحديث شارة المراسلات
    const messagesBadge = document.getElementById('messagesBadge');
    if (messagesBadge) {
        const unreadMessages = AppState.userNotifications.filter(n => !n.read).length;
        messagesBadge.textContent = unreadMessages;
        messagesBadge.style.display = unreadMessages > 0 ? 'inline' : 'none';
    }
    
    // إخفاء نقطة الجرس إذا لم تكن هناك إشعارات
    const bellDot = document.querySelector('.bell-dot');
    if (bellDot) {
        const unreadCount = AppState.userNotifications.filter(n => !n.read).length;
        bellDot.style.display = unreadCount > 0 ? 'block' : 'none';
    }
    
    // تحديث عداد الإشعارات في القائمة المنسدلة
    const notifCount = document.querySelector('.notif-head span');
    if (notifCount) {
        const unreadCount = AppState.userNotifications.filter(n => !n.read).length;
        notifCount.textContent = unreadCount > 0 ? `${unreadCount} جديدة` : 'لا جديد';
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
            
            const icon = collapseBtn.querySelector('i');
            if (icon) {
                icon.className = AppState.isSidebarCollapsed 
                    ? 'fa-solid fa-angles-left' 
                    : 'fa-solid fa-angles-right';
            }
        });
    }
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
            sidebar.classList.toggle('mobile-open', AppState.isMobileMenuOpen);
        });
    }
    
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
            
            if (AppState.isMobileMenuOpen) {
                AppState.isMobileMenuOpen = false;
                document.getElementById('sidebar')?.classList.remove('mobile-open');
            }
        });
    });
}

function navigateTo(page) {
    // تحديث حالة التنشيط في القائمة
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) link.classList.add('active');
    });
    
    // تبديل الصفحات
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');
    
    // تحديث مسار التنقل
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
    
    const pageContainer = document.getElementById('pageContainer');
    if (pageContainer) pageContainer.scrollTop = 0;
    
    AppState.currentPage = page;
    
    // تحديث المحتوى الديناميكي
    if (page === 'myOrders') loadOrders();
    if (page === 'experts') loadExperts();
    if (page === 'library') loadLibrary();
    if (page === 'forum') loadForum();
    if (page === 'messages') loadConversations();
    if (page === 'home') loadDashboardContent();
}

// ═══════════════════════════════════════════
//  Topbar Functions
// ═══════════════════════════════════════════
function initTopbar() {
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim().toLowerCase();
                if (query) {
                    const pages = ['service-thesis', 'service-publication', 'service-translation', 
                                  'service-statistics', 'service-plagiarism', 'service-graduation'];
                    const found = pages.find(page => {
                        const el = document.getElementById(`page-${page}`);
                        return el && el.textContent.toLowerCase().includes(query);
                    });
                    if (found) navigateTo(found);
                }
            }
        });
    }
    
    const notifBell = document.getElementById('notificationBell');
    const notifDropdown = document.getElementById('notificationDropdown');
    if (notifBell && notifDropdown) {
        notifBell.addEventListener('click', (e) => {
            e.stopPropagation();
            updateNotificationsUI();
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
        const backdrop = ratingModal.querySelector('.modal-backdrop');
        if (backdrop) backdrop.addEventListener('click', closeRatingModal);
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
    addNotification('success', 'تم تقديم تقييمك بنجاح! شكراً لمساهمتك.', 'fa-star', '#F59E0B');
    closeRatingModal();
}

// ═══════════════════════════════════════════
//  Dashboard Content (بدون بيانات وهمية)
// ═══════════════════════════════════════════
function loadDashboardContent() {
    const activeOrdersCards = document.getElementById('activeOrdersCards');
    if (!activeOrdersCards) return;
    
    const activeOrders = AppState.userOrders.filter(o => o.status !== 'completed').slice(0, 3);
    
    if (activeOrders.length === 0) {
        // لا توجد طلبات نشطة - عرض رسالة ترحيبية
        activeOrdersCards.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; background: var(--white); border-radius: var(--radius-lg); border: 2px dashed var(--gray-200);">
                <i class="fa-solid fa-clipboard-list" style="font-size: 3rem; color: var(--gray-300); margin-bottom: 14px; display: block;"></i>
                <h4 style="color: var(--gray-600); margin-bottom: 8px;">لا توجد طلبات نشطة حالياً</h4>
                <p style="color: var(--gray-400); font-size: 0.9rem; margin-bottom: 16px;">ابدأ رحلتك الأكاديمية معنا بطلب خدمتك الأولى</p>
                <button class="btn btn-primary" onclick="navigateTo('service-thesis')">
                    <i class="fa-solid fa-plus"></i> طلب خدمة جديدة
                </button>
            </div>
        `;
        return;
    }
    
    activeOrdersCards.innerHTML = activeOrders.map(order => `
        <div class="order-mini-card">
            <div class="omc-status ${order.status === 'in-progress' ? 'status-progress' : 'status-review'}">
                <i class="fa-solid fa-${order.status === 'in-progress' ? 'spinner' : 'eye'}"></i>
            </div>
            <div class="omc-info">
                <h5>${order.title}</h5>
                <p>${order.serviceType} • ${order.id}</p>
            </div>
            <div class="omc-date">${order.date}</div>
            <button class="btn btn-sm btn-outline" onclick="navigateTo('myOrders')">
                تفاصيل
            </button>
        </div>
    `).join('');
    
    updateAllBadges();
}

// ═══════════════════════════════════════════
//  Orders Page (تعرض طلبات المستخدم فقط)
// ═══════════════════════════════════════════
function loadOrders(filter = 'all') {
    const container = document.getElementById('ordersTableContainer');
    if (!container) return;
    
    let filteredOrders = AppState.userOrders;
    if (filter !== 'all') {
        filteredOrders = AppState.userOrders.filter(o => o.status === filter);
    }
    
    if (filteredOrders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 50px 20px; background: var(--white); border-radius: var(--radius-lg);">
                <i class="fa-solid fa-inbox" style="font-size: 4rem; color: var(--gray-300); display: block; margin-bottom: 16px;"></i>
                <h4 style="color: var(--gray-600); margin-bottom: 6px;">
                    ${filter === 'all' ? 'لا توجد طلبات بعد' : 'لا توجد طلبات في هذا القسم'}
                </h4>
                <p style="color: var(--gray-400); font-size: 0.9rem; margin-bottom: 20px;">
                    قم بتقديم طلب خدمة جديد وستظهر هنا
                </p>
                <button class="btn btn-primary" onclick="navigateTo('service-thesis')">
                    <i class="fa-solid fa-plus"></i> تقديم طلب جديد
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredOrders.map(order => `
        <div class="order-detailed-row">
            <span class="order-row-id">${order.id}</span>
            <div class="order-row-info">
                <h5>${order.title}</h5>
                <p>${order.serviceType}</p>
            </div>
            <span class="order-row-status status-tag-${order.status === 'in-progress' ? 'progress' : order.status === 'review' ? 'review' : 'completed'}">
                ${order.status === 'in-progress' ? 'قيد التنفيذ' : order.status === 'review' ? 'بانتظار المراجعة' : 'مكتمل'}
            </span>
            <span class="order-row-date">${order.date}</span>
            <span style="font-weight: 700; color: var(--gray-800);">${order.price || 'قيد التقييم'}</span>
            <div class="order-row-actions">
                <button onclick="navigateTo('messages')" title="مراسلة">
                    <i class="fa-solid fa-comment"></i>
                </button>
                ${order.status === 'completed' ? `
                <button onclick="openRatingModal(1)" title="تقييم">
                    <i class="fa-solid fa-star"></i>
                </button>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    // Filter buttons
    document.querySelectorAll('#page-myOrders .filter-tag').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadOrders(this.dataset.status);
        });
    });
}

// ═══════════════════════════════════════════
//  Conversations (فارغة للمستخدم الجديد)
// ═══════════════════════════════════════════
function loadConversations() {
    const sidebar = document.getElementById('msgSidebar');
    if (!sidebar) return;
    
    const userOrders = AppState.userOrders;
    const conversations = userOrders.map(order => ({
        id: order.id,
        name: 'فريق الدعم',
        orderId: order.id,
        lastMessage: 'تم استلام طلبك وسيتم التواصل معك قريباً',
        time: order.date,
        unread: 0
    }));
    
    if (conversations.length === 0) {
        sidebar.innerHTML = `
            <div class="msg-sidebar-header">
                <input type="text" placeholder="بحث في المحادثات..." disabled>
            </div>
            <div class="msg-conversations">
                <div style="text-align: center; padding: 40px 20px; color: var(--gray-400);">
                    <i class="fa-solid fa-comment-slash" style="font-size: 2.5rem; display: block; margin-bottom: 12px;"></i>
                    <p>لا توجد محادثات بعد</p>
                    <p style="font-size: 0.8rem;">ستظهر المحادثات عند تقديم طلب خدمة</p>
                </div>
            </div>
        `;
        return;
    }
    
    sidebar.innerHTML = `
        <div class="msg-sidebar-header">
            <input type="text" placeholder="بحث في المحادثات...">
        </div>
        <div class="msg-conversations">
            ${conversations.map(conv => `
                <div class="msg-conv-item" onclick="openConversation('${conv.id}')">
                    <div class="msg-conv-avatar">
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <div class="msg-conv-info">
                        <h5>${conv.name} <span style="font-size: 0.7rem; color: var(--primary);">${conv.orderId}</span></h5>
                        <span class="conv-last">${conv.lastMessage}</span>
                    </div>
                    <div class="msg-conv-meta">
                        <span class="conv-time">${conv.time}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function openConversation(convId) {
    const chatArea = document.getElementById('msgChatArea');
    if (!chatArea) return;
    
    chatArea.innerHTML = `
        <div style="padding: 30px; text-align: center;">
            <i class="fa-solid fa-comments" style="font-size: 3rem; color: var(--primary); margin-bottom: 14px;"></i>
            <h4>محادثة بخصوص الطلب ${convId}</h4>
            <p style="color: var(--gray-500);">سيتم عرض المراسلات هنا عند توفرها</p>
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
        if (sidebar && AppState.isSidebarCollapsed) {
            AppState.isSidebarCollapsed = false;
            sidebar.classList.remove('collapsed');
        }
        if (mainContent) mainContent.classList.remove('expanded');
    }
}

// ═══════════════════════════════════════════
//  Keyboard Shortcuts
// ═══════════════════════════════════════════
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRatingModal();
        const notifDropdown = document.getElementById('notificationDropdown');
        if (notifDropdown) notifDropdown.classList.remove('show');
    }
    
    if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const services = ['service-thesis', 'service-publication', 'service-translation', 
                         'service-statistics', 'service-plagiarism', 'service-graduation'];
        navigateTo(services[parseInt(e.key) - 1]);
    }
    
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        navigateTo('home');
    }
});

// ── Global functions ──
window.navigateTo = navigateTo;
window.openRatingModal = openRatingModal;
window.submitRating = submitRating;
window.loadOrders = loadOrders;
window.loadConversations = loadConversations;

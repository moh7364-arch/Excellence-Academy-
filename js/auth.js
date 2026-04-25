/* ═══════════════════════════════════════════
   AcademiaHub - Authentication Logic
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS
    AOS.init({ once: false, mirror: false });
    
    // Background particles
    createParticles();
    
    // Tab switching
    initTabs();
    
    // Password toggle
    initPasswordToggle();
    
    // Form submissions
    initLoginForm();
    initRegisterForm();
    
    // Check if already logged in
    checkExistingSession();
});

// ── Create floating particles ──
function createParticles() {
    const container = document.getElementById('bgParticles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(particle);
    }
    
    // Add keyframes dynamically
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleEl);
}

// ── Tab switching ──
function initTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    const messageEl = document.getElementById('authMessage');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            forms.forEach(f => {
                f.classList.remove('active');
                if (f.id === `${target}Form`) f.classList.add('active');
            });
            
            // Clear messages
            if (messageEl) {
                messageEl.textContent = '';
                messageEl.className = 'auth-message';
            }
        });
    });
}

// ── Password visibility toggle ──
function initPasswordToggle() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa-regular fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fa-regular fa-eye';
            }
        });
    });
}

// ── Login form ──
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const messageEl = document.getElementById('authMessage');
        
        if (!email || !password) {
            showMessage('يرجى إدخال البريد الإلكتروني وكلمة المرور', 'error');
            return;
        }
        
        // Simulate login
        const submitBtn = form.querySelector('.btn-auth');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ الدخول...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Store user session
            const userData = {
                email: email,
                name: email.split('@')[0],
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('academiahub_user', JSON.stringify(userData));
            
            showMessage('✅ تم تسجيل الدخول بنجاح! جارٍ تحويلك...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);
        }, 1500);
    });
}

// ── Register form ──
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const academicLevel = document.getElementById('academicLevel').value;
        const specialization = document.getElementById('specialization').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Validation
        if (!firstName || !lastName || !email || !academicLevel || !specialization || !password) {
            showMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('كلمة المرور غير متطابقة', 'error');
            return;
        }
        
        if (password.length < 8) {
            showMessage('كلمة المرور يجب أن تكون 8 أحرف على الأقل', 'error');
            return;
        }
        
        if (!agreeTerms) {
            showMessage('يرجى الموافقة على الشروط والأحكام', 'error');
            return;
        }
        
        // Simulate registration
        const submitBtn = form.querySelector('.btn-auth');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ إنشاء الحساب...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const userData = {
                firstName,
                lastName,
                fullName: `${firstName} ${lastName}`,
                email,
                academicLevel,
                specialization,
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('academiahub_user', JSON.stringify(userData));
            
            showMessage('✅ تم إنشاء الحساب بنجاح! جارٍ تحويلك...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);
        }, 1500);
    });
}

// ── Show message ──
function showMessage(text, type) {
    const messageEl = document.getElementById('authMessage');
    if (messageEl) {
        messageEl.textContent = text;
        messageEl.className = `auth-message ${type}`;
    }
}

// ── Check existing session ──
function checkExistingSession() {
    const userData = localStorage.getItem('academiahub_user');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            if (user.isLoggedIn) {
                // Optionally redirect directly
                // window.location.href = 'dashboard.html';
            }
        } catch(e) {}
    }
         }

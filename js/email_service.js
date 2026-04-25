/* ═══════════════════════════════════════════
   AcademiaHub - Email Service
   إرسال جميع النماذج إلى الإيميل المحدد
   ═══════════════════════════════════════════ */

// ── Configuration ──
const EMAIL_CONFIG = {
    recipientEmail: 'scottmcnamara316@gmail.com',
    whatsappGroupLink: 'https://chat.whatsapp.com/DO6CyC5MwajLizwHNkmLHU?mode=gi_t',
    // يمكن استخدام EmailJS أو Formspree كخدمة مجانية
    // هنا نستخدم Formspree كحل مباشر
    formspreeEndpoint: 'https://formspree.io/f/your-form-id' // سيتم توجيه النماذج هنا
};

// ═══════════════════════════════════════════
//  الدالة الرئيسية: تجهيز وإرسال النموذج
// ═══════════════════════════════════════════
function sendFormToEmail(formElement, serviceName) {
    
    // 1. جمع بيانات النموذج
    const formData = collectFormData(formElement);
    
    // 2. إضافة معلومات إضافية
    const userData = JSON.parse(localStorage.getItem('academiahub_user')) || {};
    formData.userName = userData.fullName || userData.name || 'غير مسجل';
    formData.userEmail = userData.email || 'غير متوفر';
    formData.userLevel = userData.academicLevel || 'غير محدد';
    formData.userSpecialization = userData.specialization || 'غير محدد';
    formData.serviceName = serviceName;
    formData.submissionDate = new Date().toLocaleString('ar-SA');
    formData.orderNumber = generateOrderNumber();
    
    // 3. إرسال بعدة طرق (لضمان الوصول)
    sendViaFormspree(formData);
    sendViaMailto(formData);
    
    // 4. حفظ الطلب محلياً
    saveOrderLocally(formData);
    
    // 5. عرض رسالة تأكيد للعميل
    showSuccessMessage(formData);
    
    return formData;
}

// ── جمع بيانات النموذج ──
function collectFormData(formElement) {
    const data = {};
    const formElements = formElement.querySelectorAll('input, select, textarea');
    
    formElements.forEach(element => {
        if (element.name) {
            // إذا كان Checkbox
            if (element.type === 'checkbox') {
                if (!data[element.name]) data[element.name] = [];
                if (element.checked) data[element.name].push(element.closest('label')?.textContent?.trim() || element.value);
            } else {
                data[element.name] = element.value;
            }
        } else {
            // استخدام label كاسم للحقل
            const label = element.closest('.field-group')?.querySelector('label');
            if (label) {
                const labelText = label.textContent.replace('*', '').trim();
                if (element.type === 'checkbox') {
                    if (!data[labelText]) data[labelText] = [];
                    if (element.checked) data[labelText].push(element.closest('.check-service')?.textContent?.trim() || element.value);
                } else {
                    data[labelText] = element.value;
                }
            }
        }
    });
    
    // جمع الملفات المرفقة (أسماء فقط)
    const fileLists = formElement.querySelectorAll('.uploaded-files-list');
    const fileNames = [];
    fileLists.forEach(list => {
        list.querySelectorAll('.uploaded-file-item span:first-of-type').forEach(span => {
            fileNames.push(span.textContent);
        });
    });
    data.attachedFiles = fileNames;
    
    return data;
}

// ── توليد رقم طلب ──
function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `AH-${year}${month}-${random}`;
}

// ── الطريقة 1: إرسال عبر Formspree (مجاني حتى 50 إرسال/شهر) ──
function sendViaFormspree(formData) {
    
    // بناء محتوى الإيميل
    const emailContent = buildEmailContent(formData);
    
    // استخدام Formspree API
    fetch('https://formspree.io/f/xqkrbovq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: EMAIL_CONFIG.recipientEmail,
            subject: `طلب خدمة جديد - ${formData.serviceName} | ${formData.orderNumber}`,
            message: emailContent,
            _replyto: formData.userEmail,
            _subject: `طلب ${formData.serviceName} من ${formData.userName}`,
            // بيانات إضافية
            orderNumber: formData.orderNumber,
            clientName: formData.userName,
            clientEmail: formData.userEmail,
            serviceType: formData.serviceName
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('✅ تم الإرسال عبر Formspree:', data);
    })
    .catch(error => {
        console.log('⚠️ فشل الإرسال عبر Formspree، جارٍ تجربة الطريقة البديلة...');
        // المحاولة عبر الطريقة البديلة
    });
}

// ── الطريقة 2: إرسال عبر mailto (طريقة احتياطية) ──
function sendViaMailto(formData) {
    
    const emailContent = buildEmailContent(formData);
    const subject = encodeURIComponent(`طلب ${formData.serviceName} | ${formData.orderNumber} | ${formData.userName}`);
    const body = encodeURIComponent(emailContent);
    
    // فتح عميل البريد الافتراضي
    const mailtoLink = `mailto:${EMAIL_CONFIG.recipientEmail}?subject=${subject}&body=${body}`;
    
    // محاولة فتح في نافذة جديدة (خفية)
    try {
        const mailWindow = window.open(mailtoLink, '_blank', 'width=1,height=1');
        if (mailWindow) {
            setTimeout(() => mailWindow.close(), 1000);
        }
    } catch(e) {
        console.log('⚠️ لم يتم فتح mailto تلقائياً');
    }
}

// ── بناء محتوى الإيميل ──
function buildEmailContent(formData) {
    let content = `
╔════════════════════════════════════════╗
║     طلب خدمة جديد - AcademiaHub       ║
╚════════════════════════════════════════╝

📋 رقم الطلب: ${formData.orderNumber}
📅 تاريخ التقديم: ${formData.submissionDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 معلومات العميل
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• الاسم: ${formData.userName}
• البريد الإلكتروني: ${formData.userEmail}
• المستوى الأكاديمي: ${formData.userLevel}
• التخصص: ${formData.userSpecialization}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 تفاصيل الخدمة المطلوبة
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• الخدمة: ${formData.serviceName}
`;

    // إضافة جميع حقول النموذج
    for (const [key, value] of Object.entries(formData)) {
        // تجاهل الحقول المضافة تلقائياً
        if (['userName', 'userEmail', 'userLevel', 'userSpecialization', 
             'serviceName', 'submissionDate', 'orderNumber', 'attachedFiles'].includes(key)) {
            continue;
        }
        
        if (Array.isArray(value)) {
            content += `• ${key}:\n`;
            value.forEach(v => content += `   - ${v}\n`);
        } else if (value && value.trim()) {
            content += `• ${key}: ${value}\n`;
        }
    }

    // الملفات المرفقة
    if (formData.attachedFiles && formData.attachedFiles.length > 0) {
        content += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📎 الملفات المرفقة
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        formData.attachedFiles.forEach((file, index) => {
            content += `${index + 1}. ${file}\n`;
        });
    }

    content += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 للتواصل مع العميل
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• رابط واتساب: ${EMAIL_CONFIG.whatsappGroupLink}
• إيميل العميل: ${formData.userEmail}

---
تم الإرسال تلقائياً من منصة AcademiaHub
${new Date().toLocaleString('ar-SA')}
`;

    return content;
}

// ── حفظ الطلب محلياً ──
function saveOrderLocally(formData) {
    // حفظ في localStorage لاستعراضها في صفحة طلباتي
    const existingOrders = JSON.parse(localStorage.getItem('academiahub_orders') || '[]');
    
    const newOrder = {
        id: formData.orderNumber,
        title: formData['عنوان البحث'] || formData['فكرة المشروع'] || `${formData.serviceName} - ${formData.userSpecialization}`,
        serviceType: formData.serviceName,
        status: 'in-progress',
        progress: 10,
        date: new Date().toISOString().split('T')[0],
        price: 'قيد التقييم',
        messages: 0,
        formData: formData
    };
    
    existingOrders.unshift(newOrder);
    localStorage.setItem('academiahub_orders', JSON.stringify(existingOrders));
    
    // تحديث العداد
    const badge = document.getElementById('ordersBadge');
    if (badge) {
        badge.textContent = existingOrders.filter(o => o.status !== 'completed').length;
    }
}

// ── عرض رسالة نجاح للعميل ──
function showSuccessMessage(formData) {
    // إنشاء نافذة منبثقة جميلة
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(5px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    overlay.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 40px 30px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 60px rgba(0,0,0,0.2);
            animation: slideUp 0.4s ease;
        ">
            <div style="
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: #ECFDF5;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 2.5rem;
            ">
                ✅
            </div>
            <h3 style="margin-bottom: 8px; color: #059669;">تم تقديم طلبك بنجاح!</h3>
            <p style="color: #64748B; margin-bottom: 6px; font-size: 0.9rem;">
                رقم الطلب: <strong style="color: #2563EB; font-size: 1.1rem;">${formData.orderNumber}</strong>
            </p>
            <p style="color: #64748B; margin-bottom: 20px; font-size: 0.85rem;">
                سنقوم بمراجعة طلبك والتواصل معك عبر الإيميل خلال 24 ساعة
            </p>
            <div style="
                background: #F8FAFC;
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 20px;
                text-align: right;
            ">
                <p style="font-weight: 600; margin-bottom: 8px; font-size: 0.9rem;">📱 للتواصل السريع:</p>
                <a href="${EMAIL_CONFIG.whatsappGroupLink}" 
                   target="_blank"
                   style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #25D366;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 700;
                    justify-content: center;
                ">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.3rem;"></i>
                    انضم لمجموعة الواتساب للمتابعة
                </a>
            </div>
            <button onclick="this.closest('[style*=fixed]').remove(); navigateTo('myOrders');" 
                    style="
                background: #2563EB;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 50px;
                font-weight: 700;
                font-size: 0.95rem;
                cursor: pointer;
                font-family: inherit;
            ">
                الذهاب إلى طلباتي
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // إغلاق عند النقر خارج البطاقة
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // إزالة بعد 15 ثانية تلقائياً
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            overlay.remove();
        }
    }, 15000);
}

// ═══════════════════════════════════════════
//  تجاوز دالة تقديم النموذج الأصلية
// ═══════════════════════════════════════════
// سيتم استدعاء هذه الدالة عند تقديم أي نموذج خدمة

// ── تجاوز handleServiceFormSubmit من services.js ──
const originalHandleSubmit = typeof handleServiceFormSubmit === 'function' ? handleServiceFormSubmit : null;

// إعادة تعريف الدالة مع إضافة إرسال الإيميل
window.handleServiceFormSubmit = function(formElement, serviceName) {
    
    // 1. إرسال النموذج للإيميل أولاً
    const formData = sendFormToEmail(formElement, serviceName);
    
    // 2. تنفيذ السلوك الأصلي (تعطيل الزر، إظهار رسالة...)
    const submitBtn = formElement.querySelector('.submit-service-btn');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ إرسال الطلب...';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 2000);
    }
    
    // 3. إعادة تعيين النموذج
    setTimeout(() => {
        formElement.reset();
        formElement.querySelectorAll('.uploaded-files-list').forEach(el => el.remove());
        formElement.querySelectorAll('.file-upload-box').forEach(box => box.classList.remove('has-files'));
    }, 1000);
    
    return formData;
};

// ═══════════════════════════════════════════
//  إضافة روابط التواصل في القائمة الجانبية
// ═══════════════════════════════════════════
function addContactToSidebar() {
    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (!sidebarFooter) return;
    
    const contactDiv = document.createElement('div');
    contactDiv.className = 'sidebar-contact';
    contactDiv.innerHTML = `
        <a href="${EMAIL_CONFIG.whatsappGroupLink}" target="_blank" class="contact-link whatsapp-link">
            <i class="fa-brands fa-whatsapp"></i>
            <span>تواصل واتساب</span>
        </a>
        <a href="mailto:${EMAIL_CONFIG.recipientEmail}" class="contact-link email-link">
            <i class="fa-solid fa-envelope"></i>
            <span>راسلنا</span>
        </a>
    `;
    
    sidebarFooter.before(contactDiv);
}

// ── تهيئة عند تحميل الصفحة ──
document.addEventListener('DOMContentLoaded', function() {
    // إضافة روابط التواصل للقائمة الجانبية
    setTimeout(addContactToSidebar, 500);
    
    console.log('✅ نظام إرسال النماذج جاهز');
    console.log('📧 الإيميل المستهدف:', EMAIL_CONFIG.recipientEmail);
    console.log('📱 رابط الواتساب:', EMAIL_CONFIG.whatsappGroupLink);
});

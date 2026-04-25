/* ═══════════════════════════════════════════
   AcademiaHub - Services Logic v2
   إصلاح: جميع دوال الحقن تعمل بشكل مستقل
   ═══════════════════════════════════════════ */

// ── Initialize All Service Forms ──
function initAllServiceForms() {
    console.log('🔄 initAllServiceForms called');
    initThesisForm();
    initPublicationForm();
    injectTranslationForm();
    injectStatisticsForm();
    injectPlagiarismForm();
    injectGraduationForm();
    console.log('✅ All services initialized');
}

// ═══════════════════════════════════════════
//  1. خدمة الرسائل الجامعية
// ═══════════════════════════════════════════
function initThesisForm() {
    const form = document.getElementById('thesisForm');
    if (!form) {
        console.log('⚠️ thesisForm not found yet');
        return;
    }

    const specSelect = document.getElementById('thesisSpecialization');
    if (specSelect && typeof specializationsTree !== 'undefined') {
        specSelect.innerHTML = '<option value="">اختر التخصص الدقيق...</option>';
        Object.entries(specializationsTree).forEach(([key, spec]) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = spec.name;
            spec.branches.forEach(branch => {
                optgroup.innerHTML += `<option value="${branch}">${branch}</option>`;
            });
            specSelect.appendChild(optgroup);
        });
    }

    const fileBox = document.getElementById('thesisFileUpload');
    if (fileBox) initFileUploadBox(fileBox);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleServiceFormSubmit(form, 'خدمة الرسائل الجامعية');
    });
}

// ═══════════════════════════════════════════
//  2. خدمة النشر العلمي
// ═══════════════════════════════════════════
function initPublicationForm() {
    const form = document.getElementById('publicationForm');
    if (!form) return;

    const paperStatus = document.getElementById('paperStatus');
    if (paperStatus) {
        paperStatus.addEventListener('change', function() {
            const existingFields = document.getElementById('publicationAdditionalFields');
            if (existingFields) existingFields.remove();
            
            if (this.value === 'idea' || this.value === 'none') {
                const fieldsDiv = document.createElement('div');
                fieldsDiv.id = 'publicationAdditionalFields';
                fieldsDiv.className = 'form-section-card';
                fieldsDiv.innerHTML = `
                    <h4><span class="step-badge">+</span> تفاصيل البحث المطلوب</h4>
                    <div class="field-group">
                        <label>المجال البحثي <span class="req">*</span></label>
                        <input type="text" placeholder="مثال: الطاقة المتجددة، الذكاء الاصطناعي...">
                    </div>
                    <div class="field-group">
                        <label>عدد الكلمات المتوقع</label>
                        <input type="number" placeholder="مثال: 5000" min="1000">
                    </div>
                    <div class="field-group">
                        <label>وصف مختصر لفكرة البحث</label>
                        <textarea rows="3" placeholder="صف فكرة بحثك باختصار..."></textarea>
                    </div>
                `;
                this.closest('.form-section-card').after(fieldsDiv);
            }
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleServiceFormSubmit(form, 'خدمة النشر العلمي');
    });
}

// ═══════════════════════════════════════════
//  3. خدمة الترجمة الأكاديمية
// ═══════════════════════════════════════════
function injectTranslationForm() {
    console.log('🔄 injectTranslationForm running...');
    const page = document.getElementById('page-service-translation');
    if (!page) {
        console.log('⚠️ page-service-translation not found');
        return;
    }

    page.innerHTML = `
        <div class="service-page-header">
            <div class="service-page-banner" style="background-image: url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80');">
                <div class="service-page-overlay"></div>
                <div class="service-page-title">
                    <i class="fa-solid fa-language"></i>
                    <h2>خدمات الترجمة الأكاديمية</h2>
                    <p>ترجمة احترافية للأبحاث والرسائل العلمية - عربي ↔ إنجليزي</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="translationForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> نوع الترجمة</h4>
                <div class="field-group">
                    <label>اتجاه الترجمة <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر اتجاه الترجمة...</option>
                        <option value="ar-to-en">من العربية إلى الإنجليزية</option>
                        <option value="en-to-ar">من الإنجليزية إلى العربية</option>
                        <option value="both">ترجمة في الاتجاهين</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>نوع المحتوى <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر نوع المحتوى...</option>
                        <option value="paper">ورقة علمية</option>
                        <option value="thesis">رسالة ماجستير / دكتوراه</option>
                        <option value="proposal">خطة بحث</option>
                        <option value="report">تقرير أكاديمي</option>
                        <option value="abstract">ملخص بحث فقط</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> مستوى الخدمة</h4>
                <div class="field-group">
                    <label>نوع الخدمة <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="translation_only">ترجمة فقط</option>
                        <option value="translation_editing">ترجمة + تدقيق لغوي</option>
                        <option value="translation_native">ترجمة + مراجعة Native Speaker</option>
                        <option value="editing_only">تدقيق لغوي فقط</option>
                    </select>
                </div>
                <div class="double-field">
                    <div class="field-group">
                        <label>عدد الكلمات <span class="req">*</span></label>
                        <input type="number" placeholder="أدخل عدد الكلمات..." required min="100">
                    </div>
                    <div class="field-group">
                        <label>التخصص العلمي <span class="req">*</span></label>
                        <select required id="translationSpecialization">
                            <option value="">اختر التخصص...</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> ملفات ومتطلبات</h4>
                <div class="field-group">
                    <label>المدة المطلوبة</label>
                    <select>
                        <option value="urgent_3">عاجل جداً (3 أيام)</option>
                        <option value="urgent_7">سريع (7 أيام)</option>
                        <option value="normal_14" selected>عادي (14 يوم)</option>
                        <option value="relaxed_30">مرن (30 يوم)</option>
                    </select>
                </div>
                <div class="file-upload-box" id="translationFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع الملف المراد ترجمته</p>
                    <span>PDF, Word - الحد الأقصى 25MB</span>
                    <input type="file" accept=".pdf,.docx,.doc" hidden>
                </div>
            </div>
            <button type="submit" class="submit-service-btn">
                <i class="fa-solid fa-paper-plane"></i> تقديم طلب الترجمة
            </button>
        </form>
    `;

    // ملء التخصصات
    setTimeout(() => {
        const transSpec = document.getElementById('translationSpecialization');
        if (transSpec && typeof specializationsTree !== 'undefined') {
            Object.entries(specializationsTree).forEach(([key, spec]) => {
                const og = document.createElement('optgroup');
                og.label = spec.name;
                spec.branches.forEach(b => og.innerHTML += `<option value="${b}">${b}</option>`);
                transSpec.appendChild(og);
            });
        }
    }, 100);

    const fileBox = document.getElementById('translationFileUpload');
    if (fileBox) initFileUploadBox(fileBox);

    const form = document.getElementById('translationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmit(form, 'خدمة الترجمة الأكاديمية');
        });
    }
    console.log('✅ Translation form injected');
}

// ═══════════════════════════════════════════
//  4. خدمة التحليل الإحصائي
// ═══════════════════════════════════════════
function injectStatisticsForm() {
    console.log('🔄 injectStatisticsForm running...');
    const page = document.getElementById('page-service-statistics');
    if (!page) return;

    page.innerHTML = `
        <div class="service-page-header">
            <div class="service-page-banner" style="background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80');">
                <div class="service-page-overlay"></div>
                <div class="service-page-title">
                    <i class="fa-solid fa-chart-pie"></i>
                    <h2>خدمات التحليل الإحصائي</h2>
                    <p>تحليل احترافي باستخدام SPSS, R, Python, AMOS</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="statisticsForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> معلومات البيانات</h4>
                <div class="field-group">
                    <label>نوع الدراسة <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="quantitative">دراسة كمية (استبيان / أرقام)</option>
                        <option value="qualitative">دراسة نوعية (مقابلات / نصوص)</option>
                        <option value="mixed">دراسة مختلطة</option>
                    </select>
                </div>
                <div class="double-field">
                    <div class="field-group">
                        <label>حجم العينة <span class="req">*</span></label>
                        <input type="number" placeholder="عدد المشاركين" required min="10">
                    </div>
                    <div class="field-group">
                        <label>البرنامج المفضل</label>
                        <select>
                            <option value="">أريد توصيتكم</option>
                            <option value="spss">SPSS</option>
                            <option value="r">R</option>
                            <option value="python">Python</option>
                            <option value="amos">AMOS</option>
                            <option value="smartpls">SmartPLS</option>
                            <option value="nvivo">NVivo</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> التحليلات المطلوبة</h4>
                <div class="checkbox-services">
                    <label class="check-service"><input type="checkbox" checked> الإحصاء الوصفي</label>
                    <label class="check-service"><input type="checkbox"> اختبار T-Test</label>
                    <label class="check-service"><input type="checkbox"> تحليل التباين ANOVA</label>
                    <label class="check-service"><input type="checkbox"> Chi-Square</label>
                    <label class="check-service"><input type="checkbox"> تحليل الارتباط</label>
                    <label class="check-service"><input type="checkbox"> تحليل الانحدار</label>
                    <label class="check-service"><input type="checkbox"> التحليل العاملي</label>
                    <label class="check-service"><input type="checkbox"> نمذجة SEM</label>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> ملفات</h4>
                <div class="file-upload-box" id="statisticsFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع ملف البيانات</p>
                    <span>Excel, CSV, SPSS (.sav)</span>
                    <input type="file" multiple accept=".xlsx,.csv,.sav" hidden>
                </div>
            </div>
            <button type="submit" class="submit-service-btn">
                <i class="fa-solid fa-paper-plane"></i> تقديم طلب التحليل
            </button>
        </form>
    `;

    const fileBox = document.getElementById('statisticsFileUpload');
    if (fileBox) initFileUploadBox(fileBox);

    const form = document.getElementById('statisticsForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmit(form, 'خدمة التحليل الإحصائي');
        });
    }
    console.log('✅ Statistics form injected');
}

// ═══════════════════════════════════════════
//  5. خدمة فحص الاقتباس
// ═══════════════════════════════════════════
function injectPlagiarismForm() {
    console.log('🔄 injectPlagiarismForm running...');
    const page = document.getElementById('page-service-plagiarism');
    if (!page) return;

    page.innerHTML = `
        <div class="service-page-header">
            <div class="service-page-banner" style="background-image: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80');">
                <div class="service-page-overlay"></div>
                <div class="service-page-title">
                    <i class="fa-solid fa-check-double"></i>
                    <h2>خدمات فحص الاقتباس</h2>
                    <p>فحص دقيق باستخدام Turnitin و iThenticate</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="plagiarismForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> نوع الفحص</h4>
                <div class="field-group">
                    <label>أداة الفحص <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="turnitin">Turnitin (للرسائل)</option>
                        <option value="ithenticate">iThenticate (للأبحاث)</option>
                        <option value="both">كلا الأداتين</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>نوع المحتوى <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="thesis">رسالة ماجستير / دكتوراه</option>
                        <option value="paper">ورقة علمية</option>
                        <option value="proposal">خطة بحث</option>
                        <option value="chapter">فصل محدد</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> الخدمات</h4>
                <div class="checkbox-services">
                    <label class="check-service"><input type="checkbox" checked> فحص الاقتباس</label>
                    <label class="check-service"><input type="checkbox"> إعادة صياغة أكاديمية</label>
                    <label class="check-service"><input type="checkbox"> تدقيق المراجع</label>
                    <label class="check-service"><input type="checkbox"> تنسيق المراجع</label>
                </div>
                <div class="double-field" style="margin-top:14px;">
                    <div class="field-group">
                        <label>نظام التوثيق</label>
                        <select>
                            <option>APA 7th</option>
                            <option>Harvard</option>
                            <option>Vancouver</option>
                        </select>
                    </div>
                    <div class="field-group">
                        <label>النسبة المستهدفة</label>
                        <select>
                            <option value="below_5">أقل من 5%</option>
                            <option value="below_10">أقل من 10%</option>
                            <option value="below_20" selected>أقل من 20%</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> رفع الملف</h4>
                <div class="file-upload-box" id="plagiarismFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع الملف المراد فحصه</p>
                    <span>PDF, Word - 30MB</span>
                    <input type="file" accept=".pdf,.docx,.doc" hidden>
                </div>
            </div>
            <button type="submit" class="submit-service-btn">
                <i class="fa-solid fa-paper-plane"></i> تقديم طلب الفحص
            </button>
        </form>
    `;

    const fileBox = document.getElementById('plagiarismFileUpload');
    if (fileBox) initFileUploadBox(fileBox);

    const form = document.getElementById('plagiarismForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmit(form, 'خدمة فحص الاقتباس');
        });
    }
    console.log('✅ Plagiarism form injected');
}

// ═══════════════════════════════════════════
//  6. خدمة مشاريع التخرج
// ═══════════════════════════════════════════
function injectGraduationForm() {
    console.log('🔄 injectGraduationForm running...');
    const page = document.getElementById('page-service-graduation');
    if (!page) return;

    page.innerHTML = `
        <div class="service-page-header">
            <div class="service-page-banner" style="background-image: url('https://images.unsplash.com/photo-1523050854058-8df90910b683?w=1200&q=80');">
                <div class="service-page-overlay"></div>
                <div class="service-page-title">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <h2>خدمات مشاريع التخرج</h2>
                    <p>مساعدة متكاملة في مشاريع التخرج لجميع التخصصات</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="graduationForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> معلومات المشروع</h4>
                <div class="double-field">
                    <div class="field-group">
                        <label>المرحلة الدراسية <span class="req">*</span></label>
                        <select required>
                            <option value="">اختر...</option>
                            <option value="diploma">دبلوم</option>
                            <option value="bachelor">بكالوريوس</option>
                        </select>
                    </div>
                    <div class="field-group">
                        <label>التخصص <span class="req">*</span></label>
                        <select required id="graduationSpecialization">
                            <option value="">اختر التخصص...</option>
                        </select>
                    </div>
                </div>
                <div class="field-group">
                    <label>نوع المشروع <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="research">مشروع بحثي</option>
                        <option value="software">مشروع برمجي</option>
                        <option value="design">مشروع تصميم</option>
                        <option value="experiment">مشروع تجريبي</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> مرحلة المشروع</h4>
                <div class="field-group">
                    <label>في أي مرحلة أنت؟ <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="idea">لم أختر الفكرة بعد</option>
                        <option value="proposal">أحتاج خطة المشروع</option>
                        <option value="implementation">أحتاج تنفيذ المشروع</option>
                        <option value="report">أحتاج كتابة التقرير</option>
                        <option value="full">مساعدة كاملة</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>فكرة المشروع</label>
                    <textarea rows="3" placeholder="صف فكرة مشروعك..."></textarea>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> ملفات</h4>
                <div class="file-upload-box" id="graduationFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع الملفات المتعلقة</p>
                    <span>متطلبات الجامعة، كود، صور...</span>
                    <input type="file" multiple hidden>
                </div>
            </div>
            <button type="submit" class="submit-service-btn">
                <i class="fa-solid fa-paper-plane"></i> تقديم طلب المشروع
            </button>
        </form>
    `;

    setTimeout(() => {
        const specSelect = document.getElementById('graduationSpecialization');
        if (specSelect && typeof specializationsTree !== 'undefined') {
            Object.entries(specializationsTree).forEach(([key, spec]) => {
                const og = document.createElement('optgroup');
                og.label = spec.name;
                spec.branches.forEach(b => og.innerHTML += `<option value="${b}">${b}</option>`);
                specSelect.appendChild(og);
            });
        }
    }, 100);

    const fileBox = document.getElementById('graduationFileUpload');
    if (fileBox) initFileUploadBox(fileBox);

    const form = document.getElementById('graduationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmit(form, 'خدمة مشاريع التخرج');
        });
    }
    console.log('✅ Graduation form injected');
}

// ═══════════════════════════════════════════
//  وظائف مساعدة
// ═══════════════════════════════════════════

function initFileUploadBox(boxElement) {
    const fileInput = boxElement.querySelector('input[type="file"]');
    if (!fileInput) return;

    boxElement.addEventListener('click', (e) => {
        if (e.target !== fileInput) fileInput.click();
    });

    boxElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        boxElement.style.borderColor = 'var(--primary)';
        boxElement.style.background = 'var(--primary-bg)';
    });

    boxElement.addEventListener('dragleave', () => {
        boxElement.style.borderColor = 'var(--gray-300)';
        boxElement.style.background = 'var(--gray-50)';
    });

    boxElement.addEventListener('drop', (e) => {
        e.preventDefault();
        boxElement.style.borderColor = 'var(--gray-300)';
        boxElement.style.background = 'var(--gray-50)';
        handleFileSelection(boxElement, e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => {
        handleFileSelection(boxElement, fileInput.files);
    });
}

function handleFileSelection(boxElement, files) {
    if (!files || files.length === 0) return;

    const existingList = boxElement.parentElement.querySelector('.uploaded-files-list');
    if (existingList) existingList.remove();

    const fileList = document.createElement('div');
    fileList.className = 'uploaded-files-list';

    Array.from(files).forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'uploaded-file-item';
        fileItem.innerHTML = `
            <i class="fa-solid fa-file-lines"></i>
            <span>${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
            <button type="button" class="remove-file-btn">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        fileItem.querySelector('.remove-file-btn').addEventListener('click', () => {
            fileItem.remove();
            if (fileList.children.length === 0) {
                fileList.remove();
                boxElement.classList.remove('has-files');
            }
        });
        fileList.appendChild(fileItem);
    });

    boxElement.after(fileList);
    boxElement.classList.add('has-files');
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
}

function handleServiceFormSubmit(form, serviceName) {
    console.log('📤 Submitting form:', serviceName);
    
    // إرسال للإيميل
    if (typeof sendFormToEmail === 'function') {
        sendFormToEmail(form, serviceName);
    }
    
    const submitBtn = form.querySelector('.submit-service-btn');
    if (!submitBtn) return;
    
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ إرسال الطلب...';

    setTimeout(() => {
        form.reset();
        form.querySelectorAll('.uploaded-files-list').forEach(el => el.remove());
        form.querySelectorAll('.file-upload-box').forEach(box => box.classList.remove('has-files'));

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // إضافة إشعار
        if (typeof addNotification === 'function') {
            addNotification('success', `تم تقديم طلب "${serviceName}" بنجاح!`, 'fa-circle-check', '#10B981');
        }

        // تحديث الواجهة
        if (typeof loadOrders === 'function') setTimeout(() => loadOrders(), 500);
        if (typeof loadDashboardContent === 'function') setTimeout(() => loadDashboardContent(), 500);

        // تحويل للطلبات
        setTimeout(() => {
            if (typeof navigateTo === 'function') navigateTo('myOrders');
        }, 1500);

    }, 1500);
}

// تصدير الدوال للوصول الشامل
window.injectTranslationForm = injectTranslationForm;
window.injectStatisticsForm = injectStatisticsForm;
window.injectPlagiarismForm = injectPlagiarismForm;
window.injectGraduationForm = injectGraduationForm;
window.initAllServiceForms = initAllServiceForms;

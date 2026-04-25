/* ═══════════════════════════════════════════
   AcademiaHub - Services Logic
   ═══════════════════════════════════════════ */

// ── Initialize All Service Forms ──
function initAllServiceForms() {
    initThesisForm();
    initPublicationForm();
    injectTranslationForm();
    injectStatisticsForm();
    injectPlagiarismForm();
    injectGraduationForm();
}

// ═══════════════════════════════════════════
//  1. خدمة الرسائل الجامعية
// ═══════════════════════════════════════════
function initThesisForm() {
    const form = document.getElementById('thesisForm');
    if (!form) return;

    // ملء التخصصات
    const specSelect = document.getElementById('thesisSpecialization');
    if (specSelect) {
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

    // تفعيل رفع الملفات
    const fileBox = document.getElementById('thesisFileUpload');
    if (fileBox) {
        initFileUploadBox(fileBox);
    }

    // تقديم النموذج
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

    // إظهار/إخفاء حقول إضافية حسب حالة البحث
    const paperStatus = document.getElementById('paperStatus');
    if (paperStatus) {
        paperStatus.addEventListener('change', function() {
            const additionalFields = document.getElementById('publicationAdditionalFields');
            if (this.value === 'idea' || this.value === 'none') {
                if (!additionalFields) {
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
                            <input type="number" placeholder="مثال: 5000">
                        </div>
                        <div class="field-group">
                            <label>وصف مختصر لفكرة البحث</label>
                            <textarea rows="3" placeholder="صف فكرة بحثك باختصار..."></textarea>
                        </div>
                    `;
                    this.closest('.form-section-card').after(fieldsDiv);
                }
            } else {
                if (additionalFields) {
                    additionalFields.remove();
                }
            }
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleServiceFormSubmit(form, 'خدمة النشر العلمي');
    });
}

// ═══════════════════════════════════════════
//  3. خدمة الترجمة الأكاديمية (حقن ديناميكي)
// ═══════════════════════════════════════════
function injectTranslationForm() {
    const page = document.getElementById('page-service-translation');
    if (!page) return;

    page.innerHTML = `
        <div class="service-page-header">
            <div class="service-page-banner" style="background-image: url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80');">
                <div class="service-page-overlay"></div>
                <div class="service-page-title">
                    <i class="fa-solid fa-language"></i>
                    <h2>خدمات الترجمة الأكاديمية</h2>
                    <p>ترجمة احترافية للأبحاث والرسائل العلمية</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="translationForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> نوع الترجمة</h4>
                <div class="field-group">
                    <label>اتجاه الترجمة <span class="req">*</span></label>
                    <select required id="translationDirection">
                        <option value="">اختر...</option>
                        <option value="ar-to-en">من العربية إلى الإنجليزية</option>
                        <option value="en-to-ar">من الإنجليزية إلى العربية</option>
                        <option value="both">ترجمة في الاتجاهين</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>نوع المحتوى <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="paper">ورقة علمية</option>
                        <option value="thesis">رسالة ماجستير / دكتوراه</option>
                        <option value="proposal">خطة بحث</option>
                        <option value="report">تقرير أكاديمي</option>
                        <option value="abstract">ملخص بحث فقط</option>
                        <option value="other">محتوى آخر</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> مستوى الترجمة</h4>
                <div class="field-group">
                    <label>نوع الخدمة المطلوبة <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="translation_only">ترجمة فقط</option>
                        <option value="translation_editing">ترجمة + تدقيق لغوي</option>
                        <option value="translation_native">ترجمة + مراجعة متحدث أصلي (Native)</option>
                        <option value="editing_only">تدقيق لغوي فقط (لدي ترجمة جاهزة)</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>عدد الكلمات التقريبي <span class="req">*</span></label>
                    <input type="number" placeholder="أدخل عدد الكلمات..." required min="100">
                </div>
                <div class="field-group">
                    <label>التخصص العلمي</label>
                    <select id="translationSpecialization">
                        <option value="">اختر التخصص...</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> ملفات ومتطلبات</h4>
                <div class="field-group">
                    <label>المدة المطلوبة</label>
                    <select>${deadlineOptions.map(d => `<option value="${d.value}">${d.label}</option>`).join('')}</select>
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

    // تهيئة التخصصات
    const transSpec = document.getElementById('translationSpecialization');
    if (transSpec) {
        Object.entries(specializationsTree).forEach(([key, spec]) => {
            const og = document.createElement('optgroup');
            og.label = spec.name;
            spec.branches.forEach(b => og.innerHTML += `<option value="${b}">${b}</option>`);
            transSpec.appendChild(og);
        });
    }

    // تهيئة رفع الملفات
    const fileBox = document.getElementById('translationFileUpload');
    if (fileBox) initFileUploadBox(fileBox);

    // تقديم النموذج
    const form = document.getElementById('translationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmit(form, 'خدمة الترجمة الأكاديمية');
        });
    }
}

// ═══════════════════════════════════════════
//  4. خدمة التحليل الإحصائي (حقن ديناميكي)
// ═══════════════════════════════════════════
function injectStatisticsForm() {
    const page = document.getElementById('page-service-statistics');
    if (!page) return;

    page.innerHTML = `
        <div class="service-page-header">
            <div class="service-page-banner" style="background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80');">
                <div class="service-page-overlay"></div>
                <div class="service-page-title">
                    <i class="fa-solid fa-chart-pie"></i>
                    <h2>خدمات التحليل الإحصائي</h2>
                    <p>تحليل احترافي للبيانات باستخدام أحدث الأدوات الإحصائية</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="statisticsForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> معلومات البيانات</h4>
                <div class="field-group">
                    <label>نوع الدراسة <span class="req">*</span></label>
                    <select required id="studyType">
                        <option value="">اختر...</option>
                        <option value="quantitative">دراسة كمية (استبيان / أرقام)</option>
                        <option value="qualitative">دراسة نوعية (مقابلات / نصوص)</option>
                        <option value="mixed">دراسة مختلطة (كمي + نوعي)</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>حجم العينة التقريبي <span class="req">*</span></label>
                    <input type="number" placeholder="عدد المشاركين أو المشاهدات" required min="10">
                </div>
                <div class="field-group">
                    <label>البرنامج الإحصائي المفضل</label>
                    <select id="statsSoftware">
                        <option value="">غير محدد</option>
                        <option value="spss">SPSS</option>
                        <option value="r">R</option>
                        <option value="python">Python</option>
                        <option value="stata">STATA</option>
                        <option value="amos">AMOS</option>
                        <option value="smartpls">SmartPLS</option>
                        <option value="nvivo">NVivo (للبيانات النوعية)</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> التحليلات المطلوبة</h4>
                <div class="checkbox-services" id="statsCheckboxes">
                    <label class="check-service"><input type="checkbox" checked> الإحصاء الوصفي (متوسطات، انحرافات، تكرارات)</label>
                    <label class="check-service"><input type="checkbox"> اختبار T لعينة واحدة / عينتين</label>
                    <label class="check-service"><input type="checkbox"> تحليل التباين ANOVA</label>
                    <label class="check-service"><input type="checkbox"> اختبار Chi-Square</label>
                    <label class="check-service"><input type="checkbox"> تحليل الارتباط (Correlation)</label>
                    <label class="check-service"><input type="checkbox"> تحليل الانحدار (Regression)</label>
                    <label class="check-service"><input type="checkbox"> التحليل العاملي (Factor Analysis)</label>
                    <label class="check-service"><input type="checkbox"> نمذجة SEM / Path Analysis</label>
                    <label class="check-service"><input type="checkbox"> تحليل الثبات (Cronbach's Alpha)</label>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> ملفات ومتطلبات</h4>
                <div class="field-group">
                    <label>نظام التوثيق</label>
                    <select>${citationStyles.map(c => `<option>${c}</option>`).join('')}</select>
                </div>
                <div class="file-upload-box" id="statisticsFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع ملف البيانات (Excel, CSV, SPSS)</p>
                    <span>يمكنك أيضاً رفع الاستبيان إن وجد</span>
                    <input type="file" multiple accept=".xlsx,.csv,.sav,.xls" hidden>
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
}

// ═══════════════════════════════════════════
//  5. خدمة فحص الاقتباس (حقن ديناميكي)
// ═══════════════════════════════════════════
function injectPlagiarismForm() {
    const page = document.getElementById('page-service-plagiarism');
    if (!page) return;

    page.innerHTML = `
        <div class="service-page-header">
            <div class="service-page-banner" style="background-image: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80');">
                <div class="service-page-overlay"></div>
                <div class="service-page-title">
                    <i class="fa-solid fa-check-double"></i>
                    <h2>خدمات فحص الاقتباس</h2>
                    <p>فحص دقيق لنسبة الاقتباس وإعادة الصياغة الأكاديمية</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="plagiarismForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> نوع الفحص</h4>
                <div class="field-group">
                    <label>أداة الفحص المطلوبة <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="turnitin">Turnitin (للرسائل الجامعية)</option>
                        <option value="ithenticate">iThenticate (للأبحاث العلمية)</option>
                        <option value="both">الفحص بكلا الأداتين</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>حالة المحتوى</label>
                    <select id="plagiarismContentStatus">
                        <option value="have">لدي محتوى جاهز للفحص</option>
                        <option value="need_paraphrase">أحتاج إعادة صياغة بعد الفحص</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> الخدمات الإضافية</h4>
                <div class="checkbox-services">
                    <label class="check-service"><input type="checkbox" checked> فحص نسبة الاقتباس</label>
                    <label class="check-service"><input type="checkbox"> إعادة صياغة أكاديمية لتقليل النسبة</label>
                    <label class="check-service"><input type="checkbox"> تدقيق الاستشهادات المرجعية</label>
                    <label class="check-service"><input type="checkbox"> تنسيق المراجع حسب النظام المطلوب</label>
                </div>
                <div class="field-group" style="margin-top: 14px;">
                    <label>نظام التوثيق</label>
                    <select>${citationStyles.map(c => `<option>${c}</option>`).join('')}</select>
                </div>
                <div class="field-group">
                    <label>النسبة المستهدفة للاقتباس</label>
                    <select>
                        <option value="below_5">أقل من 5%</option>
                        <option value="below_10">أقل من 10%</option>
                        <option value="below_15">أقل من 15%</option>
                        <option value="below_20" selected>أقل من 20%</option>
                        <option value="below_25">أقل من 25%</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> رفع الملف</h4>
                <div class="file-upload-box" id="plagiarismFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع الملف المراد فحصه</p>
                    <span>PDF, Word - الحد الأقصى 30MB</span>
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
}

// ═══════════════════════════════════════════
//  6. خدمة مشاريع التخرج (حقن ديناميكي)
// ═══════════════════════════════════════════
function injectGraduationForm() {
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
                <div class="field-group">
                    <label>المرحلة الدراسية <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="diploma">دبلوم</option>
                        <option value="bachelor">بكالوريوس</option>
                        <option value="higher-diploma">دبلوم عالي</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>التخصص <span class="req">*</span></label>
                    <select required id="graduationSpecialization">
                        <option value="">اختر التخصص...</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>نوع المشروع <span class="req">*</span></label>
                    <select required id="graduationProjectType">
                        <option value="">اختر...</option>
                        <option value="research">مشروع بحثي</option>
                        <option value="software">مشروع برمجي / تطبيق</option>
                        <option value="design">مشروع تصميم / معماري</option>
                        <option value="experiment">مشروع تجريبي / معملي</option>
                        <option value="survey">مشروع مسحي / استبيان</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> مرحلة المشروع</h4>
                <div class="field-group">
                    <label>في أي مرحلة أنت؟ <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر...</option>
                        <option value="idea">لم أختر الفكرة بعد - أحتاج اقتراح أفكار</option>
                        <option value="proposal">أحتاج كتابة خطة المشروع</option>
                        <option value="implementation">أحتاج مساعدة في تنفيذ المشروع</option>
                        <option value="report">لدي مشروع منفذ وأحتاج كتابة التقرير</option>
                        <option value="full">أحتاج مساعدة كاملة من الفكرة حتى التقرير</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>فكرة المشروع (إن وجدت)</label>
                    <textarea rows="3" placeholder="صف فكرة مشروعك باختصار..."></textarea>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> متطلبات إضافية</h4>
                <div class="field-group">
                    <label>لغة التقرير</label>
                    <select>
                        <option value="arabic">العربية</option>
                        <option value="english">الإنجليزية</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>موعد التسليم النهائي</label>
                    <input type="date">
                </div>
                <div class="file-upload-box" id="graduationFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع أي ملفات متعلقة بالمشروع</p>
                    <span>متطلبات الجامعة، كود، تصميمات، إلخ</span>
                    <input type="file" multiple hidden>
                </div>
            </div>
            <button type="submit" class="submit-service-btn">
                <i class="fa-solid fa-paper-plane"></i> تقديم طلب المشروع
            </button>
        </form>
    `;

    // ملء التخصصات
    const specSelect = document.getElementById('graduationSpecialization');
    if (specSelect) {
        Object.entries(specializationsTree).forEach(([key, spec]) => {
            const og = document.createElement('optgroup');
            og.label = spec.name;
            spec.branches.forEach(b => og.innerHTML += `<option value="${b}">${b}</option>`);
            specSelect.appendChild(og);
        });
    }

    const fileBox = document.getElementById('graduationFileUpload');
    if (fileBox) initFileUploadBox(fileBox);

    const form = document.getElementById('graduationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmit(form, 'خدمة مشاريع التخرج');
        });
    }
}

// ═══════════════════════════════════════════
//  وظائف مساعدة مشتركة
// ═══════════════════════════════════════════

// ── رفع الملفات ──
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

    // إزالة قائمة الملفات السابقة
    const existingList = boxElement.parentElement.querySelector('.uploaded-files-list');
    if (existingList) existingList.remove();

    // إنشاء قائمة الملفات الجديدة
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
        fileItem.querySelector('.remove-file-btn').addEventListener('click', () => fileItem.remove());
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

// ── تقديم النموذج ──
function handleServiceFormSubmit(form, serviceName) {
    const submitBtn = form.querySelector('.submit-service-btn');
    const originalText = submitBtn.innerHTML;

    // تعطيل الزر وإظهار التحميل
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ تقديم الطلب...';

    // محاكاة إرسال
    setTimeout(() => {
        // إظهار رسالة نجاح
        const existingMsg = form.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        const msgEl = document.createElement('div');
        msgEl.className = 'form-message success show';
        msgEl.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            تم تقديم طلبك "${serviceName}" بنجاح!
            <br><small>سنقوم بتقييم طلبك والتواصل معك خلال 24 ساعة.</small>
        `;
        form.appendChild(msgEl);

        // إعادة تعيين النموذج
        form.reset();
        // إزالة قوائم الملفات
        form.querySelectorAll('.uploaded-files-list').forEach(el => el.remove());
        form.querySelectorAll('.file-upload-box').forEach(box => box.classList.remove('has-files'));

        // إعادة تمكين الزر
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // إخفاء الرسالة بعد 5 ثواني
        setTimeout(() => {
            msgEl.classList.remove('show');
            setTimeout(() => msgEl.remove(), 300);
        }, 5000);

        // تحويل إلى صفحة الطلبات بعد ثانيتين
        setTimeout(() => {
            if (typeof navigateTo === 'function') {
                navigateTo('myOrders');
            }
        }, 2000);

    }, 1800);
}

// ── تحديث التخصصات في جميع النماذج ──
function updateAllSpecializationSelects() {
    // تحديث select elements التي تم إنشاؤها ديناميكياً
    const allSpecSelects = document.querySelectorAll('select[id$="Specialization"]');
    allSpecSelects.forEach(select => {
        if (select.options.length <= 1) {
            Object.entries(specializationsTree).forEach(([key, spec]) => {
                const og = document.createElement('optgroup');
                og.label = spec.name;
                spec.branches.forEach(b => og.innerHTML += `<option value="${b}">${b}</option>`);
                select.appendChild(og);
            });
        }
    });
}

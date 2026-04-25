/* ═══════════════════════════════════════════
   AcademiaHub - Services Logic
   تحديث: جميع نماذج الخدمات موجودة
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
    const page = document.getElementById('page-service-translation');
    if (!page) return;

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
                        <option value="paper">ورقة علمية (Research Paper)</option>
                        <option value="thesis">رسالة ماجستير / دكتوراه</option>
                        <option value="proposal">خطة بحث (Proposal)</option>
                        <option value="report">تقرير أكاديمي</option>
                        <option value="abstract">ملخص بحث فقط (Abstract)</option>
                        <option value="chapter">فصل محدد من الرسالة</option>
                        <option value="other">محتوى أكاديمي آخر</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> مستوى الترجمة</h4>
                <div class="field-group">
                    <label>نوع الخدمة المطلوبة <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر مستوى الخدمة...</option>
                        <option value="translation_only">ترجمة فقط</option>
                        <option value="translation_editing">ترجمة + تدقيق لغوي</option>
                        <option value="translation_native">ترجمة + مراجعة متحدث أصلي (Native Speaker)</option>
                        <option value="editing_only">تدقيق لغوي فقط (لدي ترجمة جاهزة)</option>
                    </select>
                </div>
                <div class="double-field">
                    <div class="field-group">
                        <label>عدد الكلمات التقريبي <span class="req">*</span></label>
                        <input type="number" placeholder="أدخل عدد الكلمات..." required min="100">
                    </div>
                    <div class="field-group">
                        <label>عدد الصفحات التقريبي</label>
                        <input type="number" placeholder="عدد الصفحات..." min="1">
                    </div>
                </div>
                <div class="field-group">
                    <label>التخصص العلمي <span class="req">*</span></label>
                    <select required id="translationSpecialization">
                        <option value="">اختر التخصص...</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> الملفات والمتطلبات</h4>
                <div class="field-group">
                    <label>المدة المطلوبة</label>
                    <select>
                        <option value="urgent_3">عاجل جداً (3 أيام)</option>
                        <option value="urgent_5">عاجل (5 أيام)</option>
                        <option value="urgent_7">سريع (7 أيام)</option>
                        <option value="normal_14" selected>عادي (14 يوم)</option>
                        <option value="relaxed_21">مرن (21 يوم)</option>
                        <option value="relaxed_30">مرن جداً (30 يوم)</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>ملاحظات إضافية</label>
                    <textarea rows="3" placeholder="أي ملاحظات خاصة بالترجمة، مصطلحات محددة، تفضيلات..."></textarea>
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

    const fileBox = document.getElementById('translationFileUpload');
    if (fileBox) initFileUploadBox(fileBox);

    const form = document.getElementById('translationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmit(form, 'خدمة الترجمة الأكاديمية');
        });
    }
}

// ═══════════════════════════════════════════
//  4. خدمة التحليل الإحصائي
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
                    <p>تحليل احترافي للبيانات باستخدام SPSS, R, Python, AMOS</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="statisticsForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> معلومات الدراسة</h4>
                <div class="field-group">
                    <label>نوع الدراسة <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر نوع الدراسة...</option>
                        <option value="quantitative">دراسة كمية (استبيان / بيانات رقمية)</option>
                        <option value="qualitative">دراسة نوعية (مقابلات / تحليل محتوى)</option>
                        <option value="mixed">دراسة مختلطة (كمي + نوعي)</option>
                    </select>
                </div>
                <div class="double-field">
                    <div class="field-group">
                        <label>حجم العينة <span class="req">*</span></label>
                        <input type="number" placeholder="عدد المشاركين" required min="10">
                    </div>
                    <div class="field-group">
                        <label>عدد المتغيرات</label>
                        <input type="number" placeholder="عدد المتغيرات في الدراسة" min="1">
                    </div>
                </div>
                <div class="field-group">
                    <label>البرنامج الإحصائي المفضل</label>
                    <select>
                        <option value="">غير محدد - أريد توصيتكم</option>
                        <option value="spss">SPSS</option>
                        <option value="r">R Programming</option>
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
                <div class="checkbox-services">
                    <label class="check-service"><input type="checkbox" checked> الإحصاء الوصفي (متوسطات، انحرافات، تكرارات)</label>
                    <label class="check-service"><input type="checkbox"> اختبار T (T-Test)</label>
                    <label class="check-service"><input type="checkbox"> تحليل التباين (ANOVA)</label>
                    <label class="check-service"><input type="checkbox"> اختبار Chi-Square</label>
                    <label class="check-service"><input type="checkbox"> تحليل الارتباط (Correlation)</label>
                    <label class="check-service"><input type="checkbox"> تحليل الانحدار (Regression)</label>
                    <label class="check-service"><input type="checkbox"> التحليل العاملي (Factor Analysis)</label>
                    <label class="check-service"><input type="checkbox"> نمذجة المعادلات الهيكلية (SEM)</label>
                    <label class="check-service"><input type="checkbox"> تحليل المسار (Path Analysis)</label>
                    <label class="check-service"><input type="checkbox"> تحليل الثبات (Cronbach's Alpha)</label>
                    <label class="check-service"><input type="checkbox"> تحليل الوساطة والاعتدال (Mediation & Moderation)</label>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> ملفات ومتطلبات</h4>
                <div class="field-group">
                    <label>فرضيات الدراسة (إن وجدت)</label>
                    <textarea rows="3" placeholder="اذكر فرضيات دراستك إن وجدت..."></textarea>
                </div>
                <div class="field-group">
                    <label>نظام التوثيق</label>
                    <select>
                        <option>APA 7th Edition</option>
                        <option>Harvard</option>
                        <option>Vancouver</option>
                        <option>Chicago</option>
                        <option>IEEE</option>
                    </select>
                </div>
                <div class="file-upload-box" id="statisticsFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع ملف البيانات والاستبيان</p>
                    <span>Excel, CSV, SPSS (.sav), PDF</span>
                    <input type="file" multiple accept=".xlsx,.csv,.sav,.xls,.pdf" hidden>
                </div>
            </div>
            <button type="submit" class="submit-service-btn">
                <i class="fa-solid fa-paper-plane"></i> تقديم طلب التحليل الإحصائي
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
//  5. خدمة فحص الاقتباس
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
                    <p>فحص دقيق لنسبة الاقتباس باستخدام Turnitin و iThenticate</p>
                </div>
            </div>
        </div>
        <form class="service-specific-form" id="plagiarismForm">
            <div class="form-section-card">
                <h4><span class="step-badge">1</span> نوع الفحص</h4>
                <div class="field-group">
                    <label>أداة الفحص المطلوبة <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر أداة الفحص...</option>
                        <option value="turnitin">Turnitin (للرسائل الجامعية)</option>
                        <option value="ithenticate">iThenticate (للأبحاث العلمية)</option>
                        <option value="both">الفحص بكلا الأداتين</option>
                        <option value="recommend">أريد توصيتكم بالأداة المناسبة</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>نوع المحتوى المراد فحصه <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر نوع المحتوى...</option>
                        <option value="thesis">رسالة ماجستير / دكتوراه</option>
                        <option value="paper">ورقة علمية للنشر</option>
                        <option value="proposal">خطة بحث</option>
                        <option value="chapter">فصل محدد</option>
                        <option value="article">مقال أكاديمي</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> الخدمات المطلوبة</h4>
                <div class="checkbox-services">
                    <label class="check-service"><input type="checkbox" checked> فحص نسبة الاقتباس</label>
                    <label class="check-service"><input type="checkbox"> إعادة صياغة أكاديمية لتقليل النسبة</label>
                    <label class="check-service"><input type="checkbox"> تدقيق الاستشهادات المرجعية</label>
                    <label class="check-service"><input type="checkbox"> تنسيق المراجع حسب النظام المطلوب</label>
                    <label class="check-service"><input type="checkbox"> تقرير مفصل بنتائج الفحص</label>
                </div>
                <div class="double-field" style="margin-top: 14px;">
                    <div class="field-group">
                        <label>نظام التوثيق المعتمد</label>
                        <select>
                            <option>APA 7th Edition</option>
                            <option>Harvard</option>
                            <option>Vancouver</option>
                            <option>Chicago</option>
                            <option>IEEE</option>
                            <option>MLA</option>
                        </select>
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
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">3</span> رفع الملف</h4>
                <div class="field-group">
                    <label>عدد الكلمات التقريبي</label>
                    <input type="number" placeholder="عدد الكلمات..." min="500">
                </div>
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
//  6. خدمة مشاريع التخرج
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
                <div class="double-field">
                    <div class="field-group">
                        <label>المرحلة الدراسية <span class="req">*</span></label>
                        <select required>
                            <option value="">اختر المرحلة...</option>
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
                </div>
                <div class="field-group">
                    <label>نوع المشروع <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر نوع المشروع...</option>
                        <option value="research">مشروع بحثي</option>
                        <option value="software">مشروع برمجي / تطبيق</option>
                        <option value="design">مشروع تصميم / معماري</option>
                        <option value="experiment">مشروع تجريبي / معملي</option>
                        <option value="survey">مشروع مسحي / استبيان</option>
                        <option value="business_plan">خطة عمل / دراسة جدوى</option>
                    </select>
                </div>
            </div>
            <div class="form-section-card">
                <h4><span class="step-badge">2</span> مرحلة المشروع</h4>
                <div class="field-group">
                    <label>في أي مرحلة أنت؟ <span class="req">*</span></label>
                    <select required>
                        <option value="">اختر المرحلة الحالية...</option>
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
                <div class="double-field">
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
                </div>
                <div class="field-group">
                    <label>متطلبات خاصة من الجامعة</label>
                    <textarea rows="2" placeholder="أي متطلبات خاصة أو نموذج محدد من جامعتك..."></textarea>
                </div>
                <div class="file-upload-box" id="graduationFileUpload">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>ارفع أي ملفات متعلقة بالمشروع</p>
                    <span>متطلبات الجامعة، كود، تصميمات، مراجع...</span>
                    <input type="file" multiple accept=".pdf,.docx,.doc,.pptx,.zip,.rar" hidden>
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

// ── تقديم النموذج ──
function handleServiceFormSubmit(form, serviceName) {
    // إرسال النموذج للإيميل
    if (typeof sendFormToEmail === 'function') {
        sendFormToEmail(form, serviceName);
    }
    
    const submitBtn = form.querySelector('.submit-service-btn');
    if (!submitBtn) return;
    
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ إرسال الطلب...';

    setTimeout(() => {
        // إعادة تعيين النموذج
        form.reset();
        form.querySelectorAll('.uploaded-files-list').forEach(el => el.remove());
        form.querySelectorAll('.file-upload-box').forEach(box => box.classList.remove('has-files'));

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // إضافة إشعار للمستخدم
        if (typeof addNotification === 'function') {
            addNotification('success', `تم تقديم طلب "${serviceName}" بنجاح!`, 'fa-circle-check', '#10B981');
        }

        // تحديث الطلبات
        if (typeof loadOrders === 'function') {
            setTimeout(() => loadOrders(), 500);
        }
        if (typeof loadDashboardContent === 'function') {
            setTimeout(() => loadDashboardContent(), 500);
        }

        // التحويل لصفحة الطلبات
        setTimeout(() => {
            if (typeof navigateTo === 'function') {
                navigateTo('myOrders');
            }
        }, 1500);

    }, 1500);
    }

/* ═══════════════════════════════════════════
   AcademiaHub - Data Layer
   ═══════════════════════════════════════════ */

// ── Specializations Tree ──
const specializationsTree = {
    medical: {
        name: 'الطب والعلوم الصحية',
        icon: 'fa-stethoscope',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
        branches: [
            'الطب البشري', 'طب الأسنان', 'الصيدلة', 'التمريض',
            'الصحة العامة', 'العلاج الطبيعي', 'المختبرات الطبية',
            'الأشعة والتصوير الطبي', 'التخدير', 'طب العيون',
            'الجراحة العامة', 'طب الأطفال', 'الأمراض الجلدية'
        ]
    },
    engineering: {
        name: 'الهندسة',
        icon: 'fa-gears',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
        branches: [
            'الهندسة المدنية', 'الهندسة المعمارية', 'الهندسة الكهربائية',
            'الهندسة الميكانيكية', 'هندسة البرمجيات', 'علوم الحاسوب',
            'الذكاء الاصطناعي', 'الأمن السيبراني', 'هندسة البيانات',
            'الهندسة الكيميائية', 'هندسة النفط', 'هندسة الطيران'
        ]
    },
    science: {
        name: 'العلوم الطبيعية والبحتة',
        icon: 'fa-flask',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80',
        branches: [
            'الفيزياء', 'الكيمياء', 'الأحياء', 'الرياضيات',
            'الإحصاء', 'علوم البيئة', 'الجيولوجيا', 'الفلك'
        ]
    },
    social: {
        name: 'العلوم الاجتماعية',
        icon: 'fa-users-gear',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
        branches: [
            'علم الاجتماع', 'علم النفس', 'الخدمة الاجتماعية',
            'العلوم السياسية', 'الإعلام والاتصال', 'الأنثروبولوجيا'
        ]
    },
    humanities: {
        name: 'العلوم الإنسانية والتربوية',
        icon: 'fa-book',
        image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&q=80',
        branches: [
            'التاريخ', 'الفلسفة', 'الأدب العربي', 'الأدب الإنجليزي',
            'اللغويات', 'الدراسات الإسلامية', 'التربية', 'الجغرافيا'
        ]
    },
    business: {
        name: 'الإدارة والاقتصاد',
        icon: 'fa-chart-line',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
        branches: [
            'إدارة الأعمال', 'التسويق', 'المحاسبة', 'التمويل',
            'الاقتصاد', 'نظم المعلومات الإدارية', 'الموارد البشرية'
        ]
    },
    law: {
        name: 'القانون والأنظمة',
        icon: 'fa-scale-balanced',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
        branches: [
            'القانون العام', 'القانون الخاص', 'القانون الجنائي',
            'القانون التجاري', 'القانون الدولي', 'الأنظمة'
        ]
    }
};

// ── Experts Database (30+ Experts) ──
const expertsDatabase = [
    // ═══ الطب والعلوم الصحية ═══
    {
        id: 1,
        name: 'أ.د. عبدالرحمن القحطاني',
        title: 'أستاذ دكتور',
        specialization: 'الطب البشري - الباطنية',
        category: 'medical',
        rating: 4.9,
        completedProjects: 62,
        experience: '15 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
        bio: 'استشاري باطنية، ناشر في دوريات طبية عالمية، محكم في مجلات Scopus'
    },
    {
        id: 2,
        name: 'د. نورة الشمري',
        title: 'دكتورة',
        specialization: 'طب الأسنان - تقويم',
        category: 'medical',
        rating: 4.8,
        completedProjects: 38,
        experience: '10 سنوات',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80',
        bio: 'أخصائية تقويم أسنان، باحثة في مواد طب الأسنان الحيوية'
    },
    {
        id: 3,
        name: 'د. فيصل المطيري',
        title: 'دكتور',
        specialization: 'الصيدلة السريرية',
        category: 'medical',
        rating: 4.7,
        completedProjects: 45,
        experience: '12 سنة',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80',
        bio: 'صيدلي سريري، خبير في اقتصاديات الدواء والتجارب السريرية'
    },
    {
        id: 4,
        name: 'د. منى العتيبي',
        title: 'دكتورة',
        specialization: 'التمريض - عناية مركزة',
        category: 'medical',
        rating: 4.6,
        completedProjects: 29,
        experience: '8 سنوات',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80',
        bio: 'ممرضة ممارسة متقدمة، باحثة في جودة الرعاية الصحية'
    },
    {
        id: 5,
        name: 'أ.د. خالد السبيعي',
        title: 'أستاذ دكتور',
        specialization: 'الصحة العامة - وبائيات',
        category: 'medical',
        rating: 4.9,
        completedProjects: 55,
        experience: '18 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80',
        bio: 'خبير وبائيات، مستشار منظمة الصحة العالمية سابقاً'
    },

    // ═══ الهندسة ═══
    {
        id: 6,
        name: 'د. سارة الأحمدي',
        title: 'دكتورة',
        specialization: 'الذكاء الاصطناعي وتعلم الآلة',
        category: 'engineering',
        rating: 4.9,
        completedProjects: 48,
        experience: '11 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
        bio: 'باحثة في التعلم العميق، ناشرة في مؤتمرات NeurIPS و ICML'
    },
    {
        id: 7,
        name: 'د. عمر الحربي',
        title: 'دكتور',
        specialization: 'الهندسة المدنية - إنشاءات',
        category: 'engineering',
        rating: 4.8,
        completedProjects: 41,
        experience: '13 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
        bio: 'مهندس استشاري، خبير في تحليل المنشآت والخرسانة المسلحة'
    },
    {
        id: 8,
        name: 'د. ليلى القاسم',
        title: 'دكتورة',
        specialization: 'الهندسة الكهربائية - اتصالات',
        category: 'engineering',
        rating: 4.7,
        completedProjects: 35,
        experience: '9 سنوات',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
        bio: 'متخصصة في شبكات الجيل الخامس ومعالجة الإشارات'
    },
    {
        id: 9,
        name: 'د. محمد العمري',
        title: 'دكتور',
        specialization: 'الأمن السيبراني',
        category: 'engineering',
        rating: 4.8,
        completedProjects: 52,
        experience: '14 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80',
        bio: 'خبير أمن معلومات، حاصل على شهادات CISSP و CEH'
    },
    {
        id: 10,
        name: 'د. فاطمة الزهراني',
        title: 'دكتورة',
        specialization: 'الهندسة المعمارية - تخطيط عمراني',
        category: 'engineering',
        rating: 4.6,
        completedProjects: 27,
        experience: '8 سنوات',
        badge: 'silver',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80',
        bio: 'معمارية وباحثة في المدن الذكية والاستدامة'
    },
    {
        id: 11,
        name: 'د. أحمد الشهري',
        title: 'دكتور',
        specialization: 'الهندسة الميكانيكية - طاقة متجددة',
        category: 'engineering',
        rating: 4.7,
        completedProjects: 33,
        experience: '10 سنوات',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
        bio: 'باحث في الطاقة الشمسية وكفاءة الأنظمة الحرارية'
    },

    // ═══ العلوم الطبيعية ═══
    {
        id: 12,
        name: 'د. محمد القحطاني',
        title: 'دكتور',
        specialization: 'الإحصاء وتحليل البيانات',
        category: 'science',
        rating: 4.8,
        completedProjects: 58,
        experience: '16 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        bio: 'إحصائي محترف، خبير في SPSS و R و Python للنمذجة'
    },
    {
        id: 13,
        name: 'د. عبير الرشيدي',
        title: 'دكتورة',
        specialization: 'الكيمياء التحليلية',
        category: 'science',
        rating: 4.6,
        completedProjects: 24,
        experience: '7 سنوات',
        badge: 'silver',
        avatar: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&q=80',
        bio: 'كيميائية متخصصة في التحليل الآلي والكروماتوغرافيا'
    },
    {
        id: 14,
        name: 'د. طارق الشمري',
        title: 'دكتور',
        specialization: 'الأحياء الجزيئية',
        category: 'science',
        rating: 4.7,
        completedProjects: 31,
        experience: '9 سنوات',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
        bio: 'باحث في التقنية الحيوية والهندسة الوراثية'
    },
    {
        id: 15,
        name: 'د. هبة اليوسف',
        title: 'دكتورة',
        specialization: 'الفيزياء الطبية',
        category: 'science',
        rating: 4.5,
        completedProjects: 19,
        experience: '5 سنوات',
        badge: 'bronze',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
        bio: 'فيزيائية طبية متخصصة في العلاج الإشعاعي'
    },

    // ═══ العلوم الاجتماعية ═══
    {
        id: 16,
        name: 'د. عبدالله المطيري',
        title: 'دكتور',
        specialization: 'علم الاجتماع',
        category: 'social',
        rating: 4.7,
        completedProjects: 36,
        experience: '12 سنة',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        bio: 'باحث في التغير الاجتماعي والتنمية المجتمعية'
    },
    {
        id: 17,
        name: 'د. سلمى الحربي',
        title: 'دكتورة',
        specialization: 'علم النفس السريري',
        category: 'social',
        rating: 4.8,
        completedProjects: 42,
        experience: '11 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        bio: 'أخصائية نفسية إكلينيكية، باحثة في الصحة النفسية'
    },
    {
        id: 18,
        name: 'د. وليد القحطاني',
        title: 'دكتور',
        specialization: 'العلوم السياسية والعلاقات الدولية',
        category: 'social',
        rating: 4.5,
        completedProjects: 22,
        experience: '8 سنوات',
        badge: 'silver',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
        bio: 'محلل سياسي وباحث في الشؤون الدولية'
    },
    {
        id: 19,
        name: 'د. نادية العجمي',
        title: 'دكتورة',
        specialization: 'الإعلام والاتصال',
        category: 'social',
        rating: 4.6,
        completedProjects: 28,
        experience: '9 سنوات',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
        bio: 'باحثة في الإعلام الرقمي وتحليل المحتوى'
    },

    // ═══ العلوم الإنسانية ═══
    {
        id: 20,
        name: 'د. ليلى العتيبي',
        title: 'دكتورة',
        specialization: 'الأدب العربي',
        category: 'humanities',
        rating: 4.7,
        completedProjects: 25,
        experience: '10 سنوات',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
        bio: 'أستاذة الأدب العربي، متخصصة في النقد الأدبي'
    },
    {
        id: 21,
        name: 'د. إبراهيم الدوسري',
        title: 'دكتور',
        specialization: 'التاريخ الإسلامي',
        category: 'humanities',
        rating: 4.5,
        completedProjects: 18,
        experience: '7 سنوات',
        badge: 'silver',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80',
        bio: 'مؤرخ متخصص في التاريخ الإسلامي والحضارة'
    },
    {
        id: 22,
        name: 'د. فاطمة اليامي',
        title: 'دكتورة',
        specialization: 'الدراسات الإسلامية - الفقه',
        category: 'humanities',
        rating: 4.8,
        completedProjects: 30,
        experience: '13 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=200&q=80',
        bio: 'باحثة في الفقه وأصوله، محكمة في مجلات علمية'
    },
    {
        id: 23,
        name: 'د. خالد العسيري',
        title: 'دكتور',
        specialization: 'اللغويات والترجمة',
        category: 'humanities',
        rating: 4.6,
        completedProjects: 40,
        experience: '15 سنة',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&q=80',
        bio: 'لغوي ومترجم معتمد، خبير في الترجمة الأكاديمية'
    },
    {
        id: 24,
        name: 'د. هناء الشهري',
        title: 'دكتورة',
        specialization: 'أصول التربية ومناهج التدريس',
        category: 'humanities',
        rating: 4.4,
        completedProjects: 15,
        experience: '5 سنوات',
        badge: 'bronze',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
        bio: 'تربوية متخصصة في تطوير المناهج وتقنيات التعليم'
    },

    // ═══ الإدارة والاقتصاد ═══
    {
        id: 25,
        name: 'د. سلطان المالكي',
        title: 'دكتور',
        specialization: 'إدارة الأعمال - استراتيجية',
        category: 'business',
        rating: 4.7,
        completedProjects: 44,
        experience: '12 سنة',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
        bio: 'خبير استراتيجية، مستشار إداري لعدة جهات حكومية'
    },
    {
        id: 26,
        name: 'د. ريم الفيصل',
        title: 'دكتورة',
        specialization: 'التسويق الرقمي',
        category: 'business',
        rating: 4.6,
        completedProjects: 32,
        experience: '8 سنوات',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=200&q=80',
        bio: 'باحثة في سلوك المستهلك والتسويق عبر المنصات الرقمية'
    },
    {
        id: 27,
        name: 'د. عبدالعزيز العنزي',
        title: 'دكتور',
        specialization: 'المحاسبة والمراجعة',
        category: 'business',
        rating: 4.5,
        completedProjects: 26,
        experience: '10 سنوات',
        badge: 'silver',
        avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&q=80',
        bio: 'محاسب قانوني، خبير في معايير المحاسبة الدولية'
    },
    {
        id: 28,
        name: 'د. نورة القحطاني',
        title: 'دكتورة',
        specialization: 'الاقتصاد والتمويل',
        category: 'business',
        rating: 4.8,
        completedProjects: 38,
        experience: '11 سنة',
        badge: 'diamond',
        avatar: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=200&q=80',
        bio: 'اقتصادية متخصصة في الاقتصاد القياسي والنمذجة المالية'
    },

    // ═══ القانون ═══
    {
        id: 29,
        name: 'د. فاطمة الزهراني',
        title: 'دكتورة',
        specialization: 'القانون الجنائي',
        category: 'law',
        rating: 4.6,
        completedProjects: 20,
        experience: '9 سنوات',
        badge: 'silver',
        avatar: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&q=80',
        bio: 'محامية وباحثة في القانون الجنائي المقارن'
    },
    {
        id: 30,
        name: 'د. محمد الدوسري',
        title: 'دكتور',
        specialization: 'القانون التجاري',
        category: 'law',
        rating: 4.7,
        completedProjects: 34,
        experience: '14 سنة',
        badge: 'gold',
        avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80',
        bio: 'مستشار قانوني، متخصص في قانون الشركات والتحكيم التجاري'
    },
    {
        id: 31,
        name: 'د. سارة العنزي',
        title: 'دكتورة',
        specialization: 'القانون الدولي',
        category: 'law',
        rating: 4.5,
        completedProjects: 16,
        experience: '6 سنوات',
        badge: 'bronze',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
        bio: 'باحثة في القانون الدولي الإنساني وحقوق الإنسان'
    }
];

// ── Library Templates ──
const libraryTemplates = [
    {
        id: 1,
        title: 'قالب خطة بحث (Research Proposal)',
        category: 'proposal',
        format: 'Word',
        iconColor: 'blue',
        description: 'نموذج احترافي لخطة البحث الأكاديمي لجميع التخصصات، يتضمن جميع الأقسام المطلوبة.',
        downloads: 2450
    },
    {
        id: 2,
        title: 'قالب رسالة ماجستير كاملة',
        category: 'thesis',
        format: 'Word',
        iconColor: 'blue',
        description: 'قالب شامل لرسالة الماجستير مع شرح تفصيلي لكل فصل وقسم.',
        downloads: 3210
    },
    {
        id: 3,
        title: 'قالب رسالة دكتوراه',
        category: 'thesis',
        format: 'Word',
        iconColor: 'blue',
        description: 'نموذج متكامل لرسالة الدكتوراه بجميع فصولها وأقسامها.',
        downloads: 1890
    },
    {
        id: 4,
        title: 'قالب ورقة علمية قابلة للنشر (LaTeX)',
        category: 'paper',
        format: 'LaTeX',
        iconColor: 'purple',
        description: 'قالب LaTeX احترافي متوافق مع متطلبات مجلات Scopus و ISI.',
        downloads: 1560
    },
    {
        id: 5,
        title: 'قالب Cover Letter للتقديم على المجلات',
        category: 'cover',
        format: 'Word',
        iconColor: 'blue',
        description: 'رسالة تغطية احترافية لمحرري المجلات العلمية، قابلة للتخصيص.',
        downloads: 980
    },
    {
        id: 6,
        title: 'قالب الرد على ملاحظات المحكمين',
        category: 'paper',
        format: 'Word',
        iconColor: 'green',
        description: 'نموذج منظم للرد على ملاحظات المحكمين بطريقة علمية واضحة.',
        downloads: 1230
    },
    {
        id: 7,
        title: 'قالب عرض تقديمي لمناقشة الرسالة',
        category: 'presentation',
        format: 'PowerPoint',
        iconColor: 'orange',
        description: 'عرض تقديمي احترافي وجذاب لمناقشة رسالة الماجستير أو الدكتوراه.',
        downloads: 4100
    },
    {
        id: 8,
        title: 'قالب استبيان بحثي',
        category: 'paper',
        format: 'Word',
        iconColor: 'blue',
        description: 'نموذج استبيان احترافي جاهز للتعديل، مع أسئلة نموذجية.',
        downloads: 2750
    },
    {
        id: 9,
        title: 'قالب مقابلة بحثية (Interview Guide)',
        category: 'paper',
        format: 'Word',
        iconColor: 'green',
        description: 'دليل مقابلة للبحوث النوعية مع أسئلة مفتوحة نموذجية.',
        downloads: 890
    },
    {
        id: 10,
        title: 'قالب تحليل البيانات الإحصائية',
        category: 'paper',
        format: 'Word',
        iconColor: 'purple',
        description: 'نموذج لعرض نتائج التحليل الإحصائي مع الجداول والرسوم البيانية.',
        downloads: 1650
    },
    {
        id: 11,
        title: 'قالب خطة بحث ماجستير (تصميم منهجي)',
        category: 'proposal',
        format: 'Word',
        iconColor: 'blue',
        description: 'نموذج خاص لمنهجية البحث الكمي والنوعي بالتفصيل.',
        downloads: 2100
    },
    {
        id: 12,
        title: 'قالب ملخص البحث (Abstract)',
        category: 'paper',
        format: 'Word',
        iconColor: 'green',
        description: 'نموذج كتابة ملخص بحثي احترافي بالعربية والإنجليزية.',
        downloads: 1340
    }
];

// ── Forum Categories ──
const forumCategories = [
    {
        id: 1,
        name: 'نقاشات عامة في البحث العلمي',
        description: 'مناقشات حول مناهج البحث وأدواته وتحدياته',
        topics: 245,
        replies: 1890,
        color: '#3B82F6',
        icon: 'fa-comments'
    },
    {
        id: 2,
        name: 'تجارب النشر في Scopus و ISI',
        description: 'شارك تجربتك واستفسر عن النشر في المجلات العالمية',
        topics: 178,
        replies: 1340,
        color: '#10B981',
        icon: 'fa-newspaper'
    },
    {
        id: 3,
        name: 'استفسارات التحليل الإحصائي',
        description: 'أسئلة حول SPSS و R و AMOS وتحليل البيانات',
        topics: 156,
        replies: 980,
        color: '#F59E0B',
        icon: 'fa-chart-pie'
    },
    {
        id: 4,
        name: 'فرص ومنح ومؤتمرات',
        description: 'إعلانات المؤتمرات والمنح الدراسية وفرص البحث',
        topics: 89,
        replies: 445,
        color: '#8B5CF6',
        icon: 'fa-bullhorn'
    },
    {
        id: 5,
        name: 'قسم التخصصات الطبية',
        description: 'مناقشات بحثية متخصصة في المجال الطبي والصحي',
        topics: 67,
        replies: 320,
        color: '#EF4444',
        icon: 'fa-stethoscope'
    },
    {
        id: 6,
        name: 'قسم الهندسة والتقنية',
        description: 'حوارات حول أبحاث الهندسة والذكاء الاصطناعي',
        topics: 92,
        replies: 510,
        color: '#06B6D4',
        icon: 'fa-microchip'
    },
    {
        id: 7,
        name: 'قصص نجاح الباحثين',
        description: 'شارك قصة نجاحك الأكاديمي وألهم الآخرين',
        topics: 45,
        replies: 280,
        color: '#EC4899',
        icon: 'fa-trophy'
    }
];

// ── Orders Sample Data ──
const sampleOrders = [
    {
        id: '#1245',
        title: 'كتابة الإطار النظري - دكتوراه في الذكاء الاصطناعي',
        serviceType: 'رسائل جامعية',
        expert: 'د. سارة الأحمدي',
        status: 'in-progress',
        progress: 60,
        date: '2024-01-15',
        price: '1,500 ريال',
        messages: 8
    },
    {
        id: '#1244',
        title: 'النشر في مجلة Scopus Q2 - بحث في الهندسة الكهربائية',
        serviceType: 'نشر علمي',
        expert: 'د. ليلى القاسم',
        status: 'in-progress',
        progress: 40,
        date: '2024-01-18',
        price: '2,800 ريال',
        messages: 5
    },
    {
        id: '#1243',
        title: 'ترجمة أكاديمية - ورقة علمية في القانون التجاري',
        serviceType: 'ترجمة',
        expert: 'د. خالد العسيري',
        status: 'review',
        progress: 85,
        date: '2024-01-10',
        price: '900 ريال',
        messages: 12
    },
    {
        id: '#1242',
        title: 'التحليل الإحصائي SPSS - استبيان ماجستير إدارة',
        serviceType: 'تحليل إحصائي',
        expert: 'د. محمد القحطاني',
        status: 'completed',
        progress: 100,
        date: '2024-01-05',
        price: '1,200 ريال',
        messages: 15
    },
    {
        id: '#1241',
        title: 'فحص الاقتباس - رسالة دكتوراه في الصيدلة',
        serviceType: 'فحص اقتباس',
        expert: 'د. فيصل المطيري',
        status: 'completed',
        progress: 100,
        date: '2023-12-28',
        price: '600 ريال',
        messages: 6
    },
    {
        id: '#1240',
        title: 'مشروع تخرج - تطبيق ويب لهندسة البرمجيات',
        serviceType: 'مشروع تخرج',
        expert: 'د. أحمد الشهري',
        status: 'completed',
        progress: 100,
        date: '2023-12-20',
        price: '3,000 ريال',
        messages: 20
    }
];

// ── Conversations ──
const sampleConversations = [
    {
        id: 1,
        name: 'د. سارة الأحمدي',
        orderId: '#1245',
        lastMessage: 'تم الانتهاء من مسودة الفصل الثاني، يرجى المراجعة',
        time: '10:30 صباحاً',
        unread: 2,
        avatar: null
    },
    {
        id: 2,
        name: 'د. ليلى القاسم',
        orderId: '#1244',
        lastMessage: 'تم اختيار مجلة مناسبة في تصنيف Q2، هل توافق؟',
        time: 'أمس',
        unread: 0,
        avatar: null
    },
    {
        id: 3,
        name: 'د. خالد العسيري',
        orderId: '#1243',
        lastMessage: 'الترجمة جاهزة للمراجعة، أرسلت لك المسودة',
        time: '2024/01/20',
        unread: 1,
        avatar: null
    },
    {
        id: 4,
        name: 'فريق الدعم الفني',
        orderId: '',
        lastMessage: 'أهلاً بك! كيف يمكننا مساعدتك اليوم؟',
        time: '2024/01/01',
        unread: 0,
        avatar: null
    }
];

// ── Notification System ──
const sampleNotifications = [
    {
        id: 1,
        type: 'success',
        icon: 'fa-circle-check',
        color: '#10B981',
        message: 'تم تسليم طلبك #1242 بنجاح',
        time: 'منذ 10 دقائق',
        read: false
    },
    {
        id: 2,
        type: 'message',
        icon: 'fa-message',
        color: '#3B82F6',
        message: 'رسالة جديدة من د. سارة الأحمدي بخصوص طلبك #1245',
        time: 'منذ ساعة',
        read: false
    },
    {
        id: 3,
        type: 'progress',
        icon: 'fa-spinner',
        color: '#F59E0B',
        message: 'طلبك #1244 تقدم بنسبة 40%',
        time: 'منذ 3 ساعات',
        read: false
    },
    {
        id: 4,
        type: 'info',
        icon: 'fa-calendar-check',
        color: '#8B5CF6',
        message: 'موعد التسليم المتوقع لطلبك #1245 هو 25 يناير',
        time: 'منذ يوم',
        read: true
    },
    {
        id: 5,
        type: 'success',
        icon: 'fa-star',
        color: '#F59E0B',
        message: 'شكراً لتقييمك للخبير د. محمد القحطاني',
        time: 'منذ يومين',
        read: true
    }
];

// ── Sub-Services Configuration ──
const subServicesConfig = {
    'thesis': [
        'اختيار عنوان الرسالة',
        'صياغة الإشكالية وأسئلة البحث',
        'إعداد خطة البحث (Proposal)',
        'الإطار النظري',
        'مراجعة الأدبيات (Literature Review)',
        'تصميم المنهجية',
        'تحليل البيانات',
        'التدقيق اللغوي والأكاديمي',
        'التنسيق النهائي حسب دليل الجامعة',
        'مساعدة في كتابة فصل محدد'
    ],
    'publication': [
        'اختيار المجلة المناسبة',
        'تحليل نطاق المجلات (Scope Matching)',
        'تنسيق البحث حسب قالب المجلة',
        'كتابة Cover Letter',
        'إدارة عملية التقديم',
        'متابعة التحكيم (Peer Review)',
        'الرد على المحكمين',
        'إعادة التقديم (Resubmission)',
        'ترجمة البحث قبل النشر'
    ],
    'translation': [
        'ترجمة أكاديمية من العربية للإنجليزية',
        'ترجمة أكاديمية من الإنجليزية للعربية',
        'تدقيق لغوي أكاديمي (Proofreading)',
        'تحسين الأسلوب الأكاديمي',
        'Native English Editing'
    ],
    'statistics': [
        'التحليل الوصفي والإحصاءات الأساسية',
        'اختبارات الفروض (T-test, ANOVA, Chi-square)',
        'تحليل الانحدار والنمذجة',
        'نمذجة المعادلات الهيكلية (SEM/PLS)',
        'التحليل العاملي (Factor Analysis)',
        'تحليل باستخدام SPSS',
        'تحليل باستخدام R',
        'تحليل البيانات النوعية (NVivo)',
        'إعداد الرسوم البيانية والجداول الإحصائية'
    ],
    'plagiarism': [
        'فحص نسبة الاقتباس باستخدام Turnitin',
        'فحص نسبة الاقتباس باستخدام iThenticate',
        'إعادة صياغة أكاديمية لتقليل الاقتباس',
        'تدقيق الاستشهادات المرجعية',
        'تنسيق المراجع حسب النظام المطلوب',
        'تقرير مفصل بنسبة الاقتباس'
    ],
    'graduation': [
        'اقتراح فكرة مشروع التخرج',
        'كتابة خطة المشروع',
        'المساعدة في تنفيذ المشروع',
        'كتابة تقرير المشروع النهائي',
        'إعداد العرض التقديمي للمناقشة',
        'مراجعة وتحسين الكود البرمجي',
        'مراجعة التصميم الهندسي'
    ]
};

// ── Citation Styles ──
const citationStyles = [
    'APA 7th Edition',
    'Harvard',
    'Vancouver',
    'Chicago',
    'IEEE',
    'MLA',
    'Oxford'
];

// ── Journal Rankings ──
const journalRankings = [
    { value: 'Q1', label: 'Q1 - المجلات الأعلى تصنيفاً (أعلى 25%)' },
    { value: 'Q2', label: 'Q2 - مجلات عالية التصنيف (25% - 50%)' },
    { value: 'Q3', label: 'Q3 - مجلات متوسطة التصنيف (50% - 75%)' },
    { value: 'Q4', label: 'Q4 - مجلات مقبولة التصنيف (أدنى 25%)' },
    { value: 'any', label: 'أي تصنيف - الأولوية للنشر' }
];

// ── Deadlines ──
const deadlineOptions = [
    { value: 'urgent_3', label: 'عاجل جداً (3 أيام)', priceMultiplier: 1.5 },
    { value: 'urgent_5', label: 'عاجل (5 أيام)', priceMultiplier: 1.3 },
    { value: 'urgent_7', label: 'سريع (7 أيام)', priceMultiplier: 1.15 },
    { value: 'normal_14', label: 'عادي (14 يوم)', priceMultiplier: 1.0 },
    { value: 'relaxed_21', label: 'مرن (21 يوم)', priceMultiplier: 0.9 },
    { value: 'relaxed_30', label: 'مرن جداً (30 يوم)', priceMultiplier: 0.85 }
];

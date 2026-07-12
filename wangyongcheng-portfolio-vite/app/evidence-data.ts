export type EvidenceItem = {
  id: string;
  title: string;
  titleEn: string;
  meta: string;
  metaEn: string;
  href: string;
  image?: string;
  document?: boolean;
  documentLabel?: string;
};

export type EvidenceCategory = {
  label: string;
  labelEn: string;
  items: EvidenceItem[];
};

export const evidenceCategories: EvidenceCategory[] = [
  {
    label: "学业与语言",
    labelEn: "Academic & Language",
    items: [
      { id: "evidence-cet4", title: "CET-4 成绩：568分", titleEn: "CET-4 Score · 568", meta: "听力177 · 阅读220 · 写作和翻译171", metaEn: "Listening 177 · Reading 220 · Writing & Translation 171", href: "/evidence/cet4-568.jpg", image: "/evidence/cet4-568.jpg" },
      { id: "evidence-second-classroom", title: "第二课堂成绩单", titleEn: "Second Classroom Record", meta: "累计81学时 · 社会实践与志愿服务26学时", metaEn: "81 total hours · 26 hours in social practice and volunteering", href: "/evidence/second-classroom-record.jpg", image: "/evidence/second-classroom-record.jpg" },
      { id: "evidence-comprehensive-english-representative", title: "综合英语课代表工作文档", titleEn: "Comprehensive English Class Representative Record", meta: "2025—2026 · 班级课程日历与事务协调", metaEn: "2025—2026 · course calendar and class coordination", href: "/evidence/comprehensive-english-representative.png", image: "/evidence/comprehensive-english-representative.png" },
    ],
  },
  {
    label: "竞赛与实践",
    labelEn: "Competition & Practice",
    items: [
      { id: "evidence-moot-court", title: "模拟法庭优胜奖", titleEn: "Moot Court Merit Award", meta: "校级竞赛 · 28支队伍第7名", metaEn: "University-level competition · 7th among 28 teams", href: "/evidence/moot-court-award-redacted.jpg", image: "/evidence/moot-court-award-redacted.jpg" },
      { id: "evidence-speech", title: "英语演讲比赛二等奖", titleEn: "English Speech · Second Prize", meta: "The Window and the Stone · 84.33分", metaEn: "The Window and the Stone · 84.33", href: "/evidence/speech-second-prize.jpg", image: "/evidence/speech-second-prize.jpg" },
      { id: "evidence-livestream", title: "跨境英文直播团体二等奖", titleEn: "Cross-border Livestream · Team Second Prize", meta: "英语专业认知实习 · 2026.07.06", metaEn: "English major practicum · 2026.07.06", href: "/evidence/livestream-second-prize.jpg", image: "/evidence/livestream-second-prize.jpg" },
      { id: "evidence-guocai-exam", title: "外研社“国才杯”综合赛项考场", titleEn: "FLTRP National Talent Cup · Exam Room", meta: "2025.10.12 · 校赛参赛现场", metaEn: "2025.10.12 · campus competition participation", href: "/evidence/guocai-exam-room.jpg", image: "/evidence/guocai-exam-room.jpg" },
      { id: "evidence-neccs-exam", title: "全国大学生英语竞赛考试形式", titleEn: "National English Competition · Exam Format", meta: "竞赛备考与题型参考", metaEn: "competition preparation and format reference", href: "/evidence/neccs-exam-format.jpg", image: "/evidence/neccs-exam-format.jpg" },
    ],
  },
  {
    label: "志愿服务",
    labelEn: "Volunteer Service",
    items: [
      { id: "evidence-volunteer", title: "志愿服务50小时记录", titleEn: "50 Hours of Volunteer Service", meta: "志愿四川 · 截至2026.06", metaEn: "Sichuan Volunteer Service · through 2026.06", href: "/evidence/volunteer-50-hours.jpg", image: "/evidence/volunteer-50-hours.jpg" },
      { id: "evidence-alma-mater-presentation", title: "母校返校宣讲", titleEn: "Alma Mater Outreach Presentation", meta: "2026.01.21 · 连续走进5个班级", metaEn: "2026.01.21 · presented in five classes", href: "/evidence/alma-mater-presentation.jpg", image: "/evidence/alma-mater-presentation.jpg" },
      { id: "evidence-zhouzhuang-promotion", title: "周庄古镇宣传推广", titleEn: "Zhouzhuang Ancient Town Promotion", meta: "2026.01.28 · “返家乡”志愿活动", metaEn: "2026.01.28 · Returning Home volunteer activity", href: "/evidence/zhouzhuang-scenery.jpg", image: "/evidence/zhouzhuang-scenery.jpg" },
      { id: "evidence-self-study-2025-site", title: "2025年10月自学考试考点", titleEn: "Self-Study Exam Site · October 2025", meta: "西南交通大学考点 · 现场记录", metaEn: "Southwest Jiaotong University site · field record", href: "/evidence/self-study-2025-site.jpg", image: "/evidence/self-study-2025-site.jpg" },
      { id: "evidence-self-study-2025-field", title: "2025年10月自学考试现场", titleEn: "Self-Study Exam Field Service · October 2025", meta: "考点秩序与现场服务", metaEn: "On-site coordination and service", href: "/evidence/self-study-2025-field.jpg", image: "/evidence/self-study-2025-field.jpg" },
      { id: "evidence-self-study-2026-materials", title: "2026年4月自学考试材料整理", titleEn: "Self-Study Exam Materials · April 2026", meta: "第二次考点志愿服务 · 材料现场", metaEn: "Second exam-site service · materials desk", href: "/evidence/self-study-2026-materials.jpg", image: "/evidence/self-study-2026-materials.jpg" },
      { id: "evidence-self-study-2026-volunteer", title: "2026年4月自学考试志愿服务", titleEn: "Self-Study Exam Volunteer Service · April 2026", meta: "第二次参加考点志愿服务", metaEn: "Second exam-site volunteer service", href: "/evidence/self-study-2026-volunteer.jpg", image: "/evidence/self-study-2026-volunteer.jpg" },
      { id: "evidence-childrens-day", title: "“缤纷六一，守护童心”", titleEn: "Children's Day Care Activity", meta: "2026.05.31 · 报名与活动记录", metaEn: "2026.05.31 · registration and activity record", href: "/evidence/childrens-day-registration.jpg", image: "/evidence/childrens-day-registration.jpg" },
      { id: "evidence-childrens-day-scene", title: "“缤纷六一，守护童心”现场", titleEn: "Children's Day Care Activity · On Site", meta: "2026.05.31 · 关爱活动物资与现场支持", metaEn: "2026.05.31 · activity materials and on-site support", href: "/evidence/childrens-day-supplement.jpg", image: "/evidence/childrens-day-supplement.jpg" },
      { id: "evidence-anniversary", title: "校庆志愿服务", titleEn: "University Anniversary Volunteer Service", meta: "2026.05.09 · 志愿者服装发放", metaEn: "2026.05.09 · volunteer uniform distribution", href: "/evidence/anniversary-volunteer.jpg", image: "/evidence/anniversary-volunteer.jpg" },
      { id: "evidence-transport-approval", title: "“交通·公益”审批材料", titleEn: "Transport · Public Welfare Approval", meta: "2026.04.18 · 志愿服务季材料", metaEn: "2026.04.18 · service-season materials", href: "/evidence/transport-public-welfare-approval.jpg", image: "/evidence/transport-public-welfare-approval.jpg" },
      { id: "evidence-campus-bus-1", title: "“畅行校车，语暖中外”志愿活动", titleEn: "Multilingual Campus Bus Volunteer Service", meta: "2026.06 · 校车站点服务现场", metaEn: "2026.06 · campus bus stop service", href: "/evidence/school-bus-volunteer-1.jpg", image: "/evidence/school-bus-volunteer-1.jpg" },
      { id: "evidence-campus-bus-2", title: "校园校车多语种暖心服务", titleEn: "Campus Bus Multilingual Support", meta: "2026.06 · 校车出行指引", metaEn: "2026.06 · campus bus travel guidance", href: "/evidence/school-bus-volunteer-2.jpg", image: "/evidence/school-bus-volunteer-2.jpg" },
      { id: "evidence-gongga-cup-registration", title: "“贡嘎杯”高校男排志愿服务", titleEn: "Gongga Cup Volleyball Volunteer Service", meta: "2026.04.22 · 志愿服务报名记录", metaEn: "2026.04.22 · volunteer registration record", href: "/evidence/gongga-cup-registration.jpg", image: "/evidence/gongga-cup-registration.jpg" },
      { id: "evidence-gongga-cup-venue", title: "“贡嘎杯”赛事现场", titleEn: "Gongga Cup Volleyball Venue", meta: "2026.04.22 · 高校男子排球专业组", metaEn: "2026.04.22 · university men's volleyball division", href: "/evidence/gongga-cup-venue.jpg", image: "/evidence/gongga-cup-venue.jpg" },
    ],
  },
  {
    label: "学生工作与校园活动",
    labelEn: "Student Leadership & Campus Life",
    items: [
      { id: "evidence-student-union-organization", title: "学生会组织部任职通知", titleEn: "Student Union Organization Department Appointment", meta: "2025.09 · 外国语学院学生会组织部干事", metaEn: "2025.09 · School of Foreign Languages Student Union", href: "/evidence/student-union-organization.jpg", image: "/evidence/student-union-organization.jpg" },
      { id: "evidence-welcome-gala-group", title: "学院迎新晚会", titleEn: "College Welcome Gala", meta: "2025.12.14 · “文化之声·世界回响”", metaEn: "2025.12.14 · Voices · Echoes", href: "/evidence/welcome-gala-group.jpg", image: "/evidence/welcome-gala-group.jpg" },
      { id: "evidence-welcome-gala-field", title: "学院迎新晚会现场", titleEn: "College Welcome Gala · On Site", meta: "2025.12.14 · 组织工作现场", metaEn: "2025.12.14 · event operations on site", href: "/evidence/welcome-gala-field.jpg", image: "/evidence/welcome-gala-field.jpg" },
      { id: "evidence-debate-team", title: "学院辩论队队员", titleEn: "College Debate Team Member", meta: "2025—2026 · 新生杯辩论赛", metaEn: "2025—2026 · Freshman Debate Tournament", href: "/evidence/debate-team.jpg", image: "/evidence/debate-team.jpg" },
      { id: "evidence-activity-project-department", title: "青志联活动项目部录用", titleEn: "Youth Volunteers Union Project Department", meta: "2025.09 · 活动项目部干事", metaEn: "2025.09 · Project Department member", href: "/evidence/activity-project-department.jpg", image: "/evidence/activity-project-department.jpg" },
      { id: "evidence-campus-civilization", title: "文明校园监督工作", titleEn: "Civilized Campus Supervision", meta: "活动项目部 · 校园监督与物资交接", metaEn: "Project Department · campus supervision and logistics", href: "/evidence/campus-civilization-supervision.jpg", image: "/evidence/campus-civilization-supervision.jpg" },
      { id: "evidence-class-meeting", title: "心理主题班会二等奖", titleEn: "Psychology-Themed Class Meeting · Second Prize", meta: "《压力拜拜，快乐常在》· 2026.05", metaEn: "Stress Goodbye, Happiness Always · 2026.05", href: "/evidence/class-meeting-second-prize.jpg", image: "/evidence/class-meeting-second-prize.jpg" },
      { id: "evidence-sports-signin", title: "校运动会签到管理", titleEn: "University Sports Meeting · Sign-in Management", meta: "2026.04.10 · 现场签到与秩序支持", metaEn: "2026.04.10 · sign-in and on-site coordination", href: "/evidence/sports-signin-management.jpg", image: "/evidence/sports-signin-management.jpg" },
      { id: "evidence-volunteer-assessment", title: "学院志愿者考核评分", titleEn: "College Volunteer Assessment Scoring", meta: "2025.11.02 · 考核活动评分记录", metaEn: "2025.11.02 · assessment scoring record", href: "/evidence/volunteer-assessment-scoring.jpg", image: "/evidence/volunteer-assessment-scoring.jpg" },
      { id: "evidence-wuzhou-duty", title: "“五洲风情”展会值班", titleEn: "Wuzhou Cultural Fair · Duty Record", meta: "2026.04.23 · 展位与现场值班", metaEn: "2026.04.23 · booth and on-site duty", href: "/evidence/wuzhou-duty.jpg", image: "/evidence/wuzhou-duty.jpg" },
      { id: "evidence-youth-league-membership", title: "加入中国共产主义青年团", titleEn: "Chinese Communist Youth League Membership", meta: "2026.06.04 · 团支部成员", metaEn: "2026.06.04 · Youth League branch member", href: "/evidence/youth-league-membership.jpg", image: "/evidence/youth-league-membership.jpg" },
      { id: "evidence-yunda-run-certificate", title: "“运达杯”体育节环校跑", titleEn: "Yunda Cup Campus Run", meta: "2025.11.23 · 3.31公里 · 学生组", metaEn: "2025.11.23 · 3.31 km · student division", href: "/evidence/yunda-run-certificate.jpg", image: "/evidence/yunda-run-certificate.jpg" },
      { id: "evidence-yunda-run-route", title: "“运达杯”环校跑路线", titleEn: "Yunda Cup Campus Run · Route", meta: "2025.11.23 · 户外跑步记录", metaEn: "2025.11.23 · outdoor running record", href: "/evidence/yunda-run-route.png", image: "/evidence/yunda-run-route.png" },
    ],
  },
  {
    label: "学术写作",
    labelEn: "Academic Writing",
    items: [
      { id: "evidence-ai-paper", title: "生成式AI与学习者能动性研究", titleEn: "Generative AI & Learner Agency Paper", meta: "大一下期末英文研究论文 · DOCX", metaEn: "Freshman spring research paper · DOCX", href: "/documents/ai-assisted-learning-paper.docx", document: true },
      { id: "evidence-literature-paper", title: "《死亡诗社》中的爱、控制与孝道", titleEn: "Love, Control & Filial Piety in Dead Poets Society", meta: "大一上期末英文研究论文 · DOC", metaEn: "Freshman fall research paper · DOC", href: "/documents/dead-poets-society-paper.doc", document: true },
      { id: "evidence-information-literacy-script", title: "信息茧房微视频提交脚本", titleEn: "Information Bubble Microvideo Submission Script", meta: "2026.07 · 信息素养大赛作品文档 · DOCX", metaEn: "2026.07 · information literacy competition document · DOCX", href: "/documents/information-literacy-microvideo-script.docx", document: true, documentLabel: "Competition Script" },
    ],
  },
];

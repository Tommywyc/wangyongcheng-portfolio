export type AchievementTranslation = {
  title: string;
  role: string;
  description: string;
  result?: string;
  date?: string;
};

export const periodEnglish: Record<string, string> = {
  "大一全年": "Freshman year",
  "大一上": "Freshman · Fall",
  "大一下": "Freshman · Spring",
  "大一暑假": "Freshman summer",
  "大二上": "Sophomore · Fall",
  "大二全年": "Sophomore year",
};

export const categoryEnglish: Record<string, string> = {
  "竞赛获奖": "Competition Award",
  "竞赛经历": "Competition Experience",
  "学术成果": "Academic Work",
  "学生工作": "Student Leadership",
  "志愿服务": "Volunteer Service",
  "文体经历": "Campus & Cultural Activities",
  "项目实践": "Project Practice",
  "班级荣誉": "Class Honor",
  "成长节点": "Milestone",
};

export const statusEnglish: Record<string, string> = {
  "进行中": "In progress",
  "任职中": "In office",
  "已完成": "Completed",
  "计划中": "Planned",
};

export const achievementEnglish: Record<string, AchievementTranslation> = {
  "comprehensive-english-representative": { title: "Comprehensive English Class Representative", role: "Class representative · English 2025-02", description: "Coordinated communication among the lecturer, teaching assistant and classmates throughout the year, including assignments, notices, study logistics, semester planning, classroom equipment and final-review materials." },
  "student-union-organization": { title: "Student Union Organization Department Member", role: "School of Foreign Languages Student Union", description: "Supported major school events, university activities and on-site operations throughout the freshman year." },
  "youth-volunteer-projects": { title: "Volunteer Project Department Member · Excellent Assessment", role: "SWJTU Youth Volunteers Union", description: "Supported campus-civility supervision, materials handover, volunteer-project delivery and documentation from September 2025 to July 2026. The official student leadership certificate records an Excellent performance assessment.", result: "Performance assessment: Excellent" },
  "cet4": { title: "College English Test Band 4 (CET-4)", role: "CET-4 candidate", description: "Written-test score: 568, comprising listening 177, reading 220, and writing and translation 171. The speaking-test grade was Good.", result: "CET-4 · 568 · Speaking: Good", date: "Score confirmed" },
  "cet6": { title: "College English Test Band 6 (CET-6)", role: "CET-6 candidate", description: "Results were released on August 24, 2026. Written-test score: 521, comprising listening 190, reading 191, and writing and translation 140.", result: "CET-6 · 521", date: "2026.08.24 · Results released" },
  "debate-team": { title: "College Debate Team Member", role: "Student Development Association · Debate Team", description: "Competed in the freshman debate tournament and helped the School of Foreign Languages reach the final eight." },
  "volunteer-hours": { title: "50 Hours of Volunteer Service", role: "Cumulative service record", description: "Recorded 50 volunteer hours on the Sichuan Volunteer platform and 81 second-classroom hours, including 26 hours in social practice and volunteering.", date: "As of 2026.06" },
  "welcome-gala": { title: "College Welcome Gala Operations", role: "Student Union Organization Department", description: "Helped organize a School of Foreign Languages welcome gala for several hundred participants." },
  "self-study-exam-oct": { title: "Self-Study Examination Site Service", role: "Volunteer · SWJTU examination site", description: "Provided on-site volunteer support for the National Higher Education Self-Study Examination." },
  "volunteer-assessment": { title: "Youth Volunteer Association Assessment", role: "Assessment scorer", description: "Scored an assessment activity for the Youth Volunteer Association of the School of Computing and Artificial Intelligence." },
  "fltrp-guocai": { title: "FLTRP National Talent Cup · Integrated Skills", role: "University-round Silver Award recipient", description: "Received the Silver Award in the English Integrated Skills event at the university round of the 2025 FLTRP National Talent Cup Understanding Contemporary China National College Students Foreign Language Proficiency Competition.", result: "Silver Award · English Integrated Skills · University round" },
  "yunda-run": { title: "5th Yunda Cup Campus Run", role: "Participant", description: "Completed the 2025 Southwest Jiaotong University Yunda Cup campus run." },
  "dead-poets-society-paper": { title: "Freshman Fall English Research Paper", role: "Author", description: "Used Dead Poets Society to examine tensions among love, control and filial piety.", result: "Research focus: parent-child relationships and emotional control in literature" },
  "alma-mater-presentation": { title: "Five-Class Alma Mater Outreach", role: "Returning-school presenter", description: "Returned to my former school and spoke in five classes about university learning and personal growth." },
  "hometown-zhouzhuang": { title: "Zhouzhuang Ancient Town Promotion", role: "Returning Home volunteer", description: "Promoted Zhouzhuang Ancient Town in Suzhou through a Returning Home volunteer program." },
  "sports-meeting": { title: "University Sports Meeting Operations", role: "Student Union Organization Department", description: "Handled materials, attendance counts and on-site order during the university sports meeting." },
  "wuzhou-style": { title: "Wuzhou Cultural Fair", role: "Student Union Organization Department", description: "Supported venue setup and booth duty for the Wuzhou Cultural Fair." },
  "self-study-exam-apr": { title: "Self-Study Examination Site Service", role: "Volunteer · SWJTU examination site", description: "Returned for a second round of volunteer service at the National Higher Education Self-Study Examination site." },
  "childrens-day": { title: "Colorful Children's Day Care Activity", role: "Activity volunteer", description: "Supported a community Children's Day care activity." },
  "anniversary-uniforms": { title: "SWJTU 130th Anniversary Volunteer Service", role: "Anniversary volunteer", description: "Helped distribute uniforms for anniversary volunteers." },
  "transport-public-welfare": { title: "Transport · Public Welfare Service Season", role: "Project documentation support", description: "Helped organize application materials for the volunteer-service season." },
  "gongga-cup": { title: "6th Sichuan Gongga Cup Men's University Volleyball", role: "Event volunteer", description: "Provided volunteer support for the professional men's university volleyball division." },
  "moot-court": { title: "Quest Cup Moot Court", role: "Moot court team member", description: "Competed in the university-level Quest Cup moot court organized by the School of Public Administration.", result: "Merit Award · 7th among 28 teams" },
  "neccs": { title: "National English Competition for College Students", role: "Participant", description: "Participated in the competition; did not advance to the next stage." },
  "window-stone": { title: "The Window and the Stone", role: "English speech contestant", description: "Used a Suzhou garden window and the Yungang Grottoes to explore how cultural exchange changes the ways people see and create.", result: "Second Prize · English practicum speech competition · 84.33" },
  "qionglai-livestream": { title: "Cross-border English Livestream for Qionglai Heritage Liquor", role: "Cross-border e-commerce practicum team member", description: "Supported English script backup, live transitions and supplementary explanations during a cross-border e-commerce livestream.", result: "Team Second Prize" },
  "ai-learning-gap-paper": { title: "Freshman Spring English Research Paper", role: "Author", description: "Completed an approximately 2,990-word, 11-page paper on learner agency, skill development and educational equity through literature review, mechanism analysis and counterargument.", result: "Research focus: generative AI, learner agency and educational equity" },
  "ai-education-digital-ethics": { title: "AI in Education and Digital Ethics", role: "Researcher", description: "Researching educational equity, learner agency, data responsibility and digital ethics as generative AI enters learning environments." },
  "generative-ai-image-authorship": { title: "Work Status and Human Originality in Generative AI Images", role: "Researcher", description: "Examining whether generative AI images qualify as works and how human contributions to originality can be identified and assessed." },
  "information-literacy": { title: "We Are Not Arguing—The Algorithm Is Pushing Us to Argue", role: "Information literacy competition team member", description: "Produced a competition microvideo on filter bubbles, recommendation algorithms and search awareness. The competition has ended; no award was received.", result: "Information Literacy Competition · Completed without an award" },
  "class-meeting-award": { title: "Stress Goodbye, Happiness Always", role: "Class member", description: "Participated with my class in the 2026 SWJTU psychology-themed class-meeting showcase.", result: "Second Prize" },
  "league-member": { title: "Joined the Communist Youth League of China", role: "League member", description: "Officially joined the Communist Youth League of China on 4 June 2026." },
  "campus-bus-volunteer": { title: "Multilingual Campus Bus Service · Outstanding Volunteer", role: "Outstanding Volunteer", description: "Recognized for outstanding service in the 2026 multilingual campus bus volunteer project. The honor was awarded by the Communist Youth League Committee of the School of Foreign Languages, Southwest Jiaotong University, in September 2026.", result: "Outstanding Volunteer · September 2026" },
  "etic-intermediate": { title: "English Test for International Communication (ETIC) · Intermediate", role: "ETIC Intermediate candidate", description: "Achieved a Good grade in the ETIC Intermediate examination on August 15, 2026: oral communication 229, written communication 216, and total score 223.", result: "Good · Total score 223" },
  "course-development-minister": { title: "Course Development and Outreach Operations", role: "Head · Course Development Department, SWJTU Youth Volunteers Union", description: "Formally appointed as Head of the Course Development Department. The role covers course materials, labor-education outreach, presenter coordination, operations records, data organization and feedback improvement.", date: "From July 2026" },
};

#!/usr/bin/env python3
from pathlib import Path
import shutil

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
PUBLIC = ROOT / "public"
PHOTO = PUBLIC / "images" / "profile-formal.webp"
CN_FONT = ROOT / "assets" / "fonts" / "NotoSerifSC-Regular.ttf"

NAVY = colors.HexColor("#17283A")
BLUE = colors.HexColor("#315E91")
COPPER = colors.HexColor("#A85D3C")
PAPER = colors.HexColor("#F4F1E9")
PAPER_DEEP = colors.HexColor("#EAE5DA")
INK_SOFT = colors.HexColor("#4E5B66")
LINE = colors.HexColor("#C7C3B9")
WHITE = colors.HexColor("#FFFDF8")

pdfmetrics.registerFont(TTFont("DejaVuSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("NotoSerifSC", str(CN_FONT)))

def style(size=8.5, leading=12.7, color=INK_SOFT, font="DejaVuSans", space_after=0):
    return ParagraphStyle(
        name=f"s-{size}-{leading}-{font}-{space_after}",
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=space_after,
    )


BODY = style(size=9.2, leading=14.8)
BODY_DARK = style(size=9.2, leading=14.8, color=NAVY)
SMALL = style(size=8.0, leading=12.2)
SMALL_WHITE = style(size=8.0, leading=12.2, color=WHITE)
SECTION = style(size=10.3, leading=13.6, color=NAVY, font="DejaVuSans-Bold")
ITEM_TITLE = style(size=9.0, leading=12.0, color=NAVY, font="DejaVuSans-Bold")
CN_BODY = style(size=9.2, leading=15.5, color=INK_SOFT, font="NotoSerifSC")
CN_SMALL = style(size=8.0, leading=12.8, color=INK_SOFT, font="NotoSerifSC")
CN_SECTION = style(size=10.8, leading=15.0, color=NAVY, font="NotoSerifSC")


def para(c, text, x, y_top, width, pstyle=BODY):
    p = Paragraph(text, pstyle)
    _, h = p.wrap(width, 1000)
    p.drawOn(c, x, y_top - h)
    return y_top - h


def section(c, title, x, y_top, width):
    c.setFillColor(BLUE)
    c.rect(x, y_top - 2, 4, 14, fill=1, stroke=0)
    y = para(c, title, x + 10, y_top + 9, width - 10, SECTION)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.55)
    c.line(x, y - 5, x + width, y - 5)
    return y - 14


def bullets(c, items, x, y_top, width, gap=6, pstyle=BODY):
    y = y_top
    for item in items:
        c.setFillColor(BLUE)
        c.circle(x + 2.2, y - 5.3, 1.25, fill=1, stroke=0)
        y = para(c, item, x + 10, y, width - 10, pstyle) - gap
    return y


def draw_header(c, subtitle):
    w, h = A4
    c.setFillColor(NAVY)
    c.rect(0, h - 116, w, 116, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("DejaVuSans-Bold", 22)
    c.drawString(30, h - 48, "WANG YONGCHENG")
    c.setFont("DejaVuSans", 8.0)
    c.drawString(31, h - 66, "ENGLISH · RESEARCH · LAW")
    c.setFillColor(colors.HexColor("#ADCAE4"))
    c.setFont("DejaVuSans-Bold", 7.3)
    c.drawString(31, h - 91, subtitle.upper())
    c.setFillColor(WHITE)
    c.setFont("DejaVuSans-Bold", 7.3)
    c.drawRightString(w - 30, h - 47, "SOUTHWEST JIAOTONG UNIVERSITY")
    c.setFont("DejaVuSans", 7.0)
    c.drawRightString(w - 30, h - 66, "School of Foreign Languages · English Major")
    c.setFont("DejaVuSans", 6.9)
    c.drawRightString(w - 30, h - 91, "w3194510963@gmail.com")


def draw_sidebar(c, version):
    w, h = A4
    x, y, width, height = 28, 38, 158, h - 170
    c.setFillColor(PAPER_DEEP)
    c.rect(x, y, width, height, fill=1, stroke=0)

    image = ImageReader(str(PHOTO))
    c.drawImage(image, x + 24, h - 292, width=110, height=142, preserveAspectRatio=True, anchor="c", mask="auto")
    c.setStrokeColor(LINE)
    c.rect(x + 24, h - 292, 110, 142, fill=0, stroke=1)

    top = h - 316
    c.setFillColor(BLUE)
    c.setFont("DejaVuSans-Bold", 7.1)
    c.drawString(x + 16, top, "PROFILE")
    top -= 16
    if version == "academic":
        profile = "English major building an interdisciplinary pathway across language, law and artificial intelligence. Current priority: stronger academic standing and verifiable research outputs."
        metrics = [
            ("3.6 / 4.0", "Fall GPA"),
            ("3.8 / 4.0", "Spring GPA"),
            ("28 / 56", "Fall rank"),
            ("568", "CET-4"),
            ("2", "Research papers"),
        ]
        keywords = "Research Writing<br/>AI in Education<br/>Digital Ethics<br/>AI & Legal Translation"
    else:
        profile = "English major developing public speaking, cross-cultural communication and project coordination through competitions, campus leadership and volunteer service."
        metrics = [
            ("2", "Second prizes"),
            ("7 / 28", "Moot court rank"),
            ("50 h", "Volunteer service"),
            ("81 h", "Second classroom"),
            ("568", "CET-4"),
        ]
        keywords = "Public Speaking<br/>Cross-cultural Communication<br/>Project Coordination<br/>Volunteer Service"

    top = para(c, profile, x + 16, top, width - 32, SMALL) - 18
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 7.3)
    c.drawString(x + 16, top, "KEY NUMBERS")
    top -= 17
    for value, label in metrics:
        c.setFillColor(NAVY)
        c.setFont("DejaVuSans-Bold", 12.8)
        c.drawString(x + 16, top, value)
        c.setFillColor(INK_SOFT)
        c.setFont("DejaVuSans", 6.3)
        c.drawRightString(x + width - 16, top + 1, label)
        c.setStrokeColor(LINE)
        c.line(x + 16, top - 7, x + width - 16, top - 7)
        top -= 28

    top -= 2
    c.setFillColor(BLUE)
    c.setFont("DejaVuSans-Bold", 7.1)
    c.drawString(x + 16, top, "FOCUS")
    para(c, keywords, x + 16, top - 12, width - 32, SMALL)


def draw_footer(c, label):
    w, _ = A4
    c.setStrokeColor(LINE)
    c.line(205, 34, w - 28, 34)
    c.setFillColor(INK_SOFT)
    c.setFont("DejaVuSans", 6.5)
    c.drawString(205, 22, label)
    c.drawRightString(w - 28, 22, "Updated 2026.07")


def cn_section(c, title, x, y_top, width):
    c.setFillColor(BLUE)
    c.rect(x, y_top - 2, 4, 15, fill=1, stroke=0)
    y = para(c, title, x + 10, y_top + 9, width - 10, CN_SECTION)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.55)
    c.line(x, y - 5, x + width, y - 5)
    return y - 15


def draw_cn_header(c, subtitle):
    w, h = A4
    c.setFillColor(NAVY)
    c.rect(0, h - 116, w, 116, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("NotoSerifSC", 21)
    c.drawString(30, h - 48, "王永城")
    c.setFont("DejaVuSans", 7.5)
    c.drawString(31, h - 66, "ENGLISH · RESEARCH · LAW")
    c.setFillColor(colors.HexColor("#ADCAE4"))
    c.setFont("NotoSerifSC", 9.2)
    c.drawString(31, h - 91, subtitle)
    c.setFillColor(WHITE)
    c.setFont("NotoSerifSC", 8.8)
    c.drawRightString(w - 30, h - 47, "西南交通大学 · 外国语学院 · 英语专业")
    c.setFont("DejaVuSans", 6.9)
    c.drawRightString(w - 30, h - 66, "w3194510963@gmail.com")
    c.setFont("NotoSerifSC", 7.2)
    c.drawRightString(w - 30, h - 91, "一页中文简历 · 2026.07")


def draw_cn_sidebar(c, version):
    w, h = A4
    x, y, width, height = 28, 38, 158, h - 170
    c.setFillColor(PAPER_DEEP)
    c.rect(x, y, width, height, fill=1, stroke=0)
    image = ImageReader(str(PHOTO))
    c.drawImage(image, x + 24, h - 292, width=110, height=142, preserveAspectRatio=True, anchor="c", mask="auto")
    c.setStrokeColor(LINE)
    c.rect(x + 24, h - 292, 110, 142, fill=0, stroke=1)

    top = h - 316
    c.setFillColor(BLUE)
    c.setFont("NotoSerifSC", 8.2)
    c.drawString(x + 16, top, "个人定位")
    top -= 16
    if version == "academic":
        profile = "英语专业本科生，正以语言、法律与人工智能的交叉问题为长期发展方向。"
        metrics = [("3.6 / 4.0", "大一上 GPA"), ("3.8 / 4.0", "大一下 GPA"), ("28 / 56", "大一上排名"), ("568", "CET-4"), ("2", "英文研究论文")]
        keywords = "学业表现<br/>英文研究写作<br/>AI 教育与伦理<br/>AI 与法律翻译"
    else:
        profile = "英语专业本科生，在演讲、竞赛、学生工作与志愿服务中训练表达、协作与项目执行。"
        metrics = [("2", "二等奖成果"), ("7 / 28", "模拟法庭排名"), ("50 h", "志愿服务记录"), ("81 h", "第二课堂学时"), ("568", "CET-4")]
        keywords = "公众表达<br/>跨文化沟通<br/>项目协作<br/>志愿服务"

    top = para(c, profile, x + 16, top, width - 32, CN_SMALL) - 18
    c.setFillColor(BLUE)
    c.setFont("NotoSerifSC", 8.0)
    c.drawString(x + 16, top, "关键数据")
    top -= 17
    for value, label in metrics:
        c.setFillColor(NAVY)
        c.setFont("DejaVuSans-Bold", 12.8)
        c.drawString(x + 16, top, value)
        c.setFillColor(INK_SOFT)
        c.setFont("NotoSerifSC", 6.5)
        c.drawRightString(x + width - 16, top + 1, label)
        c.setStrokeColor(LINE)
        c.line(x + 16, top - 7, x + width - 16, top - 7)
        top -= 28
    top -= 2
    c.setFillColor(BLUE)
    c.setFont("NotoSerifSC", 8.0)
    c.drawString(x + 16, top, "能力聚焦")
    para(c, keywords, x + 16, top - 13, width - 32, CN_SMALL)


def draw_cn_footer(c, label):
    w, _ = A4
    c.setStrokeColor(LINE)
    c.line(205, 34, w - 28, 34)
    c.setFillColor(INK_SOFT)
    c.setFont("NotoSerifSC", 6.6)
    c.drawString(205, 22, label)
    c.drawRightString(w - 28, 22, "更新于 2026.07")


def academic_resume(path):
    c = canvas.Canvas(str(path), pagesize=A4)
    draw_header(c, "Academic Application Resume")
    draw_sidebar(c, "academic")
    x, width, y = 205, A4[0] - 233, A4[1] - 144

    y = section(c, "EDUCATION & ACADEMIC PROFILE", x, y, width)
    y = bullets(c, [
        "B.A. candidate in English, School of Foreign Languages, Southwest Jiaotong University. Freshman; developing an English x Law pathway with an AI research component.",
        "Fall GPA: 3.6/4.0, major rank 28/56. Spring GPA: 3.8/4.0, rank pending. CET-4: 568.",
    ], x, y, width, gap=4) - 5

    y = section(c, "SELECTED ENGLISH RESEARCH PAPERS", x, y, width)
    y = bullets(c, [
        "Does AI Equalize Learners or Widen the Gap? A 2,990-word, 11-page paper examining learner agency, skill development and educational equity through literature review and mechanism analysis.",
        "The Alienation of Love: Guilt, Control, and the Shadow of Filial Piety in Dead Poets Society. A literary analysis of parental control, guilt and emotional alienation.",
    ], x, y, width, gap=4) - 5

    y = section(c, "ONGOING RESEARCH", x, y, width)
    y = bullets(c, [
        "Semantic-association-based intelligent assessment of English writing; target: a G06F-related patent application.",
        "AI in education and digital ethics: learner agency, educational equity, data responsibility and governance.",
        "AI and legal translation: accuracy, terminology consistency and risk in contracts, regulations and patent texts.",
    ], x, y, width, gap=3.5) - 4

    y = section(c, "RELATED PRACTICE & RECOGNITION", x, y, width)
    y = bullets(c, [
        "Merit Award in the university-level Quest Cup Moot Court Competition; ranked 7th among 28 teams.",
        "Second Prize for The Window and the Stone (84.33); Team Second Prize in a cross-border English livestream practicum.",
    ], x, y, width, gap=3.5) - 4

    y = section(c, "NEXT-STAGE PRIORITIES", x, y, width)
    bullets(c, [
        "Improve GPA and major ranking; complete CET-6 and TEM-4; sustain research-oriented English writing.",
        "Build foundations in civil law, case analysis and legal English, producing substantial English x Law work.",
    ], x, y, width, gap=3.5)

    draw_footer(c, "Academic version · GPA / Ranking / Research / Papers")
    c.showPage()
    c.save()


def practice_resume(path):
    c = canvas.Canvas(str(path), pagesize=A4)
    draw_header(c, "Practice Application Resume")
    draw_sidebar(c, "practice")
    x, width, y = 205, A4[0] - 233, A4[1] - 144

    y = section(c, "EDUCATION & POSITIONING", x, y, width)
    y = bullets(c, [
        "B.A. candidate in English, School of Foreign Languages, Southwest Jiaotong University. Freshman focused on communication, rules and project collaboration.",
        "CET-4: 568. Fall GPA: 3.6/4.0. Spring GPA: 3.8/4.0.",
    ], x, y, width, gap=4) - 5

    y = section(c, "COMPETITIONS & PROJECT PRACTICE", x, y, width)
    y = bullets(c, [
        "Second Prize for the English speech The Window and the Stone (84.33), exploring cultural exchange through public speaking.",
        "Merit Award in the university-level Quest Cup Moot Court Competition; ranked 7th among 28 teams.",
        "Cross-border English livestream practicum for Qionglai intangible-cultural-heritage liquor; supported scripts, transitions and supplementary explanations; Team Second Prize.",
    ], x, y, width, gap=3.5) - 4

    y = section(c, "CAMPUS LEADERSHIP", x, y, width)
    y = bullets(c, [
        "Comprehensive English class representative (freshman year): course communication, assignment coordination and final-review materials.",
        "Organization Department member, School of Foreign Languages Student Union: supported the welcome gala, university sports meeting and multicultural campus event.",
        "Project Department member, University Youth Volunteers Union; incoming Curriculum Development Department head for sophomore fall.",
    ], x, y, width, gap=3.5) - 4

    y = section(c, "VOLUNTEER SERVICE", x, y, width)
    y = bullets(c, [
        "50 recorded volunteer hours; 81 total Second Classroom hours, including 26 hours in social practice and volunteer service.",
        "Served twice at the National Higher Education Self-Study Examination site and twice in multilingual campus shuttle support.",
        "Additional service: Gongga Cup volleyball, university anniversary, children's community care, alma mater outreach and hometown promotion.",
    ], x, y, width, gap=3.5) - 4

    y = section(c, "WORKING STYLE", x, y, width)
    bullets(c, [
        "Structured in public speaking, live transitions and cross-cultural communication; turns tasks into reusable materials.",
        "Process-minded, responsible and reflective; suited to student organizations, volunteer projects and competition operations.",
    ], x, y, width, gap=3.5)

    draw_footer(c, "Practice version · Speech / Moot Court / Livestream / Leadership / Service")
    c.showPage()
    c.save()


def academic_resume_cn(path):
    c = canvas.Canvas(str(path), pagesize=A4)
    draw_cn_header(c, "学术申请版简历")
    draw_cn_sidebar(c, "academic")
    x, width, y = 205, A4[0] - 233, A4[1] - 144

    y = cn_section(c, "教育背景与学术概况", x, y, width)
    y = bullets(c, [
        "西南交通大学外国语学院英语专业本科生（2025年至今）。以学业表现和语言能力建立选择权，并持续推进英语 × 法律与 AI 的交叉探索。",
        "大一上 GPA 3.6/4.0，专业排名 28/56；大一下 GPA 3.8/4.0，排名待公布。CET-4 568 分。",
    ], x, y, width, gap=5, pstyle=CN_BODY) - 5

    y = cn_section(c, "英文研究论文", x, y, width)
    y = bullets(c, [
        "《Does AI Equalize Learners or Widen the Gap?》：约 2990 词、11 页，围绕学习者能动性、技能发展与教育公平完成文献综述、机制分析与反证讨论。",
        "《The Alienation of Love: Guilt, Control, and the Shadow of Filial Piety in Dead Poets Society》：分析亲子控制、负罪感与情感异化。",
    ], x, y, width, gap=5, pstyle=CN_BODY) - 5

    y = cn_section(c, "正在推进的研究", x, y, width)
    y = bullets(c, [
        "基于语义关联分析的英语作文智能评估方法：探索连贯性与表达质量评估，目标申请 G06F 相关专利。",
        "AI 教育与数字伦理：关注学习者主体性、教育公平、数据责任与治理。",
        "AI 与法律翻译：研究大模型翻译合同、法规与专利文本时的准确性、术语一致性与风险。",
    ], x, y, width, gap=4.5, pstyle=CN_BODY) - 5

    y = cn_section(c, "相关实践与成果", x, y, width)
    y = bullets(c, [
        "“求索杯”模拟法庭校级优胜奖，28 支队伍第 7 名；英语系实习活动演讲比赛二等奖，84.33 分。",
        "非遗邛崃酒跨境英文直播实训团体二等奖，负责英文台词补位、衔接救场与补充说明。",
    ], x, y, width, gap=5, pstyle=CN_BODY) - 5

    y = cn_section(c, "下一阶段重点", x, y, width)
    bullets(c, [
        "持续提升 GPA 与专业排名，完成 CET-6、TEM-4，保持研究型英文写作输出。",
        "夯实民法、案例分析与法律英语基础，形成可提交的英语 × 法律成果。",
    ], x, y, width, gap=4.5, pstyle=CN_BODY)

    draw_cn_footer(c, "学术申请版 · GPA / 排名 / 论文 / 研究方向")
    c.showPage()
    c.save()


def practice_resume_cn(path):
    c = canvas.Canvas(str(path), pagesize=A4)
    draw_cn_header(c, "实践申请版简历")
    draw_cn_sidebar(c, "practice")
    x, width, y = 205, A4[0] - 233, A4[1] - 144

    y = cn_section(c, "教育背景与定位", x, y, width)
    y = bullets(c, [
        "西南交通大学外国语学院英语专业本科生（2025年至今），在公众表达、跨文化沟通、项目协作与志愿服务中持续训练实践能力。",
        "CET-4 568 分；大一上 GPA 3.6/4.0，大一下 GPA 3.8/4.0。",
    ], x, y, width, gap=5, pstyle=CN_BODY) - 5

    y = cn_section(c, "竞赛与项目实践", x, y, width)
    y = bullets(c, [
        "《The Window and the Stone》英语演讲比赛二等奖（84.33 分），以苏州园林花窗与云冈石窟讨论文明交流。",
        "“求索杯”模拟法庭校级优胜奖，28 支队伍第 7 名；在法庭角色分工、规则理解与团队论证中完成训练。",
        "非遗邛崃酒跨境英文直播实训：承担英文台词补位、流程衔接和补充说明，团队获二等奖。",
    ], x, y, width, gap=4.5, pstyle=CN_BODY) - 5

    y = cn_section(c, "学生工作", x, y, width)
    y = bullets(c, [
        "综合英语课代表（大一全年）：课程沟通、作业协调、期末复习资料整理与组织。",
        "外国语学院学生会组织部部员：参与迎新晚会、校运动会与“五洲风情”活动的组织支持。",
        "西南交通大学青年志愿者联合会活动项目部部员；大二上拟任课程建设部部长。",
    ], x, y, width, gap=4.5, pstyle=CN_BODY) - 5

    y = cn_section(c, "志愿服务与综合素养", x, y, width)
    y = bullets(c, [
        "累计记录志愿服务 50 小时、第二课堂 81 学时，其中社会实践与志愿服务 26 学时。",
        "两次参加高等教育自学考试志愿服务；两次参与“畅行校车，语暖中外”多语种暖心志愿活动。",
        "参与贡嘎杯高校男排、校庆、儿童关爱、母校宣讲与“返家乡”古镇推广等服务。",
    ], x, y, width, gap=4.5, pstyle=CN_BODY) - 5

    y = cn_section(c, "工作方式", x, y, width)
    bullets(c, [
        "在演讲、直播与跨文化沟通中保持结构化表达；能将一次性任务整理为可复用的材料和流程。",
        "重视责任、协作与复盘，适合学生组织、志愿项目、竞赛运营与对外沟通场景。",
    ], x, y, width, gap=4.5, pstyle=CN_BODY)

    draw_cn_footer(c, "实践申请版 · 演讲 / 模拟法庭 / 直播 / 学生工作 / 志愿服务")
    c.showPage()
    c.save()


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    academic = OUTPUT / "wang-yongcheng-academic-resume.pdf"
    practice = OUTPUT / "wang-yongcheng-practice-resume.pdf"
    academic_cn = OUTPUT / "wang-yongcheng-academic-resume-cn.pdf"
    practice_cn = OUTPUT / "wang-yongcheng-practice-resume-cn.pdf"
    academic_resume(academic)
    practice_resume(practice)
    academic_resume_cn(academic_cn)
    practice_resume_cn(practice_cn)
    shutil.copyfile(academic, PUBLIC / academic.name)
    shutil.copyfile(practice, PUBLIC / practice.name)
    shutil.copyfile(academic_cn, PUBLIC / academic_cn.name)
    shutil.copyfile(practice_cn, PUBLIC / practice_cn.name)
    print(academic)
    print(practice)
    print(academic_cn)
    print(practice_cn)


if __name__ == "__main__":
    main()

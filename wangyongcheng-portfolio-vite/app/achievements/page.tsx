import AchievementsExplorer from "./AchievementsExplorer";
import BackToTopButton from "../components/BackToTopButton";

export default function AchievementsPage() {
  return (
    <main>
      <a className="skip-link" href="#archive-main">
        跳到主要内容
      </a>

      <header className="site-header archive-header">
        <a className="wordmark" href="/" aria-label="返回首页">
          <span className="wordmark-mark">WY</span>
          <span className="wordmark-name">
            王永城 <em>Wang Yongcheng</em>
          </span>
        </a>
        <nav aria-label="档案导航">
          <a href="/">首页</a>
          <a href="#archive-main">全部成就</a>
          <a href="/evidence">证据资料室</a>
          <a href="/#direction">发展方向</a>
        </nav>
      </header>

      <section className="archive-hero" id="archive-main">
        <div className="hero-grid" aria-hidden="true" />
        <p className="eyebrow">Complete archive · 2025—</p>
        <h1>
          全部成就
          <span>与经历。</span>
        </h1>
        <p>
          一份按时间生长、也可按标签阅读的个人档案。这里既保留获奖成果，也记录学生工作、志愿服务、
          学术研究与尚在推进的竞赛项目。
        </p>
        <div className="archive-hero-note">
          <strong>两种阅读方式</strong>
          <span>时间轴看成长路径</span>
          <span>标签看能力结构</span>
        </div>
      </section>

      <AchievementsExplorer />

      <BackToTopButton />

      <footer>
        <span>王永城 · Wang Yongcheng</span>
        <a href="/">返回首页</a>
        <span>Last updated · 2026.07</span>
      </footer>
    </main>
  );
}

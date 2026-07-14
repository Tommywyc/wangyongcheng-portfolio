import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://www.wangyongcheng.com/";
const shareImage = `${siteUrl}images/og-image-preview.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "王永城 Tommy｜English × Law × AI",
  description:
    "王永城，西南交通大学英语专业本科生。围绕 English × Law × AI，记录研究写作、公众表达、模拟法庭、实践经历与跨学科探索。",
  authors: [{ name: "王永城 Wang Yongcheng" }],
  creator: "王永城 Wang Yongcheng",
  applicationName: "王永城 Wang Yongcheng｜English × Law × AI",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "王永城 Tommy Wang｜ English × Law × AI",
    title: "王永城 Tommy Wang｜ English × Law × AI",
    description:
      "以语言理解世界，以规则承担责任。查看王永城的研究写作、实践成果与跨学科发展档案。",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [
      {
        url: shareImage,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "王永城个人学术作品集，聚焦 English、Law 与 AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "王永城 Tommy Wang｜ English × Law × AI",
    description:
      "以语言理解世界，以规则承担责任。查看研究写作、实践成果与跨学科发展档案。",
    images: [
      {
        url: shareImage,
        alt: "王永城个人学术作品集，聚焦 English、Law 与 AI",
      },
    ],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#17283a",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteUrl,
  name: "王永城 Tommy｜English × Law × AI",
  description:
    "王永城的个人学术与成长作品集，记录研究写作、实践成果与跨学科探索。",
  mainEntity: {
    "@type": "Person",
    name: "王永城",
    alternateName: ["Wang Yongcheng", "Tommy Wang"],
    image: `${siteUrl}images/profile-formal.webp`,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "西南交通大学",
      alternateName: "Southwest Jiaotong University",
    },
    description:
      "西南交通大学英语专业本科生，关注英语、法律与人工智能之间的跨学科联系。",
    knowsAbout: [
      "English Studies",
      "Academic Writing",
      "Public Speaking",
      "Legal English",
      "Foreign-related Rule of Law",
      "Artificial Intelligence and Education",
      "AI-assisted Writing",
      "Cross-cultural Communication",
      "Cross-disciplinary Research",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
          type="application/ld+json"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

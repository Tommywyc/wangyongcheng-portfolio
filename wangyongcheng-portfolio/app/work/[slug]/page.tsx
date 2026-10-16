import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WorkDetail from "./WorkDetail";
import { workCaseStudies, workCaseStudyBySlug } from "../../work-data";

export function generateStaticParams() {
  return workCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = workCaseStudyBySlug.get(slug);
  if (!study) return {};
  return {
    title: `${study.title.zh}｜代表成果｜王永城 Tommy`,
    description: study.question.zh,
    alternates: { canonical: `https://www.wangyongcheng.com/work/${slug}` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = workCaseStudyBySlug.get(slug);
  if (!study) notFound();
  return <WorkDetail study={study} />;
}

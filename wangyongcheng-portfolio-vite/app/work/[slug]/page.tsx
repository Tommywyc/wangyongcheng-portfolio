import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WorkDetail from "./WorkDetail";
import { workCaseStudies, workCaseStudyBySlug } from "../../work-data";
import { pageLanguage, type PageSearchParams } from "../../language";
import { bilingualMetadata } from "../../page-metadata";

export function generateStaticParams() {
  return workCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: PageSearchParams }): Promise<Metadata> {
  const { slug } = await params;
  const study = workCaseStudyBySlug.get(slug);
  if (!study) return {};
  return bilingualMetadata(`/work/${slug}`, await pageLanguage(searchParams) ?? "zh",
    { zh: `${study.title.zh}｜代表成果｜王永城 Tommy`, en: `${study.title.en}｜Selected Work｜Tommy Wang` }, study.question, true);
}

export default async function WorkPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: PageSearchParams }) {
  const { slug } = await params;
  const study = workCaseStudyBySlug.get(slug);
  if (!study) notFound();
  return <WorkDetail study={study} initialLanguage={await pageLanguage(searchParams)} />;
}

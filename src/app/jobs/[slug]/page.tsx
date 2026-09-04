import type { Metadata } from 'next';
import JobDetailView from '@/components/jobs/JobDetailView';
import FirestoreJobDetail from '@/components/jobs/FirestoreJobDetail';
import { getJobBySlug, getAllJobSlugs } from '@/data/jobs';

export async function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<'/jobs/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params;
  const job = getJobBySlug(slug);
  if (!job) return { title: 'Job' };

  return {
    title: `${job.title} — ${job.location.city}, ${job.location.provinceCode}`,
    description: job.description,
  };
}

export default async function JobDetailPage(props: PageProps<'/jobs/[slug]'>) {
  const { slug } = await props.params;
  const job = getJobBySlug(slug);

  if (job) {
    return <JobDetailView job={job} />;
  }

  return <FirestoreJobDetail slug={slug} />;
}

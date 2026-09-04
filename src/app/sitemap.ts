import type { MetadataRoute } from 'next';
import { SITE_URL, PROVINCES } from '@/lib/constants';
import { PLACEHOLDER_JOBS } from '@/data/jobs';
import { cityToSlug } from '@/lib/utils';

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'daily', priority: 1 },
  { path: '/jobs', changeFrequency: 'daily', priority: 0.9 },
  { path: '/workers', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/employers', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/locations', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/accessibility', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const jobEntries: MetadataRoute.Sitemap = PLACEHOLDER_JOBS.map((job) => ({
    url: `${SITE_URL}/jobs/${job.slug}`,
    lastModified: new Date(job.postedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const provinceEntries: MetadataRoute.Sitemap = PROVINCES.map((province) => ({
    url: `${SITE_URL}/locations/${province.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const cityEntries: MetadataRoute.Sitemap = PROVINCES.flatMap((province) =>
    province.cities.map((city) => ({
      url: `${SITE_URL}/locations/${province.slug}/${cityToSlug(city)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  );

  return [
    ...staticEntries,
    ...jobEntries,
    ...provinceEntries,
    ...cityEntries,
  ];
}

import { type MetadataRoute } from 'next';
import { ALL_TOOLS } from '@/config/tools';

const URL = 'https://papiv.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage = {
    url: URL,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };

  const toolUrls = ALL_TOOLS.map((tool) => ({
    url: `${URL}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticPages = ['/about', '/privacy-policy', '/terms'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [homepage, ...toolUrls, ...staticPages];
}

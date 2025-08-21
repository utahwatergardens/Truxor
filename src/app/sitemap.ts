import { MetadataRoute } from 'next';
import { CITIES_DATA } from './cities/cities-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pondcleanup.com'; // Replace with your actual domain
  
  // Base pages
  const basePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cities`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // City pages
  const cityPages = CITIES_DATA.map((city) => ({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...basePages, ...cityPages];
}

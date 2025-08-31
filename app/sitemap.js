import { menCategories } from '@/data/products';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fashionablemen.com';
  
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Add category pages from menCategories
  const categoryRoutes = [];
  
  // Add main categories
  Object.values(menCategories).forEach(category => {
    if (category.slug) {
      categoryRoutes.push({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
    
    // Add subcategories
    if (category.subcategories) {
      category.subcategories.forEach(subcat => {
        categoryRoutes.push({
          url: `${baseUrl}/category/${subcat.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }
  });

  return [...routes, ...categoryRoutes];
}

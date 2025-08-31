import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/CategoryPageClient';
import { menCategories } from '@/data/products';

// Helper function to find category by slug
function findCategoryBySlug(slug) {
  // Check main men's categories
  const mainCategory = Object.values(menCategories).find(cat => cat.slug === slug);
  if (mainCategory) {
    return mainCategory;
  }

  // Check subcategories within men's categories
  for (const category of Object.values(menCategories)) {
    const subcategory = category.subcategories.find(sub => sub.slug === slug);
    if (subcategory) {
      return {
        ...subcategory,
        parentCategory: category.name
      };
    }
  }

  return null;
}

// Generate metadata for category pages
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found - Fashionablemen',
    };
  }

  const categoryName = category.name;
  const parentName = category.parentCategory ? ` | ${category.parentCategory}` : '';

  return {
    title: `${categoryName}${parentName} - Men's Fashion | Fashionablemen`,
    description: `Shop premium ${categoryName.toLowerCase()} for men. Discover the latest trends and styles from top brands at Fashionablemen.`,
    openGraph: {
      title: `${categoryName}${parentName} - Men's Fashion | Fashionablemen`,
      description: `Shop premium ${categoryName.toLowerCase()} for men. Discover the latest trends and styles from top brands.`,
      url: `/category/${slug}`,
    },
    twitter: {
      title: `${categoryName}${parentName} - Men's Fashion | Fashionablemen`,
      description: `Shop premium ${categoryName.toLowerCase()} for men. Discover the latest trends and styles from top brands.`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  return <CategoryPageClient key={slug} category={category} />;
}

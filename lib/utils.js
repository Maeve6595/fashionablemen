/**
 * Add UTM tracking parameters to affiliate URLs
 */
export function addUTMParameters(url) {
  const urlObj = new URL(url);
  
  const utmParams = {
    utm_source: 'fashionablemen',
    utm_medium: 'affiliate',
    utm_campaign: 'summer-launch'
  };

  Object.entries(utmParams).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });

  return urlObj.toString();
}

/**
 * Filter products by category
 */
export function filterProducts(products, category) {
  if (!category || category === 'all') {
    return products;
  }
  
  // Check if it's a main category (parent) or subcategory
  const parentCategories = ['topwear', 'bottomwear', 'footwear', 'fashion-accessories', 'bags-luggage', 'innerwear-sleepwear', 'sports-activewear', 'gadgets'];
  
  if (parentCategories.includes(category)) {
    // Filter by main category
    return products.filter(product => product.category === category);
  } else {
    // Filter by subcategory
    return products.filter(product => product.subCategory === category);
  }
}

/**
 * Sort products based on sort option
 */
export function sortProducts(products, sortBy) {
  const sortedProducts = [...products];

  switch (sortBy) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'relevance':
    default:
      return sortedProducts;
  }
}

/**
 * Search products by name or brand
 */
export function searchProducts(products, query) {
  if (!query) return products;
  
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => {
    // Handle both 'title' and 'name' fields for compatibility
    const productName = (product.title || product.name || '').toLowerCase();
    const productBrand = (product.brand || '').toLowerCase();
    const productDescription = (product.description || '').toLowerCase();
    const productTags = (product.tags || []).join(' ').toLowerCase();
    
    return productName.includes(lowercaseQuery) ||
           productBrand.includes(lowercaseQuery) ||
           productDescription.includes(lowercaseQuery) ||
           productTags.includes(lowercaseQuery);
  });
}

/**
 * Format price as currency in Indian Rupees
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);
}

/**
 * Generate star rating display
 */
export function generateStarRating(rating) {
  // Handle missing or invalid ratings
  const validRating = rating && !isNaN(rating) ? Number(rating) : 0;
  const clampedRating = Math.max(0, Math.min(5, validRating)); // Ensure rating is between 0-5
  
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    fullStars: Math.max(0, fullStars), // Ensure no negative values
    hasHalfStar,
    emptyStars: Math.max(0, emptyStars), // Ensure no negative values
    rating: clampedRating
  };
}

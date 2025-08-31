'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchAndFilter from '@/components/SearchAndFilter';
import ProductGrid from '@/components/ProductGrid';
import products from '@/data/product.json';
import { filterProducts, sortProducts, searchProducts } from '@/lib/utils';

export default function CategoryPageClient({ category }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  
  // Use subcategory slug if it exists, otherwise use category id/slug
  const selectedCategory = category.id || category.slug;

  // Reset state when category changes
  useEffect(() => {
    setSearchQuery('');
    setSortBy('relevance');
  }, [selectedCategory]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = filterProducts(products, selectedCategory);
    filtered = searchProducts(filtered, searchQuery);
    return sortProducts(filtered, sortBy);
  }, [searchQuery, selectedCategory, sortBy]);

  const displayName = category.name;
  const parentCategory = category.parentCategory;

  // Generate attractive, category-specific descriptions
  const getCategoryDescription = (categoryName) => {
    const descriptions = {
      't-shirts': {
        primary: "Unleash your style with premium T-shirts that redefine casual comfort",
        secondary: "From classic crew necks to trendy graphics - discover tees that speak your language. Perfect fits, superior fabrics, endless possibilities."
      },
      'kurtas': {
        primary: "Embrace timeless elegance with our handpicked kurta collection",
        secondary: "Where tradition meets contemporary style. Crafted for the modern gentleman who values heritage and sophistication."
      },
      'casual-shirts': {
        primary: "Elevate your everyday with effortlessly stylish casual shirts",
        secondary: "Perfect for work, weekend, or anything in between. Premium fabrics that move with your lifestyle."
      },
      'formal-shirts': {
        primary: "Command respect with impeccably tailored formal shirts",
        secondary: "Precision-crafted for the modern professional. Where confidence meets sophistication in every stitch."
      },
      'jeans': {
        primary: "Define your attitude with premium denim that never goes out of style",
        secondary: "From classic cuts to contemporary fits - find jeans that become part of your story."
      },
      'trousers': {
        primary: "Master the art of refined dressing with expertly tailored trousers",
        secondary: "Versatile, comfortable, and always sophisticated. Your foundation for impeccable style."
      },
      'shorts': {
        primary: "Stay cool and confident with our premium shorts collection",
        secondary: "Perfect for summer adventures, gym sessions, or casual hangouts. Comfort that doesn't compromise on style."
      },
      'blazers-coats': {
        primary: "Make a statement with blazers and coats that define sophistication",
        secondary: "Your armor for success. Impeccable craftsmanship for moments that matter."
      },
      'suits': {
        primary: "Own the room with suits that embody power and elegance",
        secondary: "Precision-tailored for the man who settles for nothing less than excellence."
      },
      'ethnic-wear': {
        primary: "Celebrate heritage with contemporary ethnic wear",
        secondary: "Where cultural richness meets modern sensibility. Perfect for celebrations and special occasions."
      },
      'sneakers': {
        primary: "Step into excellence with sneakers that blend comfort and style",
        secondary: "From street style to performance - find your perfect pair for every journey."
      },
      'formal-shoes': {
        primary: "Walk with confidence in premium formal footwear",
        secondary: "Crafted for the discerning gentleman. Where quality meets sophistication in every step."
      },
      'accessories': {
        primary: "Complete your look with accessories that make the difference",
        secondary: "The finishing touches that transform good style into great style. Details that define you."
      }
    };

    const key = categoryName.toLowerCase().replace(/\s+/g, '-');
    return descriptions[key] || {
      primary: `Discover our premium ${categoryName.toLowerCase()} collection`,
      secondary: `Handpicked styles from top brands. Quality, comfort, and style in perfect harmony.`
    };
  };

  const categoryDesc = getCategoryDescription(displayName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {parentCategory && (
          <div className="mb-2">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {parentCategory}
            </span>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
          {categoryDesc.primary}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {categoryDesc.secondary}
        </p>
        
        {/* Subcategories Display */}
        {category.subcategories && category.subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {category.subcategories.map((subcategory) => (
                <motion.a
                  key={subcategory.id}
                  href={`/category/${subcategory.slug}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {subcategory.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Search and Filter */}
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={() => {}} // Disabled in category pages
        sortBy={sortBy}
        setSortBy={setSortBy}
        disableCategoryFilter={true}
      />

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> {displayName.toLowerCase()}
          {searchQuery && (
            <span> for &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;</span>
          )}
        </p>
      </motion.div>

      {/* Product Grid */}
      <ProductGrid 
        key={`${selectedCategory}-${filteredAndSortedProducts.length}`} 
        products={filteredAndSortedProducts} 
      />
    </div>
  );
}

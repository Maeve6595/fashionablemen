'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SearchAndFilter from '@/components/SearchAndFilter';
import ProductGrid from '@/components/ProductGrid';
import BrandSlider from '@/components/BrandSlider';
import products from '@/data/product.json';
import { filterProducts, sortProducts, searchProducts } from '@/lib/utils';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = filterProducts(products, selectedCategory);
    filtered = searchProducts(filtered, searchQuery);
    return sortProducts(filtered, sortBy);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Fashionable Men
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the latest trends in men&apos;s fashion with our curated collection of premium clothing and accessories.
        </p>
      </motion.div>

      {/* Brand Slider */}
      <BrandSlider />

      {/* Search and Filter */}
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> products
          {searchQuery && (
            <span> for &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;</span>
          )}
        </p>
      </motion.div>

      {/* Product Grid */}
      <ProductGrid products={filteredAndSortedProducts} />
    </div>
  );
}

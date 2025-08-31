'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { menCategories } from '@/data/products';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchAndFilter({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy,
  disableCategoryFilter = false
}) {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [activeMainCategory, setActiveMainCategory] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
        setActiveMainCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' }
  ];

  const handleMainCategoryHover = (categoryId) => {
    setActiveMainCategory(categoryId);
  };

  const toggleMobileCategory = (id) => {
    setMobileExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigation = (href, e) => {
    e.preventDefault();
    setCategoryDropdownOpen(false);
    setActiveMainCategory(null);
    setMobileExpanded({});
    router.push(href);
  };

  const getCurrentCategoryName = () => {
    // Main men's categories
    const mainCategory = Object.values(menCategories).find(cat => cat.id === selectedCategory || cat.slug === selectedCategory);
    if (mainCategory) {
      return mainCategory.name;
    }

    // Check subcategories
    for (const category of Object.values(menCategories)) {
      const subcategory = category.subcategories.find(sub => sub.id === selectedCategory || sub.slug === selectedCategory);
      if (subcategory) {
        return subcategory.name;
      }
    }

    return 'All Categories';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8">
      {/* Main Search and Category Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Category Dropdown */}
        {!disableCategoryFilter && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="flex items-center justify-between w-full md:w-64 px-4 py-3 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-lg hover:from-white hover:to-gray-50 transition-all text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-haspopup="true"
              aria-expanded={categoryDropdownOpen}
            >
              <span className="truncate">{getCurrentCategoryName()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Category Dropdown Menu */}
            <AnimatePresence>
              {categoryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-full md:w-[540px] bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[480px] overflow-hidden ring-1 ring-black/5"
                >
                  <div className="flex flex-col md:flex-row max-h-[480px]">
                    {/* Main Categories */}
                    <div className="md:w-1/2 md:border-r border-gray-200 overflow-y-auto overscroll-contain">
                      <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50/40 to-transparent sticky top-0 z-10">
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wide">Categories</h3>
                      </div>
                      <div className="space-y-0 pb-2">
                        {/* All Categories Option */}
                        <button
                          onClick={() => {
                            setSelectedCategory('all');
                            setCategoryDropdownOpen(false);
                            setActiveMainCategory(null);
                          }}
                          className={`group relative w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between ${
                            selectedCategory === 'all' ? 'bg-blue-600/10 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50'
                          }`}
                        >
                          All Categories
                        </button>

                        {/* Men's Categories */}
                        {Object.values(menCategories)
                          .filter(cat => cat.subcategories && cat.subcategories.length > 0)
                          .map((category) => {
                          const expanded = mobileExpanded[category.id];
                          return (
                            <div key={category.id} className="md:last:mb-2">
                              <button
                                onClick={() => {
                                  if (window.innerWidth < 768) {
                                    toggleMobileCategory(category.id);
                                    return;
                                  }
                                  setSelectedCategory(category.id);
                                  setCategoryDropdownOpen(false);
                                  setActiveMainCategory(null);
                                }}
                                onMouseEnter={() => handleMainCategoryHover(category.id)}
                                className={`group relative w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between rounded-none ${
                                  selectedCategory === category.id ? 'bg-blue-600/10 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50'
                                }`}
                              >
                                <span>{category.name}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : 'rotate-[-90deg] md:group-hover:translate-x-0'}`} />
                              </button>
                              {/* Mobile nested subcategory list - Fixed scrolling */}
                              <AnimatePresence initial={false}>
                                {expanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="md:hidden bg-gray-50/60 max-h-64 overflow-y-auto overscroll-contain"
                                  >
                                    <div className="py-1">
                                      {category.subcategories.map(sub => (
                                        <Link
                                          key={sub.id}
                                          href={`/category/${sub.slug}`}
                                          onClick={(e) => handleNavigation(`/category/${sub.slug}`, e)}
                                          className="block pl-8 pr-4 py-2.5 text-xs text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                        >
                                          {sub.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Subcategories - Desktop */}
                    <div className="md:w-1/2 hidden md:block overflow-y-auto overscroll-contain">
                      {activeMainCategory && (
                        <div>
                          <div className="p-3 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {menCategories[activeMainCategory]?.name}
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pr-1 no-scrollbar pb-2">
                            {menCategories[activeMainCategory]?.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.id}
                                href={`/category/${subcategory.slug}`}
                                onClick={(e) => handleNavigation(`/category/${subcategory.slug}`, e)}
                                className="group block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-md mx-1"
                              >
                                <span className="relative">
                                  {subcategory.name}
                                  <span className="absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full bg-blue-500 transition-all"></span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      {!activeMainCategory && (
                        <div className="p-8 text-center text-gray-400 text-xs tracking-wide select-none">
                          Hover a category to preview subcategories
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

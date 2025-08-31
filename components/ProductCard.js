'use client';

import Image from 'next/image';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Star, StarHalf, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { addUTMParameters, formatPrice, generateStarRating } from '@/lib/utils';
import { useState } from 'react';

export default function ProductCard({ product, priority = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { fullStars, hasHalfStar, emptyStars } = generateStarRating(product.rating);

  // Support both single image (legacy) and multiple images
  const images = product.images || (product.image ? [product.image] : ['https://via.placeholder.com/600x600.png?text=No+Image']);
  const currentImage = images[currentImageIndex] || images[0];

  // Generate consistent review count based on product ID
  const reviewCount = product.reviewCount || (100 + (product.id * 47) % 2000);

  const openAffiliate = () => {
    if (!product?.affiliateUrl) return;
    const urlWithUTM = addUTMParameters(product.affiliateUrl);
    window.open(urlWithUTM, '_blank', 'noopener,noreferrer');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAffiliate();
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleSwipe = (e, { offset, velocity }) => {
    const swipeThreshold = 50;
    const swipeVelocityThreshold = 500;

    if (images.length <= 1) return;

    if (offset.x > swipeThreshold || velocity.x > swipeVelocityThreshold) {
      // Swipe right - go to previous image
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (offset.x < -swipeThreshold || velocity.x < -swipeVelocityThreshold) {
      // Swipe left - go to next image
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <motion.article
      role="link"
      tabIndex={0}
      aria-label={`${product.title || product.name} – open product`}
      onClick={openAffiliate}
      onKeyDown={handleKey}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsHovered(true)}
      // NOTE: Replaced whileInView with standard animate to fix issue where single-product
      // category pages (no scroll interaction) kept the card at opacity 0 until refresh.
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: [-2, -6], scale: [1, 1.02] }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      {/* Image Container with Slider */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden aspect-square touch-manipulation">
        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 pointer-events-none"
        />

        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}

        {/* Main Image - With swipe gestures */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleSwipe}
          >
            <Image
              src={currentImage}
              alt={`${product.title || product.name} by ${product.brand}`}
              fill
              priority={priority}
              className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading={priority ? "eager" : "lazy"}
              sizes="(max-width:767px) 50vw, (max-width:1023px) 33vw, 25vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Image Navigation - Responsive for mobile/tablet */}
        {images.length > 1 && (
          <>
            {/* Desktop Navigation Arrows */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                x: isHovered ? 0 : -20 
              }}
              transition={{ duration: 0.3 }}
              onClick={prevImage}
              className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors touch-manipulation"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                x: isHovered ? 0 : 20 
              }}
              transition={{ duration: 0.3 }}
              onClick={nextImage}
              className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors touch-manipulation"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </motion.button>

            {/* Mobile/Tablet Navigation Arrows - Always visible when multiple images */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={prevImage}
              className="md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg active:bg-white transition-colors touch-manipulation"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={nextImage}
              className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg active:bg-white transition-colors touch-manipulation"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>

            {/* Image Dots Indicator - Enhanced for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0 
              }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1 sm:gap-1.5 md:opacity-0 md:group-hover:opacity-100"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </motion.div>
          </>
        )}

        {/* Like Button - Mobile optimized */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered || images.length <= 1 ? 1 : 0.7, 
            scale: isHovered || images.length <= 1 ? 1 : 0.9 
          }}
          transition={{ duration: 0.3 }}
          onClick={handleLike}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white active:bg-white transition-all duration-300 touch-manipulation"
          aria-label={isLiked ? 'Unlike product' : 'Like product'}
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </motion.button>

        {/* Discount Badge (if applicable) - Mobile optimized */}
        {product.originalPrice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20 px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg"
          >
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </motion.div>
        )}
      </div>

      {/* Content - Enhanced mobile typography */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col flex-1 p-3 sm:p-4 md:p-5"
      >
        {/* Brand & Title */}
        <div className="mb-2 sm:mb-3 flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xs sm:text-sm tracking-wider uppercase font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-1.5"
          >
            {product.brand}
          </motion.p>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="font-bold text-gray-900 text-sm sm:text-base md:text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300"
          >
            {product.title || product.name}
          </motion.h3>
        </div>

        {/* Rating - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center mb-3 sm:mb-4"
          aria-label={`Rated ${product.rating} out of 5`}
        >
          <div className="flex items-center mr-1.5 sm:mr-2">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
            ))}
            {hasHalfStar && (
              <StarHalf className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
            )}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-300" />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            {product.rating} ({reviewCount}+)
          </span>
        </motion.div>

        {/* Price - Enhanced mobile display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-auto"
        >
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-xs sm:text-sm text-green-600 font-medium mt-1">
              You save {formatPrice(product.originalPrice - product.price)}
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Hover Effect Border - Mobile responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-blue-200 pointer-events-none"
      />
    </motion.article>
  );
}

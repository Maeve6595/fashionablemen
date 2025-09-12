'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const mensBrands = [
  {
    id: 1,
    name: 'Nike',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png',
    bgColor: '#ffffff'
  },
  {
    id: 2,
    name: 'Adidas',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png',
    bgColor: '#ffffff'
  },
  {
    id: 3,
    name: 'Puma',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png',
    bgColor: '#ffffff'
  },
  {
    id: 4,
    name: 'Calvin Klein',
    logo: 'https://logos-world.net/wp-content/uploads/2020/05/Calvin-Klein-Logo-700x394.png',
    bgColor: '#ffffff'
  },
  {
    id: 5,
    name: 'Tommy Hilfiger',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Tommy-Hilfiger-Logo-700x394.png',
    bgColor: '#ffffff'
  },
  {
    id: 6,
    name: 'Hugo Boss',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Hugo-Boss-Logo.png',
    bgColor: '#ffffff'
  },
  {
    id: 7,
    name: 'Levis',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Levis-Logo-700x394.png',
    bgColor: '#ffffff'
  },
  {
    id: 8,
    name: 'Ralph Lauren',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Ralph-Lauren-Logo-700x394.png',
    bgColor: '#ffffff'
  },
  {
    id: 9,
    name: 'Under Armour',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Under-Armour-Logo.png',
    bgColor: '#ffffff'
  },
  {
    id: 10,
    name: 'Reebok',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Reebok-Logo.png',
    bgColor: '#ffffff'
  },
  {
    id: 11,
    name: 'Gucci',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Gucci-Logo.png',
    bgColor: '#ffffff'
  },
  {
    id: 12,
    name: 'Armani',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Giorgio-Armani-Logo-700x394.png',
    bgColor: '#ffffff'
  }
];

export default function BrandSlider() {
  // Duplicate the brands array to create seamless infinite scroll
  // Animation speed and width are always consistent across all devices
  const duplicatedBrands = [...mensBrands, ...mensBrands];

  return (
    <div className="w-full py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Brand Slider Container */}
        <div className="relative">
          {/* Sliding brands container */}
          <motion.div
            className="flex items-center gap-6"
            animate={{
              x: [`0%`, `-${50}%`],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, // Consistent speed for all viewports
                ease: "linear",
              },
            }}
            style={{ width: '200%' }} // Consistent width for all viewports
          >
            {duplicatedBrands.map((brand, index) => (
              <motion.div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className="relative w-24 h-16 md:w-32 md:h-20 rounded-lg shadow-md border border-gray-200 flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: brand.bgColor }}
                >
                  <div className="relative w-16 h-10 md:w-20 md:h-12">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                      sizes="(max-width: 768px) 64px, 80px"
                    />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Brand name on hover */}
                <div className="text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs md:text-sm font-medium text-gray-700">{brand.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShirtIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ShirtIcon className="w-8 h-8 text-blue-600" />
            </motion.div>
            <span className="text-2xl font-bold text-gray-900">
              Fashion<span className="text-blue-600">able</span>men
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

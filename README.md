# Fashionablemen - Men's Fashion Affiliate Website

A modern, responsive affiliate marketing website for men's fashion built with Next.js 15, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Responsive Design**: Mobile-first responsive design that works on all devices
- **Fast Performance**: Optimized for speed with Next.js App Router and image optimization
- **Search & Filter**: Advanced search and filtering capabilities by category and price
- **Affiliate Marketing**: UTM tracking and proper affiliate link attributes
- **SEO Optimized**: Meta tags, sitemap, robots.txt, and structured data
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper focus management

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: JavaScript (no TypeScript)
- **Image Optimization**: Next.js Image component

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fashionablemen
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your values.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
fashionablemen/
├── app/                    # Next.js App Router pages
│   ├── category/          # Category pages
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   ├── page.js            # Homepage
│   ├── robots.js          # Robots.txt generation
│   └── sitemap.js         # Sitemap generation
├── components/            # Reusable React components
│   ├── BrandSlider.js
│   ├── CategoryPageClient.js
│   ├── Footer.js
│   ├── Header.js
│   ├── ProductCard.js
│   ├── ProductGrid.js
│   └── SearchAndFilter.js
├── data/                  # Static data
│   └── product.json       # Product data (62 products)
├── lib/                   # Utility functions
│   └── utils.js
└── public/                # Static assets
```

## 🎯 Key Components

### ProductCard
Displays individual product information with:
- Product image with loading states
- Brand and product name
- Star ratings
- Price formatting
- Affiliate link with UTM tracking

### SearchAndFilter
Provides search and filtering functionality:
- Text search across product names and brands
- Category filtering (Shoes, Shirts, T-Shirts)
- Sorting options (Price, Rating, Newest)
- Mobile-responsive design

### ProductGrid
Responsive grid layout for product cards:
- 2 columns on mobile, 3 on tablet, 4 on desktop
- Loading skeleton states
- Empty state handling

## 🔗 Affiliate Marketing Features

- **UTM Tracking**: All affiliate links include tracking parameters
- **Proper Attributes**: Links use `target="_blank"`, `rel="noopener noreferrer nofollow sponsored"`
- **Disclosure**: Footer includes required affiliate disclosure
- **Analytics**: Google Analytics integration support

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Gray scale: Various shades for text and backgrounds
- White: Background and card colors

### Typography
- Font: Inter (Google Fonts)
- Responsive text sizes
- Proper heading hierarchy

### Spacing
- Consistent spacing using Tailwind's spacing scale
- Grid gaps and padding follow 8px baseline

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (2 columns)
- **Tablet**: 640px - 1024px (3 columns)
- **Desktop**: > 1024px (4 columns)

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component with remote pattern configuration
- **Font Loading**: Preloaded Google Fonts
- **Code Splitting**: Automatic with Next.js App Router
- **Compression**: Enabled in Next.js config
- **CSS Optimization**: Experimental CSS optimization enabled

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://fashionablemen.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION=verification-code
```

### Image Domains
Configured in `next.config.mjs` for Unsplash images:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

## 📊 SEO Features

- **Meta Tags**: Title, description, Open Graph, Twitter Cards
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Proper robot directives
- **Structured Data**: Ready for implementation
- **Canonical URLs**: Proper URL structure

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Adding New Products
Edit `data/product.json` to add new products to the existing array:
```json
{
  "id": 63,
  "slug": "product-slug",
  "title": "Product Name",
  "brand": "Brand Name",
  "category": "topwear",
  "subCategory": "t-shirts",
  "images": ["https://images.unsplash.com/photo-xxx"],
  "price": 999,
  "originalPrice": 1299,
  "rating": 4.5,
  "reviewCount": 25,
  "description": "Product description",
  "tags": ["casual", "cotton"],
  "badges": ["Best Seller"],
  "affiliateUrl": "https://amazon.com/dp/B01N123456"
}
  createdAt: "2024-08-21T00:00:00Z"
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

Built with ❤️ for the modern web

// Category definitions for men's fashion
// Each main category has id, name, slug (same as id) and an array of subcategories
// Subcategory slug values match the product "subCategory" field values in product.json

export const menCategories = {
  topwear: {
    id: 'topwear',
    name: 'Topwear',
    slug: 'topwear',
    subcategories: [
      { id: 'kurtas', name: 'Kurtas', slug: 'kurtas' },
      { id: 't-shirts', name: 'T-Shirts', slug: 't-shirts' },
      { id: 'polo-t-shirts', name: 'Polo T-Shirts', slug: 'polo-t-shirts' },
      { id: 'casual-shirts', name: 'Casual Shirts', slug: 'casual-shirts' },
      { id: 'formal-shirts', name: 'Formal Shirts', slug: 'formal-shirts' },
      { id: 'sherwanis', name: 'Sherwanis', slug: 'sherwanis' },
      { id: 'nehru-jackets', name: 'Nehru Jackets', slug: 'nehru-jackets' },
      { id: 'blazers-coats', name: 'Blazers & Coats', slug: 'blazers-coats' },
      { id: 'suits', name: 'Suits', slug: 'suits' },
      { id: 'rain-jackets', name: 'Rain Jackets', slug: 'rain-jackets' },
      { id: 'sweatshirts', name: 'Sweatshirts', slug: 'sweatshirts' },
      { id: 'sweaters', name: 'Sweaters', slug: 'sweaters' },
      { id: 'jackets', name: 'Jackets', slug: 'jackets' },
      { id: 'waistcoats', name: 'Waistcoats', slug: 'waistcoats' }
    ]
  },
  bottomwear: {
    id: 'bottomwear',
    name: 'Bottomwear',
    slug: 'bottomwear',
    subcategories: [
      { id: 'jeans', name: 'Jeans', slug: 'jeans' },
      { id: 'casual-trousers', name: 'Casual Trousers', slug: 'casual-trousers' },
      { id: 'formal-trousers', name: 'Formal Trousers', slug: 'formal-trousers' },
      { id: 'shorts', name: 'Shorts', slug: 'shorts' },
      { id: 'track-pants', name: 'Track Pants', slug: 'track-pants' },
      { id: 'cargos', name: 'Cargos', slug: 'cargos' },
      { id: 'pyjamas', name: 'Pyjamas', slug: 'pyjamas' },
      { id: 'dhoti-pants', name: 'Dhoti Pants', slug: 'dhoti-pants' },
      { id: 'mundu', name: 'Mundu', slug: 'mundu' },
      { id: 'lungis', name: 'Lungis', slug: 'lungis' }
    ]
  },
  footwear: {
    id: 'footwear',
    name: 'Footwear',
    slug: 'footwear',
    subcategories: [
      { id: 'sneakers', name: 'Sneakers', slug: 'sneakers' },
      { id: 'formal-shoes', name: 'Formal Shoes', slug: 'formal-shoes' },
      { id: 'casual-shoes', name: 'Casual Shoes', slug: 'casual-shoes' },
      { id: 'sports-shoes', name: 'Sports Shoes', slug: 'sports-shoes' },
      { id: 'running-shoes', name: 'Running Shoes', slug: 'running-shoes' },
      { id: 'sandals-floaters', name: 'Sandals & Floaters', slug: 'sandals-floaters' },
      { id: 'flip-flops', name: 'Flip Flops', slug: 'flip-flops' },
      { id: 'loafers', name: 'Loafers', slug: 'loafers' },
      { id: 'boots', name: 'Boots', slug: 'boots' },
      { id: 'ethnic-footwear', name: 'Ethnic Footwear', slug: 'ethnic-footwear' }
    ]
  },
  'fashion-accessories': {
    id: 'fashion-accessories',
    name: 'Fashion Accessories',
    slug: 'fashion-accessories',
    subcategories: [
      { id: 'wallets', name: 'Wallets', slug: 'wallets' },
      { id: 'belts', name: 'Belts', slug: 'belts' },
      { id: 'perfumes-body-mists', name: 'Perfumes & Body Mists', slug: 'perfumes-body-mists' },
      { id: 'deodorants', name: 'Deodorants', slug: 'deodorants' },
      { id: 'trimmers', name: 'Trimmers', slug: 'trimmers' },
      { id: 'ties-cufflinks', name: 'Ties & Cufflinks', slug: 'ties-cufflinks' },
      { id: 'caps-hats', name: 'Caps & Hats', slug: 'caps-hats' },
      { id: 'mufflers', name: 'Mufflers', slug: 'mufflers' },
      { id: 'phone-cases', name: 'Phone Cases', slug: 'phone-cases' }
    ]
  },
  'bags-luggage': {
    id: 'bags-luggage',
    name: 'Bags & Luggage',
    slug: 'bags-luggage',
    subcategories: [
      { id: 'backpacks', name: 'Backpacks', slug: 'backpacks' },
      { id: 'travel-bags', name: 'Travel Bags', slug: 'travel-bags' },
      { id: 'gym-bags', name: 'Gym Bags', slug: 'gym-bags' },
      { id: 'laptop-bags', name: 'Laptop Bags', slug: 'laptop-bags' },
      { id: 'messenger-bags', name: 'Messenger Bags', slug: 'messenger-bags' }
    ]
  },
  'innerwear-sleepwear': {
    id: 'innerwear-sleepwear',
    name: 'Innerwear & Sleepwear',
    slug: 'innerwear-sleepwear',
    subcategories: [
      { id: 'briefs-trunks', name: 'Briefs & Trunks', slug: 'briefs-trunks' },
      { id: 'boxers', name: 'Boxers', slug: 'boxers' },
      { id: 'vests', name: 'Vests', slug: 'vests' },
      { id: 'sleepwear-loungewear', name: 'Sleepwear & Loungewear', slug: 'sleepwear-loungewear' },
      { id: 'thermals', name: 'Thermals', slug: 'thermals' }
    ]
  },
  'sports-activewear': {
    id: 'sports-activewear',
    name: 'Sports & Activewear',
    slug: 'sports-activewear',
    subcategories: [
      { id: 'active-t-shirts', name: 'Active T-Shirts', slug: 'active-t-shirts' },
      { id: 'track-suits', name: 'Track Suits', slug: 'track-suits' },
      { id: 'sports-jackets', name: 'Sports Jackets', slug: 'sports-jackets' },
      { id: 'sports-sandals', name: 'Sports Sandals', slug: 'sports-sandals' },
      { id: 'swimwear', name: 'Swimwear', slug: 'swimwear' }
    ]
  },
  gadgets: {
    id: 'gadgets',
    name: 'Gadgets',
    slug: 'gadgets',
    subcategories: [
      { id: 'smart-wearables', name: 'Smart Wearables', slug: 'smart-wearables' },
      { id: 'fitness-gadgets', name: 'Fitness Gadgets', slug: 'fitness-gadgets' },
      { id: 'headphones', name: 'Headphones', slug: 'headphones' },
      { id: 'speakers', name: 'Speakers', slug: 'speakers' }
    ]
  }
};

export default menCategories;

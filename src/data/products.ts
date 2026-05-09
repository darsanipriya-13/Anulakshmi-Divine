import ganeshaIdolGold from "@/assets/products/ganesha-idol-gold.jpg";
import lakshmiIdolGold from "@/assets/products/lakshmi-idol-gold.jpg";
import muruganStatue from "@/assets/products/murugan-statue.jpg";
import shivaLingam from "@/assets/products/shiva-lingam.jpg";
import radhaKrishna from "@/assets/products/radha-krishna.jpg";
import hanumanIdol from "@/assets/products/hanuman-idol.jpg";
import ganeshaSmallClay from "@/assets/products/ganesha-small-clay.jpg";
import diwaliPoojaKit from "@/assets/products/diwali-pooja-kit.jpg";
import navratriPoojaKit from "@/assets/products/navratri-pooja-kit.jpg";
import basicPoojaKit from "@/assets/products/basic-pooja-kit.jpg";
import festivalPoojaKit from "@/assets/products/festival-pooja-kit.jpg";
import navratriSpecialKit from "@/assets/products/navratri-special-kit.jpg";
import chandanAgarbatti from "@/assets/products/chandan-agarbatti.jpg";
import lobanDhoop from "@/assets/products/loban-dhoop.jpg";
import camphorPack from "@/assets/products/camphor-pack.jpg";
import diyaSet from "@/assets/products/diya-set.jpg";
import marigoldGarland from "@/assets/products/marigold-garland.jpg";
import rosePetals from "@/assets/products/rose-petals.jpg";
import freshFlowerPack from "@/assets/products/fresh-flower-pack.jpg";
import garlandMaalai from "@/assets/products/garland-maalai.jpg";
import brassBell from "@/assets/products/brass-bell.jpg";
import brassOilLamp from "@/assets/products/brass-oil-lamp.jpg";
import poojaThali from "@/assets/products/pooja-thali.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  inStock: boolean;
  badge?: "bestseller" | "new" | "limited";
}

export const categories = [
  { id: "idols", name: "Divine Idols", icon: "🕉️", description: "Sacred murti & statues" },
  { id: "pooja-kits", name: "Pooja Kits", icon: "🪔", description: "Complete ritual sets" },
  { id: "daily-pooja", name: "Daily Pooja Items", icon: "🧿", description: "Everyday worship essentials" },
  { id: "flowers", name: "Flowers & Garlands", icon: "🌺", description: "Fresh sacred flowers" },
  { id: "temple-items", name: "Temple Items", icon: "📿", description: "Bells, thalis & more" },
];

export const coupons = [
  { code: "DIVINE10", discount: 10, minOrder: 500, description: "10% off on orders above ₹500" },
  { code: "FIRST20", discount: 20, minOrder: 300, description: "20% off on your first order" },
  { code: "FESTIVAL15", discount: 15, minOrder: 1000, description: "15% off on festival season" },
];

export const products: Product[] = [
  // --- Idols ---
  {
    id: "1",
    name: "Brass Ganesh Murti (8 inches)",
    price: 1499,
    originalPrice: 1999,
    image: ganeshaIdolGold,
    category: "idols",
    description: "Beautifully handcrafted brass Lord Ganesh idol, perfect for home temples. Dimensions: 8\" Height x 5\" Width x 4\" Depth. Intricately detailed with traditional design elements. Weight: 1.2 kg.",
    rating: 4.8,
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "5",
    name: "Marble Radha Krishna Idol (12 inches)",
    price: 3999,
    originalPrice: 4999,
    image: radhaKrishna,
    category: "idols",
    description: "Exquisite hand-painted Makarana marble Radha Krishna idol. Dimensions: 12\" Height x 8\" Width. Perfect centrepiece for your home mandir. Polished with natural colors and gold foil accents. Weight: 3.5 kg.",
    rating: 4.9,
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "10",
    name: "Panchmukhi Hanuman Idol (10 inches)",
    price: 2199,
    image: hanumanIdol,
    category: "idols",
    description: "Powerful Panchmukhi Hanuman brass idol. Dimensions: 10\" Height x 7\" Width. Detailed craftsmanship depicting all five sacred faces. Brings courage and protection to your home. Weight: 2.1 kg.",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "13",
    name: "Ganesha Idol (Small - 5 inches)",
    price: 299,
    image: ganeshaSmallClay,
    category: "idols",
    description: "Eco-friendly natural clay Ganesha idol, ideal for festivals and daily worship. Dimensions: 5\" Height x 3.5\" Width. Compact size for small mandirs or car dashboards.",
    rating: 4.5,
    inStock: true,
    badge: "new",
  },
  {
    id: "14",
    name: "Lakshmi Idol (6 inches)",
    price: 499,
    image: lakshmiIdolGold,
    category: "idols",
    description: "Gold finish Goddess Lakshmi idol radiating prosperity and grace. Dimensions: 6\" Height x 4.5\" Width. Solid brass construction with premium antique polish. Perfect for home and office mandirs.",
    rating: 4.7,
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "15",
    name: "Murugan Statue (9 inches)",
    price: 599,
    image: muruganStatue,
    category: "idols",
    description: "Beautifully sculpted Lord Murugan statue with vel and peacock. Dimensions: 9\" Height x 4\" Width. A divine addition to your prayer space, made of premium polyresin with metallic finish.",
    rating: 4.6,
    inStock: true,
    badge: "new",
  },
  {
    id: "16",
    name: "Shiva Lingam Set (4 inches)",
    price: 399,
    image: shivaLingam,
    category: "idols",
    description: "Sacred Shiva Lingam with Nandi and base. Dimensions: 4\" Height x 6\" Length. Crafted from natural black stone (Narmadeshwar) for an authentic worship experience.",
    rating: 4.7,
    inStock: true,
  },
  // --- Pooja Kits ---
  {
    id: "2",
    name: "Lakshmi-Ganesh Diwali Kit",
    price: 2499,
    originalPrice: 3199,
    image: diwaliPoojaKit,
    category: "pooja-kits",
    description: "Complete Diwali pooja kit with Lakshmi-Ganesh idols, diyas, kumkum, rice, flowers, and all essentials for Lakshmi Puja.",
    rating: 4.9,
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "6",
    name: "Navratri Pooja Kit",
    price: 1799,
    originalPrice: 2299,
    image: navratriPoojaKit,
    category: "pooja-kits",
    description: "Complete 9-day Navratri pooja kit with all essentials including kalash, coconut, red cloth, kumkum, and puja samagri.",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "17",
    name: "Basic Pooja Kit",
    price: 199,
    image: basicPoojaKit,
    category: "pooja-kits",
    description: "Includes kumkum, turmeric, camphor, and other daily pooja essentials. Perfect starter kit for everyday worship.",
    rating: 4.4,
    inStock: true,
    badge: "new",
  },
  {
    id: "18",
    name: "Festival Pooja Kit",
    price: 499,
    image: festivalPoojaKit,
    category: "pooja-kits",
    description: "All-in-one festival pooja kit with premium samagri for major Hindu festivals. Thoughtfully curated items.",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "19",
    name: "Navratri Special Kit",
    price: 699,
    image: navratriSpecialKit,
    category: "pooja-kits",
    description: "Special Navratri kit with 9 colour dupattas, garba accessories, and complete pooja samagri for all 9 nights.",
    rating: 4.8,
    inStock: true,
    badge: "limited",
  },
  // --- Daily Pooja Items ---
  {
    id: "3",
    name: "Mysore Chandan Agarbatti (Pack of 12)",
    price: 349,
    image: chandanAgarbatti,
    category: "daily-pooja",
    description: "Premium Mysore sandalwood incense sticks. Hand-rolled with natural ingredients. Long-lasting fragrance for daily pooja.",
    rating: 4.6,
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "9",
    name: "Loban Dhoop Cones (Pack of 50)",
    price: 249,
    image: lobanDhoop,
    category: "daily-pooja",
    description: "Natural loban dhoop cones for purifying your home and temple. Creates a divine atmosphere during prayers.",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "20",
    name: "Agarbatti Pack (Chandan)",
    price: 120,
    image: chandanAgarbatti,
    category: "daily-pooja",
    description: "Fragrant chandan agarbatti sticks for a calming and sacred ambience during daily prayers.",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "21",
    name: "Camphor Pack",
    price: 80,
    image: camphorPack,
    category: "daily-pooja",
    description: "Pure camphor tablets for aarti and pooja rituals. Smokeless and long-burning for daily use.",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "22",
    name: "Diya Set (5 pcs)",
    price: 150,
    image: diyaSet,
    category: "daily-pooja",
    description: "Set of 5 traditional brass diyas for daily aarti. Beautifully crafted with intricate patterns.",
    rating: 4.6,
    inStock: true,
    badge: "new",
  },
  // --- Flowers & Garlands ---
  {
    id: "4",
    name: "Fresh Marigold Garland (5 pcs)",
    price: 199,
    image: marigoldGarland,
    category: "flowers",
    description: "Fresh orange marigold garlands for daily pooja and temple decoration. Handmade with premium flowers.",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "8",
    name: "Rose Petals for Pooja (500g)",
    price: 149,
    image: rosePetals,
    category: "flowers",
    description: "Fresh red rose petals, ideal for archana, abhishekam and temple decoration. Naturally dried for long shelf life.",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "23",
    name: "Fresh Flower Pack",
    price: 100,
    image: freshFlowerPack,
    category: "flowers",
    description: "Assorted fresh flowers for daily pooja — jasmine, marigold, and lotus petals in one convenient pack.",
    rating: 4.4,
    inStock: true,
    badge: "limited",
  },
  {
    id: "24",
    name: "Garland (Maalai)",
    price: 200,
    image: garlandMaalai,
    category: "flowers",
    description: "Handstrung traditional maalai garland with jasmine and roses. Perfect for deity decoration and special occasions.",
    rating: 4.6,
    inStock: true,
  },
  // --- Temple Items ---
  {
    id: "7",
    name: "Brass Pooja Bell (Ghanti)",
    price: 599,
    image: brassBell,
    category: "temple-items",
    description: "Traditional brass pooja bell with beautiful resonance. Handcrafted with Nandi handle design.",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "12",
    name: "Brass Oil Lamp (Diya)",
    price: 799,
    originalPrice: 999,
    image: brassOilLamp,
    category: "temple-items",
    description: "Traditional five-wick brass oil lamp. Creates a beautiful and sacred glow during evening prayers.",
    rating: 4.7,
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "25",
    name: "Brass Bell",
    price: 350,
    image: brassBell,
    category: "temple-items",
    description: "Compact brass bell with a clear, resonant tone. Essential for aarti and daily temple rituals.",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "26",
    name: "Pooja Thali Set",
    price: 450,
    image: poojaThali,
    category: "temple-items",
    description: "Complete pooja thali set with plate, diya holder, kumkum container, and bell. Beautifully embossed brass finish.",
    rating: 4.7,
    inStock: true,
    badge: "new",
  },
];

export const festivalOffers = [
  {
    id: "diwali",
    name: "Diwali Special",
    discount: "30% OFF",
    description: "Complete Diwali pooja essentials at special prices",
    emoji: "🪔",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "navratri",
    name: "Navratri Collection",
    discount: "25% OFF",
    description: "Sacred Navratri pooja kits and decorations",
    emoji: "🔱",
    color: "from-red-500 to-rose-600",
  },
  {
    id: "ganesh",
    name: "Ganesh Chaturthi",
    discount: "20% OFF",
    description: "Beautiful Ganesh idols and pooja samagri",
    emoji: "🕉️",
    color: "from-yellow-500 to-amber-600",
  },
];

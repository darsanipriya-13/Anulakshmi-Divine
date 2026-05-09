import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const badgeStyles = {
  bestseller: "bg-primary text-primary-foreground",
  new: "bg-accent text-accent-foreground",
  limited: "bg-destructive text-destructive-foreground",
};

const badgeLabels = {
  bestseller: "⭐ Best Seller",
  new: "✨ New Arrival",
  limited: "🔥 Limited Stock",
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, checkoutSingleItem } = useCart();
  const navigate = useNavigate();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    checkoutSingleItem(product, 1);
    navigate("/checkout");
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group block bg-white rounded-2xl overflow-hidden card-hover-lift border border-border/40 hover:premium-shadow flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Quick view button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="px-4 py-2 rounded-full bg-white/90 text-foreground text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
            <Eye className="h-3.5 w-3.5" /> Quick View
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg saffron-gradient text-white shadow-md">
              {discount}% OFF
            </span>
          )}
          {product.badge && (
            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg shadow-md ${badgeStyles[product.badge]}`}>
              {badgeLabels[product.badge]}
            </span>
          )}
        </div>

        {/* Floating add to cart */}
        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-primary hover:text-primary-foreground active:scale-90"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </Link>

      {/* Content */}
      <Link to={`/product/${product.id}`} className="p-4 md:p-5 flex-1 flex flex-col">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-1.5 font-medium">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="font-display font-semibold text-foreground text-sm md:text-[15px] leading-snug mb-2.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3 mt-auto">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(product.rating) ? "fill-gold text-gold" : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-bold text-foreground text-base tabular-nums">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </Link>
      <div className="px-4 md:px-5 pb-4 md:pb-5 mt-auto">
        <button
          onClick={handleBuyNow}
          className="w-full py-2.5 rounded-xl saffron-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97] hover:translate-y-[-1px] animate-glow"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

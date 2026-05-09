import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, CheckCircle2, Heart, Plus, Minus } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

const ProductDetail = () => {
  const { id } = useParams();
  const { addMultipleToCart, checkoutSingleItem } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([
    { id: 1, user: "Karthik R.", rating: 5, comment: "Excellent quality product. Highly recommended!", date: "2 days ago" },
    { id: 2, user: "Deepa S.", rating: 4, comment: "Very good service. The items perfectly match as described.", date: "1 week ago" }
  ]);
  const [newReviewForm, setNewReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-5">🕉️</p>
        <h2 className="font-display text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="text-primary hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    addMultipleToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    checkoutSingleItem(product, quantity);
    navigate("/checkout");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.name || !newReviewForm.comment) {
      toast.error("Please fill in your name and review");
      return;
    }
    setReviews(prev => [{
      id: Date.now(),
      user: newReviewForm.name,
      rating: newReviewForm.rating,
      comment: newReviewForm.comment,
      date: "Just now"
    }, ...prev]);
    setNewReviewForm({ name: "", rating: 5, comment: "" });
    toast.success("Thank you for your review!");
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-24">
        {/* Image */}
        <ScrollReveal direction="left">
          <div className="aspect-square rounded-2xl overflow-hidden bg-secondary shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </ScrollReveal>

        {/* Details */}
        <ScrollReveal direction="right" delay={100}>
          <div className="flex flex-col justify-center">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5" style={{ lineHeight: "1.1" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "fill-muted text-muted"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-primary font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> In Stock
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-foreground tabular-nums">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through tabular-nums">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-bold text-primary px-2.5 py-1 rounded-lg bg-primary/10">{discount}% off</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-10 text-base">{product.description}</p>

            <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border-2 border-border rounded-xl px-2 h-[56px] shrink-0 sm:w-32 bg-background">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground active:scale-95 flex items-center justify-center"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-bold text-foreground tabular-nums">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground active:scale-95 flex items-center justify-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex-1 flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-xl border-2 border-primary text-primary font-bold text-base hover:bg-primary/5 transition-all duration-300 active:scale-[0.97]"
                >
                  <ShoppingCart className="h-5 w-5" /> Add
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-xl saffron-gradient text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.97] hover:translate-y-[-1px] animate-glow"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Free delivery</p>
                  <p className="text-muted-foreground text-xs">On orders above ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">100% authentic</p>
                  <p className="text-muted-foreground text-xs">Handcrafted & verified</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Reviews Section */}
      <ScrollReveal>
        <div className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <div className="p-6 rounded-2xl bg-card border border-border sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Name</label>
                    <input type="text" value={newReviewForm.name} onChange={e => setNewReviewForm({...newReviewForm, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} type="button" onClick={() => setNewReviewForm({...newReviewForm, rating: star})} className="hover:scale-110 active:scale-95 transition-transform text-foreground">
                          <Star className={`h-6 w-6 ${star <= newReviewForm.rating ? "fill-gold text-gold" : "fill-muted text-muted"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Comment</label>
                    <textarea value={newReviewForm.comment} onChange={e => setNewReviewForm({...newReviewForm, comment: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Share your experience..." />
                  </div>
                  <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">Submit Review</button>
                </form>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{review.user}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-gold text-gold" : "fill-muted text-muted"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Related */}
      {related.length > 0 && (
        <ScrollReveal>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
};

export default ProductDetail;

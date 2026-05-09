import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PackagePlus, Plus, Minus, CheckCircle2 } from "lucide-react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";

const CATEGORIES_ALLOWED = ["daily-pooja", "flowers", "temple-items"];

const CustomKitBuilder = () => {
  const navigate = useNavigate();
  const { addMultipleToCart } = useCart();
  
  // State: selected item ID -> quantity
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});

  const availableProducts = products.filter(p => CATEGORIES_ALLOWED.includes(p.category));

  const handleToggle = (product: Product) => {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (next[product.id]) {
        delete next[product.id];
      } else {
        next[product.id] = 1;
      }
      return next;
    });
  };

  const handleQuantity = (id: string, delta: number) => {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (!next[id]) return next;
      const newQty = Math.max(1, next[id] + delta);
      next[id] = newQty;
      return next;
    });
  };

  const selectedCount = Object.keys(selectedItems).length;
  
  const totalPrice = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    const product = availableProducts.find(p => p.id === id);
    if (!product) return sum;
    return sum + (product.price * qty);
  }, 0);

  const handleAddKitToCart = () => {
    if (selectedCount === 0) {
      toast.error("Please select at least one item");
      return;
    }
    
    // Add all selected to cart
    Object.entries(selectedItems).forEach(([id, qty]) => {
      const product = availableProducts.find(p => p.id === id);
      if (product) {
        addMultipleToCart(product, qty);
      }
    });
    
    toast.success("Custom Kit added to your cart! 🙏");
    setSelectedItems({});
    navigate("/cart");
  };

  return (
    <div className="min-h-screen page-bg-pooja">
      <div className="container mx-auto px-4 md:px-8 py-10">
        <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Shop
        </Link>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Build Your Custom Pooja Kit</h1>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Mix and match daily pooja essentials, fresh flowers, and sacred temple items to create your perfect kit.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8 items-start relative">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {availableProducts.map((product) => {
              const isSelected = !!selectedItems[product.id];
              return (
                <div 
                  key={product.id} 
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-300 bg-card ${isSelected ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}
                >
                  <div className="flex gap-4 mb-4">
                    <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground line-clamp-2 leading-tight mb-1">{product.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    
                    {isSelected ? (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-secondary rounded-lg border border-border">
                          <button onClick={() => handleQuantity(product.id, -1)} className="p-1.5 hover:text-primary transition-colors"><Minus className="h-4 w-4"/></button>
                          <span className="w-6 text-center text-sm font-semibold">{selectedItems[product.id]}</span>
                          <button onClick={() => handleQuantity(product.id, 1)} className="p-1.5 hover:text-primary transition-colors"><Plus className="h-4 w-4"/></button>
                        </div>
                        <button onClick={() => handleToggle(product)} className="text-primary hover:text-primary/80">
                          <CheckCircle2 className="h-6 w-6"/>
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleToggle(product)}
                        className="px-4 py-2 rounded-lg bg-secondary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-md">
              <h3 className="font-display text-xl font-bold mb-6 flex items-center justify-between">
                <span>Kit Summary</span>
                <span className="text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">{selectedCount} items</span>
              </h3>
              
              <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {selectedCount === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">Your kit is empty. Select items to add them here.</p>
                ) : (
                  Object.entries(selectedItems).map(([id, qty]) => {
                    const product = availableProducts.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div key={id} className="flex justify-between items-center text-sm">
                        <div className="flex-1 pr-4">
                          <p className="font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {qty} × ₹{product.price}</p>
                        </div>
                        <span className="font-semibold tabular-nums leading-none">₹{product.price * qty}</span>
                      </div>
                    );
                  })
                )}
              </div>
              
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleAddKitToCart}
                disabled={selectedCount === 0}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl saffron-gradient text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <PackagePlus className="h-5 w-5" /> Add Kit to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomKitBuilder;

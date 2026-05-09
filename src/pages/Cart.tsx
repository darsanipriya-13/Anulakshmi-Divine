import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart, ArrowRight, Shield, Truck, Calendar } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  const deliveryCharge = totalPrice >= 500 ? 0 : 49;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="h-10 w-10 text-primary/40" />
        </div>
        <h2 className="font-display text-3xl font-bold mb-3">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Add some divine items to get started on your spiritual journey 🙏</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl saffron-gradient text-white font-semibold active:scale-[0.97] transition-all shadow-md hover:shadow-lg">
          Browse Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Continue Shopping
      </Link>

      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">
        Your Cart <span className="text-muted-foreground text-lg font-normal">({items.length} {items.length === 1 ? "item" : "items"})</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }, i) => (
            <ScrollReveal key={product.id} delay={i * 60}>
              <div className="flex gap-5 p-5 rounded-2xl bg-card border border-border/60 card-hover-lift">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img src={product.image} alt={product.name} className="w-24 h-24 rounded-xl object-cover shadow-sm" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display font-semibold text-foreground truncate hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-4 tabular-nums">₹{product.price.toLocaleString()} each</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-2 hover:bg-secondary transition-colors active:scale-95"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="px-4 text-sm font-semibold tabular-nums">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-2 hover:bg-secondary transition-colors active:scale-95"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => { removeFromCart(product.id); toast.info(`${product.name} removed`); }} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all active:scale-95">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right self-center">
                  <span className="font-bold text-foreground tabular-nums text-lg">₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-7 rounded-2xl bg-card border border-border/60 shadow-sm">
            <h3 className="font-display text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium tabular-nums">₹{totalPrice.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className={deliveryCharge === 0 ? "text-primary font-semibold" : "tabular-nums font-medium"}>{deliveryCharge === 0 ? "Free ✨" : "₹49"}</span></div>
              {totalPrice < 500 && <p className="text-xs text-primary bg-primary/5 p-3 rounded-lg">Add ₹{(500 - totalPrice).toLocaleString()} more for free delivery!</p>}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Est. delivery: {estimatedDelivery.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg"><span>Total</span><span className="tabular-nums">₹{(totalPrice + deliveryCharge).toLocaleString()}</span></div>
            </div>

            <Link to="/checkout" className="block w-full py-4 rounded-xl saffron-gradient text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97] hover:translate-y-[-1px] mb-4 text-center">
              Proceed to Checkout
            </Link>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Secure</span>
              <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> Fast Delivery</span>
            </div>

            <button onClick={() => { clearCart(); toast.info("Cart cleared"); }} className="w-full py-2.5 text-sm text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

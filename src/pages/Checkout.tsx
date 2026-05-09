import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building2, Globe, Shield, Truck, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { coupons } from "@/data/products";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";

const paymentMethods = [
  { id: "upi", label: "UPI", icon: <Smartphone className="h-5 w-5" />, desc: "Google Pay, PhonePe, Paytm" },
  { id: "debit", label: "Debit Card", icon: <CreditCard className="h-5 w-5" />, desc: "Visa, Mastercard, RuPay" },
  { id: "credit", label: "Credit Card", icon: <CreditCard className="h-5 w-5" />, desc: "All major cards accepted" },
  { id: "netbanking", label: "Net Banking", icon: <Building2 className="h-5 w-5" />, desc: "All Indian banks" },
];

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("upi");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-5">🔒</p>
        <h2 className="font-display text-3xl font-bold mb-3">Please Login First</h2>
        <p className="text-muted-foreground mb-8">You need to be logged in to place an order.</p>
        <Link to="/auth" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl saffron-gradient text-white font-semibold">
          Login / Sign Up
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const deliveryCharge = totalPrice >= 500 ? 0 : 49;
  const discountAmount = appliedCoupon ? Math.round(totalPrice * appliedCoupon.discount / 100) : 0;
  const tax = Math.round((totalPrice - discountAmount) * 0.05);
  const grandTotal = totalPrice - discountAmount + tax + deliveryCharge;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const applyCoupon = () => {
    const found = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (!found) { toast.error("Invalid coupon code"); return; }
    if (totalPrice < found.minOrder) { toast.error(`Minimum order ₹${found.minOrder} required`); return; }
    setAppliedCoupon(found);
    toast.success(`Coupon applied! ${found.discount}% off`);
  };

  const placeOrder = async () => {
    if (!address || !city || !pincode || !phone) {
      toast.error("Please fill in all shipping details");
      return;
    }
    setLoading(true);
    
    // Simulate payment gateway & backend processing
    try {
      toast.info(`Initiating ${paymentMethods.find(m => m.id === payment)?.label} payment...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Payment successful! Processing order...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderId = `ADK-${Date.now().toString().slice(-6)}`;
      const orderData = {
        id: orderId,
        user_id: user.id,
        order_number: orderId,
        payment_method: payment,
        subtotal: totalPrice,
        delivery_charge: deliveryCharge,
        tax,
        total: grandTotal,
        discount: discountAmount,
        coupon_code: appliedCoupon?.code || null,
        shipping_address: address,
        shipping_city: city,
        shipping_pincode: pincode,
        shipping_phone: phone,
        estimated_delivery: estimatedDelivery.toISOString().split("T")[0],
        status: "processing",
        items: items.map(({ product, quantity }) => ({
          product_id: product.id,
          product_name: product.name,
          product_image: product.image,
          price: product.price,
          quantity,
        })),
        created_at: new Date().toISOString()
      };

      // Save to localStorage to simulate backend
      const existingOrders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
      localStorage.setItem('mock_orders', JSON.stringify([...existingOrders, orderData]));

      // Try to save to Supabase, but fail gracefully if unavailable
      try {
        await supabase.from("orders").insert({
          ...orderData,
          items: undefined // Don't send items to orders table
        });
      } catch (e) {
        console.log("Supabase unavailable, using mock backend");
      }

      clearCart();
      navigate(`/order-success/${orderId}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen page-bg-shop">
      <div className="container mx-auto px-4 md:px-8 py-10">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Cart
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <ScrollReveal>
              <div className="p-7 rounded-2xl bg-card border border-border/60 shadow-sm">
                <h3 className="font-display text-xl font-bold mb-6">Shipping Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your full address" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">City</label>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Pincode</label>
                    <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} placeholder="600001" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 9095868846" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Payment */}
            <ScrollReveal delay={100}>
              <div className="p-7 rounded-2xl bg-card border border-border/60 shadow-sm">
                <h3 className="font-display text-xl font-bold mb-6">Payment Method</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {paymentMethods.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 text-left ${payment === m.id ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/30"}`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${payment === m.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                        {m.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{m.label}</p>
                        <p className="text-xs text-muted-foreground">{m.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-7 rounded-2xl bg-card border border-border/60 shadow-sm">
              <h3 className="font-display text-xl font-bold mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none"
                  />
                </div>
                <button onClick={applyCoupon} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium tabular-nums">₹{totalPrice.toLocaleString()}</span></div>
                {appliedCoupon && <div className="flex justify-between text-primary"><span>Discount ({appliedCoupon.discount}%)</span><span className="font-medium">-₹{discountAmount.toLocaleString()}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span className="tabular-nums">₹{tax.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className={deliveryCharge === 0 ? "text-primary font-semibold" : ""}>{deliveryCharge === 0 ? "Free ✨" : `₹${deliveryCharge}`}</span></div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg"><span>Total</span><span className="tabular-nums">₹{grandTotal.toLocaleString()}</span></div>
              </div>

              <div className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
                <Truck className="h-3.5 w-3.5" /> Est. delivery: {estimatedDelivery.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full py-4 rounded-xl saffron-gradient text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97] disabled:opacity-60 mb-4"
              >
                {loading ? "Placing Order..." : "Place Order 🙏"}
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Secure Payment</span>
                <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> 100% Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

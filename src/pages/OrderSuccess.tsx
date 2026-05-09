import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";

const OrderSuccess = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (id) {
      supabase.from("orders").select("*").eq("id", id).single().then(({ data }) => setOrder(data));
    }
  }, [id]);

  return (
    <div className="min-h-screen page-bg-shop flex items-center justify-center py-20">
      <ScrollReveal>
        <div className="max-w-lg mx-auto text-center px-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-float-in">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Order Placed Successfully! 🙏</h1>
          <p className="text-muted-foreground mb-8 text-lg">Your order has been placed successfully. Thank you for shopping with us!</p>

          {order && (
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm mb-8 text-left">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Order ID</span><span className="font-mono font-semibold text-foreground">{order.order_number}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold text-foreground">₹{Number(order.total).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="capitalize font-medium">{order.payment_method}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="flex items-center gap-1.5 text-primary font-semibold"><Package className="h-4 w-4" /> Processing</span></div>
                {order.estimated_delivery && (
                  <div className="flex justify-between"><span className="text-muted-foreground">Est. Delivery</span><span className="font-medium">{new Date(order.estimated_delivery).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl saffron-gradient text-white font-semibold shadow-md">
              View My Orders <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/products" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-border text-foreground font-medium hover:border-primary/30 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default OrderSuccess;

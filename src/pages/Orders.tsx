import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Clock, Truck, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  processing: { icon: <Clock className="h-4 w-4" />, color: "text-amber-600 bg-amber-50", label: "Processing" },
  shipped: { icon: <Truck className="h-4 w-4" />, color: "text-blue-600 bg-blue-50", label: "Shipped" },
  delivered: { icon: <CheckCircle2 className="h-4 w-4" />, color: "text-green-600 bg-green-50", label: "Delivered" },
  cancelled: { icon: <XCircle className="h-4 w-4" />, color: "text-red-600 bg-red-50", label: "Cancelled" },
};

const Orders = () => {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
        .then(({ data }) => { setOrders(data || []); setLoading(false); });
    }
  }, [user]);

  const cancelOrder = async (orderId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from("orders").update({ status: "cancelled" } as any).eq("id", orderId);
    if (error) { toast.error("Failed to cancel"); return; }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "cancelled" } : o));
    toast.success("Order cancelled");
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-5">🔒</p>
        <h2 className="font-display text-3xl font-bold mb-3">Please Login</h2>
        <Link to="/auth" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl saffron-gradient text-white font-semibold mt-6">Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg-shop">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-3">Your Orders</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">Order History</h1>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl saffron-gradient text-white font-semibold">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-5">
            {orders.map((order, i) => {
              const sc = statusConfig[order.status] || statusConfig.processing;
              return (
                <ScrollReveal key={order.id} delay={i * 80}>
                  <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-mono text-sm font-semibold text-foreground">{order.order_number}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${sc.color}`}>
                        {sc.icon} {sc.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-bold text-foreground tabular-nums">₹{Number(order.total).toLocaleString()}</span>
                        <span className="text-muted-foreground capitalize">{order.payment_method}</span>
                        {order.estimated_delivery && order.status !== "cancelled" && (
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Truck className="h-3.5 w-3.5" /> {new Date(order.estimated_delivery).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                      {order.status === "processing" && (
                        <button onClick={() => cancelOrder(order.id)} className="text-xs text-destructive hover:text-destructive/80 font-medium transition-colors">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

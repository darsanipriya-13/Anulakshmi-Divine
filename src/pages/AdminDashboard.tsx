import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, Users, ShoppingBag, Plus, Edit, Trash2 } from "lucide-react";
import { products as initialProducts, Product } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Mock Data
const MOCK_ORDERS = [
  { id: "ORD-9821", user: "Karthik R.", total: 2499, status: "Processing", date: "2026-04-10" },
  { id: "ORD-9822", user: "Deepa S.", total: 1499, status: "Shipped", date: "2026-04-09" },
  { id: "ORD-9823", user: "Arjun V.", total: 599, status: "Delivered", date: "2026-04-08" },
];

const MOCK_USERS = [
  { id: "USR-001", name: "Karthik R.", email: "karthik.r@example.com", orders: 3 },
  { id: "USR-002", name: "Deepa S.", email: "deepa.s@example.com", orders: 1 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ name: "", price: 0, image: "" });

  const handleDeleteProduct = (id: string) => {
    setProductsList(prev => prev.filter(p => p.id !== id));
    toast.success("Product deleted locally");
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditForm({ name: product.name, price: product.price, image: product.image });
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      setProductsList(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, name: editForm.name, price: editForm.price, image: editForm.image } 
          : p
      ));
      setEditingProduct(null);
      toast.success("Product updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shrink-0 hidden md:block">
        <div className="p-6">
          <h2 className="font-display font-bold text-xl text-foreground">Admin Portal</h2>
        </div>
        <nav className="space-y-1.5 px-4 mt-2">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "products", label: "Products", icon: Package },
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "users", label: "Users", icon: Users },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto">
        <div className="md:hidden flex gap-2 pb-6 border-b border-border overflow-x-auto">
           {["overview", "products", "orders", "users"].map(t => (
             <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 capitalize rounded-full text-sm font-medium ${activeTab === t ? "bg-primary text-white" : "bg-card text-muted-foreground"}`}>{t}</button>
           ))}
        </div>

        <ScrollReveal>
          {activeTab === "overview" && (
            <div className="space-y-8 mt-6">
              <h1 className="font-display text-3xl font-bold">Dashboard Overview</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Sales", value: "₹4,597", icon: ShoppingBag, color: "text-green-600 bg-green-100" },
                  { label: "Total Orders", value: "3", icon: Package, color: "text-blue-600 bg-blue-100" },
                  { label: "Active Users", value: "2", icon: Users, color: "text-purple-600 bg-purple-100" },
                  { label: "Total Products", value: productsList.length.toString(), icon: LayoutDashboard, color: "text-orange-600 bg-orange-100" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-sm flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <h1 className="font-display text-3xl font-bold">Manage Products</h1>
                <button onClick={() => toast.info("Add Product modal coming soon!")} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90">
                  <Plus className="h-4 w-4" /> Add Product
                </button>
              </div>
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-muted-foreground w-16">Image</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Product Name</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Price</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Category</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {productsList.map(p => (
                      <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-3"><img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" /></td>
                        <td className="px-6 py-3 font-medium">{p.name}</td>
                        <td className="px-6 py-3">₹{p.price.toLocaleString()}</td>
                        <td className="px-6 py-3 capitalize text-muted-foreground">{p.category.replace("-", " ")}</td>
                        <td className="px-6 py-3 text-right space-x-2">
                          <button onClick={() => handleEditClick(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6 mt-6">
              <h1 className="font-display text-3xl font-bold">Recent Orders</h1>
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Order ID</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Customer</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Date</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Total</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_ORDERS.map(o => (
                      <tr key={o.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{o.id}</td>
                        <td className="px-6 py-4">{o.user}</td>
                        <td className="px-6 py-4 text-muted-foreground">{o.date}</td>
                        <td className="px-6 py-4 font-semibold">₹{o.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${o.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6 mt-6">
              <h1 className="font-display text-3xl font-bold">Registered Users</h1>
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">User ID</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Name</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Email</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Orders Made</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_USERS.map(u => (
                      <tr key={u.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-muted-foreground">{u.id}</td>
                        <td className="px-6 py-4 font-medium">{u.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                        <td className="px-6 py-4">{u.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </ScrollReveal>

        {/* Edit Product Modal */}
        <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  value={editForm.image}
                  onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboard;

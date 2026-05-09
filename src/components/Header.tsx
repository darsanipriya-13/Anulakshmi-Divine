import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut, Search, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/custom-kit", label: "Build a Kit" },
  { to: "/pooja-booking", label: "Book Pooja" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 header-spiritual ${
        scrolled
          ? "shadow-header-spiritual"
          : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-3xl transition-transform duration-300 group-hover:scale-110">🕉️</span>
          <div>
            <h1 className="text-xl font-display font-bold leading-tight text-foreground tracking-tight">
              Anulakshmi
            </h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground leading-none mt-0.5">
              Divine Pooja Store
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link-spiritual px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                location.pathname === link.to
                  ? "text-primary active nav-active-glow"
                  : "text-temple-brown/80 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {user ? (
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/orders"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-temple-brown/70 hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-[0.97]"
              >
                <Package className="h-4 w-4" />
                <span>My Orders</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-temple-brown/70 hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-[0.97]"
              >
                <span>Admin Panel</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-temple-brown/70 hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-[0.97]"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200 active:scale-[0.97]"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="relative p-2.5 rounded-xl hover:bg-secondary transition-all duration-200 active:scale-[0.95]"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="badge-animate absolute -top-0.5 -right-0.5 h-5 min-w-[20px] px-1 rounded-full bg-primary text-primary-foreground text-[11px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-secondary transition-all duration-200 active:scale-[0.95]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md animate-float-in">
          <nav className="container mx-auto px-4 py-5 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-3 border-t border-border">
              {user ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full text-left text-sm font-medium py-3 px-4 rounded-xl text-muted-foreground hover:bg-secondary justify-start items-center gap-2"
                  >
                    <Package className="h-4 w-4" /> My Orders
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                    className="w-full text-left text-sm font-medium py-3 px-4 rounded-xl text-muted-foreground hover:bg-secondary flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium py-3 px-4 rounded-xl text-muted-foreground hover:bg-secondary"
                >
                  <span className="flex items-center gap-2"><User className="h-4 w-4" /> Sign In / Sign Up</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

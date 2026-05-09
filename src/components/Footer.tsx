import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Footer = () => (
  <footer className="bg-temple text-cream/90">
    {/* Ornamental top border */}
    <div className="h-1 gold-gradient" />

    <div className="container mx-auto px-4 md:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">🕉️</span>
            <div>
              <h3 className="font-display font-bold text-xl text-cream">Anulakshmi</h3>
              <p className="text-[10px] uppercase tracking-[0.25em] text-cream/50 mt-0.5">Divine Pooja Store</p>
            </div>
          </div>
          <p className="text-sm text-cream/50 leading-relaxed max-w-xs">
            Your trusted destination for authentic pooja essentials, divine idols, and sacred items since 2015.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-5 text-gold text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-sm text-cream/50">
            {[
              { to: "/products", label: "Shop All" },
              { to: "/pooja-booking", label: "Book Pooja" },
              { to: "/contact", label: "Contact Us" },
              { to: "/auth", label: "My Account" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-gold transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-5 text-gold text-sm uppercase tracking-wider">Categories</h4>
          <ul className="space-y-3 text-sm text-cream/50">
            {[
              { to: "/products?cat=idols", label: "Divine Idols" },
              { to: "/products?cat=pooja-kits", label: "Pooja Kits" },
              { to: "/products?cat=agarbatti", label: "Agarbatti & Dhoop" },
              { to: "/products?cat=flowers", label: "Pooja Flowers" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-gold transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-5 text-gold text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-4 text-sm text-cream/50">
            {[
              { icon: <MapPin className="h-4 w-4" />, text: "Avinashi road,Tiruppur" },
              { icon: <Phone className="h-4 w-4" />, text: "+91 9095868846" },
              { icon: <Mail className="h-4 w-4" />, text: "contact@anulakshmi.com" },
              { icon: <Clock className="h-4 w-4" />, text: "Mon–Sat: 8 AM – 8 PM" },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-gold/70">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-cream/8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/30">
        <p>© 2024 Anulakshmi Divine Pooja Store. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with devotion 🙏
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

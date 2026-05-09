import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Star, Phone, Sparkles, Calendar } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { products, categories, festivalOffers } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  const quotes = [
    "The soul is neither born, and nor does it die. – Bhagavad Gita",
    "Where there is peace, there is God. – Swami Sivananda",
    "Set thy heart upon thy work, but never on its reward. – Bhagavad Gita",
    "Peace comes from within. Do not seek it without. – Buddha",
  ];
  const [dailyQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  const checkFestival = () => {
    const month = new Date().getMonth();
    if (month >= 8 && month <= 10) return { name: "Diwali", category: "pooja-kits" };
    if (month >= 0 && month <= 1) return { name: "Pongal", category: "daily-pooja" };
    return { name: "Navratri", category: "idols" };
  };
  const activeFestival = checkFestival();
  const festivalProducts = products.filter(p => p.category === activeFestival.category).slice(0, 4);

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Sacred temple with golden domes and diyas"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ animation: "scale-subtle 12s ease-in-out infinite" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 md:px-8 h-full flex items-center z-10">
          <div className="max-w-2xl">
            <p
              className="text-gold font-medium text-sm uppercase tracking-[0.3em] mb-5 flex items-center gap-2 animate-float-in"
            >
              <Sparkles className="h-4 w-4" /> Divine Pooja Store – Your Spiritual Shopping Destination
            </p>
            <h1
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance animate-float-in italic"
              style={{ lineHeight: "1.05", animationDelay: "100ms" }}
            >
              Anulakshmi Divine Pooja Store
            </h1>
            <p
              className="text-white/75 text-lg md:text-xl mb-10 max-w-lg leading-relaxed animate-float-in font-display italic"
              style={{ animationDelay: "200ms" }}
            >
              Everything you need for your daily pooja and rituals in one place
            </p>
            <div
              className="flex flex-wrap gap-4 animate-float-in"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl saffron-gradient text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.97] hover:translate-y-[-1px]"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pooja-booking"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border-2 border-white/25 text-white font-medium text-base hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-[0.97] backdrop-blur-sm"
              >
                <Calendar className="h-4 w-4" /> Book a Pooja
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Daily Spiritual Quote */}
      <section className="bg-temple text-cream py-8 border-b-4 border-gold">
        <ScrollReveal>
          <div className="container mx-auto px-4 text-center">
            <span className="text-3xl block mb-2 opacity-80">🪔</span>
            <p className="font-display text-xl md:text-2xl font-medium italic opacity-90 leading-relaxed max-w-3xl mx-auto">
              "{dailyQuote}"
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Trust Bar */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Truck className="h-5 w-5" />, title: "Free Delivery", sub: "On orders ₹500+" },
              { icon: <Shield className="h-5 w-5" />, title: "100% Authentic", sub: "Verified products" },
              { icon: <Star className="h-5 w-5" />, title: "4.9★ Rated", sub: "Trusted by 10,000+" },
              { icon: <Phone className="h-5 w-5" />, title: "Expert Help", sub: "Call us anytime" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
             <div className="text-center mb-12">
               <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4 border border-primary/20">
                 Upcoming Festival
               </span>
               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Recommended for {activeFestival.name}</h2>
             </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {festivalProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 relative overflow-hidden bg-[#FFFCF8] border-y border-saffron-light/30">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 -left-[10%] w-[50%] h-[50%] rounded-full bg-saffron-light/40 blur-3xl" />
          <div className="absolute bottom-0 -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl opacity-50" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-primary/40" /> Browse by Category <span className="w-8 h-px bg-primary/40" />
            </p>
            <div className="relative inline-block">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Sacred Collections</h2>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 gold-gradient rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 90}>
              <Link
                to={`/products?cat=${cat.id}`}
                className="group flex flex-col items-center p-7 rounded-2xl bg-white border border-border/40 card-hover-lift text-center shadow-sm hover:shadow-xl"
              >
                <span className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 animate-float-gentle" style={{ animationDelay: `${i * 200}ms` }}>
                  {cat.icon}
                </span>
                <h3 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{cat.description}</p>
                <span className="mt-3 text-xs text-primary font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        </div>
      </section>

      {/* Festival Offers */}
      <section className="bg-gradient-to-b from-secondary/60 to-background py-24">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" /> Limited Time Offers <Sparkles className="h-4 w-4" />
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Festival Specials</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {festivalOffers.map((offer, i) => (
              <ScrollReveal key={offer.id} delay={i * 120}>
                <Link
                  to={`/products?cat=${offer.id === "diwali" ? "pooja-kits" : "idols"}`}
                  className={`festival-card block p-8 md:p-10 rounded-2xl bg-gradient-to-br ${offer.color} text-white group card-hover-lift`}
                >
                  <span className="text-6xl mb-5 block transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    {offer.emoji}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">{offer.name}</h3>
                  <p className="text-white/75 text-sm mb-4 leading-relaxed">{offer.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold">
                      {offer.discount}
                    </span>
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors flex items-center gap-1">
                      Shop Now <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-8 py-24">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-3">Handpicked for You</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Featured Products</h2>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              View All <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {featuredProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold active:scale-[0.97] transition-all"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="container mx-auto px-4 md:px-8 pb-24">
          <div className="relative rounded-3xl saffron-gradient p-12 md:p-20 text-center text-white overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

            <div className="relative">
              <span className="text-5xl mb-6 block animate-float-gentle">🙏</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-5 text-balance" style={{ lineHeight: "1.1" }}>
                Need a Priest for Your Pooja?
              </h2>
              <p className="text-white/80 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                Book experienced pandits for griha pravesh, satyanarayan katha, wedding rituals and more.
              </p>
              <Link
                to="/pooja-booking"
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl bg-white text-foreground font-bold text-base hover:bg-white/90 transition-all duration-300 active:scale-[0.97] shadow-lg hover:shadow-xl hover:translate-y-[-1px]"
              >
                <Calendar className="h-5 w-5" /> Book a Pooja
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default Index;

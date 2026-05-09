import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "all";
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const matchesCat = activeCat === "all" || p.category === activeCat;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesCat && matchesSearch && matchesPrice;
    });

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [activeCat, search, sort, priceRange]);

  return (
    <div className="min-h-screen page-bg-shop">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-3">Our Collection</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">Sacred Pooja Essentials</h1>
          </div>
        </ScrollReveal>

        {/* Search + Sort */}
        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto mb-8 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search for idols, pooja kits, agarbatti..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground input-premium focus:outline-none transition-all duration-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-2 text-sm font-medium ${showFilters ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30"}`}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
        </ScrollReveal>

        {/* Filters Panel */}
        {showFilters && (
          <ScrollReveal>
            <div className="max-w-3xl mx-auto mb-8 p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" /> Sort By
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Price Range</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      placeholder="Min"
                      className="w-full px-3 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none text-sm"
                    />
                    <span className="text-muted-foreground">–</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      placeholder="Max"
                      className="w-full px-3 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Category filters */}
        <ScrollReveal delay={150}>
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            <button
              onClick={() => setSearchParams({})}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                activeCat === "all"
                  ? "saffron-gradient text-white shadow-md"
                  : "bg-card border border-border text-secondary-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ cat: cat.id })}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                  activeCat === cat.id
                    ? "saffron-gradient text-white shadow-md"
                    : "bg-card border border-border text-secondary-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Results count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-5xl mb-5">🔍</p>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">No products found</h3>
            <p>Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 70}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

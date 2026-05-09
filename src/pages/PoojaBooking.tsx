import { useState } from "react";
import { Calendar, Clock, IndianRupee, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";

const poojas = [
  { id: "satyanarayan", name: "Satyanarayan Katha", price: 2100, duration: "2–3 hrs", emoji: "🙏", desc: "For peace, prosperity & blessings" },
  { id: "griha-pravesh", name: "Griha Pravesh Pooja", price: 3500, duration: "3–4 hrs", emoji: "🏠", desc: "New home purification ceremony" },
  { id: "navgraha", name: "Navgraha Shanti Pooja", price: 2500, duration: "2 hrs", emoji: "⭐", desc: "Planetary peace & harmony" },
  { id: "wedding", name: "Wedding Rituals", price: 11000, duration: "Full day", emoji: "💍", desc: "Complete Vedic wedding ceremony" },
  { id: "sundarkand", name: "Sundarkand Path", price: 1500, duration: "2 hrs", emoji: "📖", desc: "Sacred Hanuman Chalisa recitation" },
  { id: "rudrabhishek", name: "Rudrabhishek", price: 3100, duration: "2–3 hrs", emoji: "🔱", desc: "Lord Shiva abhishekam ritual" },
];

const PoojaBooking = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) { toast.error("Please select a pooja type"); return; }
    toast.success("Booking request received! We'll call you shortly 🙏");
    setSelected(null); setName(""); setPhone(""); setDate("");
  };

  return (
    <div className="min-h-screen page-bg-pooja overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-3">Sacred Services</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Book a Pooja</h1>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Book experienced pandits for home or temple rituals. We bring the divine to your doorstep.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {poojas.map((pooja, i) => (
            <ScrollReveal key={pooja.id} delay={i * 80}>
              <button
                onClick={() => setSelected(pooja.id)}
                className={`w-full text-left p-7 rounded-2xl border-2 transition-all duration-300 active:scale-[0.98] card-hover-lift ${
                  selected === pooja.id ? "border-primary bg-primary/5 premium-shadow" : "border-border/60 bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{pooja.emoji}</span>
                  {selected === pooja.id && <CheckCircle2 className="h-5 w-5 text-primary animate-float-in" />}
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-1">{pooja.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pooja.desc}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium"><IndianRupee className="h-3.5 w-3.5" /> {pooja.price.toLocaleString()}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {pooja.duration}</span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-9 md:p-12 rounded-3xl bg-white/95 backdrop-blur-md border border-white/50 premium-shadow">
            <h2 className="font-display text-3xl font-bold mb-3 text-foreground text-center">Booking Details</h2>
            <p className="text-sm text-muted-foreground mb-8 text-center px-4">Fill in your details and our team will arrange everything.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-5 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none shadow-sm" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-5 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none shadow-sm" placeholder="+91 9095868846" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Preferred Date</label>
                <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-5 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none shadow-sm" />
              </div>
            </div>
            <button type="submit" className="w-full mt-8 py-4 rounded-xl saffron-gradient text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" /> Submit Booking Request
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default PoojaBooking;

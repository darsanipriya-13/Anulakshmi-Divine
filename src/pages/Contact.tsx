import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon 🙏");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="min-h-screen page-bg-contact overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-3">Get in Touch</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">Contact Us</h1>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">Have questions about our products or services? We'd love to hear from you.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <div>
              <h2 className="font-display text-2xl font-bold mb-8 text-foreground">Visit Our Store</h2>
              <div className="space-y-6 mb-8">
                {[
                  { icon: <MapPin className="h-5 w-5" />, label: "Address", value: "41 Padmavathipuram marriyamman Kovil street,\npost, Gandhinagar,\nTiruppur, Tamil Nadu 641603" },
                  { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "+91 9095868846" },
                  { icon: <Mail className="h-5 w-5" />, label: "Email", value: "contact@anulakshmi.com" },
                  { icon: <Clock className="h-5 w-5" />, label: "Store Hours", value: "Mon – Sat: 8 AM – 8 PM\nSunday: 9 AM – 2 PM" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-0.5">{item.label}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden premium-shadow h-64 border border-border">
                <iframe 
                  src="https://maps.google.com/maps?q=41+Padmavathipuram+marriyamman+Kovil+street,+post,+Gandhinagar,+Tiruppur,+Tamil+Nadu+641603&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location Map"
                ></iframe>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
            <form onSubmit={handleSubmit} className="p-9 md:p-12 rounded-3xl bg-white border border-white/60 premium-shadow">
              <h2 className="font-display text-3xl font-bold mb-3 text-foreground">Send a Message</h2>
              <p className="text-sm text-muted-foreground mb-8">We typically respond within 24 hours.</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-5 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none shadow-sm" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-5 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none shadow-sm" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                  <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)} className="w-full px-5 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground input-premium focus:outline-none resize-none shadow-sm" placeholder="How can we help you?" />
                </div>
              </div>
              <button type="submit" className="w-full mt-8 py-4 rounded-xl saffron-gradient text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;

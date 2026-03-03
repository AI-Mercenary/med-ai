import { Mail, Github, Linkedin, Globe, MapPin, Phone } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: "contact@medai.dev", href: "mailto:contact@medai.dev" },
  { icon: Github, label: "GitHub", value: "github.com/medai-project", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/medai", href: "https://linkedin.com" },
  { icon: Globe, label: "Website", value: "medai.dev", href: "#" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA", href: "#" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
];

export default function Contact() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-14">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions about MedAI Drug Predictor? Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {contacts.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-medical flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="text-sm font-medium">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 hero-gradient rounded-2xl p-10 text-center text-primary-foreground">
          <h2 className="font-display text-2xl font-bold mb-2">Open for Collaboration</h2>
          <p className="text-primary-foreground/80 text-sm">
            We welcome contributions, partnerships, and feedback from the healthcare and AI community.
          </p>
        </div>
      </div>
    </section>
  );
}

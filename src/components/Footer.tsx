import { Activity, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-gradient">MedAI Drug Predictor</span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-destructive" /> for healthcare innovation
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MedAI. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}

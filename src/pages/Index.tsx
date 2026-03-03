import { Link } from "react-router-dom";
import { Activity, Brain, Shield, BarChart3, Zap, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "ML-Powered Predictions",
    description: "Advanced decision tree algorithms analyze patient data to predict optimal drug categories with high accuracy.",
  },
  {
    icon: Shield,
    title: "Clinical-Grade Security",
    description: "Built with healthcare compliance in mind, ensuring patient data privacy at every step.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Comprehensive dashboard with visualizations tracking prediction accuracy and patient demographics.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get drug predictions in milliseconds with detailed confidence scores and clinical explanations.",
  },
  {
    icon: Database,
    title: "Evidence-Based",
    description: "Trained on validated medical datasets following established pharmaceutical guidelines.",
  },
  {
    icon: Activity,
    title: "Continuous Learning",
    description: "Model continuously improves with new data patterns to maintain prediction accuracy.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-5" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Activity className="h-4 w-4" />
              AI-Powered Healthcare Platform
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
              Predict the Right Drug with{" "}
              <span className="text-gradient">Machine Learning</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              MedAI Drug Predictor uses advanced ML algorithms to analyze patient vitals and
              recommend optimal drug categories — fast, accurate, and clinically grounded.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="rounded-xl text-base px-8">
                <Link to="/predict">
                  Start Prediction <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl text-base px-8">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="text-gradient">Modern Healthcare</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A production-ready AI platform designed to support clinical decision-making with transparency and precision.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card-medical animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="hero-gradient rounded-3xl p-12 md:p-16 text-center text-primary-foreground">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Drug Prediction?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Input patient parameters and receive instant, AI-powered drug recommendations backed by clinical data.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-xl text-base px-8">
              <Link to="/predict">Try It Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

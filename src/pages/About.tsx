import { Brain, Database, Cpu, BarChart3, Shield, Code2 } from "lucide-react";

const pipeline = [
  { icon: Database, title: "Data Collection", desc: "Patient records including age, sex, blood pressure, cholesterol levels, and Na-to-K ratio sourced from validated medical datasets." },
  { icon: Cpu, title: "Feature Engineering", desc: "Raw patient data is preprocessed with normalization, encoding categorical variables, and feature scaling for optimal model performance." },
  { icon: Brain, title: "Model Training", desc: "A Decision Tree Classifier is trained on the processed dataset, learning patterns between patient features and drug categories." },
  { icon: BarChart3, title: "Evaluation", desc: "Model achieves 94%+ accuracy validated through k-fold cross-validation with precision, recall, and F1-score metrics." },
  { icon: Shield, title: "Deployment", desc: "The trained model is deployed as a real-time prediction API with input validation and confidence scoring." },
];

const techStack = [
  { category: "Frontend", items: ["React 18", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Recharts"] },
  { category: "ML Pipeline", items: ["Decision Tree Classifier", "scikit-learn", "pandas", "NumPy"] },
  { category: "Infrastructure", items: ["Vite", "React Router", "React Hook Form", "Zod Validation"] },
];

export default function About() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Brain className="h-4 w-4" /> About MedAI
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How Our <span className="text-gradient">ML Pipeline</span> Works
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MedAI Drug Predictor uses a supervised machine learning approach to classify optimal drug categories for patients based on their clinical parameters.
          </p>
        </div>

        {/* Pipeline */}
        <div className="space-y-6 mb-16">
          {pipeline.map((step, i) => (
            <div
              key={step.title}
              className="card-medical flex gap-4 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-xl hero-gradient flex items-center justify-center shrink-0">
                <step.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-primary">Step {i + 1}</span>
                  <h3 className="font-display font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" /> Tech Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {techStack.map((group) => (
              <div key={group.category} className="card-medical">
                <h3 className="font-display font-semibold text-sm text-primary mb-3">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

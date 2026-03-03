import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { predictDrug, PredictionResult } from "@/lib/drugPredictor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, CheckCircle, AlertCircle, Beaker } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const schema = z.object({
  age: z.coerce.number().min(1, "Age required").max(120, "Invalid age"),
  sex: z.enum(["M", "F"], { required_error: "Select sex" }),
  bp: z.enum(["LOW", "NORMAL", "HIGH"], { required_error: "Select BP level" }),
  cholesterol: z.enum(["NORMAL", "HIGH"], { required_error: "Select cholesterol" }),
  naToK: z.coerce.number().min(1, "Min 1").max(50, "Max 50"),
});

type FormData = z.infer<typeof schema>;

export default function Prediction() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const prediction = predictDrug(data as Required<FormData>);
      setResult(prediction);
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Beaker className="h-4 w-4" /> Drug Prediction Engine
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Patient <span className="text-gradient">Analysis</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter patient vitals below. Our ML model will predict the optimal drug category.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card-medical">
            <h2 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Patient Parameters
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="e.g. 45" {...register("age")} className="mt-1" />
                {errors.age && <p className="text-destructive text-xs mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <Label>Sex</Label>
                <Select onValueChange={(v) => setValue("sex", v as "M" | "F")}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sex && <p className="text-destructive text-xs mt-1">{errors.sex.message}</p>}
              </div>

              <div>
                <Label>Blood Pressure</Label>
                <Select onValueChange={(v) => setValue("bp", v as "LOW" | "NORMAL" | "HIGH")}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bp && <p className="text-destructive text-xs mt-1">{errors.bp.message}</p>}
              </div>

              <div>
                <Label>Cholesterol</Label>
                <Select onValueChange={(v) => setValue("cholesterol", v as "NORMAL" | "HIGH")}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
                {errors.cholesterol && <p className="text-destructive text-xs mt-1">{errors.cholesterol.message}</p>}
              </div>

              <div>
                <Label htmlFor="naToK">Na-to-K Ratio</Label>
                <Input id="naToK" type="number" step="0.001" placeholder="e.g. 14.5" {...register("naToK")} className="mt-1" />
                {errors.naToK && <p className="text-destructive text-xs mt-1">{errors.naToK.message}</p>}
              </div>

              <Button type="submit" className="w-full rounded-xl" size="lg" disabled={loading}>
                {loading ? "Analyzing..." : "Predict Drug"}
              </Button>
            </form>
          </div>

          {/* Result */}
          <div>
            {loading && (
              <div className="card-medical flex flex-col items-center justify-center py-16 animate-fade-in">
                <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                <p className="text-muted-foreground font-medium">Running ML analysis…</p>
              </div>
            )}

            {result && !loading && (
              <div className="card-medical animate-scale-in space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl hero-gradient flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Predicted Drug</p>
                    <h3 className="font-display text-2xl font-bold text-gradient">{result.drug}</h3>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Confidence Score</span>
                    <span className="font-semibold">{Math.round(result.confidence * 100)}%</span>
                  </div>
                  <Progress value={result.confidence * 100} className="h-3 rounded-full" />
                </div>

                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">Alternative Candidates</p>
                  <div className="space-y-2">
                    {result.alternatives.slice(0, 3).map((alt) => (
                      <div key={alt.drug} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{alt.drug}</span>
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                          {Math.round(alt.probability * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!result && !loading && (
              <div className="card-medical flex flex-col items-center justify-center py-16 text-center">
                <Beaker className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Fill in the patient form and click <strong>Predict Drug</strong> to see results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

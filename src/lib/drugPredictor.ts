export interface PatientInput {
  age: number;
  sex: "M" | "F";
  bp: "LOW" | "NORMAL" | "HIGH";
  cholesterol: "NORMAL" | "HIGH";
  naToK: number;
}

export interface PredictionResult {
  drug: string;
  confidence: number;
  explanation: string;
  alternatives: { drug: string; probability: number }[];
}

const DRUGS = ["DrugA", "DrugB", "DrugC", "DrugX", "DrugY"];

export function predictDrug(input: PatientInput): PredictionResult {
  // Simulated ML prediction logic based on medical decision tree patterns
  const { age, sex, bp, cholesterol, naToK } = input;

  if (naToK > 14.829) {
    return result("DrugY", 0.94, "High Na-to-K ratio (>14.8) strongly indicates DrugY regardless of other factors.");
  }

  if (bp === "HIGH") {
    if (age > 50) {
      return result("DrugA", 0.88, "High blood pressure in patients over 50 typically responds best to DrugA.");
    }
    return result("DrugB", 0.85, "Younger patients with high BP are commonly prescribed DrugB.");
  }

  if (bp === "LOW") {
    if (cholesterol === "HIGH") {
      return result("DrugC", 0.82, "Low BP combined with high cholesterol suggests DrugC for optimal management.");
    }
    return result("DrugX", 0.79, "Low BP with normal cholesterol indicates DrugX as the recommended treatment.");
  }

  // NORMAL BP
  if (cholesterol === "HIGH" && age > 40) {
    return result("DrugA", 0.76, "Normal BP with high cholesterol in older patients points to DrugA.");
  }

  return result("DrugX", 0.73, "Patient profile with normal BP and cholesterol is best managed with DrugX.");
}

function result(drug: string, confidence: number, explanation: string): PredictionResult {
  const alts = DRUGS.filter(d => d !== drug).map(d => ({
    drug: d,
    probability: Math.round((Math.random() * (1 - confidence) * 100)) / 100,
  })).sort((a, b) => b.probability - a.probability);

  return { drug, confidence, explanation, alternatives: alts };
}

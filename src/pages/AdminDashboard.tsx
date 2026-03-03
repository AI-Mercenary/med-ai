import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Activity, Users, TrendingUp, Pill, BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const drugDist = [
  { name: "DrugA", value: 23 },
  { name: "DrugB", value: 16 },
  { name: "DrugC", value: 16 },
  { name: "DrugX", value: 54 },
  { name: "DrugY", value: 91 },
];

const PIE_COLORS = [
  "hsl(199, 89%, 48%)", "hsl(152, 69%, 41%)",
  "hsl(38, 92%, 50%)", "hsl(262, 60%, 55%)", "hsl(0, 72%, 51%)"
];

const weeklyPredictions = [
  { day: "Mon", count: 42 }, { day: "Tue", count: 58 },
  { day: "Wed", count: 35 }, { day: "Thu", count: 71 },
  { day: "Fri", count: 63 }, { day: "Sat", count: 29 },
  { day: "Sun", count: 18 },
];

const accuracyTrend = [
  { month: "Jan", accuracy: 88 }, { month: "Feb", accuracy: 89 },
  { month: "Mar", accuracy: 91 }, { month: "Apr", accuracy: 90 },
  { month: "May", accuracy: 93 }, { month: "Jun", accuracy: 94 },
];

const recentPredictions = [
  { id: "P-001", age: 47, sex: "F", bp: "HIGH", drug: "DrugA", confidence: 88 },
  { id: "P-002", age: 28, sex: "M", bp: "NORMAL", drug: "DrugX", confidence: 79 },
  { id: "P-003", age: 61, sex: "F", bp: "LOW", drug: "DrugC", confidence: 82 },
  { id: "P-004", age: 35, sex: "M", bp: "HIGH", drug: "DrugB", confidence: 85 },
  { id: "P-005", age: 52, sex: "F", bp: "NORMAL", drug: "DrugY", confidence: 94 },
];

const stats = [
  { icon: Users, label: "Total Patients", value: "1,247" },
  { icon: Pill, label: "Predictions Made", value: "3,891" },
  { icon: TrendingUp, label: "Avg Confidence", value: "91.2%" },
  { icon: BarChart3, label: "Model Accuracy", value: "94.1%" },
];

export default function AdminDashboard() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Activity className="h-4 w-4" /> Admin Dashboard
          </div>
          <h1 className="font-display text-3xl font-bold">Analytics <span className="text-gradient">Overview</span></h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={s.label} className="card-medical animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="font-display text-xl font-bold">{s.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="card-medical">
            <h3 className="font-display font-semibold mb-4">Weekly Predictions</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyPredictions}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card-medical">
            <h3 className="font-display font-semibold mb-4">Drug Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={drugDist} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {drugDist.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-medical mb-8">
          <h3 className="font-display font-semibold mb-4">Model Accuracy Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={accuracyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="card-medical">
          <h3 className="font-display font-semibold mb-4">Recent Predictions</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Sex</TableHead>
                  <TableHead>BP</TableHead>
                  <TableHead>Drug</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPredictions.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell>{p.age}</TableCell>
                    <TableCell>{p.sex}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.bp === "HIGH" ? "bg-destructive/10 text-destructive" :
                        p.bp === "LOW" ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>{p.bp}</span>
                    </TableCell>
                    <TableCell className="font-semibold">{p.drug}</TableCell>
                    <TableCell>{p.confidence}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Eye, Scale, RefreshCw, AlertTriangle } from "lucide-react";

const metrics = [
  {
    icon: Eye,
    label: "Clarity",
    score: "0.92",
    status: "High",
    description: "How clearly you articulate your thought process and solutions.",
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    borderClass: "border-primary/20",
  },
  {
    icon: Scale,
    label: "Tradeoffs",
    score: "0.88",
    status: "Good",
    description: "Your ability to identify and evaluate alternative approaches.",
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    borderClass: "border-accent/20",
  },
  {
    icon: RefreshCw,
    label: "Adaptability",
    score: "0.65",
    status: "Needs Work",
    description: "How well you adjust when requirements or constraints change.",
    colorClass: "text-amber-500",
    bgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/20",
  },
  {
    icon: AlertTriangle,
    label: "Failure Awareness",
    score: "0.78",
    status: "Good",
    description: "Your understanding of edge cases and potential failure modes.",
    colorClass: "text-violet-500",
    bgClass: "bg-violet-500/10",
    borderClass: "border-violet-500/20",
  },
];

const MetricsSection = () => {
  return (
    <section id="metrics" className="py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
            Intelligence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            Thinking Metrics
          </h2>
          <p className="text-muted-foreground text-lg">
            Quantified evaluation of engineering reasoning patterns across four key dimensions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`p-6 bg-card border ${metric.borderClass} rounded-xl transition-all duration-300 hover:shadow-lg`}
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${metric.bgClass} mb-5`}>
                <metric.icon className={`w-7 h-7 ${metric.colorClass}`} />
              </div>
              
              <div className="flex items-baseline justify-between mb-3">
                <h3 className={`text-lg font-semibold ${metric.colorClass}`}>
                  {metric.label}
                </h3>
                <span className="font-mono text-2xl font-bold text-foreground">{metric.score}</span>
              </div>
              
              <div className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${metric.bgClass} ${metric.colorClass} mb-3`}>
                {metric.status}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Evaluation Scale */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="p-8 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="font-medium text-foreground">Overall Evaluation Scale</span>
              <span className="font-mono text-muted-foreground">0.00 — 1.00</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{
                  width: '81%',
                  background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)'
                }}
              />
            </div>
            <div className="flex justify-between mt-3 text-xs text-muted-foreground">
              <span>Needs Work</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

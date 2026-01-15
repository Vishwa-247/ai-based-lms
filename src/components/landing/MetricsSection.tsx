import { Eye, Scale, RefreshCw, AlertTriangle } from "lucide-react";

const metrics = [
  {
    icon: Eye,
    label: "Clarity",
    score: "0.92",
    status: "High",
    description: "How clearly you articulate your thought process.",
    colorClass: "metric-card-blue",
    badgeClass: "badge-primary",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Scale,
    label: "Tradeoffs",
    score: "0.88",
    status: "Good",
    description: "Your ability to evaluate alternative approaches.",
    colorClass: "metric-card-green",
    badgeClass: "badge-success",
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: RefreshCw,
    label: "Adaptability",
    score: "0.65",
    status: "Needs Work",
    description: "How well you adjust to changing requirements.",
    colorClass: "metric-card-amber",
    badgeClass: "badge-warning",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: AlertTriangle,
    label: "Awareness",
    score: "0.78",
    status: "Good",
    description: "Understanding of edge cases and failure modes.",
    colorClass: "metric-card-violet",
    badgeClass: "badge-success",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
];

const MetricsSection = () => {
  return (
    <section id="metrics" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="section-label mb-3 block">Intelligence</span>
          <h2 className="mb-4">Thinking Metrics</h2>
          <p className="text-muted-foreground text-lg">
            Quantified evaluation across four key dimensions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`metric-card ${metric.colorClass}`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${metric.bgColor} mb-4`}>
                <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
              </div>
              
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {metric.label}
                </h3>
                <span className="font-mono text-xl font-bold text-foreground">{metric.score}</span>
              </div>
              
              <span className={`badge ${metric.badgeClass} text-[10px] mb-3`}>
                {metric.status}
              </span>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="font-medium text-foreground">Overall Score</span>
              <span className="font-mono text-muted-foreground">81%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary"
                style={{ width: '81%' }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
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
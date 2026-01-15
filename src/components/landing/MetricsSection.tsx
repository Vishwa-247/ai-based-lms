import { Eye, Scale, RefreshCw, AlertTriangle } from "lucide-react";

const metrics = [
  {
    icon: Eye,
    label: "Clarity",
    description: "How clearly you articulate your thought process and solutions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: Scale,
    label: "Tradeoffs",
    description: "Your ability to identify and evaluate alternative approaches.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
  },
  {
    icon: RefreshCw,
    label: "Adaptability",
    description: "How well you adjust when requirements or constraints change.",
    color: "text-[#F59E0B]",
    bgColor: "bg-[#F59E0B]/10",
    borderColor: "border-[#F59E0B]/30",
  },
  {
    icon: AlertTriangle,
    label: "Failure Awareness",
    description: "Your understanding of edge cases and potential failure modes.",
    color: "text-[#8B5CF6]",
    bgColor: "bg-[#8B5CF6]/10",
    borderColor: "border-[#8B5CF6]/30",
  },
];

const MetricsSection = () => {
  return (
    <section id="metrics" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Thinking Metrics
          </h2>
          <p className="text-muted-foreground">
            Quantified evaluation of engineering reasoning patterns across four key dimensions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`p-6 bg-card border ${metric.borderColor} rounded-lg`}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${metric.bgColor} mb-4`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <h3 className={`text-lg font-semibold ${metric.color} mb-2`}>
                {metric.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Metric Scale */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-muted-foreground">Evaluation Scale</span>
              <span className="font-mono text-muted-foreground">0.00 — 1.00</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-primary rounded-full" />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
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

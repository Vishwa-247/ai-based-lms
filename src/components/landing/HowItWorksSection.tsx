import { FileText, Cpu, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Define Your Profile",
    description: "Input your target roles, companies, and skill areas. Our system builds a personalized learning trajectory.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Agentic Simulation",
    description: "Engage in realistic engineering scenarios with AI-driven evaluation. Get real-time feedback on your reasoning patterns.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Measure & Iterate",
    description: "Track clarity, tradeoffs, adaptability, and failure awareness. Refine your approach based on quantified metrics.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="platform" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            A systematic approach to career preparation, powered by agentic AI reasoning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative p-8 bg-background border border-border rounded-lg group hover:border-primary/30 transition-colors"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8 px-3 py-1 bg-card border border-border rounded text-xs font-mono text-muted-foreground">
                Step {step.step}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-muted mb-6">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

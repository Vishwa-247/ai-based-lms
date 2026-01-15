import { User, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: User,
    step: "01",
    title: "Define Your Goals",
    description: "Set your target roles, companies, and skill areas. Our system builds a personalized learning path.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Practice with AI",
    description: "Engage in realistic scenarios with AI evaluation. Get real-time feedback on your reasoning.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Track & Improve",
    description: "Monitor your progress across key metrics. Refine your approach with quantified insights.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="section-label mb-3 block">Process</span>
          <h2 className="mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            A systematic approach to career preparation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Timeline connector */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative group">
                {/* Step Number */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                    {step.step}
                  </div>
                </div>

                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-px bg-border" />
                )}

                {/* Card */}
                <div className="feature-card text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/15 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
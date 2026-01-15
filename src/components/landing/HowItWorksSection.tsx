import { User, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: User,
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
    icon: TrendingUp,
    step: "03",
    title: "Measure & Iterate",
    description: "Track clarity, tradeoffs, adaptability, and failure awareness. Refine your approach based on quantified metrics.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-28 bg-card/50 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A systematic approach to career preparation, powered by agentic AI reasoning.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-border hidden md:block" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative group"
              >
                {/* Step Circle */}
                <div className="relative flex justify-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center relative z-10">
                    <span className="text-sm font-bold text-primary">{step.step}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="feature-card text-center">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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

import { ArrowDown, Zap } from "lucide-react";

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="py-28 bg-card/50 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
            Under The Hood
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            Technical Architecture
          </h2>
          <p className="text-muted-foreground text-lg">
            Multi-agent orchestration with real-time evaluation feedback loops.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-10 bg-background border border-border rounded-2xl overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 grid-pattern opacity-40" />

            <div className="relative space-y-6">
              {/* User Input */}
              <div className="flex justify-center">
                <div className="px-8 py-4 bg-muted/50 border border-border rounded-xl text-center">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Input</div>
                  <div className="font-semibold text-foreground">User Session</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Orchestrator */}
              <div className="flex justify-center">
                <div className="px-10 py-5 bg-primary/5 border border-primary/20 rounded-xl text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1 mt-2">Core Engine</div>
                  <div className="font-semibold text-foreground text-lg">Agentic Orchestrator</div>
                  <div className="text-sm text-muted-foreground mt-1">Multi-agent coordination layer</div>
                </div>
              </div>

              {/* Arrows */}
              <div className="flex justify-center gap-32">
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Modules Row */}
              <div className="grid grid-cols-3 gap-4">
                {["Course Agent", "Interview Agent", "DSA Agent"].map((agent) => (
                  <div key={agent} className="p-5 bg-muted/30 border border-border rounded-xl text-center">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Module</div>
                    <div className="font-mono text-sm font-medium text-foreground">{agent}</div>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Evaluator */}
              <div className="flex justify-center">
                <div className="px-10 py-5 bg-accent/5 border border-accent/20 rounded-xl text-center">
                  <div className="text-xs font-medium text-accent uppercase tracking-wider mb-1">Evaluation</div>
                  <div className="font-semibold text-foreground text-lg">Metrics Evaluator</div>
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>Clarity</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>Tradeoffs</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>Adaptability</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>Awareness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

import { ArrowRight } from "lucide-react";

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Technical Architecture
          </h2>
          <p className="text-muted-foreground">
            Multi-agent orchestration with real-time evaluation feedback loops.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-background border border-border rounded-lg">
            {/* Grid Background */}
            <div className="absolute inset-0 grid-pattern opacity-30 rounded-lg" />

            <div className="relative">
              {/* User Input */}
              <div className="flex justify-center mb-8">
                <div className="px-6 py-3 bg-muted border border-border rounded-lg text-center">
                  <div className="text-xs text-muted-foreground mb-1">INPUT</div>
                  <div className="font-mono text-sm text-foreground">User Session</div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-8">
                <ArrowRight className="w-5 h-5 text-border rotate-90" />
              </div>

              {/* Orchestrator */}
              <div className="flex justify-center mb-8">
                <div className="px-8 py-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
                  <div className="text-xs text-primary mb-1">CORE</div>
                  <div className="font-semibold text-foreground">Agentic Orchestrator</div>
                  <div className="text-xs text-muted-foreground mt-1">Multi-agent coordination layer</div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-16">
                  <ArrowRight className="w-5 h-5 text-border rotate-90" />
                  <ArrowRight className="w-5 h-5 text-border rotate-90" />
                  <ArrowRight className="w-5 h-5 text-border rotate-90" />
                </div>
              </div>

              {/* Modules Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-muted border border-border rounded-lg text-center">
                  <div className="text-xs text-muted-foreground mb-1">MODULE</div>
                  <div className="font-mono text-sm text-foreground">Course Agent</div>
                </div>
                <div className="p-4 bg-muted border border-border rounded-lg text-center">
                  <div className="text-xs text-muted-foreground mb-1">MODULE</div>
                  <div className="font-mono text-sm text-foreground">Interview Agent</div>
                </div>
                <div className="p-4 bg-muted border border-border rounded-lg text-center">
                  <div className="text-xs text-muted-foreground mb-1">MODULE</div>
                  <div className="font-mono text-sm text-foreground">DSA Agent</div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-8">
                <ArrowRight className="w-5 h-5 text-border rotate-90" />
              </div>

              {/* Evaluator */}
              <div className="flex justify-center">
                <div className="px-8 py-4 bg-accent/10 border border-accent/30 rounded-lg text-center">
                  <div className="text-xs text-accent mb-1">EVALUATION</div>
                  <div className="font-semibold text-foreground">Metrics Evaluator</div>
                  <div className="text-xs text-muted-foreground mt-1">Clarity • Tradeoffs • Adaptability • Awareness</div>
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

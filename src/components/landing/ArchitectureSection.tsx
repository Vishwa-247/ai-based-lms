import { ArrowDown, Zap } from "lucide-react";

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="section-padding bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="section-label mb-3 block">Architecture</span>
          <h2 className="mb-4">Technical Design</h2>
          <p className="text-muted-foreground text-lg">
            Multi-agent orchestration with real-time evaluation.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 bg-card border border-border rounded-2xl overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 grid-bg opacity-50" />

            <div className="relative space-y-5">
              {/* User Input */}
              <div className="flex justify-center">
                <div className="px-6 py-3 bg-secondary border border-border rounded-lg text-center">
                  <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Input</div>
                  <div className="text-sm font-semibold text-foreground">User Session</div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Orchestrator */}
              <div className="flex justify-center">
                <div className="px-8 py-4 bg-primary/5 border border-primary/20 rounded-xl text-center relative">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                  <div className="text-[10px] font-medium text-primary uppercase tracking-wider mb-0.5 mt-1">Core</div>
                  <div className="text-sm font-semibold text-foreground">Agentic Orchestrator</div>
                </div>
              </div>

              <div className="flex justify-center gap-20">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Modules Row */}
              <div className="grid grid-cols-3 gap-3">
                {["Course Agent", "Interview Agent", "DSA Agent"].map((agent) => (
                  <div key={agent} className="p-4 bg-secondary/50 border border-border rounded-lg text-center">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Module</div>
                    <div className="text-xs font-mono font-medium text-foreground">{agent}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Evaluator */}
              <div className="flex justify-center">
                <div className="px-8 py-4 bg-accent/5 border border-accent/20 rounded-xl text-center">
                  <div className="text-[10px] font-medium text-accent uppercase tracking-wider mb-0.5">Output</div>
                  <div className="text-sm font-semibold text-foreground">Metrics Evaluator</div>
                  <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-muted-foreground">
                    <span>Clarity</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>Tradeoffs</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>Adaptability</span>
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
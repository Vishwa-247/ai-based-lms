import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeEditorMockup from "./CodeEditorMockup";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-sm text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Agentic Career Intelligence
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-tight mb-6">
              Engineer Your Career with{" "}
              <span className="text-primary">AI-Powered</span> Precision
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Professional-grade platform for agentic reasoning, engineering simulations, 
              and comprehensive evaluation metrics. Built for candidates who think like engineers.
            </p>

            <div className="flex items-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-border text-foreground hover:bg-muted"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
              <Link to="/courses">
                <Button
                  size="lg"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Explore Platform
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Trusted by engineers at</p>
              <div className="flex items-center gap-8 text-muted-foreground/60">
                <span className="text-lg font-semibold">Google</span>
                <span className="text-lg font-semibold">Meta</span>
                <span className="text-lg font-semibold">Amazon</span>
                <span className="text-lg font-semibold">Microsoft</span>
              </div>
            </div>
          </div>

          {/* Right - Code Editor Mockup */}
          <div className="relative">
            <div className="absolute -inset-4 grid-overlay opacity-30 rounded-lg" />
            <CodeEditorMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

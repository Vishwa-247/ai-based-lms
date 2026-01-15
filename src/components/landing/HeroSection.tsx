import { Link } from "react-router-dom";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeEditorMockup from "./CodeEditorMockup";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      
      {/* Warm glow effect in dark mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none dark:bg-primary/10" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Announcement Badge */}
            <div className="announcement-badge mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="text-sm font-medium text-foreground">
                Now powered by Advanced Agentic AI
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
              Interviews that{" "}
              <span className="text-gradient-warm">actually work.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Screen your skills 10x faster with AI-powered career intelligence. 
              Save time, build confidence, and land your dream role without 
              the guesswork.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link to="/courses">
                <Button
                  size="lg"
                  className="btn-gradient text-white font-semibold px-8 h-12 rounded-full gap-2 shadow-lg shadow-primary/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-border text-foreground hover:bg-muted h-12 rounded-full px-6"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-14 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Trusted by engineers at</p>
              <div className="flex items-center gap-8 text-muted-foreground/70">
                <span className="text-base font-semibold tracking-tight">Google</span>
                <span className="text-base font-semibold tracking-tight">Meta</span>
                <span className="text-base font-semibold tracking-tight">Amazon</span>
                <span className="text-base font-semibold tracking-tight">Microsoft</span>
              </div>
            </div>
          </div>

          {/* Right - Code Editor Mockup with floating badges */}
          <div className="relative">
            {/* Floating Score Badge */}
            <div className="absolute -top-4 -right-4 z-10 bg-card border border-border rounded-xl p-4 shadow-lg hover-lift hidden lg:flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-accent flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">98</span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Tech Score</div>
                <div className="text-sm font-semibold text-accent">Excellent</div>
              </div>
            </div>

            {/* Floating Skill Badges */}
            <div className="absolute top-1/3 -left-8 z-10 bg-card border border-border rounded-lg px-4 py-2 shadow-lg hover-lift hidden lg:flex items-center gap-2">
              <span className="text-sm font-mono">&lt;/&gt;</span>
              <span className="text-sm font-medium">Python Expert</span>
            </div>

            <div className="absolute top-1/2 -left-6 z-10 bg-card border border-border rounded-lg px-4 py-2 shadow-lg hover-lift hidden lg:flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Clear Comm.</span>
            </div>

            {/* Proctoring Badge */}
            <div className="absolute -bottom-4 left-1/4 z-10 bg-card border border-border rounded-lg px-4 py-3 shadow-lg hover-lift hidden lg:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Proctoring</div>
                <div className="text-sm font-semibold text-foreground">Secure Environment</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-2xl dark:bg-primary/10" />
              <CodeEditorMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

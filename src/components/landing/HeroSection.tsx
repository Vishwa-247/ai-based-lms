import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeEditorMockup from "./CodeEditorMockup";

const HeroSection = () => {
  const features = [
    "AI-powered interview prep",
    "Real-time feedback",
    "Company-specific training"
  ];

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-40" />
      <div className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-16 w-[420px] h-[420px] rounded-full bg-accent/[0.08] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl animate-fade-in-up">
            <div className="announcement-pill mb-6 shadow-sm shadow-primary/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-muted-foreground">Now with Agentic AI</span>
            </div>

            <h1 className="mb-6 text-balance">
              <span className="text-foreground">Career prep that </span>
              <span className="text-primary">actually works</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md text-pretty">
              Master technical interviews with AI-powered simulations.
              Get quantified feedback on clarity, tradeoffs, and adaptability.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link to="/courses">
                <Button size="lg" className="bg-primary text-primary-foreground font-medium h-12 px-6 gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  Start Learning Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-6 gap-2 font-medium bg-card/80 backdrop-blur-sm hover:bg-card">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                Trusted by engineers at
              </p>
              <div className="flex items-center gap-8">
                {["Google", "Meta", "Amazon", "Microsoft"].map((company) => (
                  <span key={company} className="text-sm font-medium text-muted-foreground/70">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative lg:pl-8 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            <div className="absolute -top-2 right-0 lg:-right-4 z-10 hidden lg:flex">
              <div className="bg-card/95 border border-border rounded-xl p-4 shadow-lg shadow-primary/10 flex items-center gap-3 backdrop-blur-md">
                <div className="w-12 h-12 rounded-full border-[3px] border-accent flex items-center justify-center bg-background">
                  <span className="text-lg font-bold text-foreground">98</span>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Tech Score</div>
                  <div className="text-sm font-semibold text-accent">Excellent</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 -left-2 lg:-left-8 z-10 hidden lg:flex">
              <div className="bg-card/95 border border-border rounded-lg px-3 py-2 shadow-lg shadow-primary/10 backdrop-blur-md flex items-center gap-2">
                <span className="text-sm font-mono text-primary">&lt;/&gt;</span>
                <span className="text-sm font-medium text-foreground">Python</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 z-10 hidden lg:flex">
              <div className="bg-card/95 border border-border rounded-lg px-4 py-2.5 shadow-lg shadow-primary/10 backdrop-blur-md flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">Secure</span>
              </div>
            </div>

            <CodeEditorMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

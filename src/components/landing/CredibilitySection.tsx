import { GraduationCap, Building2, Users, Award } from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "Academic Research",
    description: "Built on peer-reviewed methodologies in engineering education and cognitive assessment.",
  },
  {
    icon: Building2,
    title: "Industry Aligned",
    description: "Evaluation criteria derived from real hiring processes at top technology companies.",
  },
  {
    icon: Users,
    title: "Community Validated",
    description: "Refined through feedback from thousands of engineering candidates and hiring managers.",
  },
  {
    icon: Award,
    title: "Continuous Improvement",
    description: "Regular updates based on evolving industry standards and interview practices.",
  },
];

const CredibilitySection = () => {
  return (
    <section id="credibility" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Built for Serious Engineers
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              StudyMate is designed for candidates who approach career preparation 
              with the same rigor they apply to engineering problems. No shortcuts, 
              no gimmicks — just systematic improvement through quantified feedback.
            </p>

            <div className="space-y-4">
              {credentials.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-muted">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-background border border-border rounded-lg text-center">
              <div className="text-4xl font-bold text-foreground mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Active Engineers</div>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg text-center">
              <div className="text-4xl font-bold text-foreground mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Partner Companies</div>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg text-center">
              <div className="text-4xl font-bold text-foreground mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Interview Success</div>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg text-center">
              <div className="text-4xl font-bold text-foreground mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;

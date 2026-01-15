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

const stats = [
  { value: "50K+", label: "Active Engineers" },
  { value: "200+", label: "Partner Companies" },
  { value: "85%", label: "Interview Success" },
  { value: "4.8", label: "User Rating" },
];

const CredibilitySection = () => {
  return (
    <section id="credibility" className="py-28 bg-card/50 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built for Serious Engineers
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              StudyMate is designed for candidates who approach career preparation 
              with the same rigor they apply to engineering problems. No shortcuts, 
              no gimmicks — just systematic improvement through quantified feedback.
            </p>

            <div className="space-y-5">
              {credentials.map((item) => (
                <div key={item.title} className="flex gap-4 group">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat) => (
              <div key={stat.label} className="stats-card text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient-warm mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;

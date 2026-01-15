import { GraduationCap, Building2, Users, Award } from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "Research-Backed",
    description: "Built on peer-reviewed methodologies in engineering education.",
  },
  {
    icon: Building2,
    title: "Industry Aligned",
    description: "Criteria derived from real hiring processes at top companies.",
  },
  {
    icon: Users,
    title: "Community Validated",
    description: "Refined through feedback from engineers and hiring managers.",
  },
  {
    icon: Award,
    title: "Always Improving",
    description: "Regular updates based on evolving industry standards.",
  },
];

const stats = [
  { value: "50K+", label: "Engineers" },
  { value: "200+", label: "Companies" },
  { value: "85%", label: "Success Rate" },
  { value: "4.8", label: "Rating" },
];

const CredibilitySection = () => {
  return (
    <section id="credibility" className="section-padding bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="section-label mb-3 block">Why Us</span>
            <h2 className="mb-4">Built for Engineers</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              StudyMate is for candidates who approach career prep with the same 
              rigor they apply to engineering. Systematic improvement through quantified feedback.
            </p>

            <div className="space-y-4">
              {credentials.map((item) => (
                <div key={item.title} className="flex gap-3 group">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="stats-card text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
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
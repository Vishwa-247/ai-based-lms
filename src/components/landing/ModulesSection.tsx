import { 
  BookOpen, 
  Code2, 
  MessageSquare, 
  Target, 
  LineChart, 
  Zap 
} from "lucide-react";

const modules = [
  {
    icon: BookOpen,
    title: "Course Engine",
    description: "AI-generated learning paths tailored to your target role and skill level.",
  },
  {
    icon: Code2,
    title: "DSA Trainer",
    description: "Company-specific problems with solutions and complexity analysis.",
  },
  {
    icon: MessageSquare,
    title: "Interview Simulator",
    description: "Realistic mock interviews with behavioral and technical modules.",
  },
  {
    icon: Target,
    title: "Skill Assessor",
    description: "Continuous evaluation across engineering competency dimensions.",
  },
  {
    icon: LineChart,
    title: "Progress Analytics",
    description: "Dashboard showing improvement trajectories and skill gaps.",
  },
  {
    icon: Zap,
    title: "Quick Practice",
    description: "Bite-sized exercises for daily skill maintenance and growth.",
  },
];

const ModulesSection = () => {
  return (
    <section id="platform" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="section-label mb-3 block">Features</span>
          <h2 className="mb-4">Platform Modules</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for systematic career preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((module) => (
            <div
              key={module.title}
              className="feature-card group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/15 transition-colors">
                <module.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1.5">
                {module.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {module.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
import { 
  BookOpen, 
  Code2, 
  MessageSquare, 
  Target, 
  LineChart, 
  Shield 
} from "lucide-react";

const modules = [
  {
    icon: BookOpen,
    title: "Course Engine",
    description: "AI-generated learning paths tailored to your target role and current skill level.",
  },
  {
    icon: Code2,
    title: "DSA Trainer",
    description: "Company-specific problem sets with detailed solutions and complexity analysis.",
  },
  {
    icon: MessageSquare,
    title: "Interview Simulator",
    description: "Realistic mock interviews with behavioral and technical assessment modules.",
  },
  {
    icon: Target,
    title: "Skill Assessor",
    description: "Continuous evaluation across multiple dimensions of engineering competency.",
  },
  {
    icon: LineChart,
    title: "Progress Analytics",
    description: "Quantified metrics dashboard showing improvement trajectories and gaps.",
  },
  {
    icon: Shield,
    title: "Confidence Builder",
    description: "Structured practice regimens designed to build systematic problem-solving confidence.",
  },
];

const ModulesSection = () => {
  return (
    <section id="platform" className="py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            Product Modules
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive toolkit for systematic career preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.title}
              className="feature-card group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors">
                <module.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {module.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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

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
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Product Modules
          </h2>
          <p className="text-muted-foreground">
            Comprehensive toolkit for systematic career preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.title}
              className="p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted mb-4 group-hover:bg-primary/10 transition-colors">
                <module.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
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

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles, Target, Zap } from 'lucide-react';

export function Landing() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 py-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-bold tracking-tight"
          >
            Organize Your Life with
            <span className="text-primary ml-3">TaskMaster</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            The most intuitive todo app that helps you stay organized and boost productivity.
            Start managing your tasks efficiently today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/product">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose TaskMaster?</h2>
          <p className="text-muted-foreground">Discover the features that make us stand out</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-lg border bg-card"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 rounded-3xl">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who have transformed their productivity with TaskMaster.
          </p>
          <Button size="lg" asChild>
            <Link to="/dashboard">Try TaskMaster Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'Smart Organization',
    description: 'Organize tasks with intelligent categories and tags for better management.',
    icon: Target,
  },
  {
    title: 'Quick Actions',
    description: 'Complete tasks faster with keyboard shortcuts and quick actions.',
    icon: Zap,
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your productivity with visual progress indicators.',
    icon: CheckCircle,
  },
  {
    title: 'Smart Features',
    description: 'AI-powered suggestions to help you prioritize tasks effectively.',
    icon: Sparkles,
  },
];
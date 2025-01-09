import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Users, Target, Mail } from 'lucide-react';

export function About() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Our Story
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          We're on a mission to help people stay organized and achieve their goals
          through intuitive task management.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            TaskMaster was born from a simple idea: everyone deserves a simple yet
            powerful way to organize their tasks and boost productivity. We believe
            in creating tools that adapt to how you work, not the other way around.
          </p>
          <Button asChild>
            <Link to="/product">Learn More</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-card rounded-lg border text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="text-center space-y-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground">
            The passionate people behind TaskMaster
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center space-y-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="text-muted-foreground">
          Have questions? We'd love to hear from you.
        </p>
        <Button size="lg" asChild>
          <a href="mailto:contact@taskmaster.com">
            <Mail className="mr-2 h-4 w-4" /> Contact Us
          </a>
        </Button>
      </section>
    </div>
  );
}

const stats = [
  { label: 'Active Users', value: '50K+', icon: Users },
  { label: 'Tasks Completed', value: '1M+', icon: Target },
  { label: 'Countries', value: '100+', icon: Heart },
  { label: 'Team Members', value: '20+', icon: Users },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    name: 'Michael Chen',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
];
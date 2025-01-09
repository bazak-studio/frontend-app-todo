import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Zap,
  Layout,
  Bell,
  Calendar,
  Tag,
  Clock,
  Shield,
  Smartphone,
} from 'lucide-react';

export function Product() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Features that Make the Difference
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Discover how TaskMaster can transform your productivity and help you
          achieve more.
        </motion.p>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-card rounded-lg border space-y-4"
          >
            <feature.icon className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Integration Partners */}
      <section className="text-center space-y-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Integration Partners</h2>
          <p className="text-muted-foreground">
            Works seamlessly with your favorite tools
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-card rounded-lg border"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 w-auto mx-auto"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Find answers to common questions about TaskMaster
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-card rounded-lg border space-y-2"
            >
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground">
          Join thousands of satisfied users and start organizing your tasks today.
        </p>
        <Button size="lg" asChild>
          <Link to="/dashboard">Start Using TaskMaster</Link>
        </Button>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'Quick Actions',
    description: 'Get things done faster with keyboard shortcuts and quick actions.',
    icon: Zap,
  },
  {
    title: 'Multiple Views',
    description: 'Switch between list, board, and calendar views.',
    icon: Layout,
  },
  {
    title: 'Smart Notifications',
    description: 'Stay on top of your tasks with intelligent reminders.',
    icon: Bell,
  },
  {
    title: 'Due Dates',
    description: 'Set and track deadlines for your tasks.',
    icon: Calendar,
  },
  {
    title: 'Tags & Categories',
    description: 'Organize tasks with custom tags and categories.',
    icon: Tag,
  },
  {
    title: 'Time Tracking',
    description: 'Monitor time spent on tasks and projects.',
    icon: Clock,
  },
  {
    title: 'Data Security',
    description: 'Your data is encrypted and securely stored.',
    icon: Shield,
  },
  {
    title: 'Mobile Apps',
    description: 'Access your tasks on the go with our mobile apps.',
    icon: Smartphone,
  },
];

const partners = [
  {
    name: 'Slack',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png',
  },
  {
    name: 'Google Calendar',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/2048px-Google_Calendar_icon_%282020%29.svg.png',
  },
  {
    name: 'Dropbox',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/2048px-Dropbox_Icon.svg.png',
  },
  {
    name: 'Trello',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trello-logo-blue.svg/2048px-Trello-logo-blue.svg.png',
  },
];

const faqs = [
  {
    question: 'Is TaskMaster free to use?',
    answer: 'Yes, TaskMaster offers a free plan with essential features. Premium features are available with our paid plans.',
  },
  {
    question: 'Can I access TaskMaster on mobile devices?',
    answer: 'Yes, TaskMaster is available on iOS and Android devices, allowing you to manage tasks on the go.',
  },
  {
    question: 'How secure is my data?',
    answer: 'We use industry-standard encryption and security measures to protect your data.',
  },
  {
    question: 'Can I collaborate with my team?',
    answer: 'Yes, TaskMaster supports team collaboration with shared tasks and projects.',
  },
];
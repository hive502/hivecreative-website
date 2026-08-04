/**
 * All marketing copy lives here so the page components stay structural.
 * Edit prices, features and FAQ answers in this one file.
 */

export type BuildPlan = {
  slug: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  featured?: boolean;
  ctaLabel: string;
};

export type CarePlan = {
  slug: string;
  name: string;
  monthly: string;
  yearly: string;
  saving: string;
  tagline: string;
  features: string[];
  featured?: boolean;
  badge?: string;
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Our Work', href: '/#work' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const painPoints = [
  {
    title: 'The DIY Disaster',
    body: "You tried to build it yourself, but it just doesn't look quite right.",
  },
  {
    title: 'The Disappearing Act',
    body: "You hired a cheap freelancer, but now they won't answer emails.",
  },
  {
    title: 'The Digital Ghost Town',
    body: "You have a website, but it's not bringing in leads.",
  },
] as const;

export const processSteps = [
  {
    step: '01',
    title: 'Choose Your Plan',
    body: 'Pick one of our transparent, upfront website packages starting at just $499. No hidden fees, no surprises.',
  },
  {
    step: '02',
    title: 'We Build It',
    body: "Hand over your logo and a few details. We'll design a modern, mobile-friendly site tailored to your brand.",
  },
  {
    step: '03',
    title: 'We Maintain It',
    body: 'Once launched, you have total peace of mind. Your site comes with ongoing care—we handle updates, security, and backups every month.',
  },
] as const;

export const buildPlans: BuildPlan[] = [
  {
    slug: 'starter',
    name: 'Starter',
    price: '$499',
    tagline: 'A sharp, credible presence for a brand-new business.',
    features: [
      'Up to 4 Pages',
      'Mobile-Responsive Design',
      'Basic Contact Form',
      'Basic SEO Setup',
    ],
    ctaLabel: 'Start with Starter',
  },
  {
    slug: 'standard',
    name: 'Standard',
    price: '$899',
    tagline: 'Room to tell your story and capture more enquiries.',
    features: [
      'Up to 7 Pages',
      'Mobile-Responsive Design',
      'Advanced Lead-Capture',
      'Basic Integrations',
    ],
    featured: true,
    ctaLabel: 'Choose Standard',
  },
  {
    slug: 'growth',
    name: 'Growth',
    price: '$1399',
    tagline: 'For established businesses ready to scale their reach.',
    features: [
      'Up to 12 Pages',
      'Mobile-Responsive Design',
      'CMS Setup',
      'Advanced SEO',
    ],
    ctaLabel: 'Go with Growth',
  },
];

export const carePlans: CarePlan[] = [
  {
    slug: 'essential',
    name: 'Essential Care',
    monthly: '$69',
    yearly: '$704/year',
    saving: 'Save 15%',
    tagline: 'Everything your site needs to stay safe and online.',
    features: [
      'Premium Hosting & SSL',
      'Daily Backups',
      'Security Monitoring',
      'Up to 30 mins of text/photo changes',
      'Email Support',
    ],
  },
  {
    slug: 'full',
    name: 'Full Care',
    monthly: '$129',
    yearly: '$1,316/year',
    saving: 'Save 15%',
    tagline: 'Our most popular plan — more hands-on, faster answers.',
    features: [
      'Everything in Essential Care',
      'Priority Support',
      'Up to 1 hr of updates per month',
      'Monthly Health Check',
    ],
    featured: true,
    badge: 'Recommended',
  },
  {
    slug: 'premium',
    name: 'Premium Care',
    monthly: '$179',
    yearly: '$1,826/year',
    saving: 'Save 15%',
    tagline: 'For businesses that change their site often.',
    features: [
      'Everything in Full Care',
      'Up to 2 hrs of updates per month',
      'Faster response times',
    ],
  },
];

export const faqs = [
  {
    question: 'Do I own my website and domain name?',
    answer:
      '100%. You own your domain name and your website content. If you ever decide to move on after your initial 12-month care plan, you can take it all with you.',
  },
  {
    question: 'Are domain name and hosting included?',
    answer:
      'Premium hosting is fully included in all of our Care Plans! For your domain name, you will purchase and own this directly through a registrar like GoDaddy. We will handle all the technical work of connecting it to your new website for you.',
  },
  {
    question: 'Why do I need a monthly care plan?',
    answer:
      'Websites aren’t "set it and forget it." Things break, software gets outdated, and hackers look for vulnerabilities. Our care plans ensure your site is hosted, protected, backed up, and updated every month.',
  },
] as const;

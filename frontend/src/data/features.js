import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Verified Employers',
    description:
      'We manually vet every company to ensure you only deal with legitimate hiring teams.',
    icon: <ShieldCheck className="text-teal-500" size={24} />
  },
  {
    title: 'Fast Applications',
    description:
      'Apply with just one click using your saved profile and resume. Save hours of work.',
    icon: <Zap className="text-indigo-500" size={24} />
  },
  {
    title: 'Trusted Listings',
    description:
      'Our proprietary algorithm filters out spam and duplicate listings from across the web.',
    icon: <CheckCircle2 className="text-emerald-500" size={24} />
  },
  {
    title: 'Community First',
    description:
      'Join over 2 million job seekers who have found their dream roles using our platform.',
    icon: <Users className="text-blue-500" size={24} />
  }
];

export default FEATURES;

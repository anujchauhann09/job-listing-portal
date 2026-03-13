'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { JobSearchFilters, JobSearchResults } from '@/components/jobs';
import { Job, JobSearchFilters as JobSearchFiltersType, SearchResults } from '@/types/job';
import { useRouter } from 'next/navigation';

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences. You will work with React, TypeScript, and modern web technologies to create responsive and accessible applications.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong understanding of modern CSS and responsive design',
      'Experience with state management libraries (Redux, Zustand)',
      'Knowledge of testing frameworks (Jest, React Testing Library)',
      'Excellent communication and collaboration skills'
    ],
    location: 'San Francisco, CA',
    type: 'full-time',
    salaryRange: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    employerId: 'emp1',
    employer: {
      companyName: 'TechCorp Inc.',
      logoUrl: '/logos/techcorp.png',
      industry: 'Technology'
    },
    status: 'active',
    applicationsCount: 23,
    postedDate: new Date('2024-01-15'),
    updatedDate: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Product Manager',
    description: 'Join our product team to drive the development of innovative features that delight our users. You will work closely with engineering, design, and business stakeholders to define product requirements and roadmaps.',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with agile development methodologies',
      'Excellent written and verbal communication skills',
      'Bachelor\'s degree in Business, Engineering, or related field'
    ],
    location: 'Remote',
    type: 'remote',
    salaryRange: {
      min: 100000,
      max: 140000,
      currency: 'USD'
    },
    employerId: 'emp2',
    employer: {
      companyName: 'StartupXYZ',
      logoUrl: '/logos/startupxyz.png',
      industry: 'SaaS'
    },
    status: 'active',
    applicationsCount: 45,
    postedDate: new Date('2024-01-10'),
    updatedDate: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'UX Designer',
    description: 'We are seeking a talented UX Designer to create intuitive and engaging user experiences. You will conduct user research, create wireframes and prototypes, and collaborate with cross-functional teams.',
    requirements: [
      '3+ years of UX design experience',
      'Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)',
      'Strong portfolio demonstrating user-centered design process',
      'Experience with user research and usability testing',
      'Understanding of accessibility principles and best practices'
    ],
    location: 'New York, NY',
    type: 'full-time',
    salaryRange: {
      min: 85000,
      max: 115000,
      currency: 'USD'
    },
    employerId: 'emp3',
    employer: {
      companyName: 'Design Studio',
      logoUrl: '/logos/designstudio.png',
      industry: 'Design'
    },
    status: 'active',
    applicationsCount: 12,
    postedDate: new Date('2024-01-12'),
    updatedDate: new Date('2024-01-12')
  },
  {
    id: '4',
    title: 'Backend Engineer',
    description: 'Looking for a skilled Backend Engineer to build scalable APIs and services. You will work with Node.js, Python, and cloud technologies to create robust backend systems.',
    requirements: [
      '4+ years of backend development experience',
      'Proficiency in Node.js, Python, or similar languages',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Knowledge of cloud platforms (AWS, GCP, Azure)',
      'Understanding of microservices architecture'
    ],
    location: 'Austin, TX',
    type: 'full-time',
    salaryRange: {
      min: 110000,
      max: 150000,
      currency: 'USD'
    },
    employerId: 'emp4',
    employer: {
      companyName: 'CloudTech Solutions',
      logoUrl: '/logos/cloudtech.png',
      industry: 'Cloud Computing'
    },
    status: 'active',
    applicationsCount: 18,
    postedDate: new Date('2024-01-08'),
    updatedDate: new Date('2024-01-08')
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    description: 'Join our marketing team to develop and execute marketing campaigns that drive growth. You will work on content creation, social media, and digital marketing strategies.',
    requirements: [
      '2+ years of marketing experience',
      'Experience with digital marketing tools',
      'Strong writing and communication skills',
      'Knowledge of SEO and content marketing',
      'Bachelor\'s degree in Marketing or related field'
    ],
    location: 'Los Angeles, CA',
    type: 'part-time',
    salaryRange: {
      min: 50000,
      max: 70000,
      currency: 'USD'
    },
    employerId: 'emp5',
    employer: {
      companyName: 'Growth Marketing Co.',
      logoUrl: '/logos/growthmarketing.png',
      industry: 'Marketing'
    },
    status: 'active',
    applicationsCount: 8,
    postedDate: new Date('2024-01-14'),
    updatedDate: new Date('2024-01-14')
  },
  {
    id: '6',
    title: 'Data Scientist',
    description: 'We are looking for a Data Scientist to analyze complex datasets and build machine learning models. You will work with Python, R, and various ML frameworks.',
    requirements: [
      '3+ years of data science experience',
      'Proficiency in Python, R, and SQL',
      'Experience with ML frameworks (TensorFlow, PyTorch)',
      'Strong statistical analysis skills',
      'PhD or Master\'s in Data Science, Statistics, or related field'
    ],
    location: 'Seattle, WA',
    type: 'contract',
    salaryRange: {
      min: 130000,
      max: 180000,
      currency: 'USD'
    },
    employerId: 'emp6',
    employer: {
      companyName: 'AI Innovations',
      logoUrl: '/logos/aiinnovations.png',
      industry: 'Artificial Intelligence'
    },
    status: 'active',
    applicationsCount: 31,
    postedDate: new Date('2024-01-05'),
    updatedDate: new Date('2024-01-05')
  }
];

const ITEMS_PER_PAGE = 3; 

export default function JobsPage() {
  const router = useRouter();
  const [filters, setFilters] = React.useState<JobSearchFiltersType>({});
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allFilteredJobs, setAllFilteredJobs] = React.useState<Job[]>(mockJobs);
  const [results, setResults] = React.useState<SearchResults<Job>>({
    items: mockJobs.slice(0, ITEMS_PER_PAGE),
    total: mockJobs.length,
    page: 1,
    pageSize: ITEMS_PER_PAGE,
    hasMore: mockJobs.length > ITEMS_PER_PAGE
  });

  const filterJobs = (jobs: Job[], searchFilters: JobSearchFiltersType): Job[] => {
    let filteredJobs = jobs;
    
    if (searchFilters.query) {
      const query = searchFilters.query.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.employer.companyName.toLowerCase().includes(query) ||
        job.requirements.some(req => req.toLowerCase().includes(query))
      );
    }
    
    if (searchFilters.location) {
      const location = searchFilters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }
    
    if (searchFilters.type && searchFilters.type.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        searchFilters.type!.includes(job.type)
      );
    }
    
    if (searchFilters.salaryRange) {
      filteredJobs = filteredJobs.filter(job => {
        if (!job.salaryRange) return false;
        if (searchFilters.salaryRange!.min && job.salaryRange.max < searchFilters.salaryRange!.min) return false;
        if (searchFilters.salaryRange!.max && job.salaryRange.min > searchFilters.salaryRange!.max) return false;
        return true;
      });
    }

    if (searchFilters.datePosted && searchFilters.datePosted !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (searchFilters.datePosted) {
        case 'today':
          filterDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filteredJobs = filteredJobs.filter(job => 
        job.postedDate >= filterDate
      );
    }
    
    return filteredJobs;
  };

  const handleSearch = async () => {
    setLoading(true);
    setCurrentPage(1);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const filteredJobs = filterJobs(mockJobs, filters);
    setAllFilteredJobs(filteredJobs);
    
    const paginatedJobs = filteredJobs.slice(0, ITEMS_PER_PAGE);
    
    setResults({
      items: paginatedJobs,
      total: filteredJobs.length,
      page: 1,
      pageSize: ITEMS_PER_PAGE,
      hasMore: filteredJobs.length > ITEMS_PER_PAGE
    });
    
    setLoading(false);
  };

  const handleLoadMore = async () => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newJobs = allFilteredJobs.slice(startIndex, endIndex);
    
    setResults(prev => ({
      ...prev,
      items: [...prev.items, ...newJobs],
      page: nextPage,
      hasMore: endIndex < allFilteredJobs.length
    }));
    
    setCurrentPage(nextPage);
    setLoading(false);
  };

  const handleJobClick = (job: Job) => {
    router.push(`/jobs/${job.id}`);
  };

  const handleApplyToJob = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Find Your Next Opportunity
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Discover amazing job opportunities from top companies
          </p>
        </div>

        <div className="space-y-6">
          <JobSearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
            loading={loading && currentPage === 1}
          />

          <JobSearchResults
            results={results}
            loading={loading && currentPage === 1}
            onJobClick={handleJobClick}
            onLoadMore={results.hasMore ? handleLoadMore : undefined}
            onApplyToJob={handleApplyToJob}
            showApplyButton={true}
          />
        </div>
      </Container>
    </div>
  );
}
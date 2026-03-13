import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { JobSearchFilters as JobSearchFiltersType, JobType } from '@/types/job';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { JOB_TYPES } from '@/lib/constants';

export interface JobSearchFiltersProps {
  filters: JobSearchFiltersType;
  onFiltersChange: (filters: JobSearchFiltersType) => void;
  onSearch: () => void;
  loading?: boolean;
}

const JOB_TYPE_LABELS: Record<JobType, string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  'contract': 'Contract',
  'remote': 'Remote',
};

const DATE_POSTED_OPTIONS = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
] as const;

export const JobSearchFilters: React.FC<JobSearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  loading = false,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const updateFilter = <K extends keyof JobSearchFiltersType>(
    key: K,
    value: JobSearchFiltersType[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleJobType = (type: JobType) => {
    const currentTypes = filters.type || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    updateFilter('type', newTypes.length > 0 ? newTypes : undefined);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Boolean(
    filters.query || 
    filters.location || 
    filters.type?.length || 
    filters.salaryRange?.min || 
    filters.salaryRange?.max || 
    (filters.datePosted && filters.datePosted !== 'all')
  );

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-500" />
          <Input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            value={filters.query || ''}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="pl-10"
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-500" />
          <Input
            type="text"
            placeholder="Location"
            value={filters.location || ''}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="pl-10 w-48"
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>

        <Button onClick={onSearch} loading={loading}>
          Search
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {showAdvanced && (
        <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2 block">
              Job Type
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(JOB_TYPE_LABELS).map(([type, label]) => (
                <Badge
                  key={type}
                  variant={filters.type?.includes(type as JobType) ? 'default' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => toggleJobType(type as JobType)}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2 block">
              Salary Range (USD)
            </label>
            <div className="flex gap-3 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={filters.salaryRange?.min || ''}
                onChange={(e) => updateFilter('salaryRange', {
                  ...filters.salaryRange,
                  min: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-32"
              />
              <span className="text-secondary-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.salaryRange?.max || ''}
                onChange={(e) => updateFilter('salaryRange', {
                  ...filters.salaryRange,
                  max: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-32"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2 block">
              Date Posted
            </label>
            <div className="flex flex-wrap gap-2">
              {DATE_POSTED_OPTIONS.map(({ value, label }) => (
                <Badge
                  key={value}
                  variant={filters.datePosted === value ? 'default' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => updateFilter('datePosted', value)}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                <X className="h-4 w-4 mr-1" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.query && (
            <Badge variant="outline">
              Search: {filters.query}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('query', undefined)}
              />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="outline">
              Location: {filters.location}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('location', undefined)}
              />
            </Badge>
          )}
          {filters.type?.map(type => (
            <Badge key={type} variant="outline">
              {JOB_TYPE_LABELS[type]}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleJobType(type)}
              />
            </Badge>
          ))}
          {filters.salaryRange?.min && (
            <Badge variant="outline">
              Min: ${filters.salaryRange.min.toLocaleString()}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('salaryRange', {
                  ...filters.salaryRange,
                  min: undefined
                })}
              />
            </Badge>
          )}
          {filters.salaryRange?.max && (
            <Badge variant="outline">
              Max: ${filters.salaryRange.max.toLocaleString()}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('salaryRange', {
                  ...filters.salaryRange,
                  max: undefined
                })}
              />
            </Badge>
          )}
          {filters.datePosted && filters.datePosted !== 'all' && (
            <Badge variant="outline">
              {DATE_POSTED_OPTIONS.find(opt => opt.value === filters.datePosted)?.label}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('datePosted', 'all')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
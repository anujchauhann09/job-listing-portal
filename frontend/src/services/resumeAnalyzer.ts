import { ApiResponse } from './api';

export interface AtsAnalysis {
  score: number;
  isFriendly: boolean;
  issues: string[];
  suggestions: string[];
}

export interface KeywordAnalysis {
  found: string[];
  missing: string[];
  suggestions: string[];
}

export interface FormatAnalysis {
  score: number;
  sections: { present: string[]; missing: string[] };
  issues: string[];
  suggestions: string[];
}

export interface Suggestion {
  priority: 'high' | 'medium' | 'low';
  category: string;
  suggestion: string;
}

export interface Benchmark {
  level: 'poor' | 'below_average' | 'average' | 'good' | 'excellent';
  percentile: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export interface ResumeAnalysis {
  score: number;
  ats: AtsAnalysis;
  keywords: KeywordAnalysis;
  format: FormatAnalysis;
  suggestions: Suggestion[];
  benchmark: Benchmark;
}

export async function analyzeResume(file: File): Promise<ApiResponse<ResumeAnalysis>> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/resume-analyzer/analyze', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to analyze resume');
  }

  return data;
}

'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/Button';
import { analyzeResume, ResumeAnalysis, Suggestion } from '@/services/resumeAnalyzer';
import { cn } from '@/lib/utils';
import {
  Upload, FileText, CheckCircle, AlertCircle, XCircle,
  TrendingUp, Target, Award, Zap, BarChart3, Sparkles,
  RefreshCw, ChevronDown, ChevronUp, ArrowRight, Loader2,
} from 'lucide-react';


function scoreColor(score: number) {
  if (score >= 80) return 'text-[#16A34A]';
  if (score >= 60) return 'text-[#D97706]';
  return 'text-[#DC2626]';
}

function scoreRingColor(score: number) {
  if (score >= 80) return '#16A34A';
  if (score >= 60) return '#D97706';
  return '#DC2626';
}

function scoreBg(score: number) {
  if (score >= 80) return 'bg-[#F0FDF4] dark:bg-[#14532D]/20';
  if (score >= 60) return 'bg-[#FFFBEB] dark:bg-[#78350F]/20';
  return 'bg-[#FEF2F2] dark:bg-[#7F1D1D]/20';
}

function benchmarkColor(level: string) {
  const map: Record<string, string> = {
    excellent: 'text-[#16A34A]',
    good: 'text-[#2563EB]',
    average: 'text-[#D97706]',
    below_average: 'text-[#EA580C]',
    poor: 'text-[#DC2626]',
  };
  return map[level] || 'text-[#64748B]';
}

function benchmarkLabel(level: string) {
  const map: Record<string, string> = {
    excellent: 'Excellent',
    good: 'Good',
    average: 'Average',
    below_average: 'Below Average',
    poor: 'Needs Work',
  };
  return map[level] || level;
}

function priorityBadge(priority: Suggestion['priority']) {
  const map = {
    high: 'bg-[#FEF2F2] text-[#DC2626] dark:bg-[#7F1D1D]/20 dark:text-[#F87171]',
    medium: 'bg-[#FFFBEB] text-[#D97706] dark:bg-[#78350F]/20 dark:text-[#FCD34D]',
    low: 'bg-[#F0FDF4] text-[#16A34A] dark:bg-[#14532D]/20 dark:text-[#4ADE80]',
  };
  return map[priority];
}


function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = scoreRingColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#E2E8F0" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn('text-4xl font-bold', scoreColor(score))}>{score}</span>
        <span className="text-xs text-[#64748B] dark:text-[#9CA3AF]">/ 100</span>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, iconColor, children, defaultOpen = true }: {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937]">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', iconColor)}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">{title}</span>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-[#94A3B8]" /> : <ChevronDown className="h-4 w-4 text-[#94A3B8]" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-[#F1F5F9] dark:border-[#1F2937] pt-4">{children}</div>}
    </div>
  );
}

function TagList({ items, variant = 'default' }: { items: string[]; variant?: 'success' | 'error' | 'default' }) {
  if (!items?.length) return <p className="text-xs text-[#94A3B8]">None</p>;
  const cls = {
    success: 'bg-[#F0FDF4] text-[#16A34A] dark:bg-[#14532D]/20 dark:text-[#4ADE80]',
    error: 'bg-[#FEF2F2] text-[#DC2626] dark:bg-[#7F1D1D]/20 dark:text-[#F87171]',
    default: 'bg-[#F1F5F9] text-[#475569] dark:bg-[#1F2937] dark:text-[#9CA3AF]',
  }[variant];
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span key={i} className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', cls)}>
          {item}
        </span>
      ))}
    </div>
  );
}

function IssueList({ items }: { items: string[] }) {
  if (!items?.length) return <p className="text-xs text-[#16A34A] dark:text-[#4ADE80]">No issues found</p>;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[#374151] dark:text-[#D1D5DB]">
          <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SuggestionList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[#374151] dark:text-[#D1D5DB]">
          <ArrowRight className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}


function UploadZone({ onFile }: { onFile: (f: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 cursor-pointer transition-all',
        dragging
          ? 'border-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E3A8A]/10'
          : 'border-[#E2E8F0] dark:border-[#374151] hover:border-[#93C5FD] hover:bg-[#F8FAFC] dark:hover:bg-[#1F2937]/50'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
      />
      <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center">
        <Upload className="h-7 w-7 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
          Drop your resume here or <span className="text-[#2563EB] dark:text-[#60A5FA]">browse</span>
        </p>
        <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1">PDF, DOC, DOCX — max 5MB</p>
      </div>
    </div>
  );
}


function AnalysisDashboard({ analysis, onReset }: { analysis: ResumeAnalysis; onReset: () => void }) {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">Analysis Results</h2>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Analyze Another
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={cn('rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] p-6 flex flex-col items-center gap-3', scoreBg(analysis.score))}>
          <p className="text-xs font-semibold text-[#64748B] dark:text-[#9CA3AF] uppercase tracking-wide">Overall Score</p>
          <ScoreRing score={analysis.score} />
          <p className={cn('text-sm font-semibold', scoreColor(analysis.score))}>
            {analysis.score >= 80 ? 'Strong Resume' : analysis.score >= 60 ? 'Good — Room to Improve' : 'Needs Significant Work'}
          </p>
        </div>

        {/* Benchmark */}
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] dark:bg-[#4C1D95]/20 flex items-center justify-center">
              <Award className="h-4 w-4 text-[#7C3AED]" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Industry Benchmark</span>
          </div>
          <div>
            <p className={cn('text-2xl font-bold', benchmarkColor(analysis.benchmark.level))}>
              {benchmarkLabel(analysis.benchmark.level)}
            </p>
            <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-0.5">
              Top {100 - analysis.benchmark.percentile}% of resumes
            </p>
          </div>
          <p className="text-sm text-[#374151] dark:text-[#D1D5DB] leading-relaxed">{analysis.benchmark.summary}</p>
          {analysis.benchmark.strengths?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-1.5">Strengths</p>
              <TagList items={analysis.benchmark.strengths} variant="success" />
            </div>
          )}
          {analysis.benchmark.weaknesses?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-1.5">Weaknesses</p>
              <TagList items={analysis.benchmark.weaknesses} variant="error" />
            </div>
          )}
        </div>
      </div>

      <Section title="ATS Optimization" icon={Target} iconColor="bg-[#F0FDF4] dark:bg-[#14532D]/20 text-[#16A34A]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {analysis.ats.isFriendly
              ? <CheckCircle className="h-5 w-5 text-[#16A34A]" aria-hidden="true" />
              : <XCircle className="h-5 w-5 text-[#DC2626]" aria-hidden="true" />
            }
            <span className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
              {analysis.ats.isFriendly ? 'ATS Friendly' : 'Not ATS Friendly'}
            </span>
            <span className={cn('ml-auto text-sm font-bold', scoreColor(analysis.ats.score))}>
              {analysis.ats.score}/100
            </span>
          </div>
          {analysis.ats.issues?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-2">Issues</p>
              <IssueList items={analysis.ats.issues} />
            </div>
          )}
          {analysis.ats.suggestions?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-2">Suggestions</p>
              <SuggestionList items={analysis.ats.suggestions} />
            </div>
          )}
        </div>
      </Section>

      {/* Keywords */}
      <Section title="Keyword Analysis" icon={Sparkles} iconColor="bg-[#FFFBEB] dark:bg-[#78350F]/20 text-[#D97706]">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-2">Found Keywords</p>
            <TagList items={analysis.keywords.found} variant="success" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-2">Missing Keywords</p>
            <TagList items={analysis.keywords.missing} variant="error" />
          </div>
          {analysis.keywords.suggestions?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-2">Suggestions</p>
              <SuggestionList items={analysis.keywords.suggestions} />
            </div>
          )}
        </div>
      </Section>

      <Section title="Format Check" icon={BarChart3} iconColor="bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 text-[#2563EB]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#374151] dark:text-[#D1D5DB]">Format Score</span>
            <span className={cn('text-sm font-bold', scoreColor(analysis.format.score))}>{analysis.format.score}/100</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-2">Present Sections</p>
              <TagList items={analysis.format.sections?.present} variant="success" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-2">Missing Sections</p>
              <TagList items={analysis.format.sections?.missing} variant="error" />
            </div>
          </div>
          {analysis.format.issues?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] mb-2">Issues</p>
              <IssueList items={analysis.format.issues} />
            </div>
          )}
        </div>
      </Section>

      <Section title="Improvement Suggestions" icon={TrendingUp} iconColor="bg-[#F5F3FF] dark:bg-[#4C1D95]/20 text-[#7C3AED]">
        <div className="space-y-3">
          {analysis.suggestions?.map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#1F2937]">
              <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium shrink-0 mt-0.5', priorityBadge(s.priority))}>
                {s.priority}
              </span>
              <div>
                <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">{s.category}</p>
                <p className="text-sm text-[#374151] dark:text-[#D1D5DB] mt-0.5">{s.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}


export default function ResumeAnalyzerPage() {
  const { user, logout } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setError(null);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeResume(file);
      if (res.success && res.data) {
        setAnalysis(res.data);
      } else {
        setError('Analysis failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19]">
      <Header user={user} onLogout={logout} />

      <main className="flex-1">
        <div className="bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#1F2937]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">Resume Analyzer</h1>
            </div>
            <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
              Upload your resume and get instant AI-powered feedback — score, ATS check, keywords, and actionable suggestions.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!analysis ? (
            <div className="space-y-5">
              <UploadZone onFile={handleFile} />

              {file && (
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] animate-fade-in">
                  <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] truncate">{file.name}</p>
                    <p className="text-xs text-[#64748B] dark:text-[#9CA3AF]">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleReset} className="shrink-0">
                    <XCircle className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl dark:bg-[#7F1D1D]/20 dark:border-[#7F1D1D]">
                  <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-[#DC2626] dark:text-[#F87171]">{error}</p>
                </div>
              )}

              <Button
                size="lg"
                className="w-full"
                disabled={!file || loading}
                loading={loading}
                onClick={handleAnalyze}
              >
                {loading ? 'Analyzing with AI...' : (
                  <>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Analyze Resume
                  </>
                )}
              </Button>

              {loading && (
                <div className="text-center animate-fade-in">
                  <p className="text-xs text-[#64748B] dark:text-[#9CA3AF]">
                    This usually takes 10–20 seconds...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <AnalysisDashboard analysis={analysis} onReset={handleReset} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

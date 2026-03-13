'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { FileUploadValidator, createFileValidator, isImageFile } from '@/lib/fileUpload';
import { Upload, File, X, CheckCircle, AlertCircle, Image, FileText } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; 
  allowedTypes?: string[];
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  currentFile?: File | string; 
  loading?: boolean;
  error?: string;
  label?: string;
  description?: string;
  className?: string;
  variant?: 'resume' | 'logo' | 'general';
  enableCompression?: boolean;
  showPreview?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (fileName: string, variant: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  if (variant === 'logo' || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
    return <Image className="h-8 w-8 text-primary-500" />;
  }
  
  if (['pdf'].includes(extension || '')) {
    return <FileText className="h-8 w-8 text-error-500" />;
  }
  
  return <File className="h-8 w-8 text-secondary-500" />;
};

export function FileUpload({
  accept = '*/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = [],
  onFileSelect,
  onFileRemove,
  currentFile,
  loading = false,
  error,
  label,
  description,
  className,
  variant = 'general',
  enableCompression = false,
  showPreview = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validator = useMemo(() => {
    if (variant === 'resume') {
      return createFileValidator('resume');
    } else if (variant === 'logo') {
      return createFileValidator('logo');
    } else {
      return new FileUploadValidator({
        maxSize,
        allowedTypes,
      });
    }
  }, [variant, maxSize, allowedTypes]);

  const handleFileSelect = useCallback(async (file: File) => {
    setUploadError(null);
    setPreview(null);
    
    const validationResult = await validator.validateFile(file);
    if (!validationResult.isValid) {
      setUploadError(validationResult.errors[0]);
      return;
    }

    if (validationResult.warnings.length > 0) {
      console.warn('File upload warnings:', validationResult.warnings);
    }

    if (showPreview && isImageFile(file)) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.warn('Failed to create preview:', error);
      }
    }

    onFileSelect(file);
  }, [validator, onFileSelect, showPreview]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setUploadError(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove?.();
  };

  const displayError = error || uploadError;
  const hasFile = currentFile instanceof File || (typeof currentFile === 'string' && currentFile);
  const fileName = currentFile instanceof File ? currentFile.name : 
                   typeof currentFile === 'string' ? currentFile.split('/').pop() || 'Uploaded file' : '';

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
          {label}
        </label>
      )}
      
      <Card className={cn(
        'border-2 border-dashed transition-colors',
        dragActive && 'border-primary-500 bg-primary-50 dark:bg-primary-900/10',
        !dragActive && !hasFile && 'border-secondary-300 dark:border-secondary-600',
        hasFile && 'border-success-300 dark:border-success-600',
        displayError && 'border-error-300 dark:border-error-600'
      )}>
        <CardContent className="p-6">
          {!hasFile ? (
            <div
              className={cn(
                'text-center cursor-pointer',
                loading && 'pointer-events-none opacity-50'
              )}
              onClick={handleClick}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center',
                  dragActive ? 'bg-primary-100 dark:bg-primary-900/20' : 'bg-secondary-100 dark:bg-secondary-800'
                )}>
                  <Upload className={cn(
                    'h-8 w-8',
                    dragActive ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-500'
                  )} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                    {dragActive ? 'Drop file here' : 'Upload file'}
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Drag and drop or click to browse
                  </p>
                  {description && (
                    <p className="text-xs text-secondary-500 dark:text-secondary-500">
                      {description}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  loading={loading}
                >
                  Choose File
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getFileIcon(fileName, variant)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                      {fileName}
                    </p>
                    {currentFile instanceof File && (
                      <p className="text-xs text-secondary-500">
                        {formatFileSize(currentFile.size)}
                      </p>
                    )}
                  </div>
                  <CheckCircle className="h-5 w-5 text-success-500 flex-shrink-0" />
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:hover:bg-error-900/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {showPreview && preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full h-32 object-contain rounded-lg border border-secondary-200 dark:border-secondary-700"
                  />
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
          />
        </CardContent>
      </Card>

      {displayError && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-error-600 dark:text-error-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      {!hasFile && !displayError && (
        <div className="mt-2 text-xs text-secondary-500 dark:text-secondary-500">
          Max file size: {formatFileSize(maxSize)}
          {allowedTypes.length > 0 && (
            <span className="ml-2">
              • Allowed types: {allowedTypes.map(type => {
                switch (type) {
                  case 'application/pdf': return 'PDF';
                  case 'image/jpeg': return 'JPEG';
                  case 'image/png': return 'PNG';
                  case 'image/gif': return 'GIF';
                  case 'image/webp': return 'WebP';
                  default: return type;
                }
              }).join(', ')}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
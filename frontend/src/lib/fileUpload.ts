export interface FileValidationOptions {
  maxSize?: number; 
  allowedTypes?: string[];
  allowedExtensions?: string[];
  minWidth?: number; 
  minHeight?: number; 
  maxWidth?: number; 
  maxHeight?: number;
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  extension: string;
  lastModified: number;
  width?: number; 
  height?: number; 
}

export const FILE_VALIDATION_PRESETS = {
  resume: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf'] as string[],
    allowedExtensions: ['.pdf'] as string[],
  },
  logo: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as string[],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'] as string[],
    minWidth: 100,
    minHeight: 100,
    maxWidth: 2000,
    maxHeight: 2000,
  },
  profileImage: {
    maxSize: 1 * 1024 * 1024, // 1MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] as string[],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'] as string[],
    minWidth: 150,
    minHeight: 150,
    maxWidth: 1000,
    maxHeight: 1000,
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] as string[],
    allowedExtensions: ['.pdf', '.doc', '.docx'] as string[],
  },
} as const;

export class FileUploadValidator {
  private options: FileValidationOptions;

  constructor(options: FileValidationOptions = {}) {
    this.options = {
      maxSize: 5 * 1024 * 1024, // 5MB default
      allowedTypes: [],
      allowedExtensions: [],
      ...options,
    };
  }

  async validateFile(file: File): Promise<FileValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    const basicValidation = this.validateBasicProperties(file);
    errors.push(...basicValidation.errors);
    warnings.push(...basicValidation.warnings);

    if (this.isImage(file)) {
      try {
        const imageValidation = await this.validateImageProperties(file);
        errors.push(...imageValidation.errors);
        warnings.push(...imageValidation.warnings);
      } catch (error) {
        errors.push('Failed to validate image properties');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  private validateBasicProperties(file: File): FileValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (this.options.maxSize && file.size > this.options.maxSize) {
      errors.push(`File size (${this.formatFileSize(file.size)}) exceeds maximum allowed size (${this.formatFileSize(this.options.maxSize)})`);
    }

    if (this.options.allowedTypes && this.options.allowedTypes.length > 0) {
      if (!this.options.allowedTypes.includes(file.type)) {
        const allowedTypesDisplay = this.options.allowedTypes.map(type => this.getDisplayType(type)).join(', ');
        errors.push(`File type "${this.getDisplayType(file.type)}" is not allowed. Allowed types: ${allowedTypesDisplay}`);
      }
    }

    if (this.options.allowedExtensions && this.options.allowedExtensions.length > 0) {
      const fileExtension = this.getFileExtension(file.name);
      if (!this.options.allowedExtensions.includes(fileExtension)) {
        errors.push(`File extension "${fileExtension}" is not allowed. Allowed extensions: ${this.options.allowedExtensions.join(', ')}`);
      }
    }

    if (file.name.length > 255) {
      errors.push('File name is too long (maximum 255 characters)');
    }

    if (!/^[a-zA-Z0-9._\-\s]+$/.test(file.name)) {
      warnings.push('File name contains special characters that may cause issues');
    }

    if (file.size === 0) {
      errors.push('File is empty');
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  private async validateImageProperties(file: File): Promise<FileValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);

        if (this.options.minWidth && img.width < this.options.minWidth) {
          errors.push(`Image width (${img.width}px) is below minimum required width (${this.options.minWidth}px)`);
        }

        if (this.options.minHeight && img.height < this.options.minHeight) {
          errors.push(`Image height (${img.height}px) is below minimum required height (${this.options.minHeight}px)`);
        }

        if (this.options.maxWidth && img.width > this.options.maxWidth) {
          errors.push(`Image width (${img.width}px) exceeds maximum allowed width (${this.options.maxWidth}px)`);
        }

        if (this.options.maxHeight && img.height > this.options.maxHeight) {
          errors.push(`Image height (${img.height}px) exceeds maximum allowed height (${this.options.maxHeight}px)`);
        }

        const aspectRatio = img.width / img.height;
        if (aspectRatio < 0.5 || aspectRatio > 2) {
          warnings.push('Image has an unusual aspect ratio that may not display well');
        }

        if (img.width < 300 || img.height < 300) {
          warnings.push('Image resolution is quite low and may appear pixelated');
        }

        resolve({ isValid: errors.length === 0, errors, warnings });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        errors.push('Invalid or corrupted image file');
        resolve({ isValid: false, errors, warnings });
      };

      img.src = url;
    });
  }

  getFileMetadata(file: File): FileMetadata {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      extension: this.getFileExtension(file.name),
      lastModified: file.lastModified,
    };
  }

  async getImageMetadata(file: File): Promise<FileMetadata> {
    const basicMetadata = this.getFileMetadata(file);

    if (!this.isImage(file)) {
      return basicMetadata;
    }

    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          ...basicMetadata,
          width: img.width,
          height: img.height,
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(basicMetadata);
      };

      img.src = url;
    });
  }

  private isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  private getFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    return lastDotIndex !== -1 ? fileName.substring(lastDotIndex).toLowerCase() : '';
  }

  private getDisplayType(mimeType: string): string {
    const typeMap: Record<string, string> = {
      'application/pdf': 'PDF',
      'application/msword': 'Word Document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
      'image/jpeg': 'JPEG Image',
      'image/png': 'PNG Image',
      'image/gif': 'GIF Image',
      'image/webp': 'WebP Image',
      'text/plain': 'Text File',
    };

    return typeMap[mimeType] || mimeType;
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export function createFileValidator(preset: keyof typeof FILE_VALIDATION_PRESETS): FileUploadValidator {
  return new FileUploadValidator(FILE_VALIDATION_PRESETS[preset]);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex !== -1 ? fileName.substring(lastDotIndex).toLowerCase() : '';
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf';
}

export function createFilePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}

export function compressImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      reject(new Error('File is not an image'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}
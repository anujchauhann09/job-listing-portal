import React from 'react';
import { cn } from '@/lib/utils';
import { useAriaAttributes } from '@/hooks/useAccessibility';
import { VisuallyHidden } from './VisuallyHidden';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  noValidate?: boolean;
}

interface FormFieldProps {
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  htmlFor: string;
}

interface FormErrorProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

interface FormDescriptionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, noValidate = true, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn('space-y-6', className)}
        noValidate={noValidate}
        {...props}
      >
        {children}
      </form>
    );
  }
);

const FormField: React.FC<FormFieldProps> = ({ 
  children, 
  error, 
  required, 
  className 
}) => {
  const { generateId } = useAriaAttributes();
  const errorId = React.useMemo(() => generateId('form-error'), [generateId]);

  return (
    <div className={cn('space-y-2', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === 'input' || (child.props as any)?.type) {
            return React.cloneElement(child as React.ReactElement<any>, {
              'aria-describedby': error ? errorId : (child.props as any)['aria-describedby'],
              'aria-invalid': error ? 'true' : (child.props as any)['aria-invalid'],
              'aria-required': required ? 'true' : (child.props as any)['aria-required'],
            });
          }
        }
        return child;
      })}
      {error && (
        <FormError id={errorId}>
          {error}
        </FormError>
      )}
    </div>
  );
};

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none text-secondary-900 dark:text-secondary-100',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <>
            <span className="text-error-500 ml-1" aria-hidden="true">*</span>
            <VisuallyHidden>(required)</VisuallyHidden>
          </>
        )}
      </label>
    );
  }
);

const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-error-600 dark:text-error-400', className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {children}
      </p>
    );
  }
);

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-secondary-600 dark:text-secondary-400', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

interface FormGroupProps {
  children: React.ReactNode;
  legend?: string;
  description?: string;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  children,
  legend,
  description,
  className,
}) => {
  const { generateId } = useAriaAttributes();
  const descriptionId = React.useMemo(() => generateId('form-group-desc'), [generateId]);

  return (
    <fieldset 
      className={cn('space-y-4', className)}
      aria-describedby={description ? descriptionId : undefined}
    >
      {legend && (
        <legend className="text-base font-medium text-secondary-900 dark:text-secondary-100 mb-4">
          {legend}
        </legend>
      )}
      {description && (
        <FormDescription id={descriptionId}>
          {description}
        </FormDescription>
      )}
      {children}
    </fieldset>
  );
};

Form.displayName = 'Form';
FormField.displayName = 'FormField';
FormLabel.displayName = 'FormLabel';
FormError.displayName = 'FormError';
FormDescription.displayName = 'FormDescription';
FormGroup.displayName = 'FormGroup';

export { 
  Form, 
  FormField, 
  FormLabel, 
  FormError, 
  FormDescription, 
  FormGroup 
};

export type { 
  FormProps, 
  FormFieldProps, 
  FormLabelProps, 
  FormErrorProps, 
  FormDescriptionProps 
};
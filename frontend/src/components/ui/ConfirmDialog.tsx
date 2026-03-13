import React from 'react';
import { Modal, ModalContent, ModalFooter } from './Modal';
import { Button } from './Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const variantStyles = {
    danger: {
      icon: Trash2,
      iconBg: 'bg-error-100 dark:bg-error-900/30',
      iconColor: 'text-error-600 dark:text-error-400',
      buttonVariant: 'primary' as const,
      buttonClass: 'bg-error-600 hover:bg-error-700 text-white dark:bg-error-600 dark:hover:bg-error-700',
    },
    warning: {
      icon: AlertTriangle,
      iconBg: 'bg-warning-100 dark:bg-warning-900/30',
      iconColor: 'text-warning-600 dark:text-warning-400',
      buttonVariant: 'primary' as const,
      buttonClass: '',
    },
    info: {
      icon: AlertTriangle,
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
      buttonVariant: 'primary' as const,
      buttonClass: '',
    },
  };

  const style = variantStyles[variant];
  const Icon = style.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
    >
      <ModalContent>
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${style.iconColor}`} />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
              {title}
            </h3>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              {message}
            </p>
          </div>
        </div>

        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={style.buttonVariant}
            onClick={handleConfirm}
            loading={loading}
            disabled={loading}
            className={style.buttonClass}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

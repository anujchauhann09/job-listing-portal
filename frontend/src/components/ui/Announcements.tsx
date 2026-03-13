import React from 'react';
import { useScreenReader } from '@/hooks/useAccessibility';

interface AnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
  delay?: number;
}

interface AnnouncementsProviderProps {
  children: React.ReactNode;
}

interface AnnouncementsContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  announceRoute: (routeName: string) => void;
  announceError: (error: string) => void;
  announceSuccess: (message: string) => void;
}

const AnnouncementsContext = React.createContext<AnnouncementsContextType | null>(null);

export const AnnouncementsProvider: React.FC<AnnouncementsProviderProps> = ({ children }) => {
  const { announce: baseAnnounce } = useScreenReader();

  const announce = React.useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    baseAnnounce(message, priority);
  }, [baseAnnounce]);

  const announceRoute = React.useCallback((routeName: string) => {
    announce(`Navigated to ${routeName}`, 'polite');
  }, [announce]);

  const announceError = React.useCallback((error: string) => {
    announce(`Error: ${error}`, 'assertive');
  }, [announce]);

  const announceSuccess = React.useCallback((message: string) => {
    announce(`Success: ${message}`, 'polite');
  }, [announce]);

  const value = React.useMemo(() => ({
    announce,
    announceRoute,
    announceError,
    announceSuccess,
  }), [announce, announceRoute, announceError, announceSuccess]);

  return (
    <AnnouncementsContext.Provider value={value}>
      {children}
    </AnnouncementsContext.Provider>
  );
};

export const useAnnouncements = () => {
  const context = React.useContext(AnnouncementsContext);
  if (!context) {
    throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
  }
  return context;
};

// Component for making announcements imperatively
export const Announcement: React.FC<AnnouncementProps> = ({ 
  message, 
  priority = 'polite',
  delay = 0 
}) => {
  const { announce } = useAnnouncements();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      announce(message, priority);
    }, delay);

    return () => clearTimeout(timer);
  }, [message, priority, delay, announce]);

  return null;
};

export const LiveRegion: React.FC<{
  priority?: 'polite' | 'assertive';
  atomic?: boolean;
  children?: React.ReactNode;
  className?: string;
}> = ({ 
  priority = 'polite', 
  atomic = true, 
  children,
  className = 'sr-only'
}) => {
  return (
    <div
      aria-live={priority}
      aria-atomic={atomic}
      className={className}
      role="status"
    >
      {children}
    </div>
  );
};

export const StatusAnnouncer: React.FC<{
  status: 'idle' | 'loading' | 'success' | 'error';
  messages: {
    loading?: string;
    success?: string;
    error?: string;
  };
}> = ({ status, messages }) => {
  const { announce } = useAnnouncements();

  React.useEffect(() => {
    switch (status) {
      case 'loading':
        if (messages.loading) {
          announce(messages.loading, 'polite');
        }
        break;
      case 'success':
        if (messages.success) {
          announce(messages.success, 'polite');
        }
        break;
      case 'error':
        if (messages.error) {
          announce(messages.error, 'assertive');
        }
        break;
    }
  }, [status, messages, announce]);

  return null;
};

export default {
  AnnouncementsProvider,
  useAnnouncements,
  Announcement,
  LiveRegion,
  StatusAnnouncer,
};
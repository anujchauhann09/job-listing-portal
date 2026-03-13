import React, { useEffect, useState } from 'react';
import { VisuallyHidden } from './VisuallyHidden';

interface AnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
  clearAfter?: number;
}

const Announcement: React.FC<AnnouncementProps> = ({
  message,
  priority = 'polite',
  clearAfter = 5000,
}) => {
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    setCurrentMessage(message);

    if (clearAfter > 0) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);

      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  if (!currentMessage) return null;

  return (
    <VisuallyHidden>
      <div
        aria-live={priority}
        aria-atomic="true"
        role="status"
      >
        {currentMessage}
      </div>
    </VisuallyHidden>
  );
};

// Hook for managing announcements
export const useAnnouncement = () => {
  const [announcement, setAnnouncement] = useState<{
    message: string;
    priority: 'polite' | 'assertive';
    id: string;
  } | null>(null);

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement({
      message,
      priority,
      id: Math.random().toString(36).substr(2, 9),
    });
  };

  const clear = () => {
    setAnnouncement(null);
  };

  const AnnouncementRegion = () => (
    announcement ? (
      <Announcement
        key={announcement.id}
        message={announcement.message}
        priority={announcement.priority}
      />
    ) : null
  );

  return {
    announce,
    clear,
    AnnouncementRegion,
  };
};

export { Announcement };
export type { AnnouncementProps };
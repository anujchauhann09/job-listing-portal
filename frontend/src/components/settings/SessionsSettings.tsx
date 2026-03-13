'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSettings } from '@/hooks';
import { SessionInfo } from '@/services/settings';
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  LogOut
} from 'lucide-react';

export function SessionsSettings() {
  const { 
    sessions, 
    loginHistory, 
    loading, 
    error, 
    terminateSession, 
    terminateAllOtherSessions,
    refreshSessions,
    refreshLoginHistory
  } = useSettings();
  
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
  const [actionStatus, setActionStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [actionMessage, setActionMessage] = React.useState<string>('');

  const getDeviceIcon = (device: string) => {
    const deviceLower = device.toLowerCase();
    if (deviceLower.includes('mobile') || deviceLower.includes('phone')) {
      return Smartphone;
    }
    if (deviceLower.includes('tablet') || deviceLower.includes('ipad')) {
      return Tablet;
    }
    return Monitor;
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const handleTerminateSession = async (sessionId: string) => {
    setActionLoading(sessionId);
    setActionStatus('idle');
    setActionMessage('');
    
    try {
      await terminateSession(sessionId);
      setActionStatus('success');
      setActionMessage('Session terminated successfully.');
      await refreshSessions();
    } catch (err) {
      setActionStatus('error');
      setActionMessage(err instanceof Error ? err.message : 'Failed to terminate session');
    } finally {
      setActionLoading(null);
    }
  };

  const handleTerminateAllOthers = async () => {
    setActionLoading('all-others');
    setActionStatus('idle');
    setActionMessage('');
    
    try {
      await terminateAllOtherSessions();
      setActionStatus('success');
      setActionMessage('All other sessions terminated successfully.');
      await refreshSessions();
    } catch (err) {
      setActionStatus('error');
      setActionMessage(err instanceof Error ? err.message : 'Failed to terminate sessions');
    } finally {
      setActionLoading(null);
    }
  };

  const activeSessions = sessions.filter(session => session.current || session.lastActive > new Date(Date.now() - 24 * 60 * 60 * 1000));
  const otherSessions = sessions.filter(session => !session.current);

  if (loading && sessions.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
          Active Sessions
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Manage your active sessions and view login history
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400" />
            <p className="text-error-700 dark:text-error-300">{error}</p>
          </div>
        </div>
      )}

      {actionStatus === 'success' && actionMessage && (
        <div className="mb-6 p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 mt-0.5" />
            <p className="text-success-700 dark:text-success-300">{actionMessage}</p>
          </div>
        </div>
      )}

      {actionStatus === 'error' && actionMessage && (
        <div className="mb-6 p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 mt-0.5" />
            <p className="text-error-700 dark:text-error-300">{actionMessage}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-4">
            Current Session
          </h3>
          
          {sessions.filter(session => session.current).map((session) => {
            const DeviceIcon = getDeviceIcon(session.device);
            
            return (
              <Card key={session.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-success-100 dark:bg-success-900/20 rounded-lg">
                      <DeviceIcon className="h-5 w-5 text-success-600 dark:text-success-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-secondary-900 dark:text-secondary-100">
                          {session.device}
                        </h4>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Current
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatLastActive(session.lastActive)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {otherSessions.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                Other Sessions ({otherSessions.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTerminateAllOthers}
                loading={actionLoading === 'all-others'}
                disabled={loading}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out All Others
              </Button>
            </div>
            
            <div className="space-y-3">
              {otherSessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.device);
                
                return (
                  <Card key={session.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-secondary-100 dark:bg-secondary-700 rounded-lg">
                          <DeviceIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-secondary-900 dark:text-secondary-100 mb-1">
                            {session.device}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{session.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatLastActive(session.lastActive)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                        loading={actionLoading === session.id}
                        disabled={loading}
                        className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:text-error-300 dark:hover:bg-error-900/20"
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        Sign Out
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-warning-600 dark:text-warning-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-warning-700 dark:text-warning-300">
              <p className="font-medium mb-1">Security Tip</p>
              <p>
                If you see any sessions you don't recognize, sign them out immediately and change your password. 
                Always sign out when using shared or public computers.
              </p>
            </div>
          </div>
        </div>

        {loginHistory.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-4">
              Recent Login History
            </h3>
            
            <div className="space-y-2">
              {loginHistory.slice(0, 5).map((entry, index) => {
                const DeviceIcon = getDeviceIcon(entry.device);
                
                return (
                  <div
                    key={`${entry.id}-${index}`}
                    className="flex items-center space-x-4 p-3 bg-secondary-50 dark:bg-secondary-700/50 rounded-lg"
                  >
                    <DeviceIcon className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
                    <div className="flex-1 text-sm">
                      <span className="text-secondary-900 dark:text-secondary-100">
                        {entry.device}
                      </span>
                      <span className="text-secondary-600 dark:text-secondary-400 mx-2">•</span>
                      <span className="text-secondary-600 dark:text-secondary-400">
                        {entry.location}
                      </span>
                    </div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-500">
                      {formatLastActive(entry.lastActive)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NotificationEntry {
  id: string;
  type: 'new_tenders' | 'corrigendum' | 'suggested_tender';
  timestamp: Date;
  data: {
    count?: number;
    tenderName?: string;
    tenderAmount?: number;
    tenderLocation?: string;
    closeDate?: string;
  };
}

const NotificationsFeed: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationEntry[]>([]);

  // Simulate notifications data - in real app this would come from API
  useEffect(() => {
    const mockNotifications: NotificationEntry[] = [
      {
        id: '1',
        type: 'new_tenders',
        timestamp: new Date(), // Today
        data: { count: 12 }
      },
      {
        id: '2',
        type: 'suggested_tender',
        timestamp: new Date(), // Today
        data: {
          tenderName: 'Smart road upgradation in Rajasthan',
          tenderAmount: 48,
          closeDate: 'Jul 11'
        }
      },
      {
        id: '3',
        type: 'corrigendum',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        data: {
          tenderName: '4-lane NH construction in Bihar',
          tenderAmount: 356,
          closeDate: 'Jul 14'
        }
      },
      {
        id: '4',
        type: 'new_tenders',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        data: { count: 8 }
      }
    ];

    // Filter notifications to only include last 3 days
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const filteredNotifications = mockNotifications.filter(
      notification => notification.timestamp > threeDaysAgo
    );

    setNotifications(filteredNotifications);
  }, []);

  const getDateLabel = (timestamp: Date): string => {
    const now = new Date();
    const diffTime = now.getTime() - timestamp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays === 2) return '2 days ago';
    if (diffDays === 3) return '3 days ago';
    return `${diffDays} days ago`;
  };

  const groupNotificationsByDate = () => {
    const grouped: { [key: string]: NotificationEntry[] } = {};
    
    notifications.forEach(notification => {
      const dateLabel = getDateLabel(notification.timestamp);
      if (!grouped[dateLabel]) {
        grouped[dateLabel] = [];
      }
      grouped[dateLabel].push(notification);
    });

    return grouped;
  };

  const renderNotificationContent = (notification: NotificationEntry) => {
    switch (notification.type) {
      case 'new_tenders':
        return (
          <div className="text-sm text-gray-700">
            You have <span className="font-medium text-gray-900">{notification.data.count}</span> new tenders matching your interests today.
          </div>
        );
      
      case 'corrigendum':
        return (
          <div className="space-y-1">
            <div className="text-sm text-gray-700">
              Corrigendum issued for one of your saved tenders.
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {notification.data.tenderName} (₹{notification.data.tenderAmount} Cr) – Closes {notification.data.closeDate}
            </div>
          </div>
        );
      
      case 'suggested_tender':
        return (
          <div className="space-y-3">
            <div className="text-sm text-gray-700">
              We found a compatible new tender for you.
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {notification.data.tenderName} (₹{notification.data.tenderAmount} Cr) – Closes {notification.data.closeDate}
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg"
            >
              Analyze
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const groupedNotifications = groupNotificationsByDate();
  const dateLabels = ['Today', '1 day ago', '2 days ago', '3 days ago'];

  if (notifications.length === 0) {
    return (
      <Card className="rounded-xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Recent Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No recent updates</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recent Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dateLabels.map((dateLabel, index) => {
          const dayNotifications = groupedNotifications[dateLabel];
          if (!dayNotifications || dayNotifications.length === 0) return null;

          return (
            <div key={dateLabel}>
              {index > 0 && <Separator className="my-4" />}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {dateLabel}
                </h4>
                <div className="space-y-3">
                  {dayNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="p-3 bg-white border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                    >
                      {renderNotificationContent(notification)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default NotificationsFeed;

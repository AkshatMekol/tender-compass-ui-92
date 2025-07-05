import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bell, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_tenders':
        return <TrendingUp className="w-4 h-4 text-teal-600" />;
      case 'corrigendum':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'suggested_tender':
        return <Lightbulb className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationBorder = (type: string) => {
    switch (type) {
      case 'new_tenders':
        return 'border-l-4 border-l-teal-500 bg-gradient-to-r from-teal-50 to-transparent';
      case 'corrigendum':
        return 'border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-transparent';
      case 'suggested_tender':
        return 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-transparent';
      default:
        return 'border-l-4 border-l-gray-300 bg-gray-50';
    }
  };

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
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-700 leading-relaxed">
                You have <span className="font-semibold text-teal-700">{notification.data.count}</span> new tenders matching your interests today.
              </div>
            </div>
          </div>
        );
      
      case 'corrigendum':
        return (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 space-y-3">
              <div className="text-sm text-gray-700 leading-relaxed">
                Corrigendum issued for one of your saved tenders.
              </div>
              <div className="text-sm bg-white/70 border border-orange-200 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-gray-900">{notification.data.tenderName}</div>
                <div className="text-orange-700 font-semibold mt-1">₹{notification.data.tenderAmount} Cr – Closes {notification.data.closeDate}</div>
              </div>
            </div>
          </div>
        );
      
      case 'suggested_tender':
        return (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 space-y-3">
              <div className="text-sm text-gray-700 leading-relaxed">
                We found a compatible new tender for you.
              </div>
              <div className="text-sm bg-white/70 border border-blue-200 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-gray-900 mb-2">{notification.data.tenderName}</div>
                <div className="flex items-center justify-between">
                  <div className="text-blue-700 font-semibold">₹{notification.data.tenderAmount} Cr – Closes {notification.data.closeDate}</div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg shadow-sm ml-3"
                  >
                    Analyze
                  </Button>
                </div>
              </div>
            </div>
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
      <Card className="rounded-xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center mr-3">
              <Bell className="w-4 h-4 text-white" />
            </div>
            Recent Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm">No recent updates</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center mr-3">
            <Bell className="w-4 h-4 text-white" />
          </div>
          Recent Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {dateLabels.map((dateLabel, index) => {
          const dayNotifications = groupedNotifications[dateLabel];
          if (!dayNotifications || dayNotifications.length === 0) return null;

          return (
            <div key={dateLabel}>
              {index > 0 && <Separator className="my-6" />}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {dateLabel}
                  </h4>
                </div>
                <div className="space-y-3 ml-4">
                  {dayNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md ${getNotificationBorder(notification.type)}`}
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

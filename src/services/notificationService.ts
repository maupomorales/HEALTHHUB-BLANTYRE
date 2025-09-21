import { Alert, Platform } from 'react-native';
import analytics from './analytics';

interface NotificationData {
  title: string;
  body: string;
  data?: Record<string, any>;
  type: 'emergency' | 'update' | 'reminder' | 'general';
}

class NotificationService {
  private isInitialized = false;

  async initialize() {
    try {
      // In a real app, you would initialize push notification services here
      // For now, we'll use local notifications and alerts
      this.isInitialized = true;
      
      analytics.trackEvent('notifications_initialized', {
        platform: Platform.OS,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Notification service initialization failed:', error);
    }
  }

  async showLocalNotification(notification: NotificationData) {
    if (!this.isInitialized) return;

    try {
      // Track notification shown
      analytics.trackEvent('notification_shown', {
        type: notification.type,
        title: notification.title,
      });

      // Show alert for now (in production, use proper push notifications)
      Alert.alert(
        notification.title,
        notification.body,
        [
          {
            text: 'Dismiss',
            style: 'cancel',
          },
          {
            text: 'View',
            onPress: () => this.handleNotificationAction(notification),
          },
        ]
      );
    } catch (error) {
      console.warn('Failed to show notification:', error);
    }
  }

  private handleNotificationAction(notification: NotificationData) {
    analytics.trackEvent('notification_action', {
      type: notification.type,
      action: 'view',
    });

    // Handle different notification types
    switch (notification.type) {
      case 'emergency':
        // Navigate to emergency screen
        break;
      case 'update':
        // Navigate to relevant screen
        break;
      case 'reminder':
        // Handle reminder action
        break;
      default:
        break;
    }
  }

  async scheduleEmergencyAlert() {
    const notification: NotificationData = {
      title: 'Emergency Alert',
      body: 'Important emergency information is available. Tap to view.',
      type: 'emergency',
      data: { screen: 'emergency' },
    };

    await this.showLocalNotification(notification);
  }

  async scheduleAppUpdate() {
    const notification: NotificationData = {
      title: 'App Update Available',
      body: 'New features and improvements are available. Update now!',
      type: 'update',
      data: { action: 'update' },
    };

    await this.showLocalNotification(notification);
  }

  async scheduleHealthReminder(message: string) {
    const notification: NotificationData = {
      title: 'Health Reminder',
      body: message,
      type: 'reminder',
      data: { category: 'health' },
    };

    await this.showLocalNotification(notification);
  }

  async scheduleGeneralNotification(title: string, body: string) {
    const notification: NotificationData = {
      title,
      body,
      type: 'general',
    };

    await this.showLocalNotification(notification);
  }

  // Emergency-specific notifications
  async notifyEmergencyService(service: string, message: string) {
    const notification: NotificationData = {
      title: `Emergency: ${service}`,
      body: message,
      type: 'emergency',
      data: { service, priority: 'high' },
    };

    await this.showLocalNotification(notification);
  }

  async notifyNewHealthcareProvider(providerName: string, area: string) {
    const notification: NotificationData = {
      title: 'New Healthcare Provider',
      body: `${providerName} is now available in ${area}`,
      type: 'general',
      data: { provider: providerName, area },
    };

    await this.showLocalNotification(notification);
  }
}

export default new NotificationService();

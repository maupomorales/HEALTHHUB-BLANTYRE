import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
}

class AnalyticsService {
  private isInitialized = false;

  async initialize() {
    try {
      // Check if user has opted in for analytics
      const analyticsEnabled = await AsyncStorage.getItem('analytics_enabled');
      if (analyticsEnabled === 'false') {
        await analytics().setAnalyticsCollectionEnabled(false);
      } else {
        await analytics().setAnalyticsCollectionEnabled(true);
        await AsyncStorage.setItem('analytics_enabled', 'true');
      }
      this.isInitialized = true;
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }

  async trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (!this.isInitialized) return;

    try {
      await analytics().logEvent(eventName, {
        timestamp: new Date().toISOString(),
        ...parameters,
      });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  async trackScreenView(screenName: string, screenClass?: string) {
    if (!this.isInitialized) return;

    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass || screenName,
      });
    } catch (error) {
      console.warn('Screen view tracking failed:', error);
    }
  }

  async trackUserAction(action: string, category: string, label?: string, value?: number) {
    await this.trackEvent('user_action', {
      action,
      category,
      label,
      value,
    });
  }

  async trackSearch(searchTerm: string, resultsCount: number) {
    await this.trackEvent('search_performed', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }

  async trackContactAction(providerName: string, action: 'call' | 'whatsapp' | 'map') {
    await this.trackEvent('contact_action', {
      provider_name: providerName,
      action_type: action,
    });
  }

  async trackEmergencyCall(service: string, number: string) {
    await this.trackEvent('emergency_call', {
      service,
      number,
      timestamp: new Date().toISOString(),
    });
  }

  async trackAppOpen() {
    await this.trackEvent('app_opened', {
      timestamp: new Date().toISOString(),
    });
  }

  async setUserProperties(properties: Record<string, string>) {
    if (!this.isInitialized) return;

    try {
      await analytics().setUserProperties(properties);
    } catch (error) {
      console.warn('User properties setting failed:', error);
    }
  }

  async setUserId(userId: string) {
    if (!this.isInitialized) return;

    try {
      await analytics().setUserId(userId);
    } catch (error) {
      console.warn('User ID setting failed:', error);
    }
  }

  async enableAnalytics() {
    await analytics().setAnalyticsCollectionEnabled(true);
    await AsyncStorage.setItem('analytics_enabled', 'true');
  }

  async disableAnalytics() {
    await analytics().setAnalyticsCollectionEnabled(false);
    await AsyncStorage.setItem('analytics_enabled', 'false');
  }
}

export default new AnalyticsService();

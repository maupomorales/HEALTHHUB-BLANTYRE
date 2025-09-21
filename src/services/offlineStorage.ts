import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from './analytics';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class OfflineStorageService {
  private readonly CACHE_PREFIX = 'healthhub_cache_';
  private readonly DEFAULT_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  async setItem<T>(key: string, data: T, expiryMs: number = this.DEFAULT_EXPIRY): Promise<void> {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + expiryMs,
      };

      await AsyncStorage.setItem(
        `${this.CACHE_PREFIX}${key}`,
        JSON.stringify(cacheItem)
      );

      analytics.trackEvent('cache_set', {
        key,
        data_size: JSON.stringify(data).length,
      });
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const cachedData = await AsyncStorage.getItem(`${this.CACHE_PREFIX}${key}`);
      
      if (!cachedData) {
        return null;
      }

      const cacheItem: CacheItem<T> = JSON.parse(cachedData);
      
      // Check if cache has expired
      if (Date.now() > cacheItem.expiry) {
        await this.removeItem(key);
        return null;
      }

      analytics.trackEvent('cache_hit', { key });
      return cacheItem.data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${this.CACHE_PREFIX}${key}`);
    } catch (error) {
      console.warn('Failed to remove cached data:', error);
    }
  }

  async clearExpired(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
      
      for (const key of cacheKeys) {
        const cachedData = await AsyncStorage.getItem(key);
        if (cachedData) {
          const cacheItem: CacheItem<any> = JSON.parse(cachedData);
          if (Date.now() > cacheItem.expiry) {
            await AsyncStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to clear expired cache:', error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.warn('Failed to clear all cache:', error);
    }
  }

  async getCacheSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
      let totalSize = 0;

      for (const key of cacheKeys) {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          totalSize += data.length;
        }
      }

      return totalSize;
    } catch (error) {
      console.warn('Failed to calculate cache size:', error);
      return 0;
    }
  }

  // Specific methods for healthcare data
  async cacheHealthcareProviders(providers: any[], area: string): Promise<void> {
    await this.setItem(`providers_${area}`, providers, 7 * 24 * 60 * 60 * 1000); // 7 days
  }

  async getCachedHealthcareProviders(area: string): Promise<any[] | null> {
    return await this.getItem(`providers_${area}`);
  }

  async cacheEmergencyContacts(contacts: any[]): Promise<void> {
    await this.setItem('emergency_contacts', contacts, 30 * 24 * 60 * 60 * 1000); // 30 days
  }

  async getCachedEmergencyContacts(): Promise<any[] | null> {
    return await this.getItem('emergency_contacts');
  }

  async cacheUserPreferences(preferences: any): Promise<void> {
    await this.setItem('user_preferences', preferences, 365 * 24 * 60 * 60 * 1000); // 1 year
  }

  async getCachedUserPreferences(): Promise<any | null> {
    return await this.getItem('user_preferences');
  }

  async isOffline(): Promise<boolean> {
    try {
      // Simple network check - in a real app, you'd use a more sophisticated method
      const response = await fetch('https://www.google.com', { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return false; // Online
    } catch {
      return true; // Offline
    }
  }
}

export default new OfflineStorageService();

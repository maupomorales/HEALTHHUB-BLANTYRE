import { Alert } from 'react-native';
import analytics from './analytics';

export interface ErrorInfo {
  message: string;
  code?: string;
  component?: string;
  action?: string;
  timestamp?: string;
}

class ErrorHandler {
  private isDevelopment = __DEV__;

  handleError(error: Error, errorInfo?: ErrorInfo) {
    const timestamp = new Date().toISOString();
    const errorData = {
      message: error.message,
      stack: error.stack,
      component: errorInfo?.component || 'Unknown',
      action: errorInfo?.action || 'Unknown',
      timestamp,
    };

    // Log to console in development
    if (this.isDevelopment) {
      console.error('Error occurred:', errorData);
    }

    // Track error in analytics
    analytics.trackEvent('app_error', {
      error_message: error.message,
      error_component: errorInfo?.component,
      error_action: errorInfo?.action,
      timestamp,
    });

    // Show user-friendly error message
    this.showUserError(error, errorInfo);
  }

  private showUserError(error: Error, errorInfo?: ErrorInfo) {
    let userMessage = 'Something went wrong. Please try again.';

    // Customize error messages based on error type
    if (error.message.includes('Network')) {
      userMessage = 'Network connection failed. Please check your internet connection.';
    } else if (error.message.includes('Permission')) {
      userMessage = 'Permission denied. Please check your app permissions.';
    } else if (error.message.includes('Location')) {
      userMessage = 'Location access is required to find nearby services.';
    } else if (error.message.includes('Phone')) {
      userMessage = 'Unable to make phone call. Please check your device settings.';
    }

    Alert.alert(
      'Error',
      userMessage,
      [
        {
          text: 'OK',
          style: 'default',
        },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => this.reportError(error, errorInfo),
        },
      ]
    );
  }

  private reportError(error: Error, errorInfo?: ErrorInfo) {
    // In a real app, you would send this to a crash reporting service
    console.log('Error reported:', {
      error: error.message,
      stack: error.stack,
      component: errorInfo?.component,
      action: errorInfo?.action,
      timestamp: new Date().toISOString(),
    });

    Alert.alert('Thank you', 'Error has been reported to our development team.');
  }

  async handleAsyncError<T>(
    asyncFunction: () => Promise<T>,
    errorInfo?: ErrorInfo
  ): Promise<T | null> {
    try {
      return await asyncFunction();
    } catch (error) {
      this.handleError(error as Error, errorInfo);
      return null;
    }
  }

  handleNetworkError(error: any) {
    const errorInfo: ErrorInfo = {
      message: 'Network request failed',
      component: 'NetworkService',
      action: 'API_CALL',
    };

    this.handleError(new Error('Network error'), errorInfo);
  }

  handlePermissionError(permission: string) {
    const errorInfo: ErrorInfo = {
      message: `Permission denied: ${permission}`,
      component: 'PermissionService',
      action: 'REQUEST_PERMISSION',
    };

    this.handleError(new Error(`Permission denied: ${permission}`), errorInfo);
  }

  handleLocationError() {
    const errorInfo: ErrorInfo = {
      message: 'Location access denied',
      component: 'LocationService',
      action: 'GET_LOCATION',
    };

    this.handleError(new Error('Location access denied'), errorInfo);
  }
}

export default new ErrorHandler();

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import ContactScreen from './src/screens/ContactScreen';

// Import services
import analytics from './src/services/analytics';
import errorHandler from './src/services/errorHandler';
import offlineStorage from './src/services/offlineStorage';
import notificationService from './src/services/notificationService';

// Import theme
import { theme } from './src/theme/theme';

const Stack = createStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize all services
      await analytics.initialize();
      await notificationService.initialize();
      await offlineStorage.clearExpired(); // Clean up expired cache
      
      // Track app open
      await analytics.trackAppOpen();
      
      // Set up global error handling
      const originalConsoleError = console.error;
      console.error = (...args) => {
        originalConsoleError(...args);
        errorHandler.handleError(new Error(args.join(' ')), {
          component: 'App',
          action: 'CONSOLE_ERROR',
        });
      };
      
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'App',
        action: 'INITIALIZATION',
      });
    }
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#e5e7eb',
            },
            headerTintColor: '#1f2937',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'Health Hub MW',
              headerShown: false 
            }}
          />
          <Stack.Screen 
            name="Search" 
            component={SearchScreen}
            options={{ 
              title: 'Find Services',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Emergency" 
            component={EmergencyScreen}
            options={{ 
              title: 'Emergency Services',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Contact" 
            component={ContactScreen}
            options={{ 
              title: 'Contact Us',
              headerBackTitle: 'Back'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </PaperProvider>
  );
};

export default App;


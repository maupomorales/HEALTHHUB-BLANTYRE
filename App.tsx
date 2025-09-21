import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import ContactScreen from './src/screens/ContactScreen';

// Import theme
import { theme } from './src/theme/theme';

const Stack = createStackNavigator();

const App: React.FC = () => {
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
    </PaperProvider>
  );
};

export default App;


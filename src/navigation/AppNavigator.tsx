// src/navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/index';
import ProfileScreen from '../screens/Profile/index';
import SettingsScreen from '../screens/Settings';
import Authentication from '../screens/Authentication';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#8E8E93',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        height: 85,
        paddingBottom: 10,
        paddingTop: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Reminder Dashboard',
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Text style={{ fontSize: size, color }}>🏠</Text>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen} // Replace with ProfileScreen when you create it
      options={{
        title: 'Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Text style={{ fontSize: size, color }}>👤</Text>
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen} // Replace with SettingsScreen when you create it
      options={{
        title: 'Settings',
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <Text style={{ fontSize: size, color }}>⚙️</Text>
        ),
      }}
    />
  </Tab.Navigator>
);
const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  // Assuming you have an AuthContext to manage authentication stat
  //  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      ) : (
        // Here you can add your authentication flow screens
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Authentication} />
          {/* Add other auth screens like SignUp, ForgotPassword, etc. */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

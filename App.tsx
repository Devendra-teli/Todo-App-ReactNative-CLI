import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodosStackScreen from './src/screens/TodosStackScreen';
import CompletedStackScreen from './src/screens/CompletedStackScreen';
import CalenderStackScreen from './src/screens/CalenderStackScreen';
import ProfileStackScreen from './src/screens/ProfileStackScreen';
import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator();

function getTabBarIcon(route: any, focused: any, color: any, size: any) {
  let iconName;

  if (route.name === 'Todos') {
    iconName = focused ? 'list' : 'list-outline';
  } else if (route.name === 'Completed') {
    iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
  } else if (route.name === 'Calender') {
    iconName = focused ? 'calendar' : 'calendar-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) =>
              getTabBarIcon(route, focused, color, size),
            tabBarActiveTintColor: '#009EEB',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 1,
              elevation: 0,
              shadowOpacity: 0,
            },
          })}
        >
          <Tab.Screen name="Todos" component={TodosStackScreen} />
          <Tab.Screen name="Completed" component={CompletedStackScreen} />
          <Tab.Screen name="Calender" component={CalenderStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

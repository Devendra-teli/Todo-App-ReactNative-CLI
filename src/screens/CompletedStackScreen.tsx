import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompletedScreen from './CompletedScreen';

const CompletedStack = createNativeStackNavigator();

const CompletedStackScreen = () => {
  return (
    <CompletedStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <CompletedStack.Screen
        name="completed-scree"
        component={CompletedScreen}
      />
    </CompletedStack.Navigator>
  );
};

export default CompletedStackScreen;

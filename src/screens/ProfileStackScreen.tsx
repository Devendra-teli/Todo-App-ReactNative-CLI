import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';

const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <ProfileStack.Screen name="profile-screen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;

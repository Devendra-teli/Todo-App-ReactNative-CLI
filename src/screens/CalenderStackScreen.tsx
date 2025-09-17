import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalenderScreen from './CalenderScreen';

const CalenderStack = createNativeStackNavigator();

const CalenderStackScreen = () => {
  return (
    <CalenderStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <CalenderStack.Screen name="calender-screen" component={CalenderScreen} />
    </CalenderStack.Navigator>
  );
};

export default CalenderStackScreen;

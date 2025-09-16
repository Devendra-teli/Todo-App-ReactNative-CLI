import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodosScreen from './TodosScreen';
import AddTodoScreen from './AddTodoScreen';

const TodoStack = createNativeStackNavigator();

const TodosStackScreen = () => {
  return (
    <TodoStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <TodoStack.Screen name="todos-screen" component={TodosScreen} />
      <TodoStack.Screen name="add-todo-screen" component={AddTodoScreen} />
    </TodoStack.Navigator>
  );
};

export default TodosStackScreen;

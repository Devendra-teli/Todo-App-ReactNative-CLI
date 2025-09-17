import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoCard from '../componets/TodoCard';

const CompletedScreen = () => {
  const [todos, setTodos] = useState<any[]>([]);

  // Get completed todos
  const getCompletedTodos = async () => {
    try {
      const stringifyTodos = await AsyncStorage.getItem('todos');
      if (stringifyTodos) {
        const todosArr = JSON.parse(stringifyTodos);
        const completedTodos = todosArr.filter(
          (item: any) => item.completed === true,
        );
        setTodos(completedTodos);
      } else {
        setTodos([]);
      }
    } catch (error) {
      Alert.alert('Error in fetching completed todos');
    }
  };

  useEffect(() => {
    getCompletedTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Completed Todos</Text>
        <View style={styles.todoContainer}>
          {todos.map((item, index) => (
            <TodoCard
              key={index}
              item={item}
              index={index}
              handleComplete={() => {}}
              handleDelete={() => {}}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  todoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    display: 'flex',
    gap: 10
  },
});

export default CompletedScreen;

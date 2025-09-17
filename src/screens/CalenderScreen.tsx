import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoCard from '../componets/TodoCard';
import Ionicons from '@react-native-vector-icons/ionicons';

const CalenderScreen = () => {
  const [selected, setSelected] = useState('');
  const [todos, setTotos] = useState<any[]>([]);

  useEffect(() => {
    const getTodosOnSelectedDate = async () => {
      try {
        const stringyfyTodos = await AsyncStorage.getItem('todos');
        if (stringyfyTodos) {
          const todosArr = JSON.parse(stringyfyTodos);
          setTotos(todosArr.filter((t: any) => t.createdAt === selected));
        } else {
          setTotos([]);
        }
      } catch (error) {
        Alert.alert('Error in fetching todos');
      }
    };

    if (selected) {
      getTodosOnSelectedDate();
    }
  }, [selected]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelected(today);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Filter Todos by Date</Text>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: '#19a1f0ff',
            },
          }}
          theme={{
            todayTextColor: '#19a1f0ff',
            selectedDayBackgroundColor: 'blue',
            arrowColor: 'black',
          }}
        />

        {/* Todos list */}
        <View style={styles.todosContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Todos At - {selected}</Text>
          </View>
          <View style={styles.body}>
            {todos.length > 0 ? (
              <FlatList
                data={todos}
                keyExtractor={i => i.title}
                renderItem={({ item, index }) => (
                  <TodoCard
                    item={item}
                    index={index}
                    handleComplete={() => {}}
                    handleDelete={() => {}}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 10 }}></View>
                )}
              />
            ) : (
              <View style={styles.noTodoContainer}>
                <Ionicons name="alert-circle-outline" size={54} color="gray" />
                <Text style={styles.noTodoText}>No Todo at this Date</Text>
              </View>
            )}
          </View>
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
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: '#0875b4ff',
  },
  dateText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  todosContainer: {
    marginTop: 10,
    padding: 20,
  },
  header: {
    borderBottomWidth: 0.5,
    paddingBottom: 2,
    paddingLeft: 8,
  },
  headerText: {
    fontSize: 15,
  },
  body: {
    marginTop: 20,
    paddingBottom: 50
  },
  noTodoContainer: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  noTodoText: {
    fontSize: 17,
    color: 'gray',
    marginTop: 15,
  },
});

export default CalenderScreen;

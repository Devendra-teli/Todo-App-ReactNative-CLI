import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoCard from '../componets/TodoCard';
type TodoStackParamList = {
  'todos-screen': undefined;
  'add-todo-screen': undefined;
};
type TodosScreenNavigationProp = NativeStackNavigationProp<TodoStackParamList>;

const TodosScreen = () => {
  const navigation = useNavigation<TodosScreenNavigationProp>();
  const [activeCategory, setActiveCategory] = useState('All');
  const [category, setCategory] = useState<any[]>([]);
  const [todos, setTodos] = useState<any[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);

  const handleCategorySelect = (item: string) => {
    setActiveCategory(item);
    let categoryTodos = [];
    if (item !== 'All') {
      categoryTodos = todos.filter((i: any) => i.category === item);
    } else {
      categoryTodos = todos;
    }
    setFilteredTodos(categoryTodos);
  };

  // Get todos
  const getTodos = async () => {
    try {
      let existingTodos = await AsyncStorage.getItem('todos');
      if (existingTodos) {
        console.log('existingTodos : ', existingTodos);
        setTodos(existingTodos ? JSON.parse(existingTodos) : []);
        setFilteredTodos(existingTodos ? JSON.parse(existingTodos) : []);
      }
    } catch (error) {
      Alert.alert('Error : ', 'Error is getting todos');
    }
  };

  // Handle todo delete
  const handleDelete = (todoIndex: number) => {
    const filetedTodos = todos.filter((_, i) => i !== todoIndex);
    try {
      AsyncStorage.setItem('todos', JSON.stringify(filetedTodos));
      setTodos(filetedTodos);
    } catch (error) {
      Alert.alert('Error : ', 'Error delete todo');
    }
  };

  const handleComplete = async (index: number, newValue: any) => {
    todos.forEach((item, i) => {
      if (i === index) {
        item.completed = newValue;
        console.log('item : ', item);
      }
    });

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
      getTodos();
    } catch (error) {
      Alert.alert('Error during change todo status');
    }
  };

  useEffect(() => {
    const res = ['All', 'Work', 'Personal', 'Wishlist', 'Birthday'];
    setCategory(res);
    getTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Todo add button */}
        <TouchableOpacity
          style={styles.todoAddBtn}
          onPress={() => navigation.navigate('add-todo-screen')}
        >
          <Ionicons name="add" size={40} color="#ffffff" />
        </TouchableOpacity>

        {/* Header category */}
        <View style={styles.header}>
          <View style={styles.categoriesContainer}>
            {category.map((item: string) => (
              <TouchableOpacity
                style={[
                  styles.categories,
                  activeCategory === item ? styles.categoriesActive : '',
                ]}
                onPress={() => handleCategorySelect(item)}
              >
                <Text
                  style={[
                    styles.categoriesText,
                    activeCategory === item ? styles.categoriesTextActive : '',
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.optionsBtnContainer}>
            <Ionicons name="ellipsis-vertical" size={20} color="#686767ff" />
          </View>
        </View>

        {/* Todo Container */}
        <View style={styles.todoContainer}>
          {filteredTodos.length > 0 ? (
            <View style={styles.todoBox}>
              {filteredTodos.map((item: any, index: number) => (
                <TodoCard
                  item={item}
                  index={index}
                  key={index}
                  handleComplete={handleComplete}
                  handleDelete={handleDelete}
                />
              ))}
            </View>
          ) : (
            <View style={styles.noTodoBox}>
              <Image
                source={require('../assets/no-todo.jpg')}
                style={styles.noTodoImage}
                resizeMode="contain"
              />
              <Text>No todos in this category</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  todoAddBtn: {
    position: 'absolute',
    bottom: 0,
    right: 25,
    backgroundColor: '#399ef1ff',
    borderRadius: '50%',
    padding: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  categoriesContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 12,
    overflow: 'scroll',
  },
  categories: {
    paddingHorizontal: 17,
    paddingVertical: 5,
    backgroundColor: '#c1dcfcff',
    borderRadius: 24,
  },
  categoriesActive: {
    backgroundColor: '#399ef1ff',
  },
  categoriesText: {
    color: '#4f50509a',
  },
  categoriesTextActive: {
    color: 'white',
  },
  optionsBtnContainer: {
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 35,
  },
  todoBox: {
    flex: 1,
    display: 'flex',
    gap: 10,
  },

  noTodoBox: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTodoImage: {
    height: 250,
    width: 250,
    objectFit: 'contain',
  },
});

export default TodosScreen;

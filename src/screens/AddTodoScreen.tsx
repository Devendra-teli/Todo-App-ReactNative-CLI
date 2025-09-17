import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const AddTodoScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Category dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Work', value: 'Work' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Wishlist', value: 'Wishlist' },
    { label: 'Birthday', value: 'Birthday' },
  ]);

  const handleTodoAdd = async () => {
    if (!title) {
      return;
    }

    let newTodo = {
      title,
      description,
      category: value,
      completed: false,
      createdAt: new Date(),
    };

    try {
      let existingTodos = await AsyncStorage.getItem('todos');
      let convetedTodo = existingTodos ? JSON.parse(existingTodos) : [];

      if (convetedTodo.length > 0) {
        await AsyncStorage.setItem(
          'todos',
          JSON.stringify([...convetedTodo, newTodo]),
        );
      } else {
        await AsyncStorage.setItem('todos', JSON.stringify([newTodo]));
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Error in todo add');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Add Todo</Text>
        <TextInput
          placeholder="Enter todo"
          style={styles.todoTitle}
          value={title}
          onChangeText={i => setTitle(i)}
        />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a category"
          style={styles.categoriesDropdown}
        />
        <TextInput
          placeholder="Enter description"
          style={styles.todoDescription}
          value={description}
          onChangeText={i => setDescription(i)}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => handleTodoAdd()}
          disabled={title.trim().length < 1 ? true : false}
        >
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 700,
    color: '#228be0ff',
  },
  todoTitle: {
    marginTop: 40,
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 42,
    borderRadius: 7,
  },
  categoriesDropdown: {
    marginTop: 20,
    height: 43,
    minHeight: 43,
  },
  todoDescription: {
    marginTop: 20,
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 150,
    verticalAlign: 'top',
    borderRadius: 7,
    paddingVertical: 10,
  },
  addBtn: {
    marginTop: 50,
    backgroundColor: '#399ef1ff',
    paddingHorizontal: 15,
    height: 42,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddTodoScreen;

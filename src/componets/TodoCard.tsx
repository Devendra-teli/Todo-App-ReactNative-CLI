import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from '@react-native-vector-icons/ionicons';

type TodoCardProps = {
  item: any;
  index: number;
  handleComplete: (i: number, c: boolean) => void;
  handleDelete: (i: number) => void;
};

const TodoCard = ({
  item,
  index,
  handleComplete,
  handleDelete,
}: TodoCardProps) => {
  return (
    <View style={styles.todo}>
      <View style={styles.todoLeftSide}>
        <CheckBox
          value={item.completed}
          onValueChange={(newValue: any) => {
            handleComplete(index, newValue);
          }}
        />
        <Text style={item.completed ? styles.strikeText : ''}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.todoRightSide}
        onPress={() => handleDelete(index)}
      >
        <Ionicons name="trash-outline" size={20} color="#f76b6bff" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  todo: {
    borderWidth: 0.5,
    borderColor: '#73cdfaff',
    backgroundColor: '#eaf3ffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  todoLeftSide: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkBox: {
    width: 50,
    height: 50,
  },
  strikeText: {
    textDecorationLine: 'line-through',
    color: '#555555ff',
  },
  todoRightSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
export default TodoCard;

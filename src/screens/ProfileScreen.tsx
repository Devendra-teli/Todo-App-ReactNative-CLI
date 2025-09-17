import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState(5);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  // Get analytics
  const getAnalytics = async () => {
    try {
      const stringifyTodos = await AsyncStorage.getItem('todos');
      if (stringifyTodos) {
        const todosArr = JSON.parse(stringifyTodos);
        if (todosArr.length > 0) {
          setTotal(todosArr.length);
          setCategory(5);
          setCompleted(todosArr.filter((item: any) => item.completed).length);
          setPending(todosArr.filter((item: any) => !item.completed).length);
        }
      }
    } catch (error) {
      Alert.alert('Error in feching analytics');
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.bioContainer}>
          <Image
            source={require('../assets/user-placeholder.png')}
            style={styles.bioImage}
          />
          <Text style={styles.bioText}>Hello, Mr/Miss</Text>
          <Text style={styles.bioSubText}>Wellcome to your profile</Text>
        </View>
        <View style={styles.analyticsContainer}>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsText}>Todos</Text>
            <Text style={styles.analyticsCount}>{total}</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsText}>Categories</Text>
            <Text style={styles.analyticsCount}>{category}</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsText}>Completed</Text>
            <Text style={styles.analyticsCount}>{completed}</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsText}>Pending</Text>
            <Text style={styles.analyticsCount}>{pending}</Text>
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
  bioContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
  },
  bioImage: {
    width: 150,
    height: 150,
  },
  bioText: {
    marginTop: 20,
    fontSize: 20,
  },
  bioSubText: {
    marginTop: 5,
    fontSize: 16,
  },
  analyticsContainer: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 10,
  },
  analyticsCard: {
    width: '48%',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
  },
  analyticsText: {
    fontSize: 16,
    fontWeight: 600,
    color: 'gray',
  },
  analyticsCount: {
    marginTop: 10,
    fontSize: 30,
  },
});

export default ProfileScreen;

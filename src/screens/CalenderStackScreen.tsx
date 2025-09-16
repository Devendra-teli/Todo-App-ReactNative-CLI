import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalenderStackScreen = () => {
  return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View>
          <Text>TodosStackScreen</Text>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffffff',
    },
  });

export default CalenderStackScreen;

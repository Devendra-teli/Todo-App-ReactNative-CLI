import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';

const CalenderScreen = () => {
  const [selected, setSelected] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Select a Date</Text>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: 'blue',
            },
          }}
          theme={{
            todayTextColor: 'red',
            selectedDayBackgroundColor: 'blue',
            arrowColor: 'black',
          }}
        />

        {selected ? (
          <Text style={styles.dateText}>Selected: {selected}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  heading: { fontSize: 20, textAlign: 'center', marginBottom: 10 },
  dateText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});

export default CalenderScreen;

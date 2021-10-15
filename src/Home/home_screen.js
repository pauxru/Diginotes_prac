// HomeScreen will hold introductory stuff of our App, like categories of notes
// that are currently available both locally and on the cloud
// The page can be used to add other functionality to the app like a ToDoList and reminders for users

import React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={styles.myNotes}
        onPress={() => navigation.navigate('My Notes')}>
        <Text style={styles.btnText}> My Notes </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  myNotes: {
    flexDirection: 'row',
    flex: 0,
    backgroundColor: '#0ba38c',
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;

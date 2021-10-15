import React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';

function HomeScreen({navigation}) {
  return (
    ///<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={styles.camScreen}
        onPress={() => navigation.navigate('My Notes')}>
        <Text> Add Notes </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  camScreen: {
    flexDirection: 'row',
    flex: 0,
    backgroundColor: 'yellow',
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default HomeScreen;

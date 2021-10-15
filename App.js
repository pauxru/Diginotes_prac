/**
 * This is for practice on image capturing and storage on the app
 *
 *
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/Home/home_screen';
import notesCapture from './src/Camera/camera_screen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Diginotes" component={HomeScreen} />
        <Stack.Screen name="My Notes" component={notesCapture} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

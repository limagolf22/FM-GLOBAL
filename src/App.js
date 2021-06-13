import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import maneuversAppReducer from './reducers/reducers';

import BriefingRoom from './screens/BriefingRoom';
import ManeuverScreen from './screens/ManeuverScreen';

import XPlaneConnector from './api/xplaneConnector';


import DataProviderScreen from './screens/DataProviderScreen';

const Stack = createStackNavigator();


export default function App() {
  console.log("App started");

  console.log('Create Redux store');
  const store = createStore(maneuversAppReducer, applyMiddleware(thunk));
  console.log(store.getState());

  return (
    <Provider store={store}>
      <XPlaneConnector remoteAddress="192.168.1.26" store={store} />
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="ProviderSelectionContainer"
          screenOptions={{
            title: 'FlightManeuvers',
          }}>
            <Stack.Screen name="BriefingRoom" component={BriefingRoom} />
            <Stack.Screen name="ManeuverScreen" component={ManeuverScreen} />       
            <Stack.Screen name="DataProviderScreen" component={DataProviderScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

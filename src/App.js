import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,  Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import maneuversAppReducer from './reducers/reducers';

import ConnectionScreen from './screens/ConnectionScreen'
import BriefingRoom from './screens/BriefingRoom';
import ManeuverScreen from './screens/ManeuverScreen';
import DataProviderScreen from './screens/DataProviderScreen';

import ConnectorManager from './api/connectorManager';


const Stack = createStackNavigator();


export default function App() {
  console.log("App started");

  console.log('Create Redux store');
  const store = createStore(maneuversAppReducer, applyMiddleware(thunk));
  var remAddress= ""
  switch (Platform.OS){
    case "web":
      remAddress = "ws://localhost:9002";
      break;
    default:
      remAddress = "ws://10.0.2.2:9002";
  }
  console.log(Platform.OS);
  console.log(store.getState());
  //store.subscribe(()=>console.log(store.getState()));
  /*change to localhost for web tests / 10.0.2.2 for android tests*/
  return (
    <Provider store={store}>
      <ConnectorManager store={store} remoteaddress={remAddress}/> 
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="ConnectionScreen"
          screenOptions={{
            title: 'FlightManeuvers',
          }}>
            <Stack.Screen name="ConnectionScreen" component={ConnectionScreen}/>
            <Stack.Screen name="BriefingRoom" component={BriefingRoom} />
            <Stack.Screen name="ManeuverScreen" component={ManeuverScreen} />       
            <Stack.Screen name="DataProviderScreen" component={DataProviderScreen} />

        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
    
  );
}

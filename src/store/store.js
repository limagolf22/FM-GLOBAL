import { Platform } from 'react-native';

 
import AsyncStorage from '@react-native-community/async-storage';

import { AsyncStorage as ASdep } from 'react-native';




import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
//import AsyncStorage from '@react-native-community/async-storage';
import maneuversAppReducer from '../reducers/reducers'; // the value from combineReducers
switch (Platform.OS){
    case "web":
        var persistConfig = {
            key: 'root',
            storage: AsyncStorage,
            whitelist:['connectionData','dataProvider']
            };
        break;
    default:
        var persistConfig = {
            key: 'root',
            storage: AsyncStorage,
            whitelist:['connectionData','dataProvider']
            };
        
        break;

}


const pReducer = persistReducer(persistConfig, maneuversAppReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
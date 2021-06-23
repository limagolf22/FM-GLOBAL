import { Platform } from 'react-native';

 
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


//import { AsyncStorage as ASdep } from 'react-native';

import { createStore,applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import maneuversAppReducer from '../reducers/reducers'; // the value from combineReducers
import thunk from 'redux-thunk';

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

export const store = createStore(pReducer,applyMiddleware(thunk));
export const persistor = persistStore(store);
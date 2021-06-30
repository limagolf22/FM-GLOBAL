import { combineReducers } from 'redux';
import {
    SET_USER_DATA,
    SET_DATA_CONNECTION,
    SET_SELECTED_MANEUVER,
    RESET_CURRENT_MANEUVER,
    SIGNAL_RPOS_DATA_RECEIVED,
    SIGNAL_DATAREF_RECEIVED,
    COMPLETED_MANEUVER_PERFORMANCE,
    SET_DATA_PROVIDER,
    CONNECTION_STATUS_CHANGED,
    RESTART_CURRENT_MANEUVER,
    connectionStatus,
    maneuverSelectionStatus,
    MANEUVER_REQUIREMENTS_NOT_MET,
    MANEUVER_REQUIREMENTS_MET,
    START_MANEUVER,
    STOP_MANEUVER,
    REQUEST_TP,
    CLEAR_MEMORY,
    SIGNAL_WS_DATA_RECEIVED,
    SIGNAL_POS_RECEIVED
} from '../actions/actions';
import maneuvers from '../atoms/ManeuverTypes';
import dataProviders from '../atoms/DataProviders';
import dataRefs from "../atoms/XPlaneDataRefs";
import { DefaultTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import { min } from 'react-native-reanimated';

function createUserPerfList(){

    var newState = [];

        for (let [key, value] of Object.entries(maneuvers)) {

            newState = [
                ...newState,
                {
                    maneuver: value,
                    accuracy: 0,
                    frequency: 0,
                    overallTrainingStatus: 0,
                }
            ]
        }
    console.log("new user perf list created");
    return newState;
}

function connectionData(state={
    username:"",
    username_list:{"default":1}
}, action) {
    switch (action.type) {
        case SET_USER_DATA:
            const pr = action.username;
            if (state.username_list[pr] === undefined){
                const provi = {...state.username_list};
                const pr = action.username;
                provi[pr] = createUserPerfList();
                return {
                    username:action.username,
                    username_list:provi
                };
            }
            return {
                ...state,
                username:action.username
            }
        case COMPLETED_MANEUVER_PERFORMANCE:
            const provi2 = {...state.username_list};
            
            const pr2 = state.username;
            provi2[pr2] = state.username_list[pr2].map((maneuverPerformance, index) => {
                if (maneuverPerformance.maneuver === action.maneuver) {
                    var success = 0;
                    action.success?success=1:success=0;
                    return Object.assign({}, maneuverPerformance, {
                        frequency: maneuverPerformance.frequency + 1,
                        accuracy:parseFloat(((maneuverPerformance.accuracy*maneuverPerformance.frequency+100*success)/(maneuverPerformance.frequency + 1)).toFixed(1)),
                        overallTrainingStatus:parseFloat((Math.min((maneuverPerformance.frequency+1)*10+(maneuverPerformance.accuracy*maneuverPerformance.frequency+100*success)/(maneuverPerformance.frequency + 1),100)).toFixed(1))
                    })
                }
                return maneuverPerformance
            });
            return {
                ...state,
                username_list:provi2
                
            }
        case CLEAR_MEMORY:
            return {
                ...state,
                username_list:{}
            }


        default:
            return state;
    }
}

function maneuver(state = {
    maneuverSelected: maneuverSelectionStatus.NONE_SELECTED,
    maneuverRecording: false,
    entrySettings: {},
    maneuverOutcome: {},
}, action) {

    switch (action.type) {
        case SET_SELECTED_MANEUVER:
            return {
                maneuverSelected: action.maneuver,
                maneuverRecording: false,
                maneuverEnded: false,
                entrySettings: {},
                maneuverOutcome: {},
            };
        case RESET_CURRENT_MANEUVER:
            return {
                maneuverSelected: maneuverSelectionStatus.NONE_SELECTED,
                maneuverRecording: false,
                maneuverEnded: false,
                entrySettings: {},
                maneuverOutcome: {},
            };
        case RESTART_CURRENT_MANEUVER:
            return {
                ...state,
                maneuverEnded: false,
                maneuverRecording: false,
                entrySettings: {},
                maneuverOutcome: {},
            }
        case START_MANEUVER:
            return {
                ...state,
                maneuverRecording: true,
                maneuverEnded: false,
                entrySettings: action.flightData,
            };
        case STOP_MANEUVER:
            return {
                ...state,
                maneuverRecording: false,
                maneuverEnded: true,
                maneuverOutcome: {
                    outcomeSuccessful: action.outcomeSuccessful,
                }
            }
        default:
            return state;
    }
}

function dataProvider(state = {
    dataProvider: dataProviders.FS,
    connectionStatus: connectionStatus.NOT_CONNECTED,
    configurations: { provider: dataProviders.FS, automated_search: false, iP_address: "localhost", port: "9002", frequency:5 },
},
    action) {
    switch (action.type) {
        case SET_DATA_PROVIDER:
            if (state.dataProvider === action.dataProvider) {
                return state;
            } else {
                return ({
                    dataProvider: action.dataProvider,
                    connectionStatus: connectionStatus.NOT_CONNECTED,
                    configurations: {provider:action.dataProvider, automated_search: false/*state.dataProvider.configurations.automated_search*/, iP_address: state.configurations.iP_address,port: state.configurations.port, frequency:state.configurations.frequency}
                });
            }
        case SET_DATA_CONNECTION:
            if (state.configurations.iP_address===action.iP_address && state.configurations.port===action.port) {
                return state
            }
            return ({
                ...state,
                connectionStatus: connectionStatus.NOT_CONNECTED,
                configurations: {provider:state.dataProvider, automated_search: state.configurations.automated_search, iP_address: action.iP_address,port: action.port, frequency:state.configurations.frequency}
            })
        case CONNECTION_STATUS_CHANGED:

            return ({
                ...state,
                connectionStatus: action.connectionStatus
            })
        case SIGNAL_WS_DATA_RECEIVED:
            return ({
                ...state,
                configurations:{...state.configurations,frequency:action.frequency}
            })
        default:
            return state;
    }
}

function dataSender(
    state = { flag: -1, payload: ""},
    action,
) {
    var provi = (state.flag+1)%10;
    switch (action.type) {
        case REQUEST_TP:

            return {
                flag:provi,
                payload: action.payload
            }

        default:
            return state;
    }
}

function flightData(
    state = { heading: 0.0, elevASL: 0.0, elevAGL: 0.0, roll: 0.0, engineRPM: 0.0, indicatedAirspeed: 0.0, record_altitude:[], record_speed:[], record_ground:[], flagrpos:-1, flagrref:-1,latitude:0.0,longitude:0.0,record_latitude:[], record_longitude:[], flagpos:-1},
    action,
) {

    switch (action.type) {
        case SIGNAL_RPOS_DATA_RECEIVED:
            
            let pro_l=state.record_altitude;
            let pro_lb=state.record_ground;
            if (pro_l.length>=100){
                //pro_l=[];
                pro_l.shift();
            }
            if (pro_lb.length>=100){
                pro_lb.shift();
            }
            let provi = (state.flagrpos+1)%10;
            pro_l.push(action.elevASL);
            pro_lb.push(action.elevASL-action.elevAGL)
            return {
                ...state,
                flagrpos:provi,
                heading: action.heading,
                elevASL: action.elevASL,
                elevAGL: action.elevAGL,
                roll: action.roll,
                record_altitude:pro_l,
                record_ground:pro_lb
            }
            return Object.assign({}, flightData, {
                heading: action.heading,

            });
        case SIGNAL_DATAREF_RECEIVED:
            switch (action.dataref) {
                case dataRefs.ENGINE_RPM:
                    return {
                        ...state,
                        engineRPM: action.value,
                    }
                case dataRefs.INDICATED_AIRSPEED:
                    var pro_l2=state.record_speed;
                    if (pro_l2.length>=100){
                       // pro_l2=[];
                        pro_l2.shift();

                    }
                    let provi2 = (state.flagrref+1)%10;
                    pro_l2.push(action.value);
                    return {
                        ...state,

                        flagrref:provi2,
                        indicatedAirspeed: action.value,
                        record_speed: pro_l2
                    }
            }
        case SIGNAL_POS_RECEIVED:
            let pro_lat=state.record_latitude;
            let pro_lon=state.record_longitude;
            if (pro_lat.length>=100){
                //pro_l=[];
                pro_lat.shift();
                pro_lon.shift();
            }
            let provi3 = (state.flagpos+1)%10;
            pro_lat.push(action.latitude);
            pro_lon.push(action.longitude);
            return {
                ...state,
                flagpos:provi3,
                latitude:action.latitude,
                longitude:action.longitude,
                record_latitude:pro_lat,
                record_longitude:pro_lon
            }
        default:
            return state;
    }
}

function userPerformances(state, action) {

    if (typeof state === 'undefined') {

        var newState = [];

        for (let [key, value] of Object.entries(maneuvers)) {

            newState = [
                ...newState,
                {
                    maneuver: value,
                    accuracy: 0,
                    frequency: 0,
                    overallTrainingStatus: 0,
                }
            ]
        }
        return newState;
    } else {

        /**
         * @todo calculate new total accuracy and overall training status
         */
        switch (action.type) {
            case COMPLETED_MANEUVER_PERFORMANCE:
                return state.map((maneuverPerformance, index) => {
                    if (maneuverPerformance.maneuver === action.maneuver) {
                        return Object.assign({}, maneuverPerformance, {
                            frequency: maneuverPerformance.frequency + 1,
                        })
                    }
                    return maneuverPerformance
                })
            default:
                return state;
        }
    }
}

const maneuversAppReducer = combineReducers({
    connectionData,
    maneuver,
    flightData,
    userPerformances,
    dataProvider,
    dataSender
});

export default maneuversAppReducer;
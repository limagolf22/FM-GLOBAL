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
    REQUEST_TP
} from '../actions/actions';
import maneuvers from '../atoms/ManeuverTypes';
import dataProviders from '../atoms/DataProviders';
import dataRefs from "../atoms/XPlaneDataRefs";
import { DefaultTheme } from '@react-navigation/native';
import { connect } from 'react-redux';

function connectionData(state={
    username:"",
}, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                username:action.username
            };
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
    configurations: { provider: dataProviders.FS, automated_search: false, iP_address: "localhost", port: "9002" },
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
                    configurations: {provider:action.dataProvider, automated_search: false/*state.dataProvider.configurations.automated_search*/, iP_address: state.configurations.iP_address,port: state.configurations.port}
                });
            }
        case SET_DATA_CONNECTION:
            return ({
                ...state,
                connectionStatus: connectionStatus.NOT_CONNECTED,
                configurations: {provider:state.dataProvider, automated_search: state.configurations.automated_search, iP_address: action.iP_address,port: action.port}
            })
        case CONNECTION_STATUS_CHANGED:

            return ({
                ...state,
                connectionStatus: action.connectionStatus
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
    state = { heading: 0, elevASL: 0, elevAGL: 0, roll: 0, engineRPM: 0, indicatedAirspeed: 0 },
    action,
) {

    switch (action.type) {
        case SIGNAL_RPOS_DATA_RECEIVED:

            return {
                ...state,
                heading: action.heading,
                elevASL: action.elevASL,
                elevAGL: action.elevAGL,
                roll: action.roll,
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
                    return {
                        ...state,
                        indicatedAirspeed: action.value,
                    }
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
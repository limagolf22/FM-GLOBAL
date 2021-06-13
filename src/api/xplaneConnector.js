import React from 'react';
import { signalRPOSDataReceived, singalDataRefReceived, connectionStatusChanged, connectionStatus } from "../actions/actions";

import datarefs from "../atoms/XPlaneDataRefs";

//import WS from 'react-native-websocket';

export default class XPlaneConnector extends React.Component {
   
    constructor(props) {
        super(props);
        console.log("Creating FS WS connector");

        
        this.store = props.store;
        this.remoteAddress = props.remoteAddress;

        var socket = new WebSocket(this.remoteAddress);
        socket.onopen = () => {console.log("connection established");
            this.store.dispatch(connectionStatusChanged(connectionStatus.CONNECTED));
        };
        socket.onmessage = ({data}) => {
            this.analyzeFSResponse(data);
        }
        socket.onclose = () => {console.log("connection lost");
            this.store.dispatch(connectionStatusChanged(connectionStatus.NOT_CONNECTED));
        }
        
        }

    render() {
        return null;
    }

    analyzeFSResponse(msg) {
        var values = msg.split(";");
        console.log(msg);
        var code = parseInt(values[0]);
        switch (code) {
            case 0:
                console.log("arrival RPOS");
                let heading = parseFloat(values[1]);
                let aslInFeet = parseFloat(values[2]);
                let aglInFeet = parseFloat(values[3]);
                let roll = parseFloat(values[4]);
                this.store.dispatch(signalRPOSDataReceived(heading, aslInFeet, aglInFeet, roll));

                break;
            case 1:
                console.log("arrival RREF");
                let speed = parseFloat(values[1]);
                let rpm = parseFloat(values[2]);
                this.store.dispatch(singalDataRefReceived(datarefs.INDICATED_AIRSPEED, speed));
                this.store.dispatch(singalDataRefReceived(datarefs.ENGINE_RPM, rpm));
                break;
            default:
                console.log("default");
        }
        
    }

}

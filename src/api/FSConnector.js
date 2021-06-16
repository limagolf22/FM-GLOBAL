import React from 'react';
import { connect } from 'react-redux';
import { signalRPOSDataReceived, singalDataRefReceived, connectionStatusChanged, connectionStatus } from "../actions/actions";

import datarefs from "../atoms/XPlaneDataRefs";

class FSConnector extends React.Component {
  //  static sock = new FSConnector("ws://localhost:9002");
    constructor(props) {
        super(props);
        console.log("Creating FS WS connector");
        this.store = props.store;
        this.remoteAddress = props.remoteAddress;
        this.socket = new WebSocket(this.remoteAddress);
        this.socket.onopen = () => {console.log("connection established");
            this.store.dispatch(connectionStatusChanged(connectionStatus.CONNECTED));
        };
        this.socket.onmessage = ({data}) => {
            this.analyzeFSResponse(data);
        }
        this.socket.onclose = () => {console.log("connection lost");
            this.store.dispatch(connectionStatusChanged(connectionStatus.NOT_CONNECTED));
        }
        
        }

    render() {
        if(this.props.payload.length>0){
            console.log("FS connector sent : "+this.props.payload +this.props.flag)
            this.sendMessage(this.props.payload);
        }
        return null;
    }

    analyzeFSResponse(msg) {
        var values = msg.split(";");
       // console.log(msg);
        var code = parseInt(values[0]);
        switch (code) {
            case 0:
               // console.log("arrival RPOS");
                let heading = (parseFloat(values[1]));
                let aslInFeet = parseFloat(values[2]);
                let aglInFeet = parseFloat(values[3]);
                let roll = (-1)*parseFloat(values[4]);
                this.store.dispatch(signalRPOSDataReceived(heading, aslInFeet, aglInFeet, roll));

                break;
            case 1:
                //console.log("arrival RREF");
                let speed = parseFloat(values[1]);
                let rpm = parseFloat(values[2]);
                this.store.dispatch(singalDataRefReceived(datarefs.INDICATED_AIRSPEED, speed));
                this.store.dispatch(singalDataRefReceived(datarefs.ENGINE_RPM, rpm));
                break;
            default:
                console.log("default");
        }
        
    }
    sendMessage(mess) {
        this.socket.send(mess);
    }


}


const mapStateToProps = state => ({
    payload: state.dataSender.payload,
    flag: state.dataSender.flag
  });
  
export default connect(mapStateToProps)(FSConnector)

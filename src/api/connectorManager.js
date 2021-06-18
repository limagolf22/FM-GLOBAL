/**
 * Shows the connection status (boolean) to a data provider (e.g. X-Plane). Optionally
 * displays a configuration button that indicates that the user wants to configure the
 * data provider.
 */

 import React from "react";
 import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
 import PropTypes from "prop-types";
 import dataProviders from "../atoms/DataProviders";
 import FSConnector from "./FSConnector";
 import {connect} from "react-redux";
 import XPlaneConnectorWs from "./xplaneConnector-ws";

class ConnectorManager extends React.Component {
    constructor(props){
        super(props);
        this.dataProvider=props.dataProvider;
        this.store = props.store;
        this.remoteaddr = props.remoteaddr;
        this.ws = new WebSocket(props.remoteaddr);
    }
    render() {
        this.ws.close();
        this.ws = new WebSocket(this.props.remoteaddr);
        console.log("new ws created");
        console.log(this.ws);
        switch (this.props.dataProvider) {
            case dataProviders.FS :
              //  console.log(this.ws);
                return (<FSConnector dataProvider={this.props.dataProvider} ws={this.ws} store={this.store}/> )
            case dataProviders.XPLANE :
                return (<XPlaneConnectorWs ws={this.ws} store={this.store} /> )
            default :
                console.log("a non existent data provider has been chosen");
                return null;
        }
    }
 }

 const mapStateToProps = state => ({
    dataProvider: state.dataProvider.dataProvider,
    remoteaddr: "ws://"+state.dataProvider.configurations.iP_address+":"+state.dataProvider.configurations.port
  });
  
export default connect(mapStateToProps)(ConnectorManager)
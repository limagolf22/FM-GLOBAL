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

function ConnectorManager({ flag_co, dataProvider, store, remoteaddr }) {
    if (flag_co<0) {
        return null;
    }
    switch (dataProvider) {
        case dataProviders.FS :
            return (<FSConnector remoteAddress={remoteaddr} store={store}/> )
        case dataProviders.XPLANE :
            return (<XPlaneConnectorWs remoteAddress={remoteaddr} store={store} /> )
        default :
            console.log("a non existent data provider has been chosen");
            return null;
    }
 }

 const mapStateToProps = state => ({
    dataProvider: state.dataProvider.dataProvider,
    remoteaddr: "ws://"+state.connectionData.IP_adress+":"+state.connectionData.port_num,
    flag_co: state.connectionData.flag_co
  });
  
export default connect(mapStateToProps)(ConnectorManager)
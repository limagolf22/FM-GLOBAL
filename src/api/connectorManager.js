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

function ConnectorManager({ dataProvider, store }) {
    switch (dataProvider) {
        case dataProviders.FS :
            return (<FSConnector remoteAddress="ws://localhost:9002" store={store}/> )
        case dataProviders.XPLANE :
            return (<XPlaneConnectorWs remoteAddress="ws://192.168.1.26:9001" store={store} /> )
        default :
            console.log("a non existent data provider has been chosen");
            return;
    }
 }

 const mapStateToProps = state => ({
    dataProvider: state.dataProvider.dataProvider
  });
  
export default connect(mapStateToProps)(ConnectorManager)
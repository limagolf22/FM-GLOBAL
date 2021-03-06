/**
 * Displays all available data providers (e.g. X-Plane) and enables the user to
 * switch to a new data provider from the list.
 */

import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ConnectionContainer from "../container/ConnectionContainer";
import ScreenBrief from "../components/ScreenBrief";
import ProviderItem from "../components/ProviderItem";
import supportedSimulators from "../atoms/SupportedSimulators";
import ProviderConfigurationsContainer from "../container/ProviderConfigurationsContainer";
import FormAdressContainer from "../container/FormAdressContainer";

function DataProviderScreen({ navigation, currentDataProvider }) {

    const simulatedItems = [];
    const settingsTitle = currentDataProvider + " configuration";

    for (let [key, value] of Object.entries(supportedSimulators)) {

        simulatedItems.push(<ProviderItem itemName={value} simulated={true} currentItem={currentDataProvider === value} />);
    }

    return (
        <View style={styles.rootContainer}>
            <ConnectionContainer allowConfiguration={false} />

            {
                /**
                 
                <ScreenBrief
                briefTitle={settingsTitle}
                briefDescription="The following configuration applies to this data provider:"
                />

                <ProviderConfigurationsContainer />
                 */
            }

            <View style={styles.providerListContainer}>
                <ScreenBrief
                    briefTitle="Data provider selection"
                    briefDescription="You can select between the supported simulators and the device GNSS for real flights."
                    callToAction="Select a data provider from the list below."
                />
                <View style={styles.itemContainer}>
                    {
                        simulatedItems
                    }
                    <ProviderItem itemName="GNSS (not yet supported)" simulated={false} currentItem={currentDataProvider === "GNSS"} disableTouch={true} />
                </View>
            </View>
            <FormAdressContainer/>
        </View>
    );
}



const styles = StyleSheet.create({
    rootContainer: {
        padding: 20,
    },
    itemContainer: {
        marginTop: 10,
    },
    providerListContainer: {
        marginTop: 20,
    }
});

DataProviderScreen.propTypes = {
    currentDataProvider: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
    return {
        currentDataProvider: state.dataProvider.dataProvider,
    };
}
function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataProviderScreen);
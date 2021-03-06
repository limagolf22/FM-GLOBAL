/**
 * Provides an overview of all the maneuevers and past performance. The user can select a
 * maneuver from the list to start training.
 *
 * @author Sebastian Feger
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from "prop-types";

import { setSelectedManeuever } from "../actions/actions";

import ScreenBrief from '../components/ScreenBrief';
import ManeuverOverviewItem from '../components/ManeuverOverviewItem';
import maneuvers from '../atoms/ManeuverTypes';
import { connect } from 'react-redux';
import ConnectionContainer from '../container/ConnectionContainer';
import {useKeepAwake} from 'expo-keep-awake';

import GraphAltitude from '../container/GraphAltitude';
import GraphSpeed from '../container/GraphSpeed';
import GraphHorizontal from '../container/GraphHorizontal';

function BriefingRoom({ usname, navigation, navigateToManeuver }) {
  useKeepAwake();
  return (
    <View style={styles.rootContainer}>
      {/*<KeepAwake/>    */}
      <ConnectionContainer />
      <ScreenBrief
        briefTitle="BriefingRoom"
        briefDescription={"Hi "+usname+" ! It is important that you regularly train common flight maneuvers. Exercise and master them and you will be ready when you need to be."}
        callToAction="Select a maneuver to start training."
      />
      <View style={styles.maneuverListContainer}>
        <TouchableOpacity onPress={() => navigateToManeuverScreen(maneuvers.STEEP_TURNS)}>
          <ManeuverOverviewItem
            maneuverTitle={maneuvers.STEEP_TURNS}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToManeuverScreen(maneuvers.POWER_ON_STALLS)}>
          <ManeuverOverviewItem
            maneuverTitle={maneuvers.POWER_ON_STALLS}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'stretch', alignContent:'stretch', padding:20}}>
        {<GraphHorizontal cycleDuration={60*4}/>}
        { <GraphAltitude _min={2500} _max={5000} autosize={true} resolution={100} cycleDuration={60*4}/> }
        { /*<GraphSpeed _min={10} _max={250} Vsubdiv={200} Hsubdiv={10} autosize={true} resolution={10} Isplane={false}/> */}
      </View>
    </View>
  );

  function navigateToManeuverScreen(maneuver) {

    navigateToManeuver(maneuver);
    navigation.navigate('ManeuverScreen');
  }
}

BriefingRoom.propTypes = {
  navigateToManeuver: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  rootContainer: {
    padding: 20,
  },
  maneuverListContainer: {
    paddingTop: 20,
  },
});

const mapStateToProps = state => ({
  usname: state.connectionData.username
});

const mapDispatchToProps = dispatch => ({
  navigateToManeuver: maneuver => dispatch(setSelectedManeuever(maneuver)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BriefingRoom)
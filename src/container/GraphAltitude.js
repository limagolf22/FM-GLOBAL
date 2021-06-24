import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';

import Point from './Point';
import HLine from './HLine';
import PlaneDraw from './PlaneDraw';

const HGrid =[];
let i=1
for (i=0;i<10;i++) {
  HGrid.push(<HLine posY={i*300/10} />)
}

function GraphAltitude({alti_t,alti_list,flag}){
    let p=flag;
    return (
        <View style={styles.graphContainer}>
        {HGrid}
        <PlaneDraw posX={alti_list.length>0?alti_list[alti_list.length-1].key*4:alti_t} posY={alti_list.length>0?alti_list[alti_list.length-1].alt:alti_t}/>
        {alti_list.map(val=>(<Point posX={val.key*4} posY={val.alt} key={val.key.toString()} />))}
        </View>

    )

}

const styles = StyleSheet.create({
    graphContainer: {
      borderWidth:2,
      height:300,
      width:400
    },
  });

const mapStateToProps = state => ({
    alti_t: state.flightData.elevASL,
    alti_list:state.flightData.record_altitude,
    flag:state.flightData.flagfd
  });

const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GraphAltitude)
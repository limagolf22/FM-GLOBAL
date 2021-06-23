import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';

function GraphAltitude({alti_t,alti_list}){
    var provi =[]
    let i;
    for (i=0;i<alti_list.length;i++) {
        provi.push(<View style={{width:4,
            height:4,
            position:'absolute',
            borderRadius:2,
            backgroundColor:'red',
            transform:[{translateX:4*i},{translateY:(5000-alti_list[i])*300/5000}]}}/>)
    }
    return (
        <View style={styles.graphContainer}>

        {provi}

        </View>

    )

}


const styles = StyleSheet.create({
    graphContainer: {
      borderWidth:2,
      height:300,
      width:400
    },
    point: {
      width:40,
      height:40,
      position:'relative',
      borderRadius:2,
      backgroundColor:'red'
    },
  });

const mapStateToProps = state => ({
    alti_t: state.flightData.elevASL,
    alti_list:state.flightData.record_altitude
  });

const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GraphAltitude)
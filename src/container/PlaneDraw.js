import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const styles = {
    heading: {
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    fuselage: {
        width: 10,
        height: 10,
        borderRadius: 4,
        backgroundColor: 'blue',
        position:'absolute'     
      },
    wing: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'darkblue',
        position:'absolute'     
    },
    rudder: {
        width: 2,
        height: 1.5,
        borderRadius: 1,
        backgroundColor: 'blue',
        position:'absolute'     
      },
  };

export default function PlaneDraw({posX,posY}){
    return(
        
            <View style={{...(styles.fuselage),transform: [{ scaleX: 5 },{ translateX: posX/5 },{translateY: posY-4}]}}>
                   <View style={{...(styles.rudder),transform: [{ scaleY: 8 },{ translateX: 0/5 },{translateY: -3/8}]}}></View> 
                   <View style={{...(styles.wing),transform: [{ scaleX: 1 },{ translateX: 13/5 },{translateY: 3}]}}></View> 
            </View>
        
    )
}


import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const styles = {
    canvas: {
      width:10,
      height:10,
      position:'absolute'
    },
    fuselage: {
        width: 10,
        height: 10,
        borderRadius: 3,
        backgroundColor: 'blue',
        position:'absolute'     
      },
    wing: {
        width: 8,
        height: 8,
        borderRadius: 4,
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

export default function PlaneDrawH({posX,posY,heading}){
    return(
            <View style={{...(styles.canvas),transform:[{ translateX: posX-3 },{translateY: posY-4},{rotateZ:(heading-90)+"deg"}]}}>
            <View style={{...(styles.fuselage),transform: [{ scaleX: 5 }]}}>
                    <View style={{...(styles.rudder),transform: [{ scaleY: 10 },{ translateX: 0/5 },{translateY: 1/8}]}}></View> 
                   <View style={{...(styles.wing),transform: [{ scaleX: 1/5 },{ scaleY: 5 },{ translateX: 7 }]}}></View> 
            </View>
            </View>
        
    )
}


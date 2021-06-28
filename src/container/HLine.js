import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
  }

export default function HLine({posY, min, max, width, height,val}){

    return (
        <View>
            <View style={{ ...hline,width:width-2,transform:[{translateY:clamp(posY,0,height)}]}}/>
            <Text style={{fontSize:10, position:'absolute',transform:[{translateY:clamp(posY,0,height)}]}}>{clamp(val,min,max).toFixed(3)}</Text>
        </View>
    )
}

const hline={
    height:1,
    position:'absolute',
    backgroundColor:'black',
}